import { getArticleCards } from "@entities/Article/api/slice";

describe("getArticleCards", () => {
  it("возвращает массив карточек статей", () => {
    const result = getArticleCards();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("каждая карточка содержит id, slug, title, excerpt, tags", () => {
    const result = getArticleCards();

    result.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("slug");
      expect(card).toHaveProperty("title");
      expect(card).toHaveProperty("excerpt");
      expect(card).toHaveProperty("tags");

      expect(typeof card.id).toBe("string");
      expect(card.id.length).toBeGreaterThan(0);

      expect(typeof card.slug).toBe("string");
      expect(card.slug.length).toBeGreaterThanOrEqual(1);
      expect(card.slug.length).toBeLessThanOrEqual(150);

      expect(typeof card.title).toBe("string");
      expect(card.title.length).toBeGreaterThanOrEqual(3);
      expect(card.title.length).toBeLessThanOrEqual(120);

      expect(typeof card.excerpt).toBe("string");
      expect(card.excerpt.length).toBeGreaterThanOrEqual(10);
      expect(card.excerpt.length).toBeLessThanOrEqual(280);

      expect(Array.isArray(card.tags)).toBe(true);
      expect(card.tags.length).toBeGreaterThanOrEqual(1);
      expect(card.tags.length).toBeLessThanOrEqual(3);
    });
  });
});
