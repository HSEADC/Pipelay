import { applyIcons } from "@shared/ui";

export default {
  title: "shared/ui/quarks/Q_Icon",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "flex";
    root.style.gap = "12px";
    root.style.alignItems = "center";

    root.innerHTML = `
      <Q_Icon data-icon="Triangle" data-alt="Triangle"></Q_Icon>
      <Q_Icon data-icon="Chevron_Right" data-alt="Chevron"></Q_Icon>
    `;

    applyIcons();
    return root;
  },
};
