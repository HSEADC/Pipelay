import { applyIcons } from "@shared/ui";

export function applyNavigationItems(): void {
  const hosts = document.querySelectorAll<HTMLElement>("M_NavigationItem");

  hosts.forEach((host) => {
    const link = document.createElement("a");
    link.className = "M_NavigationItem";

    for (const { name, value } of Array.from(host.attributes)) {
      if (name === "class") continue;
      link.setAttribute(name, value);
    }

    const icon = document.createElement("Q_Icon");
    icon.dataset.icon = "Chevron_Right";

    const label = document.createElement("span");
    label.className = "M_NavigationItemLabel text-link";
    label.innerHTML = host.innerHTML;

    link.appendChild(icon);
    link.appendChild(label);

    host.replaceWith(link);
  });

  applyIcons();
}