import { defineSchema, defineTable, SearchFilter } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    messages: defineTable({
        author: v.string(),
        title: v.string(),
        body: v.string(),
        image: v.optional(v.id("_storage")),
        format: v.optional(v.string()),
    }).searchIndex("search_body", {
        searchField: "body",
    }),
});
