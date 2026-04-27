import { appConfig } from "../data/config";
import "../styles/components/Book.css";
import { saveFavorite, isFavorite, removeFromFavorites, createFavorites } from "./Favorites";

export function createBookCard(book) {
  const card = document.createElement("li");
  card.className = "book-card";

  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_BASE_URL}${book.key}`;
  link.target = "_blank";

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

  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "book-card__favorite";

  updateHeart(favoriteBtn, book.key);

  favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isFav = isFavorite(book.key);

    if (!isFav) {
      saveFavorite(book);
      updateHeart(favoriteBtn, book.key);
      updateFavoritesSidebar();
    } else {
      removeFromFavorites(book.key);
      updateHeart(favoriteBtn, book.key);
      updateFavoritesSidebar();
    }
  });

  cardContent.append(bookTitle, bookAuthor, bookYear, favoriteBtn);
  link.append(bookCover, cardContent);
  card.append(link);

  return card;
}

function updateFavoritesSidebar() {
  const favoritesSidebar = document.querySelector(".favorites");
  if (favoritesSidebar) {
    const newFavorites = createFavorites();
    favoritesSidebar.replaceWith(newFavorites);
  }
}

function updateHeart(button, key) {
  const isFav = isFavorite(key);
  button.textContent = isFav ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
}
