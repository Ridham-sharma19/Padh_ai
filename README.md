



PadhAI — AI-Powered PDF Study Workspace
PadhAI is a full-stack AI study workspace built with Next.js, Convex, Clerk, Google Gemini, LangChain, and Tiptap.

The application lets users upload PDF documents, store them in Convex, open a dedicated workspace for each document, read the PDF alongside an interactive notes editor, and use an AI/RAG workflow to work with information from the uploaded document.

🚀 Live Demo
Live Application: https://padh-ai-ebem.vercel.app/

✨ Features
🔐 Authentication with Clerk

User sign-up/sign-in

Protected dashboard routes

Clerk user information synchronized with Convex

📄 PDF Upload

Upload PDF files to Convex Storage

Store PDF metadata in the Convex database

Generate and retrieve storage URLs

Associate uploaded files with the logged-in user

🗂️ Personal Workspace

Dashboard showing the user's uploaded PDFs

Each PDF gets its own dynamic workspace

Open a document using its unique fileId

📖 Integrated PDF Viewer

View the uploaded PDF directly inside the workspace

PDF viewer and notes editor are displayed side-by-side

📝 Rich Text Notes

Tiptap-based editor

StarterKit support

Highlight support

Placeholder support

Notes can be persisted and retrieved through Convex

🤖 AI-Powered Document Interaction

Google Gemini integration

LangChain Google GenAI integration

Document text can be processed for AI/RAG workflows

Vector embeddings are stored in Convex for similarity search

🔎 Vector Search / RAG

Document chunks are represented as embeddings

Convex provides a vector index

Retrieved document context can be used by the AI workflow

⚡ Real-Time Backend

Convex queries and mutations

Reactive data updates

Persistent document and note data without building a separate REST backend

🎨 Modern UI

Next.js App Router

Tailwind CSS

shadcn/ui components

Lucide icons

Motion/animation support

Sonner notifications

🧠 How PadhAI Works
The main idea is to convert a static PDF into an interactive study workspace.

                    ┌─────────────────┐
                    │   User Signs In │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Upload PDF      │
                    └────────┬────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Convex Storage       │
                 │ Store PDF             │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Extract / Process     │
                 │ Document Text         │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Split into Chunks     │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Generate Embeddings   │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Convex Vector Index   │
                 └───────────┬───────────┘
                             │
                  User asks a question
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Similarity Retrieval  │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Relevant Context      │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ Gemini                │
                 │ Generate Answer       │
                 └───────────┬───────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │ User's Workspace      │
                 └───────────────────────┘
Why RAG?
Sending an entire PDF to an LLM for every question is inefficient and can exceed the model's useful context.

PadhAI instead follows a retrieval-based approach:

Extract text from the PDF.

Split the text into smaller chunks.

Convert chunks into vector embeddings.

Store embeddings in Convex.

Search for chunks relevant to the user's query.

Give the retrieved context to Gemini.

Generate an answer based on the relevant document content.

This makes the AI workflow more focused on the uploaded study material.

🏗️ Architecture
┌───────────────────────────────────────────────┐
│                   Next.js                    │
│                                               │
│  Landing Page → Auth → Dashboard → Workspace │
│                              │                │
│              ┌───────────────┴────────────┐   │
│              │                            │   │
│         PDF Viewer                  Tiptap    │
│                                      Editor   │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
              ┌──────────────────┐
              │     Convex       │
              │                  │
              │ Database         │
              │ File Storage     │
              │ Queries          │
              │ Mutations        │
              │ Vector Search    │
              └────────┬─────────┘
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
       Document Data        Vector Data
             │                   │
             └─────────┬─────────┘
                       ▼
                 AI / RAG Layer
                       │
                       ▼
              Google Gemini Model
🛠️ Tech Stack
Frontend
Next.js

React

TypeScript

Tailwind CSS

shadcn/ui

Tiptap

Lucide / Lucide React

Motion

Sonner

Backend / Data
Convex

Database

File storage

Queries

Mutations

Vector index

Authentication
Clerk

AI
Google Generative AI

Gemini 1.5 Flash

LangChain

@langchain/google-genai

@langchain/core

@langchain/community

