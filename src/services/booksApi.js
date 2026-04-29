import { BASE_URL } from "../utils/constants";

const cache = new Map();

export async function getBooks(searchQuery, signal = null) {
  const params = new URLSearchParams({
    q: searchQuery || "popular",
    limit: 20,
  });

  const cacheKey = searchQuery || "popular";

  if (cache.has(cacheKey)) {
    console.log("Returning cached data for", cacheKey);
    return cache.get(cacheKey);
  }

  try {
    const response = await fetch(`${BASE_URL}/search.json?${params}`, { signal });

    if (!response.ok) {
      console.error(`http error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const books = data.docs || [];

    cache.set(cacheKey, books);

    return books;
  } catch (error) {
    if (cache.has(cacheKey)) {
      cache.delete(cacheKey);
    }
    console.error(`Error fetching books: ${error}`);
    return [];
  }
}

export function clearSearchCache() {
  cache.clear();
}
