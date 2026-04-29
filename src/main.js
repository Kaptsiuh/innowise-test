import { createFooter } from "./components/Footer";
import { createHeader } from "./components/Header";
import { createMain } from "./components/Main";
import { clearSearchCache } from "./services/booksApi";
import { initTheme } from "./services/theme";
import "./styles/global.css";

initTheme();

function initApp() {
  const header = createHeader();
  const main = createMain();
  const footer = createFooter();

  document.body.append(header, main, footer);

  setInterval(clearSearchCache, 5 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", initApp);
