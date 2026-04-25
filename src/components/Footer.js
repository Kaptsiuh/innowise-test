import "../styles/components/Footer.css";

import { appConfig } from "../data/config";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const container = document.createElement("div");
  container.className = "footer__container container";

  const apiContainer = document.createElement("div");
  apiContainer.className = "api";

  const apiTitle = document.createElement("h3");
  apiTitle.innerHTML = appConfig.footer.api.title;
  apiTitle.className = "api__title";

  const apiLink = document.createElement("a");
  apiLink.innerHTML = appConfig.footer.api.link.title;
  apiLink.href = appConfig.footer.api.link.url;
  apiLink.classList = "api__link";
  apiLink.target = "_blank";

  apiContainer.appendChild(apiTitle);
  apiContainer.appendChild(apiLink);

  const developerContainer = document.createElement("div");
  developerContainer.classList = "developer";

  const developerTitle = document.createElement("h3");
  developerTitle.innerHTML = appConfig.footer.developer.title;
  developerTitle.classList = "developer__title";

  const developerLink = document.createElement("a");
  developerLink.innerHTML = appConfig.footer.developer.link.title;
  developerLink.href = appConfig.footer.developer.link.url;
  developerLink.classList = "developer__link";
  developerLink.target = "_blank";

  developerContainer.appendChild(developerTitle);
  developerContainer.appendChild(developerLink);

  container.appendChild(apiContainer);
  container.appendChild(developerContainer);

  footer.appendChild(container);

  return footer;
}
