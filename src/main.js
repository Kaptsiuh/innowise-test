import { createHeader } from "./components/Header";
import "./styles/global.css";

function initApp() {
  const header = createHeader();
  document.body.append(header);
}

document.addEventListener("DOMContentLoaded", initApp);
