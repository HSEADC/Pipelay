import "../../index.css";
import "./index.css";
import { getArticleCards, type ArticleCard } from "@entities/Article";
import { createPagination, filterByQuery, formatDate } from "@shared/lib";

const listEl = document.querySelector("[data-articles-list]");
const searchInput = document.querySelector<HTMLInputElement>("[data-articles-search]");

if (listEl) {
  const allArticles = getArticleCards();
  let filteredArticles: ArticleCard[] = allArticles;

  const { reset } = createPagination<ArticleCard>({
    listEl,
    getItems: () => filteredArticles,
    pageSize: 10,
    renderItem: (article: ArticleCard) => {
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
    },
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value;
      filteredArticles = filterByQuery<ArticleCard>(
        allArticles,
        query,
        (article) => `${article.title} ${article.excerpt} ${article.author.name}`,
      );
      reset();
    });
  }
}
