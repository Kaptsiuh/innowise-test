import { createFooter } from "./components/Footer";
import { createHeader } from "./components/Header";
import { createMain } from "./components/Main";
import "./styles/global.css";

function initApp() {
  const header = createHeader();
  document.body.append(header);

  const main = createMain();
  document.body.append(main);

  const footer = createFooter();
  document.body.append(footer);
}

document.addEventListener("DOMContentLoaded", initApp);
