import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { useAuth } from "@clerk/nextjs";

export const createTask = mutation({
    args: {
        title: v.string(),
        body: v.string(),
        author: v.string(),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        if (!args.author) {
            throw new Error("You must be logged in to create a task");
        }

        await ctx.db.insert("messages", {
            author: args.author,
            title: args.title,
            body: args.body,
            image: args.storageId,
            format: "image",
        });
    },
});

export const listTasksForUser = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("author"), userId))
            .collect();

        return Promise.all(
            messages.map(async (message) => {
                let url = undefined;
                if (message.format === "image" && message.image) {
                    try {
                        url = await ctx.storage.getUrl(message.image);
                    } catch (error) {
                        console.error("Error fetching image URL:", error);
                    }
                }

                return { ...message, url };
            })
        );
    },
});

export const listTasksForConvexId = query({
    args: { convexId: v.string() },
    handler: async (ctx, { convexId }) => {
        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("_id"), convexId))
            .collect();

        return Promise.all(
            messages.map(async (message) => {
                let url = undefined;
                if (message.format === "image" && message.image) {
                    try {
                        url = await ctx.storage.getUrl(message.image);
                    } catch (error) {
                        console.error("Error fetching image URL:", error);
                    }
                }

                return { ...message, url };
            })
        );
    },
});

export const listAllDocuments = query({
    args: {},
    handler: async (ctx) => {
        const messages = await ctx.db.query("messages").collect();
        return Promise.all(
            messages.map(async (message) => {
                let url = undefined;
                if (message.format === "image" && message.image) {
                    try {
                        url = await ctx.storage.getUrl(message.image);
                    } catch (error) {
                        console.error("Error fetching image URL:", error);
                    }
                }

                return { ...message, url };
            })
        );
    },
});

export const search = query({
    args: { query: v.string() },
    handler: async (ctx, { query }) => {
        return await ctx.db
            .query("messages")
            .withSearchIndex("search_body", (q) => q.search("body", query))
            .take(10);
    },
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});
