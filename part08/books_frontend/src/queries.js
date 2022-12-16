import { gql } from '@apollo/client';

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
      author
      id
      published
      title
    }
  }
`;
