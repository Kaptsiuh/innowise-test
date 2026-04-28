import "../styles/components/Search.css";
import { appConfig } from "../data/config";
import searchIcon from "./../assets/images/search.svg";
import { loadBooks } from "./Books";
import { createElement } from "../utils/domUtils";

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
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch(input.value.trim());
      input.value = "";
    }
  });

  const inputWrapper = createElement("div", "search__input-wrapper", icon, input);

  const button = createElement("button", "search__button", appConfig.searchSection.buttonText);
  button.addEventListener("click", () => {
    handleSearch(input.value.trim());
    input.value = "";
  });

  const form = createElement("div", "search__form", inputWrapper, button);
  return form;
}

async function handleSearch(searchQuery) {
  const mainElement = document.querySelector(".main");

  if (!mainElement) return;

  await loadBooks(mainElement, searchQuery);
}
