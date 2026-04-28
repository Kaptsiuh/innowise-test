import { BASE_URL } from "../utils/constants";

export async function getBooks(searchQuery) {
  const params = new URLSearchParams({
    q: searchQuery || "popular",
    limit: 20,
  });

  try {
    const response = await fetch(`${BASE_URL}/search.json?${params}`);

    if (!response.ok) {
      console.error(`http error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
}