Document Processing
pdf-parse

Utilities
Axios

UUID

Next Themes

Radix UI

📂 Project Structure
Padh_ai/
│
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── workspace/
│   │   ├── [fileId]/
│   │   │   └── page.tsx
│   │   │
│   │   └── _component/
│   │       ├── Header.tsx
│   │       ├── PdfViewer.tsx
│   │       ├── TextEditor.tsx
│   │       └── ...
│   │
│   ├── page.tsx
│   └── ...
│
├── components/
│   └── ui/
│       └── ...
│
├── config/
│   └── AiModel.ts
│
├── convex/
│   ├── schema.ts
│   ├── user.ts
│   ├── fileStorage.ts
│   ├── notes.ts
│   └── ...
│
├── lib/
│   └── ...
│
├── public/
│   └── ...
│
├── middleware.ts
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
🔐 Authentication Flow
PadhAI uses Clerk for authentication.

The application protects the dashboard using Clerk middleware:

User
  │
  ▼
Sign In / Sign Up
  │
  ▼
Clerk Authentication
  │
  ▼
Protected Dashboard
After authentication, the application reads the user's primary email and name and creates/checks the corresponding user record in Convex.

The Convex users table contains:

users
├── email
└── username
📄 PDF Upload Flow
The upload process uses Convex Storage.

Select PDF
   │
   ▼
Request Convex Upload URL
   │
   ▼
Upload PDF to Convex Storage
   │
   ▼
Get Storage ID / URL
   │
   ▼
Create PDF database record
   │
   ▼
Display PDF on Dashboard
Each PDF record contains information such as:

pdfFiles
├── fileId
├── storageId
├── fileName
├── fileUrl
└── createdBy
This allows the application to associate every uploaded document with its owner.

🗃️ Convex Database
The current Convex schema contains four important collections.

Users
users
├── email
└── username
PDF Files
pdfFiles
├── fileId
├── storageId
├── fileName
├── fileUrl
└── createdBy
Documents
documents
├── embedding
├── text
└── metadata
The documents table also contains a vector index:

byEmbedding
with:

vectorField: embedding
dimensions: 768
Notes
notes
├── fileId
├── notes
└── createdBy
Notes are associated with a specific PDF through fileId.

📝 Notes Persistence
The editor content can be stored in Convex.

The persistence logic follows an upsert-like pattern:

User edits notes
      │
      ▼
Check existing notes for fileId
      │
      ├── No notes → Insert
      │
      └── Existing → Patch
When the workspace is opened again, the notes can be retrieved using the same fileId.

This gives each document its own persistent notes.

📖 Workspace
Every PDF has a dynamic route:

/workspace/[fileId]
The workspace retrieves the PDF record from Convex and renders two main sections:

┌───────────────────────────────┐
│          Header               │
├────────────────┬──────────────┤
│                │              │
│  Text Editor   │  PDF Viewer  │
│                │              │
│  Tiptap        │  iframe      │
│                │              │
└────────────────┴──────────────┘
The PDF is displayed using the Convex-generated file URL, while the notes area uses Tiptap.

✍️ Tiptap Editor
The notes editor uses:

StarterKit

Placeholder extension

Highlight extension

The editor is configured as a client-side component and uses immediatelyRender: false to avoid unwanted rendering issues with the Next.js environment.

🤖 AI Configuration
The repository configures Google Generative AI through:

@google/generative-ai
The current AI model configured in the repository is:

gemini-1.5-flash
The model configuration includes:

temperature: 1
topP: 0.95
topK: 40
maxOutputTokens: 8192
The Gemini API key is read from:

NEXT_PUBLIC_GEMINI_API_KEY
For production applications, API secrets should ideally be kept server-side rather than exposed through a NEXT_PUBLIC_ environment variable.

🔎 RAG Pipeline
The RAG pipeline is the core AI concept behind PadhAI.

1. Document ingestion
The PDF is uploaded and its content is processed.

2. Chunking
Large document text is divided into smaller pieces.

Example:

PDF
 │
 ├── Chunk 1
 ├── Chunk 2
 ├── Chunk 3
 ├── Chunk 4
 └── ...
