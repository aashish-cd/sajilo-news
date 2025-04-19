// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sajilo-news_${name}`);

// Article Model
export const articles = createTable("articles", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar("title", { length: 255 }).notNull(),
  content: d.text("content").notNull(),
  excerpt: d.text("excerpt"),
  coverImage: d.varchar("cover_image", { length: 255 }),
  published: d.boolean("published").default(false).notNull(),
  featured: d.boolean("featured").default(false).notNull(),
  viewCount: d.integer("view_count").default(0).notNull(),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  author: d.varchar("author", { length: 255 }).notNull(),
  category: d.varchar("category", { length: 255 }),
}));

