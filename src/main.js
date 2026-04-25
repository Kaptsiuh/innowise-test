import { createFooter } from "./components/Footer";
import { createHeader } from "./components/Header";
import "./styles/global.css";

function initApp() {
  const header = createHeader();
  document.body.append(header);

  const footer = createFooter();
  document.body.append(footer);
}

document.addEventListener("DOMContentLoaded", initApp);
