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
  apiTitle.append(appConfig.footer.api.title);
  apiTitle.className = "api__title";

  const apiLink = document.createElement("a");
  apiLink.append(appConfig.footer.api.link.title);
  apiLink.href = appConfig.footer.api.link.url;
  apiLink.className = "api__link";
  apiLink.target = "_blank";

  apiContainer.append(apiTitle, apiLink);

  const developerContainer = document.createElement("div");
  developerContainer.className = "developer";

  const developerTitle = document.createElement("h3");
  developerTitle.append(appConfig.footer.developer.title);
  developerTitle.className = "developer__title";

  const developerLink = document.createElement("a");
  developerLink.append(appConfig.footer.developer.link.title);
  developerLink.href = appConfig.footer.developer.link.url;
  developerLink.className = "developer__link";
  developerLink.target = "_blank";

  developerContainer.append(developerTitle, developerLink);

  container.append(apiContainer, developerContainer);

  footer.append(container);

  return footer;
}
