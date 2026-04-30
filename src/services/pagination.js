export const pagination = {
  offset: 0,
  isLoading: false,
  hasMore: true,
  scrollHandler: null,
};

export function resetPagination() {
  pagination.offset = 0;
  pagination.isLoading = false;
  pagination.hasMore = true;

  if (pagination.scrollHandler) {
    window.removeEventListener("scroll", pagination.scrollHandler);
    pagination.scrollHandler = null;
  }
}

export function onScroll(callback) {
  if (pagination.scrollHandler) {
    window.removeEventListener("scroll", pagination.scrollHandler);
  }

  pagination.scrollHandler = () => {
    if (pagination.isLoading || !pagination.hasMore) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const bottomPosition = document.documentElement.scrollHeight;
    const distanceToBottom = bottomPosition - scrollPosition;

    if (distanceToBottom < window.innerHeight) {
      callback();
    }
  };

  window.addEventListener("scroll", pagination.scrollHandler);
}
