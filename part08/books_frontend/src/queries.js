import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
    }
    id
    published
    title
  }
`;

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      bookCount
      born
      id
      name
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_BY_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_GENRES = gql`
  query AllGenres {
    allGenres
  }
`;

export const GET_USER_INFO = gql`
  query Me {
    me {
      favouriteGenre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      author
      id
      published
      title
    }
  }
`;

export const SET_AUTHOR_BIRTH = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      id
      name
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
