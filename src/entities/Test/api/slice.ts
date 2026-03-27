import tests from "../data/tests.json";
import { TestCardListSchema, type TestCardList } from "../model/types";

export const getTestCards = (): TestCardList => TestCardListSchema.parse(tests);

