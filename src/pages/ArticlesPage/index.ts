import "../../index.css";
import { getArticleCards, type ArticleCard } from "@entities/Article";
import { ARTICLE_TAG_LABELS } from "@shared/config";
import { createPagination, filterByQuery } from "@shared/lib";
import {
  applyButtonProps,
  applyFilterButtons,
  applyArticleCards,
  initHeaderControls,
  applyNavigationItems,
  initMobileNav,
  initNavigationPlate,
  applySearchInputPlaceholder,
  applyIcons,
} from "@shared/ui";

function bootstrap(): void {
  applySearchInputPlaceholder();
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();
  applyFilterButtons();

  const listEl = document.getElementById("articles-root");
  const searchInput = document.querySelector<HTMLInputElement>("[data-search-input]");
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(
    ".C_ArticlesPageArticlesFilterButtons .A_FilterButton",
  );

  if (!listEl) return;

  const allArticles = getArticleCards();
  let activeFilterKey: string | null = filterButtons[0]?.dataset.filterKey ?? null;
  let filteredArticles: ArticleCard[] = [];

  const { reset } = createPagination<ArticleCard>({
    listEl,
    getItems: () => filteredArticles,
    pageSize: 4,
    renderItem: (article: ArticleCard) => {
      const tagKey = article.tags?.[0] ?? "";
      const tagLabel = ARTICLE_TAG_LABELS[tagKey] ?? tagKey;
      return `
        <M_ArticleCard
          data-title="${article.title}"
          data-excerpt="${article.excerpt}"
          data-tag="${tagLabel}"
          data-url="/article/?id=${encodeURIComponent(article.id)}"
        ></M_ArticleCard>
      `;
    },
    onRendered: () => {
      applyArticleCards();
      applyButtonProps();
      applyIcons();
    },
  });

  const filterToTagKey: Record<string, string> = {
    ArticleProductivity: "Productivity",
    ArticleAutomation: "Automation",
    ArticlePractice: "Practice",
  };

  const applyAllFilters = (): void => {
    const tagKey = activeFilterKey ? filterToTagKey[activeFilterKey] ?? null : null;

    const byTag =
      tagKey != null
        ? allArticles.filter((article) => {
            const tags = article.tags;
            if (!tags) return false;
            return tags.indexOf(tagKey) !== -1;
          })
        : allArticles;

    const query = searchInput?.value ?? "";
    filteredArticles = query
      ? filterByQuery<ArticleCard>(byTag, query, (article) => `${article.title} ${article.excerpt}`)
      : byTag;

    reset();
  };

  const updateButtons = (): void => {
    filterButtons.forEach((btn) => {
      const key = btn.dataset.filterKey;
      if (!key) return;
      btn.dataset.state = activeFilterKey === key ? "" : "inactive";
    });
  };

  updateButtons();
  applyAllFilters();

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      applyAllFilters();
    });
  }

  filterButtons.forEach((btn) => {
    const key = btn.dataset.filterKey;
    if (!key) return;

    btn.addEventListener("click", () => {
      if (activeFilterKey === key) return;
      activeFilterKey = key;
      updateButtons();
      applyAllFilters();
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
