import { applyTestCards, applyButtonProps } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_TestCard",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "grid";
    root.style.gap = "16px";

    root.innerHTML = `
      <M_TestCard
        data-title="Какой тип системы продуктивности подходит вам"
        data-url="/tests/test-1/">
      </M_TestCard>
    `;

    applyTestCards();
    applyButtonProps();
    return root;
  },
};
