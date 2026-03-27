export function applyArticleCards(): void {
  const hosts = document.querySelectorAll<HTMLElement>("M_ArticleCard");

  hosts.forEach((host) => {
    const title = host.dataset.title ?? "";
    const excerpt = host.dataset.excerpt ?? "";
    const tag = host.dataset.tag ?? "";
    const url = host.dataset.url ?? "#";

    const card = document.createElement("article");
    card.className = "M_ArticleCard effect-background-blur-primary";

    const content = document.createElement("div");
    content.className = "M_ArticleCardContent";

    const textBlock = document.createElement("div");
    textBlock.className = "M_ArticleCardTextBlock";

    const titleEl = document.createElement("p");
    titleEl.className = "M_ArticleCardTitle text-p-1";
    titleEl.textContent = title;

    const excerptEl = document.createElement("p");
    excerptEl.className = "M_ArticleCardExcerpt text-link";
    excerptEl.textContent = excerpt;

    textBlock.appendChild(titleEl);
    textBlock.appendChild(excerptEl);

    const illustration = document.createElement("div");
    illustration.className = "M_ArticleCardIllustration";

    const img = document.createElement("img");
    img.src = "/assets/icons/A_IconWorkflowGlow.svg";
    img.alt = "Workflow";
    img.className = "M_ArticleCardIllustrationImage";

    illustration.appendChild(img);

    content.appendChild(textBlock);
    content.appendChild(illustration);

    const actions = document.createElement("div");
    actions.className = "M_ArticleCardActions";

    const readMore = document.createElement("A_Button");
    readMore.setAttribute("href", url);
    readMore.dataset.label = "Читать больше";
    actions.appendChild(readMore);

    const tagWrapper = document.createElement("div");
    tagWrapper.className = "M_ArticleCardTag";

    const tagIcon = document.createElement("Q_Icon");
    tagIcon.dataset.icon = "Triangle";
    tagIcon.dataset.alt = "Triangle";

    const tagText = document.createElement("span");
    tagText.className = "text-label";
    tagText.textContent = tag;

    tagWrapper.appendChild(tagIcon);
    tagWrapper.appendChild(tagText);

    actions.appendChild(tagWrapper);

    card.appendChild(content);
    card.appendChild(actions);

    host.replaceWith(card);
  });
}

