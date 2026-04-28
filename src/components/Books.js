import "../styles/components/Books.css";
import { getBooks } from "../services/booksApi";
import { createBookCard } from "./Book";
import { createFavorites } from "./Favorites";
import { createElement, showMessage, showLoader } from "../utils/domUtils";
import { appConfig } from "../data/config";
import { transformBook } from "../utils/transformBook";

export async function loadBooks(parentNode, searchQuery) {
  if (!parentNode) {
    console.error("parentNode is required for loadBooks");
    return;
  }

  let booksContainer = parentNode.querySelector(".books");

  if (!booksContainer) {
    booksContainer = createElement("div", "books");
    parentNode.append(booksContainer);
  }

  showLoader(booksContainer);

  try {
    let books = await getBooks(searchQuery);

    if (!Array.isArray(books)) {
      books = [];
    }

    const transformedBooks = books.map(transformBook);

    const newBook = createBooks(transformedBooks);
    const favorite = createFavorites();
    const booksGridWrapper = createElement("div", "books-grid-wrapper", newBook, favorite);

    booksContainer.innerHTML = "";
    booksContainer.append(booksGridWrapper);
  } catch (error) {
    console.error(`Error loading books: ${error}`);
    showMessage(booksContainer, "error-message", appConfig.searchSection.fetchError);
  }
}

export function createBooks(books) {
  const container = createElement("ul", "books-container");

  if (!books.length) {
    showMessage(container, "books__no-results", appConfig.searchSection.notFound);
    return container;
  }

  books.forEach((book) => {
    container.append(createBookCard(book));
  });

  return container;
}
