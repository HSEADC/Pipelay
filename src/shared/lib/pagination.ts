export interface PaginationOptions<T> {
  listEl: Element;
  getItems: () => T[];
  pageSize: number;
  renderItem: (item: T) => string;
}

export interface PaginationInstance {
  destroy: () => void;
  reset: () => void;
}

export function createPagination<T>(options: PaginationOptions<T>): PaginationInstance {
  const { listEl, getItems, pageSize, renderItem } = options;

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  if (sentinel instanceof HTMLElement) {
    sentinel.style.minHeight = "1px";
  }
  listEl.appendChild(sentinel);

  let displayedCount = 0;

  const renderNextPage = (): void => {
    const items = getItems();
    const nextCount = Math.min(displayedCount + pageSize, items.length);
    const slice = items.slice(displayedCount, nextCount);
    const html = slice.map(renderItem).join("");
    if (html) {
      sentinel.insertAdjacentHTML("beforebegin", html);
    }
    displayedCount = nextCount;

    if (displayedCount >= items.length && sentinel instanceof HTMLElement) {
      sentinel.hidden = true;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      const items = getItems();
      if (!entry?.isIntersecting || displayedCount >= items.length) return;
      renderNextPage();
      if (displayedCount >= getItems().length && sentinel instanceof HTMLElement) {
        observer.unobserve(sentinel);
      }
    },
    { root: null, rootMargin: "160px 0px", threshold: 0 }
  );

  const reset = (): void => {
    displayedCount = 0;
    while (sentinel.previousElementSibling) {
      sentinel.previousElementSibling.remove();
    }
    if (sentinel instanceof HTMLElement) {
      sentinel.hidden = false;
    }
    renderNextPage();
    observer.observe(sentinel);
  };

  renderNextPage();
  observer.observe(sentinel);

  return {
    destroy: (): void => observer.unobserve(sentinel),
    reset,
  };
}
