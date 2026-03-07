import { filterByQuery } from "@shared/lib";

interface Item {
  title: string;
  excerpt: string;
};

const ITEMS: Item[] = [
  { title: "Typography basics", excerpt: "Intro to type" },
  { title: "CSS architecture", excerpt: "Tokens and layers" },
  { title: "Hover media", excerpt: "Pointer and hover media queries" },
];

describe("filterByQuery", () => {
  it("возвращает все элементы, если запрос пустой или из пробелов", () => {
    expect(filterByQuery(ITEMS, "", (x) => x.title)).toEqual(ITEMS);
    expect(filterByQuery(ITEMS, "   ", (x) => x.title)).toEqual(ITEMS);
  });

  it("фильтрует элементы по подстроке без учета регистра", () => {
    const result = filterByQuery(ITEMS, "css", (x) => `${x.title} ${x.excerpt}`);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("CSS architecture");
  });

  it("возвращает пустой массив, если совпадений нет", () => {
    const result = filterByQuery(ITEMS, "webpack", (x) => `${x.title} ${x.excerpt}`);

    expect(result).toEqual([]);
  });

  it("обрезает пробелы в запросе", () => {
    const result = filterByQuery(ITEMS, "  typography  ", (x) => x.title);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Typography basics");
  });

  it("возвращает несколько совпадений по подстроке", () => {
    const result = filterByQuery(ITEMS, "e", (x) => `${x.title} ${x.excerpt}`);
    expect(result.length).toBeGreaterThan(1);
    expect(result.map((x) => x.title)).toContain("Typography basics");
    expect(result.map((x) => x.title)).toContain("Hover media");
  });
});

