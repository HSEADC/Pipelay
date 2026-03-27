import "./index.css";
import { getArticleCards, type ArticleCard } from "@entities/Article";
import { getTestCards, type TestCard } from "@entities/Test";
import { ARTICLE_TAG_LABELS } from "@shared/config";
import {
  applyButtonProps,
  applyFilterButtons,
  applyArticleCards,
  applyTestCards,
  applyIcons,
} from "@shared/ui";
import { initHeaderControls, applyNavigationItems } from "@shared/ui/molecules";
import { initMobileNav, initNavigationPlate } from "@shared/ui/wrappers";

function setupArticleFilters(allArticles: ArticleCard[]): void {
  const root = document.querySelector<HTMLElement>(".C_MainPageArticlesList");
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(
    ".C_MainPageArticlesFilterButtons .A_FilterButton",
  );

  if (!root || !filterButtons.length) return;

  const filterToTagKey: Record<string, string> = {
    ArticleProductivity: "Productivity",
    ArticleAutomation: "Automation",
    ArticlePractice: "Practice",
  };

  let activeFilterKey: string | null = filterButtons[0]?.dataset.filterKey ?? null;

  const renderCards = (filterKey: string | null): void => {
    const tagKey = filterKey ? filterToTagKey[filterKey] ?? null : null;

    const source =
      tagKey != null
        ? allArticles.filter((article) => {
            const tags = article.tags;
            if (!tags) return false;
            return tags.indexOf(tagKey) !== -1;
          })
        : allArticles;

    const items = source.slice(0, 2);

    root.innerHTML = items
      .map(
        (article) => `
        <M_ArticleCard
          data-title="${article.title}"
          data-excerpt="${article.excerpt}"
          data-tag="${ARTICLE_TAG_LABELS[article.tags?.[0] ?? ""] ?? ""}"
          data-url="/article/?id=${encodeURIComponent(article.id)}"
        ></M_ArticleCard>
      `,
      )
      .join("");

    applyArticleCards();
    applyButtonProps();
    applyFilterButtons();
    applyIcons();
  };

  const updateButtons = (): void => {
    filterButtons.forEach((btn) => {
      const key = btn.dataset.filterKey;
      if (!key) return;
      btn.dataset.state = activeFilterKey === key ? "" : "inactive";
    });
  };

  filterButtons.forEach((btn) => {
    const key = btn.dataset.filterKey;
    if (!key) return;

    btn.addEventListener("click", () => {
      if (activeFilterKey === key) return;
      activeFilterKey = key;
      updateButtons();
      renderCards(activeFilterKey);
    });
  });

  renderCards(activeFilterKey);
  updateButtons();
}

function setupTestFilters(allTests: TestCard[]): void {
  const root = document.querySelector<HTMLElement>(".C_MainPageTestsList");
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(
    ".C_MainPageTestsFilterButtons .A_FilterButton",
  );

  if (!root || !filterButtons.length) return;

  const filterToTagKey: Record<string, string> = {
    TestProductivity: "Productivity",
    TestAutomation: "Automation",
    TestPractice: "Practice",
  };

  let activeFilterKey: string | null = filterButtons[0]?.dataset.filterKey ?? null;

  const renderCards = (filterKey: string | null): void => {
    const tagKey = filterKey ? filterToTagKey[filterKey] ?? null : null;

    const source =
      tagKey != null
        ? allTests.filter((test) => {
            const tags = test.tag;
            if (!tags) return false;
            return tags.indexOf(tagKey) !== -1;
          })
        : allTests;

    const items = source.slice(0, 3);

    root.innerHTML = items
      .map(
        (test) => `
        <M_TestCard
          data-title="${test.title}"
          data-url="/test/?id=${encodeURIComponent(test.id)}"
        ></M_TestCard>
      `,
      )
      .join("");

    applyTestCards();
    applyButtonProps();
  };

  const updateButtons = (): void => {
    filterButtons.forEach((btn) => {
      const key = btn.dataset.filterKey;
      if (!key) return;
      btn.dataset.state = activeFilterKey === key ? "" : "inactive";
    });
  };

  filterButtons.forEach((btn) => {
    const key = btn.dataset.filterKey;
    if (!key) return;

    btn.addEventListener("click", () => {
      if (activeFilterKey === key) return;
      activeFilterKey = key;
      updateButtons();
      renderCards(activeFilterKey);
    });
  });

  renderCards(activeFilterKey);
  updateButtons();
}

function bootstrap(): void {
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();

  const allArticles = getArticleCards();
  const allTests = getTestCards();

  applyFilterButtons();
  setupArticleFilters(allArticles);
  setupTestFilters(allTests);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
