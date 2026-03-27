import { applyIcons } from "@shared/ui/quarks";

export type IconButtonHandlers = Record<string, () => void>;

export function applyIconButtons(handlers: IconButtonHandlers): void {
  const hosts = document.querySelectorAll<HTMLElement>("A_IconButton");

  hosts.forEach((host) => {
    const iconName = host.dataset.icon;
    const handlerId = host.dataset.onClick;

    if (!handlerId) {
      return;
    }

    const handler = handlers[handlerId];
    if (!handler) {
      return;
    }

    const button = document.createElement("button");
    button.className = "A_IconButton";
    button.type = "button";
    button.dataset.iconButton = "true";

    const icon = document.createElement("Q_Icon");
    if (iconName) {
      icon.dataset.icon = iconName;
    }

    button.appendChild(icon);
    host.replaceWith(button);

    button.addEventListener("click", handler);
  });

  applyIcons();
}

