export async function getBooks() {
  const params = new URLSearchParams({
    q: "popular",
    limit: 20,
    sort: "editions",
  });

  try {
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://openlibrary.org";
    const response = await fetch(`${baseUrl}/search.json?${params}`);

    if (!response.ok) {
      console.error(`http error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    return [];
  }
}
