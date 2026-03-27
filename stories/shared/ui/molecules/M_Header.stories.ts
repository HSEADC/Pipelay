import { initHeaderControls } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_Header",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "flex";
    root.style.gap = "12px";

    root.innerHTML = `
      <A_IconButton data-icon="Chevron_Left" data-on-click="goBack"></A_IconButton>
      <A_IconButton data-icon="Chevron_Right" data-on-click="goForward"></A_IconButton>
      <A_IconButton data-icon="Copy" data-on-click="copyLink"></A_IconButton>
    `;

    initHeaderControls();
    return root;
  },
};
