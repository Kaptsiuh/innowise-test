import { STORAGE_KEY } from "../utils/constants";

export function loadFavorites() {
  const favorites = localStorage.getItem(STORAGE_KEY);
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
}

export function removeFromFavorites(key) {
  const favorites = loadFavorites();
  const updatedFavorites = favorites.filter((book) => book.key !== key);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
}

export function isFavorite(key) {
  const favorites = loadFavorites();
  return favorites.some((book) => book.key === key);
}
