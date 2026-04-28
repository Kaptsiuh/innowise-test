import { appConfig } from "../data/config";
import { isFavorite, removeFromFavorites, saveFavorite } from "../services/storage";
import "../styles/components/Book.css";
import { createFavorites } from "./Favorites";

export function createBookCard(book) {
  const card = document.createElement("li");
  card.className = "book-card";

  const link = createLink(book);
  const bookCover = createCover(book);
  const cardContent = createContent(book);

  link.append(bookCover, cardContent);
  card.append(link);

  return card;
}

function createLink(book) {
  const link = document.createElement("a");
  link.href = `${import.meta.env.VITE_BASE_URL}${book.key}`;
  link.target = "_blank";
  return link;
}

function createCover(book) {
  const bookCover = document.createElement("img");
  bookCover.className = "book-card__cover";
  bookCover.src = `${import.meta.env.VITE_COVERS_URL}/b/id/${book.coverId}.jpg`;
  bookCover.alt = `Cover of ${book.title}`;
  return bookCover;
}

function createContent(book) {
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

  const favoriteBtn = createFavoriteButton(book);

  cardContent.append(bookTitle, bookAuthor, bookYear, favoriteBtn);
  return cardContent;
}

function createFavoriteButton(book) {
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "book-card__favorite";

  updateHeart(favoriteBtn, book.key);

  favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(book.key)) {
      removeFromFavorites(book.key);
    } else {
      saveFavorite(book);
    }

    updateHeart(favoriteBtn, book.key);
    updateFavoritesSidebar();
  });
  return favoriteBtn;
}

function updateFavoritesSidebar() {
  const favoritesSidebar = document.querySelector(".favorites");
  if (favoritesSidebar) {
    const newFavorites = createFavorites();
    favoritesSidebar.replaceWith(newFavorites);
  }
}

function updateHeart(button, key) {
  button.textContent = isFavorite(key) ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
}
