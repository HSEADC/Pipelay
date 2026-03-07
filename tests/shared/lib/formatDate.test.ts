import { formatDate } from "@shared/lib";

describe("formatDate", () => {
  it("возвращает пустую строку для невалидной даты", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("not-a-date")).toBe("");
  });

  it("форматирует ISO-дату в ru-RU формат", () => {
    const result = formatDate("2025-01-02T10:20:30.000Z");

    expect(result).toMatch(/02/);
    expect(result).toMatch(/2025/);
  });

  it("возвращает пустую строку для null/undefined-подобной строки", () => {
    expect(formatDate("invalid")).toBe("");
  });
});

