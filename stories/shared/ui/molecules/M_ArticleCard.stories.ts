import { applyArticleCards, applyButtonProps, applyIcons } from "@shared/ui";

export default {
  title: "shared/ui/molecules/M_ArticleCard",
};

export const Default = {
  render: () => {
    const root = document.createElement("div");
    root.style.padding = "16px";
    root.style.display = "grid";
    root.style.gap = "16px";

    root.innerHTML = `
      <M_ArticleCard
        data-title="Базовая типографика"
        data-excerpt="Как сделать текст в интерфейсе читаемым."
        data-tag="Автоматизация"
        data-url="/articles/typography-basics/">
      </M_ArticleCard>
    `;

    applyArticleCards();
    applyButtonProps();
    applyIcons();
    return root;
  },
};
