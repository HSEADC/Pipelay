import "../../index.css";
import {
  applyButtonProps,
  applyIcons,
  initHeaderControls,
  applyNavigationItems,
  initMobileNav,
  initNavigationPlate,
  applyFilterButtons,
} from "@shared/ui";

function initActionsTabs(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".C_AboutPageActionsFilterButtons .A_FilterButton");
  const howItWorksBlock = document.querySelector<HTMLElement>(".C_AboutPageActionsHowItWorks");
  const keyFeaturesBlock = document.querySelector<HTMLElement>(".W_AboutPageActionsKeyFeaturesBlock");
  const workflowsBlock = document.querySelector<HTMLElement>(".W_AboutPageActionsWorkflowsBlock");

  if (!buttons.length || !howItWorksBlock || !keyFeaturesBlock || !workflowsBlock) return;

  const blocksByKey: Record<string, HTMLElement> = {
    HowItWorks: howItWorksBlock,
    KeyFeatures: keyFeaturesBlock,
    Workflows: workflowsBlock,
  };

  buttons.forEach((btn, index) => {
    const key = btn.dataset.filterKey;
    if (!key) return;

    const block = blocksByKey[key];
    if (!block) return;

    if (index === 0) {
      btn.dataset.state = "";
      block.classList.remove("W_AboutPageActionsBlockHidden");
    } else {
      btn.dataset.state = "inactive";
      block.classList.add("W_AboutPageActionsBlockHidden");
    }

    btn.addEventListener("click", () => {
      const isInactive = btn.dataset.state === "inactive";
      if (isInactive) {
        btn.dataset.state = "";
        block.classList.remove("W_AboutPageActionsBlockHidden");
      } else {
        btn.dataset.state = "inactive";
        block.classList.add("W_AboutPageActionsBlockHidden");
      }
    });
  });
}

function bootstrap(): void {
  applyButtonProps();
  applyIcons();
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();
  applyFilterButtons();
  initActionsTabs();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
