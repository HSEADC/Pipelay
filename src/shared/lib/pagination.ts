export interface PaginationOptions<T> {
  listEl: Element;
  getItems: () => T[];
  pageSize: number;
  renderItem: (item: T) => string;
  onRendered?: () => void;
}

export interface PaginationInstance {
  destroy: () => void;
  reset: () => void;
}

export function createPagination<T>(options: PaginationOptions<T>): PaginationInstance {
  const { listEl, getItems, pageSize, renderItem, onRendered } = options;

  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  if (sentinel instanceof HTMLElement) {
    sentinel.style.minHeight = "1px";
  }
  listEl.appendChild(sentinel);

  let displayedCount = 0;

  const hasMoreItems = (): boolean => displayedCount < getItems().length;

  const renderNextPage = (): void => {
    const items = getItems();
    const nextCount = Math.min(displayedCount + pageSize, items.length);
    const slice = items.slice(displayedCount, nextCount);
    const html = slice.map(renderItem).join("");
    if (html) {
      sentinel.insertAdjacentHTML("beforebegin", html);
      onRendered?.();
    }
    displayedCount = nextCount;

    if (displayedCount >= items.length && sentinel instanceof HTMLElement) {
      sentinel.hidden = true;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry?.isIntersecting || !hasMoreItems()) return;
      renderNextPage();
      if (!hasMoreItems() && sentinel instanceof HTMLElement) {
        observer.unobserve(sentinel);
      }
    },
    { root: null, rootMargin: "160px 0px", threshold: 0 }
  );

  const handleViewportChange = (): void => {
    if (!hasMoreItems() || !(sentinel instanceof HTMLElement) || sentinel.hidden) return;
    const rect = sentinel.getBoundingClientRect();
    const viewportBottom = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top <= viewportBottom + 160) {
      renderNextPage();
      if (!hasMoreItems()) {
        observer.unobserve(sentinel);
      }
    }
  };

  window.addEventListener("scroll", handleViewportChange, { passive: true });
  window.addEventListener("resize", handleViewportChange);

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
    destroy: (): void => {
      observer.unobserve(sentinel);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    },
    reset,
  };
}
