import "../styles/components/Header.css";
import { appConfig } from "../data/config";
import bookIcon from "./../assets/images/book.svg";
import { createElement } from "../utils/domUtils";

export function createHeader() {
  const link = createLogoLink();
  const logoDiv = createTitleSection();

  const container = createElement("div", "header__container container", link, logoDiv);
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
