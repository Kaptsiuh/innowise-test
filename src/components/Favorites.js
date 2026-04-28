import { appConfig } from "../data/config";
import { isFavorite, loadFavorites, removeFromFavorites } from "../services/storage";
import "../styles/components/Favorites.css";
import favoriteIcon from "./../assets/images/heart.svg";

export function createFavorites() {
  const favoritesContainer = document.createElement("aside");
  favoritesContainer.className = "favorites";

  const titleWrapper = createTitleWrapper();
  const favoritesList = createFavoritesList();

  favoritesContainer.append(titleWrapper, favoritesList);
  return favoritesContainer;
}

function createTitleWrapper() {
  const titleWrapper = document.createElement("div");
  titleWrapper.className = "favorites__title-wrapper";

  const favoriteImg = document.createElement("img");
  favoriteImg.className = "favorites__title-img";
  favoriteImg.src = favoriteIcon;
  favoriteImg.alt = "Favorite";

  const title = document.createElement("h2");
  title.className = "favorites__title";
  title.append(appConfig.favorites.title);

  const booksCount = loadFavorites().length;

  const description = document.createElement("p");
  description.className = "favorites__title-description";
  description.append(`${booksCount} ${appConfig.favorites.description}`);

  titleWrapper.append(favoriteImg, title, description);
  return titleWrapper;
}

function createFavoritesList() {
  const favoritesList = document.createElement("ul");
  favoritesList.className = "favorites__list";

  const savedFavorites = loadFavorites();

  if (savedFavorites.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "favorites__empty";
    emptyMessage.append(appConfig.favorites.emptyList);
    favoritesList.append(emptyMessage);
  } else {
    savedFavorites.forEach((book) => {
      favoritesList.append(createFavoriteItem(book, updateFavorites));
    });
  }

  return favoritesList;
}

export function createFavoriteItem(book, updateFavoritesCallback) {
  const item = document.createElement("li");

  const link = document.createElement("a");
  link.className = "favorites__item";
  link.href = `${import.meta.env.VITE_BASE_URL}${book.key}`;
  link.target = "_blank";

  const cover = createCover(book);
  const info = createInfo(book);
  const favoriteBtn = createFavoriteButton(book, updateFavoritesCallback);

  link.append(cover, info, favoriteBtn);
  item.append(link);

  return item;
}

function createCover(book) {
  const cover = document.createElement("img");
  cover.className = "favorites__cover";
  const coversUrl = import.meta.env.VITE_COVERS_URL || "https://covers.openlibrary.org";
  cover.src = `${coversUrl}/b/id/${book.coverId}.jpg`;
  cover.alt = `Cover of ${book.title}`;
  return cover;
}

function createInfo(book) {
  const info = document.createElement("div");
  info.className = "favorites__info";

  const title = document.createElement("h3");
  title.className = "favorites__book-title";
  title.append(book.title);

  const author = document.createElement("p");
  author.className = "favorites__book-author";
  author.append(book.authorName);

  info.append(title, author);
  return info;
}

function createFavoriteButton(book, updateFavoritesCallback) {
  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "favorites__remove";
  favoriteBtn.append(appConfig.favorites.redHeart);

  favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    removeFromFavorites(book.key);

    if (updateFavoritesCallback) {
      updateFavoritesCallback();
    }

    updateBookCardHeart(book.key);

    const favoritesList = document.querySelector(".favorites__list");
    if (favoritesList && favoritesList.children.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "favorites__empty";
      emptyMessage.append(appConfig.favorites.emptyList);
      favoritesList.append(emptyMessage);
    }
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
