import "./index.css";
import { getArticleCards, type ArticleCard } from "@entities/Article";
import { filterByQuery, formatDate } from "@shared/lib";

const root = document.getElementById("articles-root");
const searchInput = document.getElementById(
  "articles-search",
) as HTMLInputElement | null;

if (root) {
  const allArticles = getArticleCards();

  const render = (items: ArticleCard[]): void => {
    root.innerHTML = items
      .map((article) => {
        const formattedDate = formatDate(article.publishedAt);

        return `
        <article class="article-card">
          <div class="article-card__meta">
            <span class="article-card__date">${formattedDate}</span>
            <span class="article-card__author">${article.author.name}</span>
          </div>
          <h2 class="article-card__title">${article.title}</h2>
          <p class="article-card__excerpt">${article.excerpt}</p>
        </article>
      `;
      })
      .join("");
  };

  render(allArticles);

  if (searchInput) {
    searchInput.addEventListener("input", (): void => {
      const query = searchInput.value;

      const filtered = filterByQuery<ArticleCard>(
        allArticles,
        query,
        (article) =>
          `${article.title} ${article.excerpt} ${article.author.name}`,
      );

      render(filtered);
    });
  }
}
