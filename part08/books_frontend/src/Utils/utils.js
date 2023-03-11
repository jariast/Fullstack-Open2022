function filterByGenre(books, genre = 'All genres') {
  if (genre === 'All genres') {
    return books;
  }
  return books.filter((book) => book.genres.includes(genre));
}

export { filterByGenre };
