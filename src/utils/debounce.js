export function debounce(func, delay) {
  let timeoutId;
  let abortController = null;

  const debounced = function (...args) {
    clearTimeout(timeoutId);

    if (abortController) {
      abortController.abort();
    }

    timeoutId = setTimeout(() => {
      abortController = new AbortController();
      func.apply(this, [...args, abortController.signal]);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timeoutId);
    if (abortController) {
      abortController.abort();
    }
  };

  return debounced;
}
