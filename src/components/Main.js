import { createSearch } from "./Search";

export function createMain() {
  const main = document.createElement("main");
  main.className = "main container";

  const searchSection = createSearch();

  main.append(searchSection);

  return main;
}
