import { appConfig } from "../data/config";

export function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const container = document.createElement("div");
  container.className = "footer-container";

  const apiContainer = document.createElement("div");

  const apiTitle = document.createElement("h3");
  apiTitle.innerHTML = appConfig.footer.api.title;

  const apiLink = document.createElement("a");
  apiLink.innerHTML = appConfig.footer.api.link.title;
  apiLink.href = appConfig.footer.api.link.url;

  container.appendChild(apiContainer);
  apiContainer.appendChild(apiTitle);
  apiContainer.appendChild(apiLink);

  const developerContainer = document.createElement("div");

  const developerTitle = document.createElement("h3");
  developerTitle.innerHTML = appConfig.footer.developer.title;

  const developerLink = document.createElement("a");
  developerLink.innerHTML = appConfig.footer.developer.link.title;
  developerLink.href = appConfig.footer.developer.link.url;

  container.appendChild(developerContainer);
  developerContainer.appendChild(developerTitle);
  developerContainer.appendChild(developerLink);

  footer.appendChild(container);

  return footer;
}
