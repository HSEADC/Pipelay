import articles from "../data/articles.json";
import { ArticleCardListSchema, type ArticleCardList } from "../model/types";

export const getArticleCards = (): ArticleCardList =>
  ArticleCardListSchema.parse(articles);
