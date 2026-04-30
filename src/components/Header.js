import "../styles/components/Header.css";
import { appConfig } from "../data/config";
import bookIcon from "./../assets/book.svg";
import { createElement } from "../utils/domUtils";
import { loadTheme } from "../services/theme";
import { DARK_THEME, THEME_KEY } from "../utils/constants";

export function createHeader() {
  const link = createLogoLink();
  const logoDiv = createTitleSection();
  const logoWrapper = createElement("div", "logo-wrapper", link, logoDiv);

  const themeSwitch = createThemeSwitch();

  const container = createElement("div", "header__container container", logoWrapper, themeSwitch);
  const header = createElement("header", "header", container);
  return header;
}

function createLogoLink() {
  const homeImg = createElement("img");
  homeImg.src = bookIcon;
  homeImg.alt = "Home";

  const link = createElement("a", "logo-link", homeImg);
  link.href = "/";
  return link;
}

function createTitleSection() {
  const logoTitle = createElement("h1", "logo__title", appConfig.header.logo);
  const logoDescription = createElement("p", "logo__description", appConfig.header.description);
  const logoDiv = createElement("div", "logo", logoTitle, logoDescription);
  return logoDiv;
}

export function createThemeSwitch() {
  const checkbox = createElement("input", "theme-checkbox");
  const span = createElement("span", "theme-slider");

  checkbox.type = "checkbox";
  checkbox.id = "theme-toggle";
  checkbox.checked = loadTheme() === "dark";

  const label = createElement("label", "theme-label", span);
  label.htmlFor = "theme-toggle";

  const themeText = createElement("span", "theme-text", appConfig.header.themeText);

  const wrapper = createElement("div", "theme-wrapper", themeText, checkbox, label);

  checkbox.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    document.body.classList.toggle(DARK_THEME, e.target.checked);
    localStorage.setItem(THEME_KEY, theme);
  });

  return wrapper;
}
