const { GraphQLError } = require('graphql');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET;
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
    allGenres: async () => await Book.find().distinct('genres'),
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

async function extractLoggedInUser(token) {
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
}

module.exports = resolvers;
