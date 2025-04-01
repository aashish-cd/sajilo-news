ALTER TABLE "sajilo-news_articles" DROP CONSTRAINT "sajilo-news_articles_category_sajilo-news_categories_name_fk";
--> statement-breakpoint
ALTER TABLE "sajilo-news_users" ADD COLUMN "category" varchar(255);--> statement-breakpoint
ALTER TABLE "sajilo-news_users" ADD CONSTRAINT "sajilo-news_users_category_sajilo-news_categories_id_fk" FOREIGN KEY ("category") REFERENCES "public"."sajilo-news_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sajilo-news_articles" DROP COLUMN "category";