import "../styles/components/Book.css";

export function createBookCard({ title, authorName, firstPublishYear, coverId, key } = book) {
  const card = document.createElement("li");
  card.className = "book-card";

  const formattedTitle = encodeURIComponent(title.replace(/ /g, "_"));

  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_BASE_URL}${key}/${formattedTitle}`;
  link.target = "_blank";

  const bookCover = document.createElement("img");
  bookCover.className = "book-card__cover";
  bookCover.src = `${import.meta.env.VITE_COVERS_URL}/b/id/${coverId}.jpg`;
  bookCover.alt = `Cover of ${title}`;

  const cardContent = document.createElement("div");
  cardContent.className = "book-card__content";

  const bookTitle = document.createElement("h3");
  bookTitle.className = "book-card__title";
  bookTitle.append(title);

  const bookAuthor = document.createElement("p");
  bookAuthor.className = "book-card__author";
  bookAuthor.append(authorName);

  const bookYear = document.createElement("p");
  bookYear.className = "book-card__year";
  bookYear.append(firstPublishYear);

  cardContent.append(bookTitle, bookAuthor, bookYear);
  link.append(bookCover, cardContent);
  card.append(link);

  return card;
}
