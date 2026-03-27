export function applyFilterButtons(): void {
  const hosts = document.querySelectorAll<HTMLElement>("A_FilterButton");

  hosts.forEach((host) => {
    const label = host.textContent?.trim() ?? host.dataset.label ?? "";
    const key = host.dataset.filterKey ?? label.replace(/\s+/g, "");
    const inactive = host.dataset.inactive === "true" || host.hasAttribute("data-inactive");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "A_FilterButton text-button";

    if (label) {
      button.textContent = label;
    }

    if (key) {
      button.dataset.filterKey = key;
    }

    if (inactive) {
      button.dataset.state = "inactive";
    }

    host.replaceWith(button);
  });
}

