import { applyIcons, applyNavigationItems, initMobileNav, initNavigationPlate } from "@shared/ui";

function mountMobileNav(): HTMLElement {
  const root = document.createElement("div");
  root.innerHTML = `
    <div class="W_MobileNav">
      <div class="W_MobileNavTopBar">
        <button type="button" class="W_MobileNavBurger" aria-expanded="false" aria-label="Меню"></button>
      </div>
      <div class="W_MobileNavOverlay" hidden aria-hidden="true">
        <div class="W_MobileNavBackdrop" tabindex="-1"></div>
        <div class="W_MobileNavPanel">
          <W_NavigationPlate></W_NavigationPlate>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(root);
  initNavigationPlate();
  applyNavigationItems();
  applyIcons();
  initMobileNav();
  return root;
}

describe("initMobileNav", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("открывает оверлей по клику на бургер и закрывает по клику на backdrop", () => {
    const root = mountMobileNav();
    const burger = root.querySelector<HTMLButtonElement>(".W_MobileNavBurger");
    const overlay = root.querySelector<HTMLElement>(".W_MobileNavOverlay");
    const backdrop = root.querySelector<HTMLElement>(".W_MobileNavBackdrop");

    expect(overlay?.hasAttribute("hidden")).toBe(true);

    burger?.click();
    expect(overlay?.hasAttribute("hidden")).toBe(false);

    backdrop?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(overlay?.hasAttribute("hidden")).toBe(true);
  });
});
