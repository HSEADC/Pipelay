import { applyFilterButtons } from "@shared/ui";

export default {
  title: "shared/ui/atoms/A_FilterButton",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "flex";
    root.style.gap = "12px";

    root.innerHTML = `
      <A_FilterButton data-filter-key="all">Все</A_FilterButton>
      <A_FilterButton data-filter-key="automation">Автоматизация</A_FilterButton>
      <A_FilterButton data-filter-key="practice" data-inactive="true">Практика</A_FilterButton>
    `;

    applyFilterButtons();
    return root;
  },
};
