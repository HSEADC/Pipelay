import { z } from "zod";

export const AuthorSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(2).max(80),
    avatarUrl: z.string().optional(),
  })
  .strict();

export const ArticleCardSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1).max(150),
    title: z.string().min(3).max(120),
    excerpt: z.string().min(10).max(280),
    coverImageUrl: z.string().optional(),
    publishedAt: z.iso.datetime(),
    author: AuthorSchema,
  })
  .strict();

export const ArticleCardListSchema = z.array(ArticleCardSchema);

export type Author = z.infer<typeof AuthorSchema>;
export type ArticleCard = z.infer<typeof ArticleCardSchema>;
export type ArticleCardList = z.infer<typeof ArticleCardListSchema>;

