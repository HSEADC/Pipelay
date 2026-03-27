import { applyTestOptions } from "@shared/ui";

describe("applyTestOptions", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("заменяет A_TestOption на кнопку с буквой, текстом и aria-pressed", () => {
    document.body.innerHTML = `
      <A_TestOption data-option-id="x1" data-letter="A" data-label="Текст варианта" data-selected="true"></A_TestOption>
    `;
    applyTestOptions();

    const btn = document.querySelector("button.A_TestOption");
    expect(btn).not.toBeNull();
    expect(btn?.dataset.optionId).toBe("x1");
    expect(btn?.getAttribute("aria-pressed")).toBe("true");
    expect(btn?.classList.contains("A_TestOption_selected")).toBe(true);
    expect(btn?.querySelector(".A_TestOptionLetter")?.textContent).toBe("A");
    expect(btn?.querySelector(".A_TestOptionText")?.textContent).toBe("Текст варианта");
  });

  it("для невыбранного варианта aria-pressed false и без класса selected", () => {
    document.body.innerHTML = `
      <A_TestOption data-option-id="y" data-letter="B" data-label="Другой" data-selected="false"></A_TestOption>
    `;
    applyTestOptions();

    const btn = document.querySelector("button.A_TestOption");
    expect(btn?.getAttribute("aria-pressed")).toBe("false");
    expect(btn?.classList.contains("A_TestOption_selected")).toBe(false);
  });

  it("подставляет letter из optionId, если data-letter не задан", () => {
    document.body.innerHTML = `<A_TestOption data-option-id="q3" data-label="Без буквы" data-selected="false"></A_TestOption>`;
    applyTestOptions();

    expect(document.querySelector(".A_TestOptionLetter")?.textContent).toBe("q3.");
  });
});
