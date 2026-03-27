export function applyButtonProps(): void {
  const hosts = document.querySelectorAll<HTMLElement>("A_Button");

  hosts.forEach((host) => {
    const href = host.dataset.href ?? host.getAttribute("href") ?? "#";
    const label = host.dataset.label ?? host.textContent?.trim() ?? "";

    const link = document.createElement("a");
    link.className = "A_Button text-button";
    link.href = href;

    if (host.id) {
      link.id = host.id;
    }

    if (label) {
      link.textContent = label;
    }

    host.replaceWith(link);
  });
}
