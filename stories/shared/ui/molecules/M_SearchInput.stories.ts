import { applySearchInputPlaceholder } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_SearchInput",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";

    root.innerHTML = `
      <main data-search-placeholder="Найти статью или тест">
        <input data-search-input />
      </main>
    `;

    applySearchInputPlaceholder();
    return root;
  },
};
