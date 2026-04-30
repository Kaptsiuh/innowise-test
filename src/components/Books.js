import "../styles/components/Books.css";
import { getBooks } from "../services/booksApi";
import { createBookCard } from "./Book";
import { createFavorites } from "./Favorites";
import { createElement, showMessage, showLoader } from "../utils/domUtils";
import { appConfig } from "../data/config";
import { transformBook } from "../utils/transformBook";
import { onScroll, pagination, resetPagination } from "../services/pagination";

export async function loadBooks(parentNode, searchQuery, signal = null, isLoadMore = false) {
  if (!parentNode) {
    console.error("parentNode is required for loadBooks");
    return;
  }

  let booksContainer = parentNode.querySelector(".books");

  if (!booksContainer) {
    booksContainer = createElement("div", "books");
    const booksList = createElement("ul", "books-container");
    const favorite = createFavorites();
    booksContainer.append(booksList, favorite);
    parentNode.append(booksContainer);
  }

  const booksListContainer = booksContainer.querySelector(".books-container");

  if (!isLoadMore) {
    resetPagination();
    showLoader(booksListContainer);
  }

  pagination.isLoading = true;

  try {
    let books = await getBooks(searchQuery, signal, pagination.offset);

    if (signal?.aborted) return;

    if (!Array.isArray(books)) {
      books = [];
    }

    const transformedBooks = books.map(transformBook);

    if (!isLoadMore) {
      const newBooks = createBooks(transformedBooks);
      booksListContainer.innerHTML = "";
      booksListContainer.append(newBooks);
    } else {
      transformedBooks.forEach((book) => {
        booksListContainer.append(createBookCard(book));
      });
    }

    pagination.offset += 20;
    pagination.hasMore = books.length === 20;

    if (!isLoadMore && pagination.hasMore) {
      onScroll(() => loadBooks(parentNode, searchQuery, null, true));
    }
  } catch (error) {
    console.error("Error loading books:", error);
    if (!isLoadMore) {
      showMessage(booksListContainer, "error-message", appConfig.searchSection.fetchError);
    }
  } finally {
    pagination.isLoading = false;
  }
}

export function createBooks(books) {
  const fragment = document.createDocumentFragment();

  if (!books.length) {
    showMessage(fragment, "books__no-results", appConfig.searchSection.notFound);
    return fragment;
  }

  books.forEach((book) => {
    fragment.append(createBookCard(book));
  });

  return fragment;
}
