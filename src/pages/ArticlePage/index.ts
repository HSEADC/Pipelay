import "../../index.css";
import { getArticleCards, type ArticleCard } from "@entities/Article";
import { ARTICLE_TAG_LABELS } from "@shared/config";
import {
  applyButtonProps,
  applyIcons,
  initHeaderControls,
  applyNavigationItems,
  initMobileNav,
  initNavigationPlate,
} from "@shared/ui";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const inlineMarkdown = (line: string): string => {
  const escaped = escapeHtml(line);
  const withBold = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  return withBold.replace(/\*(.+?)\*/g, "<em>$1</em>");
};

const markdownToHtml = (markdown: string): string => {
  const lines = markdown.split(/\r?\n/);
  const chunks: string[] = [];
  let inList = false;

  const closeList = (): void => {
    if (inList) {
      chunks.push("</ul>");
      inList = false;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      return;
    }

    if (line.startsWith("## ")) {
      closeList();
      chunks.push(`<h2 class="text-h2">${inlineMarkdown(line.slice(3))}</h2>`);
      return;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        chunks.push('<ul class="text-p-1">');
        inList = true;
      }
      chunks.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      return;
    }

    closeList();
    chunks.push(`<p class="text-p-1">${inlineMarkdown(line)}</p>`);
  });

  closeList();
  return chunks.join("");
};

const renderArticle = (article: ArticleCard): string => {
  const tagKey = article.tags?.[0] ?? "";
  const tagLabel = ARTICLE_TAG_LABELS[tagKey] ?? tagKey;
  const contentHtml = article.contentMarkdown
    ? markdownToHtml(article.contentMarkdown)
    : `<p class="text-p-1">${escapeHtml(article.excerpt)}</p>`;

  return `
    <section class="ArticlePageContent">
      <header class="ArticlePageHero">
        <h1 class="text-h1">${escapeHtml(article.title)}</h1>
        <p class="text-h4">${escapeHtml(article.excerpt)}</p>
        <div class="ArticlePageTag text-label">${escapeHtml(tagLabel)}</div>
      </header>
      <article class="ArticlePageBody effect-background-blur-primary">
        ${contentHtml}
      </article>
      <div class="ArticlePageLinkItem">
        <span class="text-label">Вернуться к статьям</span>
        <a href="/articles">
          <Q_Icon data-icon="Arrow_Circle_Right" data-alt="Arrow_Circle_Right"></Q_Icon>
        </a>
      </div>
    </section>
  `;
};

function bootstrap(): void {
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();

  const root = document.getElementById("articles-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const article = getArticleCards().find((item) => item.id === id) ?? getArticleCards()[0];

  if (!article) {
    root.innerHTML = `<p class="text-p-1">Статья не найдена.</p>`;
    return;
  }

  root.innerHTML = renderArticle(article);
  applyIcons();
  applyButtonProps();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
