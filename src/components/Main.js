import { loadBooks } from "./Books";
import { createSearch } from "./Search";

export function createMain() {
  const main = document.createElement("main");
  main.className = "main container";

  main.append(createSearch());

  loadBooks(main);

  return main;
}
