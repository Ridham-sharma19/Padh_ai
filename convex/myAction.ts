"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import { action } from "./_generated/server";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(), 
    fileId: v.string() 
  },

  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in .env");
      }

      await ConvexVectorStore.fromTexts(
        args.splitText,
        args.splitText.map(() => ({ fileId: args.fileId })), 
        new GoogleGenerativeAIEmbeddings({
          apiKey, 
          model: "text-embedding-004", // 768 dimensions
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
      return 'completed'
    } catch (error) {
      console.error("Error in ingest action:", error);
      throw error;
    }
  },
});
