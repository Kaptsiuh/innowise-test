import "../styles/components/Search.css";
import { appConfig } from "../data/config";
import searchIcon from "./../assets/search.svg";
import { loadBooks } from "./Books";
import { createElement, showMessage } from "../utils/domUtils";
import { debounce } from "../utils/debounce";

export function createSearch() {
  const title = createElement("h2", "search__title", appConfig.searchSection.title);
  const description = createElement("p", "search__description", appConfig.searchSection.description);
  const form = createForm();
  const section = createElement("section", "search", title, description, form);
  return section;
}

function createForm() {
  const icon = createElement("img", "search__input-icon");
  icon.src = searchIcon;
  icon.alt = "Search";

  const input = createElement("input", "search__input");
  input.id = "search-input";
  input.type = "text";
  input.placeholder = appConfig.searchSection.inputPlaceholder;

  const debouncedSearch = debounce((query, signal) => {
    handleSearch(query, signal);
  }, 1000);

  input.addEventListener("input", (e) => {
    debouncedSearch(e.target.value.trim());
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      debouncedSearch.cancel();
      handleSearch(input.value.trim());
    }
  });

  const inputWrapper = createElement("div", "search__input-wrapper", icon, input);

  const button = createElement("button", "search__button", appConfig.searchSection.buttonText);
  button.addEventListener("click", () => {
    debouncedSearch.cancel();
    handleSearch(input.value.trim());
  });

  const form = createElement("div", "search__form", inputWrapper, button);
  return form;
}

async function handleSearch(searchQuery, signal = null) {
  const mainElement = document.querySelector(".main");

  if (!mainElement) {
    console.error("main element not found");
    return;
  }

  if (!searchQuery) {
    const booksSection = mainElement.querySelector(".books");
    if (!booksSection) {
      console.error("books section not found");
      return;
    }

    const booksContainer = booksSection.querySelector(".books-container");
    if (!booksContainer) {
      console.error("books container not found");
      return;
    }

    showMessage(booksContainer, "error-message", appConfig.searchSection.emptyQuery);
    return;
  }

  await loadBooks(mainElement, searchQuery, signal);
}
