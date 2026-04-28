export function createElement(tag, className, ...children) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  element.append(...children);
  return element;
}

export function showLoader(container) {
  const loader = createElement("div", "loading");
  container.innerHTML = "";
  container.append(loader);
}

export function showMessage(container, className, message) {
  const errorMessage = createElement("div", className, message);
  container.innerHTML = "";
  container.append(errorMessage);
}
