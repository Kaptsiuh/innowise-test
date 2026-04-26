import "../styles/components/Search.css";
import { appConfig } from "../data/config";
import searchIcon from "./../assets/images/search.svg";
import { loadBooks } from "./Books";

export function createSearch() {
  const section = document.createElement("section");
  section.className = "search";

  const title = document.createElement("h2");
  title.className = "search__title";
  title.append(appConfig.searchSection.title);

  const description = document.createElement("p");
  description.className = "search__description";
  description.append(appConfig.searchSection.description);

  const form = document.createElement("div");
  form.className = "search__form";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "search__input-wrapper";

  const icon = document.createElement("img");
  icon.src = searchIcon;
  icon.alt = "Search";
  icon.className = "search__input-icon";

  const input = document.createElement("input");
  input.className = "search__input";
  input.id = "search-input";
  input.type = "text";
  input.placeholder = appConfig.searchSection.inputPlaceholder;
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch(input.value.trim());
      input.value = "";
    }
  });

  const button = document.createElement("button");
  button.className = "search__button";
  button.append(appConfig.searchSection.buttonText);
  button.addEventListener("click", () => {
    handleSearch(input.value.trim());
    input.value = "";
  });

  inputWrapper.append(icon, input);
  form.append(inputWrapper, button);

  section.append(title, description, form);

  return section;
}

async function handleSearch(searchQuery) {
  const mainElement = document.querySelector(".main");

  if (!mainElement) return;

  await loadBooks(mainElement, searchQuery);
}
