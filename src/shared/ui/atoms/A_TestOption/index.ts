export function applyTestOptions(): void {
  const hosts = document.querySelectorAll<HTMLElement>("A_TestOption");

  hosts.forEach((host) => {
    const optionId = host.dataset.optionId ?? "";
    const selected = host.dataset.selected === "true";
    const letter =
      host.dataset.letter ?? (optionId ? `${optionId}.` : "");
    const label = host.dataset.label ?? host.textContent?.trim() ?? "";

    const button = document.createElement("button");
    button.type = "button";
    button.className = `A_TestOption text-p-1${selected ? " A_TestOption_selected" : ""}`;
    button.dataset.optionId = optionId;
    button.setAttribute("aria-pressed", selected ? "true" : "false");

    const letterEl = document.createElement("span");
    letterEl.className = "A_TestOptionLetter";
    letterEl.textContent = letter;

    const textEl = document.createElement("span");
    textEl.className = "A_TestOptionText";
    textEl.textContent = label;

    button.appendChild(letterEl);
    button.appendChild(textEl);

    host.replaceWith(button);
  });
}
