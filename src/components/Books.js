import "../styles/components/Books.css";
import { getBooks } from "../services/booksApi";
import { createBookCard } from "./Book";

export async function loadBooks(parentNode, searchQuery) {
  if (!parentNode) {
    console.error("parentNode is required for loadBooks");
    return;
  }

  let booksContainer = parentNode.querySelector(".books");

  if (!booksContainer) {
    booksContainer = document.createElement("div");
    booksContainer.className = "books";
    parentNode.append(booksContainer);
  }

  const loader = document.createElement("div");
  loader.className = "loading";
  booksContainer.innerHTML = "";
  booksContainer.append(loader);

  try {
    let books = await getBooks(searchQuery);

    if (!Array.isArray(books)) {
      books = [];
    }

    const transformedBooks = books.map((book) => ({
      title: book.title,
      authorName: book.author_name.at(0) || "Unknown author",
      firstPublishYear: book.first_publish_year || "Unknown year",
      coverId: book.cover_i,
    }));

    booksContainer.innerHTML = "";
    booksContainer.append(createBooks(transformedBooks));
  } catch (error) {
    console.error(`Error loading books: ${error}`);
    booksContainer.innerHTML = "";

    const errorMessage = document.createElement("div");
    errorMessage.className = "error-message";
    errorMessage.append("Failed to load books. Please try again.");
    booksContainer.append(errorMessage);
  }

  return booksContainer;
}

export function createBooks(books) {
  const container = document.createElement("div");
  container.className = "books-container";

  if (!books || books.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "books__no-results";
    noResults.append("No books found!");
    container.append(noResults);
    return container;
  }

  books.forEach((book) => {
    container.append(createBookCard(book));
  });

  return container;
}
