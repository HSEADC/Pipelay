import { getTestCards } from "@entities/Test/api/slice";

describe("getTestCards", () => {
  it("возвращает массив карточек тестов", () => {
    const result = getTestCards();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("каждая карточка содержит id, slug, title, tag", () => {
    const result = getTestCards();

    result.forEach((card) => {
      expect(card).toHaveProperty("id");
      expect(card).toHaveProperty("slug");
      expect(card).toHaveProperty("title");
      expect(card).toHaveProperty("tag");

      expect(typeof card.id).toBe("string");
      expect(card.id.length).toBeGreaterThan(0);

      expect(typeof card.slug).toBe("string");
      expect(card.slug.length).toBeGreaterThanOrEqual(1);
      expect(card.slug.length).toBeLessThanOrEqual(150);

      expect(typeof card.title).toBe("string");
      expect(card.title.length).toBeGreaterThanOrEqual(1);
      expect(card.title.length).toBeLessThanOrEqual(160);

      expect(Array.isArray(card.tag)).toBe(true);
      expect(card.tag.length).toBeGreaterThanOrEqual(1);
      expect(card.tag.length).toBeLessThanOrEqual(3);
    });
  });

  it("карточки могут содержать опциональное поле questions", () => {
    const result = getTestCards();

    result.forEach((card) => {
      if ("questions" in card && card.questions !== undefined) {
        expect(Array.isArray(card.questions)).toBe(true);
      }
    });
  });
});
