import { applyIconButtons } from "@shared/ui";

export default {
  title: "shared/ui/atoms/A_IconButton",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "flex";
    root.style.gap = "12px";

    root.innerHTML = `
      <A_IconButton data-icon="Chevron_Left" data-on-click="goBack"></A_IconButton>
      <A_IconButton data-icon="Refresh_Cw" data-on-click="reloadPage"></A_IconButton>
    `;

    applyIconButtons({
      goBack: () => undefined,
      reloadPage: () => undefined,
    });

    return root;
  },
};
