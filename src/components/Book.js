import "../styles/components/Book.css";

export function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";

  const bookCover = document.createElement("img");
  bookCover.className = "book-card__cover";
  bookCover.src = `${import.meta.env.VITE_COVERS_URL}/b/id/${book.coverId}.jpg`;
  bookCover.alt = `Cover of ${book.title}`;

  const cardContent = document.createElement("div");
  cardContent.className = "book-card__content";

  const bookTitle = document.createElement("h3");
  bookTitle.className = "book-card__title";
  bookTitle.append(book.title);

  const bookAuthor = document.createElement("p");
  bookAuthor.className = "book-card__author";
  bookAuthor.append(book.authorName);

  const bookYear = document.createElement("p");
  bookYear.className = "book-card__year";
  bookYear.append(book.firstPublishYear);

  cardContent.append(bookTitle, bookAuthor, bookYear);
  card.append(bookCover, cardContent);

  return card;
}
