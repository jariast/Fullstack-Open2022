const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const { startStandaloneServer } = require('@apollo/server/standalone');

require('dotenv').config();

const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const gql = require('graphql-tag');

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(authorName: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (__, { authorName, genre }) => {
      const author = await Author.findOne({ name: authorName });
      const queryObject = {};
      author ? (queryObject.author = author.id) : null;
      genre ? (queryObject.genres = genre) : null;
      return Book.find(queryObject).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: async (parent, args, { bearerToken }) =>
      extractLoggedInUser(bearerToken),
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent.id }),
  },
  Mutation: {
    addBook: async (__, args, { bearerToken }) => {
      const loggedUser = await extractLoggedInUser(bearerToken);
      if (!loggedUser) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',

            http: { status: 401 },
          },
        });
      }

      const existingAuthor = await Author.findOne({ name: args.author });
      let authorId = existingAuthor ? existingAuthor._id : '';
      try {
        if (!existingAuthor) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
          authorId = newAuthor._id;
        }
        const bookObject = { ...args };
        bookObject.author = authorId;

        const book = new Book({ ...bookObject });

        return (await book.save()).populate('author');
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
    },
    editAuthor: async (__, { name, setBornTo }, { bearerToken }) => {
      const loggedUser = await extractLoggedInUser(bearerToken);
      if (!loggedUser) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',

            http: { status: 401 },
          },
        });
      }

      const author = await Author.findOne({ name });

      author.born = setBornTo;

      return author.save();
    },
    createUser: async (__, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre });

      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      });
    },
    login: async (__, { username, password }) => {
      const user = await User.findOne({ username });

      //hardcoded password
      if (!user || password !== 'superpass') {
        throw new GraphQLError('Invalid credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req }) => {
    const authHeader = req ? req.headers.authorization : null;
    if (authHeader && authHeader.toLocaleLowerCase().startsWith('bearer ')) {
      return { bearerToken: authHeader.substring(7) };
    }
  },
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

const extractLoggedInUser = async (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const currentUser = await User.findById(decodedToken.id);
    return currentUser;
  } catch (error) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',

        http: { status: 401 },
      },
    });
  }
};
