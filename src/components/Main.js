import "../styles/components/Main.css";
import { createElement } from "../utils/domUtils";
import { loadBooks } from "./Books";
import { createSearch } from "./Search";

export function createMain() {
  const main = createElement("main", "main container", createSearch());

  loadBooks(main);

  return main;
}
