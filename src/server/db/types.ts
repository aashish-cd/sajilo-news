import { articles, users } from "./schema";

export type Article = typeof articles.$inferSelect;

export type User = typeof users.$inferSelect;