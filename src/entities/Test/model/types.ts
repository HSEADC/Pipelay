import { z } from "zod";

export const TestCardSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1).max(150),
    title: z.string().min(1).max(160),
    tag: z.array(z.string()).min(1).max(3),
    questions: z.array(z.unknown()).optional(),
  })
  .strict();

export const TestCardListSchema = z.array(TestCardSchema);

export type TestCard = z.infer<typeof TestCardSchema>;
export type TestCardList = z.infer<typeof TestCardListSchema>;

