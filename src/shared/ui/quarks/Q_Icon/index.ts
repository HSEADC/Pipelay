import { ICONS_BASE_PATH } from "@shared/config";

export function applyIcons(): void {
  const hosts = document.querySelectorAll<HTMLElement>("Q_Icon");

  if (hosts.length === 0) {
    return;
  }

  const base = ICONS_BASE_PATH;

  hosts.forEach((host) => {
    const name = host.dataset.icon;
    if (!name) {
      return;
    }

    const src = `${base}/${name}.svg`;
    const alt = host.dataset.alt ?? "";

    const img = document.createElement("img");
    img.className = "Q_Icon";
    img.src = src;
    img.alt = alt;

    host.replaceWith(img);
  });
}

