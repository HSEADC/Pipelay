export function initNavigationPlate(): void {
  const hosts = document.querySelectorAll<HTMLElement>("W_NavigationPlate");

  const items = [
    { key: "root", label: "Главная" },
    { key: "about", label: "Pipelay" },
    { key: "articles", label: "Статьи" },
    { key: "tests", label: "Тесты" },
  ] as const;

  hosts.forEach((host) => {
    const nav = document.createElement("nav");
    nav.className = "W_NavigationPlate";

    items.forEach((item) => {
      const el = document.createElement("M_NavigationItem");
      el.dataset.navKey = item.key;
      el.textContent = item.label;
      nav.appendChild(el);
    });

    host.replaceWith(nav);
  });

  const plates = document.querySelectorAll<HTMLElement>(".W_NavigationPlate");
  if (plates.length === 0) return;

  const url = new URL(window.location.href);
  const path = url.pathname.replace(/\/+$/, "");

  const isArticlesSection =
    path === "/articles" || path === "/article" || path.startsWith("/article/");
  const isTestsSection = path === "/tests" || path === "/test" || path.startsWith("/test/");

  const hrefByKey: Record<string, string> = {
    root: "/",
    about: "/about/",
    articles: "/articles/",
    tests: "/tests/",
  };

  plates.forEach((plate) => {
    plate.querySelectorAll<HTMLElement>("M_NavigationItem").forEach((item) => {
      const key = item.dataset.navKey;
      if (!key) return;

      const href = hrefByKey[key];
      if (!href) return;

      item.setAttribute("href", href);

      const normalizedHref = href.replace(/\/+$/, "");
      const exactMatch = normalizedHref === path;
      const sectionMatch =
        (key === "articles" && isArticlesSection) || (key === "tests" && isTestsSection);

      if (exactMatch || sectionMatch) {
        item.setAttribute("aria-current", "page");
      }
    });
  });
}