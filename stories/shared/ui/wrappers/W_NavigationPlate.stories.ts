import { initNavigationPlate, applyNavigationItems } from "@shared/ui";

export default {
  title: "shared/ui/wrappers/W_NavigationPlate",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";

    root.innerHTML = `
      <W_NavigationPlate></W_NavigationPlate>
    `;

    initNavigationPlate();
    applyNavigationItems();
    return root;
  },
};
