const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');

const { startStandaloneServer } = require('@apollo/server/standalone');

require('dotenv').config();

const mongoose = require('mongoose');

const Author = require('./models/author');
const Book = require('./models/book');

const MONGODB_URI = process.env.MONGODB_URI;

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(authorName: String, genre: String): [Book!]!
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Author: {
    bookCount: async (parent) => Book.countDocuments({ author: parent.id }),
  },
  Mutation: {
    addBook: async (__, args) => {
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
    editAuthor: async (__, { name, setBornTo }) => {
      const author = await Author.findOne({ name });

      author.born = setBornTo;

      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
