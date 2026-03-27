import { ICONS_BASE_PATH } from "@shared/config";
import { applyIcons } from "@shared/ui";

describe("applyIcons", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("заменяет Q_Icon на img с src по data-icon и alt по data-alt", () => {
    document.body.innerHTML = '<Q_Icon data-icon="Star" data-alt="star alt"></Q_Icon>';
    applyIcons();

    const img = document.querySelector("img.Q_Icon");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe(`${ICONS_BASE_PATH}/Star.svg`);
    expect(img?.getAttribute("alt")).toBe("star alt");
  });

  it("не меняет Q_Icon без data-icon", () => {
    document.body.innerHTML = "<Q_Icon></Q_Icon>";
    applyIcons();

    expect(document.querySelector("Q_Icon")).not.toBeNull();
    expect(document.querySelector("img.Q_Icon")).toBeNull();
  });
});
