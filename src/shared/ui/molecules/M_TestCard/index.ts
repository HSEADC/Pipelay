export function applyTestCards(): void {
  const hosts = document.querySelectorAll<HTMLElement>("M_TestCard");

  hosts.forEach((host) => {
    const title = host.dataset.title ?? host.textContent?.trim() ?? "";
    const url = host.dataset.url ?? "#";

    const card = document.createElement("article");
    card.className = "M_TestCard effect-background-blur-primary";

    const content = document.createElement("div");
    content.className = "M_TestCardContent";

    const titleEl = document.createElement("p");
    titleEl.className = "M_TestCardTitle text-p-1";
    titleEl.textContent = title;

    content.appendChild(titleEl);

    const actions = document.createElement("div");
    actions.className = "M_TestCardActions";

    const button = document.createElement("A_Button");
    button.setAttribute("href", url);
    button.dataset.label = "Пройти тест";

    actions.appendChild(button);

    card.appendChild(content);
    card.appendChild(actions);

    host.replaceWith(card);
  });
}

