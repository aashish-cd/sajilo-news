// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sajilo-news_${name}`);

// Enums
export const roleEnum = pgEnum('role', ['EDITOR', 'ADMIN']);
export const notificationTypeEnum = pgEnum('notification_type', [
  'LIKE',
  'COMMENT',
  'FOLLOW',
  'MESSAGE',
  'SYSTEM'
]);

export const users = createTable("users", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  email: d.varchar("email", { length: 255 }).notNull().unique(),
  username: d.varchar("username", { length: 100 }).notNull().unique(),
  password: d.varchar("password", { length: 255 }).notNull(),
  firstName: d.varchar("first_name", { length: 100 }),
  lastName: d.varchar("last_name", { length: 100 }),
  bio: d.text("bio"),
  avatar: d.varchar("avatar", { length: 255 }),
  isVerified: d.boolean("is_verified").default(false).notNull(),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [index("email_idx").on(t.email), index("username_idx").on(t.username)]);

// Article Model
export const articles = createTable("articles", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  title: d.varchar("title", { length: 255 }).notNull(),
  slug: d.varchar("slug", { length: 255 }).notNull().unique(),
  content: d.text("content").notNull(),
  excerpt: d.text("excerpt"),
  coverImage: d.varchar("cover_image", { length: 255 }),
  published: d.boolean("published").default(false).notNull(),
  featured: d.boolean("featured").default(false).notNull(),
  viewCount: d.integer("view_count").default(0).notNull(),
  category: d.varchar("category", { length: 255 }).references(() => categories.id),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  authorId: d.integer("author_id").notNull().references(() => users.id),
}), (t) => [
  index("slug_idx").on(t.slug),
  index("author_id_idx").on(t.authorId)
]);

// Category Model
export const categories = createTable("categories", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: d.varchar("name", { length: 100 }).notNull().unique(),
  slug: d.varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("category_name_idx").on(t.name),
  index("category_slug_idx").on(t.slug),
]);

// Category-Article Junction
export const categoryArticles = createTable("category_articles", (d) => ({
  categoryId: d.integer("category_id").notNull().references(() => categories.id),
  articleId: d.integer("article_id").notNull().references(() => articles.id),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("ca_category_id_idx").on(t.categoryId),
  index("ca_article_id_idx").on(t.articleId)
]);

// Tag Model
export const tags = createTable("tags", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  name: d.varchar("name", { length: 100 }).notNull().unique(),
  slug: d.varchar("slug", { length: 100 }).notNull().unique(),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: d.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
}), (t) => [
  index("tag_name_idx").on(t.name),
  index("tag_slug_idx").on(t.slug)
]);

// Tag-Article Junction
export const tagArticles = createTable("tag_articles", (d) => ({
  tagId: d.integer("tag_id").notNull().references(() => tags.id),
  articleId: d.integer("article_id").notNull().references(() => articles.id),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("ta_tag_id_idx").on(t.tagId),
  index("ta_article_id_idx").on(t.articleId)
]);

// Comment Model
export const comments = createTable("comments", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  content: d.text("content").notNull(),
  articleId: d.integer("article_id").notNull().references(() => articles.id),
  authorId: d.integer("author_id").notNull().references(() => users.id),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("comment_article_id_idx").on(t.articleId),
  index("comment_author_id_idx").on(t.authorId),
]);


// Notification Model
export const notifications = createTable("notifications", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: d.integer("user_id").notNull().references(() => users.id),
  type: notificationTypeEnum("type").notNull(),
  message: d.varchar("message", { length: 255 }).notNull(),
  read: d.boolean("read").default(false).notNull(),
  link: d.varchar("link", { length: 255 }),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("notification_user_id_idx").on(t.userId)
]);

// Message Model
export const messages = createTable("messages", (d) => ({
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  content: d.text("content").notNull(),
  senderId: d.integer("sender_id").notNull().references(() => users.id),
  recipientId: d.integer("recipient_id").notNull().references(() => users.id),
  read: d.boolean("read").default(false).notNull(),
  createdAt: d.timestamp("created_at", { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}), (t) => [
  index("sender_id_idx").on(t.senderId),
  index("recipient_id_idx").on(t.recipientId)
]);