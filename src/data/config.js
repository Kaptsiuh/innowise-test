import { BASE_URL } from "../utils/constants";

export const appConfig = {
  header: {
    logo: "The Library",
    description: "Discover your next favorite book",
  },
  searchSection: {
    title: "Discover Your Next Great Read",
    description: "Search millions of books, build your personal library, and never lose track of what to read next.",
    inputPlaceholder: "Search for books by title or author...",
    buttonText: "search",
    fetchError: "Failed to load books. Please try again.",
    notFound: "No books found!",
    emptyQuery: "Please enter a search query",
  },
  favorites: {
    title: "Favorites",
    description: "books saved",
    emptyList: "No favorite books yet",
    redHeart: "\u{1FA77}",
    whiteHeart: "\u{1F90D}",
  },
  footer: {
    api: {
      title: "Powered by",
      link: {
        title: "Open Library",
        url: BASE_URL,
      },
    },
    developer: {
      title: "Developed by",
      link: {
        title: "Dzmitry Kaptsiuh",
        url: "https://github.com/Kaptsiuh",
      },
    },
  },
};
