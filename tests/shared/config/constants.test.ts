import { ARTICLE_TAG_LABELS, ICONS_BASE_PATH } from "@shared/config/constants";

describe("constants", () => {
  describe("ARTICLE_TAG_LABELS", () => {
    it("содержит маппинг тегов на русские подписи", () => {
      expect(ARTICLE_TAG_LABELS.Automation).toBe("Автоматизация");
      expect(ARTICLE_TAG_LABELS.Productivity).toBe("Продуктивность");
      expect(ARTICLE_TAG_LABELS.Practice).toBe("Практика");
    });

    it("содержит ожидаемые ключи", () => {
      expect(Object.keys(ARTICLE_TAG_LABELS)).toContain("Automation");
      expect(Object.keys(ARTICLE_TAG_LABELS)).toContain("Productivity");
      expect(Object.keys(ARTICLE_TAG_LABELS)).toContain("Practice");
    });
  });

  describe("ICONS_BASE_PATH", () => {
    it("указывает путь к иконкам", () => {
      expect(ICONS_BASE_PATH).toBe("https://hseadc.github.io/Pipelay/assets/icons");
    });
  });
});