3. Embedding
Each chunk is converted into a numerical vector.

"React is a JavaScript library..."
              │
              ▼
      Embedding Model
              │
              ▼
[0.12, -0.04, 0.81, ...]
The Convex schema defines a 768-dimensional embedding vector.

4. Vector storage
The embeddings and their original text are stored in the documents collection.

5. Similarity search
When the user asks a question, the query can be converted into an embedding and compared with stored document embeddings.

6. Context retrieval
The most relevant chunks are retrieved.

7. Gemini generation
The retrieved context is provided to Gemini so that the model can generate a response using the document's information.

User Question
      │
      ▼
Query Embedding
      │
      ▼
Vector Similarity Search
      │
      ▼
Relevant PDF Chunks
      │
      ▼
Prompt + Context
      │
      ▼
Gemini
      │
      ▼
AI Response
⚙️ Installation
Prerequisites
Make sure you have:

Node.js

npm

A Convex account/project

A Clerk account/project

A Google Gemini API key

1. Clone the repository
git clone https://github.com/Ridham-sharma19/Padh_ai.git

cd Padh_ai
2. Install dependencies
npm install
3. Configure environment variables
Create a .env.local file:

NEXT_PUBLIC_CONVEX_URL=your_convex_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
Use the exact variable names expected by your local Convex/Clerk configuration if they differ.

4. Start Convex
Run the Convex development environment according to your Convex project configuration.

npx convex dev
5. Start Next.js
In another terminal:

npm run dev
Open:

http://localhost:3000
📦 Available Scripts
npm run dev
Starts the Next.js development server with Turbopack.

npm run build
Creates a production build.

npm run start
Starts the production Next.js server.

npm run lint
Runs the project's lint command.

🚀 Deployment
PadhAI can be deployed using Vercel.

Recommended deployment flow
GitHub Repository
       │
       ▼
     Vercel
       │
       ├── Next.js Application
       │
       └── Environment Variables
              │
              ├── Clerk
              ├── Convex
              └── Gemini
Steps
Push the project to GitHub.

Import the repository into Vercel.

Configure the required environment variables.

Configure the Convex deployment.

Deploy the application.

Update Clerk's allowed origins/URLs for the deployed domain if required.

🔒 Security Notes
Do not commit secrets such as:

.env
.env.local
Never commit:

Clerk secret keys

Gemini API keys

Convex deployment secrets

Also note that the current repository uses:

NEXT_PUBLIC_GEMINI_API_KEY
Because NEXT_PUBLIC_ variables can be exposed to the browser, this should be reconsidered before using the application in a production environment with a private Gemini API key.

🎯 What I Learned Building This Project
This project helped me understand several practical full-stack and AI concepts:

Next.js App Router

Dynamic routes

Authentication with Clerk

Convex queries and mutations

Convex file storage

Vector indexes

PDF processing

Text chunking

Embeddings

Retrieval-Augmented Generation (RAG)

Gemini integration

LangChain

Tiptap rich-text editing

Real-time/persistent application state

Vercel deployment

🧩 Key Technical Decisions
Why Convex?
Convex provides database operations, queries, mutations, file storage, and reactive updates without requiring a separate traditional backend API for every operation.

Why RAG?
RAG allows the application to retrieve relevant information from the user's PDF instead of relying only on the model's general knowledge.

Why Tiptap?
Tiptap provides a flexible rich-text editor that can be customized with extensions such as highlighting and placeholders.

Why Clerk?
Clerk handles authentication and user management, allowing the application to focus on the document, workspace, and AI functionality.

🛣️ Future Improvements
Possible improvements include:

Better PDF text extraction for complex/scanned PDFs

Streaming AI responses

Source citations for retrieved chunks

Page-level references in AI answers

Multiple document RAG

Better chunking and overlap strategies

Automatic note generation

AI-generated summaries

AI-generated questions and flashcards

Search across all uploaded PDFs

Document deletion and cleanup from Convex Storage

More granular user/document authorization

Server-side Gemini API calls

Improved error handling and loading states

👨‍💻 Author
Ridham Sharma

GitHub: https://github.com/Ridham-sharma19

📄 License
This project is intended for learning and educational purposes.
