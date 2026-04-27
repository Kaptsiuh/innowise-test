import { appConfig } from "../data/config";
import "../styles/components/Favorites.css";
import favoriteIcon from "./../assets/images/heart.svg";

export function createFavorites() {
  const favoritesContainer = document.createElement("aside");
  favoritesContainer.className = "favorites";

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

  const favoritesList = document.createElement("div");
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

  favoritesContainer.append(titleWrapper, favoritesList);

  return favoritesContainer;
}

export function createFavoriteItem(book, updateFavoritesCallback) {
  const item = document.createElement("a");
  item.className = "favorites__item";
  item.href = `${import.meta.env.VITE_BASE_URL}${book.key}`;
  item.target = "_blank";

  const cover = document.createElement("img");
  cover.className = "favorites__cover";
  const coversUrl = import.meta.env.VITE_COVERS_URL || "https://covers.openlibrary.org";

  cover.src = `${coversUrl}/b/id/${book.coverId}.jpg`;
  cover.alt = `Cover of ${book.title}`;

  const info = document.createElement("div");
  info.className = "favorites__info";

  const title = document.createElement("h3");
  title.className = "favorites__book-title";
  title.append(book.title);

  const author = document.createElement("p");
  author.className = "favorites__book-author";
  author.append(book.authorName);

  const favoriteBtn = document.createElement("button");
  favoriteBtn.className = "favorites__remove";
  favoriteBtn.append(appConfig.favorites.redHeart);

  favoriteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    removeFromFavorites(book.key);
    item.remove();

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

  info.append(title, author);
  item.append(cover, info, favoriteBtn);

  return item;
}

export function loadFavorites() {
  const favorites = localStorage.getItem("favoriteBooks");
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorite(book) {
  const favorites = loadFavorites();

  if (!favorites.some((fav) => fav.key === book.key)) {
    favorites.push({
      title: book.title,
      authorName: book.authorName,
      coverId: book.coverId,
      key: book.key,
    });
    localStorage.setItem("favoriteBooks", JSON.stringify(favorites));
    return true;
  }
  return false;
}

export function removeFromFavorites(key) {
  const favorites = loadFavorites();
  const updatedFavorites = favorites.filter((book) => book.key !== key);
  localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
}

export function isFavorite(key) {
  const favorites = loadFavorites();
  return favorites.some((book) => book.key === key);
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
        const isFav = isFavorite(bookKey);
        favoriteBtn.textContent = isFav ? appConfig.favorites.redHeart : appConfig.favorites.whiteHeart;
      }
    }
  });
}
