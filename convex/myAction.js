// _generated/server.js or .ts
"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";


export const ingest = action({
  args: {
    splitText: v.array(v.string()), 
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in .env");
      }

    
      if (args.splitText.length === 0) {
        console.warn("Ingest action called with empty splitText array. Skipping embedding.");
        return 'no_text_to_ingest';
      }

     
      const metadatas = args.splitText.map(() => ({ fileId: args.fileId }));

      await ConvexVectorStore.fromTexts(
        args.splitText,
        metadatas,
        new GoogleGenerativeAIEmbeddings({
          apiKey: apiKey,
          model: "text-embedding-004", 
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title", 
        }),
        { ctx }
      );
      console.log(`Ingestion completed for fileId: ${args.fileId} with ${args.splitText.length} chunks.`);
      return 'completed';
    } catch (error) {
      console.error("Error in ingest action:", error);
      throw error; 
    }
  },
});


export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined in .env");
      }

      if (!args.query.trim()) {
        console.warn("Search action called with empty query. Skipping search.");
        return JSON.stringify([]); // Return empty array for empty queries
      }

      const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004", 
        taskType: TaskType.RETRIEVAL_QUERY, 
        
      });

      const vectorstore = new ConvexVectorStore(embeddings, { ctx });

      console.log(`Searching for query: "${args.query}" in fileId: "${args.fileId}"`);
   
      const results = await vectorstore.similaritySearch(args.query, 10); 

      console.log(`Found ${results.length} raw results. Filtering by fileId: ${args.fileId}`);

     
      const filteredResults = results.filter(q => {
       
        return q.metadata && typeof q.metadata === 'object' && q.metadata.fileId === args.fileId;
      });

      
      const topFilteredResults = filteredResults.slice(0, 5); 

      console.log("Filtered results (top 5):", topFilteredResults);
      return JSON.stringify(topFilteredResults);
    } catch (error) {
      console.error("Error in search action:", error);
      throw error;
    }
  },
});