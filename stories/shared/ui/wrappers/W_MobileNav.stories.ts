import { applyIcons, applyNavigationItems, initMobileNav, initNavigationPlate } from "@shared/ui";

export default {
  title: "shared/ui/wrappers/W_MobileNav",
};

export const Default = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";

    root.innerHTML = `
      <div class="W_MobileNav">
        <div class="W_MobileNavTopBar effect-background-blur-primary">
          <div class="W_MobileNavBrand">
            <img src="/assets/icons/A_Logo.svg" alt="" class="M_LogoPlateImage">
            <span class="W_MobileNavBrandText text-p-1">Pipelay</span>
          </div>
          <button type="button" class="W_MobileNavBurger" id="MOBILE_NAV_BURGER" aria-expanded="false"
            aria-controls="MOBILE_NAV_OVERLAY" aria-label="Открыть меню">
            <Q_Icon data-icon="Q_BurgerIcon" data-alt=""></Q_Icon>
          </button>
        </div>
        <div class="W_MobileNavOverlay" id="MOBILE_NAV_OVERLAY" role="dialog" aria-modal="true"
          aria-hidden="true" hidden>
          <div class="W_MobileNavBackdrop" tabindex="-1"></div>
          <div class="W_MobileNavPanel effect-background-blur-primary">
            <W_NavigationPlate></W_NavigationPlate>
            <div class="O_SidebarCTAPlate">
              <img src="/assets/icons/Star.svg" alt="" class="O_SidebarCTAPlateImage">
              <span class="O_SidebarCTAPlateText text-p-1">Workflows to go</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(root);
    initNavigationPlate();
    applyNavigationItems();
    applyIcons();
    initMobileNav();
    root.remove();
    return root;
  },
};
