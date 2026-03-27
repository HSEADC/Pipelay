import "../../index.css";
import { getTestCards, type TestCard } from "@entities/Test";
import { createPagination } from "@shared/lib";
import {
  applyButtonProps,
  applyFilterButtons,
  applyTestCards,
  initHeaderControls,
  applyNavigationItems,
  initMobileNav,
  initNavigationPlate,
  applySearchInputPlaceholder,
} from "@shared/ui";

function bootstrap(): void {
  applySearchInputPlaceholder();
  initNavigationPlate();
  initHeaderControls();
  applyNavigationItems();
  initMobileNav();
  applyFilterButtons();

  const root = document.getElementById("tests-root");
  const filterButtons = document.querySelectorAll<HTMLButtonElement>(
    ".C_TestsPageTestsFilterButtons .A_FilterButton",
  );

  if (!root || !filterButtons.length) return;

  const allTests = getTestCards();
  const filterToTagKey: Record<string, string> = {
    TestProductivity: "Productivity",
    TestAutomation: "Automation",
    TestPractice: "Practice",
  };

  let activeFilterKey: string | null = filterButtons[0]?.dataset.filterKey ?? null;
  let filteredTests: TestCard[] = [];

  const { reset } = createPagination<TestCard>({
    listEl: root,
    getItems: () => filteredTests,
    pageSize: 9,
    renderItem: (test) => `
        <M_TestCard
          data-title="${test.title}"
          data-url="/test/?id=${encodeURIComponent(test.id)}"
        ></M_TestCard>
      `,
    onRendered: () => {
      applyTestCards();
      applyButtonProps();
    },
  });

  const renderCards = (filterKey: string | null): void => {
    const tagKey = filterKey ? filterToTagKey[filterKey] ?? null : null;

    filteredTests =
      tagKey != null
        ? allTests.filter((test: TestCard) => {
            const tags = test.tag;
            if (!tags) return false;
            return tags.indexOf(tagKey) !== -1;
          })
        : allTests;

    reset();
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

  updateButtons();
  renderCards(activeFilterKey);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
