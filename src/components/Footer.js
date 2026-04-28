import "../styles/components/Footer.css";

import { appConfig } from "../data/config";
import { createElement } from "../utils/domUtils";

export function createFooter() {
  const apiContainer = createApiSection();
  const developerContainer = createDeveloperSection();

  const container = createElement("div", "footer__container container", apiContainer, developerContainer);
  const footer = createElement("footer", "footer", container);
  return footer;
}

function createApiSection() {
  const apiTitle = createElement("h3", "api__title", appConfig.footer.api.title);

  const apiLink = createElement("a", "api__link", appConfig.footer.api.link.title);
  apiLink.href = appConfig.footer.api.link.url;
  apiLink.target = "_blank";

  const apiContainer = createElement("div", "api", apiTitle, apiLink);
  return apiContainer;
}

function createDeveloperSection() {
  const developerTitle = createElement("h3", "developer__title", appConfig.footer.developer.title);

  const developerLink = createElement("a", "developer__link", appConfig.footer.developer.link.title);
  developerLink.href = appConfig.footer.developer.link.url;
  developerLink.target = "_blank";

  const developerContainer = createElement("div", "developer", developerTitle, developerLink);
  return developerContainer;
}
