import { applyNavigationItems } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_NavigationItem",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "grid";
    root.style.gap = "12px";
    root.style.maxWidth = "420px";

    root.innerHTML = `
      <M_NavigationItem href="/">Главная</M_NavigationItem>
      <M_NavigationItem href="/about/">Pipelay</M_NavigationItem>
      <M_NavigationItem href="/articles/">Статьи</M_NavigationItem>
    `;

    applyNavigationItems();
    return root;
  },
};
