import { applyIcons } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_Footer",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";

    root.innerHTML = `
      <footer class="M_Footer">
        <div class="M_FooterPerson">
          <Q_Icon data-icon="Chevron_Right_Duo" data-alt=""></Q_Icon>
          <span class="text-link">Толстова Мария</span>
        </div>
        <span class="text-link">Pipelay</span>
        <div class="M_FooterPerson">
          <Q_Icon data-icon="Chevron_Right_Duo" data-alt=""></Q_Icon>
          <span class="text-link">Комкова Анна</span>
        </div>
      </footer>
    `;

    document.body.appendChild(root);
    applyIcons();
    root.remove();
    return root;
  },
};
