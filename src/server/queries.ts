import 'server-only'
import { db } from "./db"

export const getArticles = async () => {
    const articles = await db.query.articles.findMany({
        orderBy: (model, { desc }) => desc(model.createdAt)
    })
    return articles;
}

export const getRelatedArticles = async (slug: string) => {
    const articles = await db.query.articles.findMany({
        where: (model, { ilike }) => ilike(model.slug, slug),
        limit: 3,
    })
    return articles;
}

export const searchArticles = async (query: string) => {
    const articles = await db.query.articles.findMany({
        where: (model, { ilike }) => ilike(model.title, query),
    })
    return articles;
}

export const getArticleBySlug = async (slug: string) => {
    const article = await db.query.articles.findFirst({
        where: (model, { eq }) => eq(model.slug, slug)
    })
    return article;
}