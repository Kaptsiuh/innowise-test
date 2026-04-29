export function transformBook(book) {
  return {
    title: book.title,
    authorName: book?.author_name?.at(0) || "Unknown author",
    firstPublishYear: book.first_publish_year || "Unknown year",
    coverId: book.cover_i,
    key: book.key,
  };
}
