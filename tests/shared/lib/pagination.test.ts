function MockIntersectionObserver(this: { observe: () => void; unobserve: () => void; disconnect: () => void }): void {
  const noop = (): void => {
    return;
  };
  this.observe = noop;
  this.unobserve = noop;
  this.disconnect = noop;
}

beforeAll(() => {
  (globalThis as typeof window).IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

import { createPagination, type PaginationInstance } from "@shared/lib";

const ITEMS = ["a", "b", "c", "d", "e"];
const pageSize = 2;

interface SetupResult {
  listEl: HTMLDivElement;
  setItems: (next: string[]) => void;
  instance: PaginationInstance;
}

function setup(): SetupResult {
  const listEl = document.createElement("div");
  let items = [...ITEMS];
  const getItems = (): string[] => items;
  const renderItem = (x: string): string => `<span data-item="${x}">${x}</span>`;

  const instance = createPagination({
    listEl,
    getItems,
    pageSize,
    renderItem,
  });

  return {
    listEl,
    setItems: (next: string[]) => {
      items = next;
    },
    instance,
  };
}

describe("createPagination", () => {
  it("возвращает destroy и reset", () => {
    const { instance } = setup();
    expect(instance).toHaveProperty("destroy");
    expect(instance).toHaveProperty("reset");
    expect(typeof instance.destroy).toBe("function");
    expect(typeof instance.reset).toBe("function");
  });

  it("рендерит первую порцию при инициализации", () => {
    const { listEl } = setup();
    const items = listEl.querySelectorAll("[data-item]");
    expect(items).toHaveLength(pageSize);
    expect(items[0].textContent).toBe("a");
    expect(items[1].textContent).toBe("b");
  });

  it("после reset отображает снова первую порцию от getItems()", () => {
    const { listEl, setItems, instance } = setup();
    setItems(["x", "y", "z"]);
    instance.reset();
    const items = listEl.querySelectorAll("[data-item]");
    expect(items).toHaveLength(pageSize);
    expect(items[0].textContent).toBe("x");
    expect(items[1].textContent).toBe("y");
  });

  it("после reset старые узлы удалены", () => {
    const { listEl, setItems, instance } = setup();
    expect(listEl.querySelectorAll("[data-item]")).toHaveLength(pageSize);
    setItems(["only"]);
    instance.reset();
    expect(listEl.querySelectorAll("[data-item]")).toHaveLength(1);
    expect(listEl.querySelector("[data-item]")?.textContent).toBe("only");
  });

  it("destroy не падает при вызове", () => {
    const { instance } = setup();
    expect(() => instance.destroy()).not.toThrow();
  });
});
