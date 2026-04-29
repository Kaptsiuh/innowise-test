import { DARK_THEME, THEME_KEY } from "../utils/constants";

export function initTheme() {
  const theme = loadTheme();
  if (theme === "dark") {
    document.body.classList.add(DARK_THEME);
  }
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}
