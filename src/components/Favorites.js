import { appConfig } from "../data/config";
import { isFavorite, loadFavorites, removeFromFavorites } from "../services/storage";
import "../styles/components/Favorites.css";
import { createElement } from "../utils/domUtils";
import { getBookUrl, getCoverUrl } from "../utils/urlUtils";
import favoriteIcon from "./../assets/images/heart.svg";

export function createFavorites() {
  const titleWrapper = createTitleWrapper();
  const favoritesList = createFavoritesList();

  const favoritesContainer = createElement("aside", "favorites", titleWrapper, favoritesList);
  return favoritesContainer;
}

function createTitleWrapper() {
  const favoriteImg = createElement("img", "favorites__title-img");
  favoriteImg.src = favoriteIcon;
  favoriteImg.alt = "Favorite";

  const title = createElement("h2", "favorites__title", appConfig.favorites.title);

  const booksCount = loadFavorites().length;
  const description = createElement(
    "p",
    "favorites__title-description",
    `${booksCount} ${appConfig.favorites.description}`,
  );

  const titleWrapper = createElement("div", "favorites__title-wrapper", favoriteImg, title, description);
  return titleWrapper;
}

function createFavoritesList() {
  const favoritesList = createElement("ul", "favorites__list");

  const savedFavorites = loadFavorites();
  if (savedFavorites.length === 0) {
    const emptyMessage = createElement("p", "favorites__empty", appConfig.favorites.emptyList);
    favoritesList.append(emptyMessage);
  } else {
    savedFavorites.forEach((book) => {
      favoritesList.append(createFavoriteItem(book, updateFavorites));
    });
  }
  return favoritesList;
}

export function createFavoriteItem(book, updateFavoritesCallback) {
  const cover = createCover(book);
  const info = createInfo(book);
  const favoriteBtn = createFavoriteButton(book, updateFavoritesCallback);

  const link = createElement("a", "favorites__item", cover, info, favoriteBtn);
  link.href = getBookUrl(book.key);
  link.target = "_blank";

  const item = createElement("li", "", link);
  return item;
}

function createCover(book) {
  const cover = createElement("img", "favorites__cover");
  cover.src = getCoverUrl(book.coverId);
  cover.alt = `Cover of ${book.title}`;
  return cover;
}

function createInfo(book) {
  const title = createElement("h3", "favorites__book-title", book.title);
  const author = createElement("p", "favorites__book-author", book.authorName);

  const info = createElement("div", "favorites__info", title, author);
  return info;
}

function createFavoriteButton(book, updateFavoritesCallback) {
  const favoriteBtn = createElement("button", "favorites__remove", appConfig.favorites.redHeart);

  favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    removeFromFavorites(book.key);

    if (updateFavoritesCallback) {
      updateFavoritesCallback();
    }

    updateBookCardHeart(book.key);
  });

  return favoriteBtn;
}

function updateFavorites() {
  const favoritesAside = document.querySelector(".favorites");
  if (favoritesAside) {
    const newFavorites = createFavorites();
    favoritesAside.replaceWith(newFavorites);
  }
}

function updateBookCardHeart(bookKey) {
  const allBookCards = document.querySelectorAll(".book-card");

  allBookCards.forEach((card) => {
    const link = card.querySelector("a");
    if (link && link.href.includes(bookKey)) {
      const favoriteBtn = card.querySelector(".book-card__favorite");
      if (favoriteBtn) {
        favoriteBtn.textContent = isFavorite(bookKey) ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
      }
    }
  });
}
