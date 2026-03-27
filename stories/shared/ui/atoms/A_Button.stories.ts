import { applyButtonProps } from "@shared/ui";

export default {
  title: "shared/ui/atoms/A_Button",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "flex";
    root.style.gap = "12px";

    root.innerHTML = `
      <A_Button data-href="/articles/" data-label="К статьям"></A_Button>
      <A_Button href="/tests/">К тестам</A_Button>
    `;

    applyButtonProps();
    return root;
  },
};
