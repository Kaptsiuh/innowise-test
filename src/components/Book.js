import { appConfig } from "../data/config";
import { isFavorite, removeFromFavorites, saveFavorite } from "../services/storage";
import "../styles/components/Book.css";
import { createElement } from "../utils/domUtils";
import { getBookUrl, getCoverUrl } from "../utils/urlUtils";
import { createFavorites } from "./Favorites";

export function createBookCard(book) {
  const link = createLink(book);
  const bookCover = createCover(book);
  const cardContent = createContent(book);

  link.append(bookCover, cardContent);
  const card = createElement("li", "book-card", link);
  return card;
}

function createLink(book) {
  const link = createElement("a");
  link.href = getBookUrl(book.key);
  link.target = "_blank";
  return link;
}

function createCover(book) {
  const bookCover = createElement("img", "book-card__cover");
  bookCover.src = getCoverUrl(book.coverId);
  bookCover.alt = `Cover of ${book.title}`;
  return bookCover;
}

function createContent(book) {
  const bookTitle = createElement("h3", "book-card__title", book.title);
  const bookAuthor = createElement("p", "book-card__author", book.authorName);
  const bookYear = createElement("p", "book-card__year", book.firstPublishYear);

  const favoriteBtn = createFavoriteButton(book);
  const cardContent = createElement("div", "book-card__content", bookTitle, bookAuthor, bookYear, favoriteBtn);
  return cardContent;
}

function createFavoriteButton(book) {
  const favoriteBtn = createElement("button", "book-card__favorite");

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
