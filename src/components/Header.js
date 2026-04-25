import "../styles/components/Header.css";
import { appConfig } from "../data/config";
import bookIcon from "./../assets/images/book.svg";

export function createHeader() {
  const header = document.createElement("header");
  header.className = "header";

  const container = document.createElement("div");
  container.className = "header__container container";

  const link = document.createElement("a");
  link.className = "logo-link";
  link.href = "/";

  const homeImg = document.createElement("img");
  homeImg.src = bookIcon;
  homeImg.alt = "Home";

  link.append(homeImg);

  const logoDiv = document.createElement("div");
  logoDiv.className = "logo";

  const logoTitle = document.createElement("h1");
  logoTitle.className = "logo__title";
  logoTitle.append(appConfig.header.logo);

  const logoDescription = document.createElement("spun");
  logoDescription.className = "logo__description";
  logoDescription.append(appConfig.header.description);

  logoDiv.append(logoTitle, logoDescription);

  container.append(link, logoDiv);

  header.append(container);

  return header;
}
