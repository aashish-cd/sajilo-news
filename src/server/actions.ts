'use server'

import 'server-only'

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from "./db";
import { articles } from './db/schema';

export async function createArticle(data: any) {
    const { userId } = await auth()

    if (!userId) {
        throw new Error("You must be logged in to create an article")
    }

    try {
        await db.insert(articles).values({
            title: data.title,
            content: data.content,
            excerpt: data.excerpt || null,
            coverImage: data.coverImage || null,
            published: data.published,
            featured: data.featured,
            category: data.category || null,
            author: data.author,
        })

        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Failed to create article:", error)
        throw new Error("Failed to create article")
    }
}

export async function deleteArticle(id: number) {
    const user = await auth()

    if (!user.userId) {
        throw new Error("You must be logged in to delete an article")
    }
    // @ts-ignore
    if (!user.sessionClaims?.metadata?.admin) {
        throw new Error("You must be an admin to delete an article")
    }

    try {
        await db.delete(articles).where(eq(articles.id, id))
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete article:", error)
        throw new Error("Failed to delete article")
    }
}