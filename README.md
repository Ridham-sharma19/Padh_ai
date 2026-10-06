Yes. For GitHub, I’d keep it **short, clean, and project-focused** rather than documenting every internal file.

# PadhAI 📚

PadhAI is an AI-powered PDF study workspace built with **Next.js, Convex, Clerk, Gemini, LangChain, and Tiptap**.

It allows users to upload PDFs, read them inside a workspace, create notes, and use AI/RAG to interact with the content of their documents.

## 🚀 Features

* 🔐 Authentication with Clerk
* 📄 Upload and store PDFs using Convex Storage
* 📖 Built-in PDF viewer
* 📝 Rich-text notes editor using Tiptap
* 🤖 AI-powered document interaction using Gemini
* 🔎 RAG-based document search using embeddings and vector search
* ⚡ Real-time data persistence with Convex
* 📂 Separate workspace for each uploaded PDF
* ☁️ Deployable on Vercel

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
* **Backend:** Convex
* **Authentication:** Clerk
* **AI:** Google Gemini, LangChain
* **Vector Search:** Convex Vector Index
* **Editor:** Tiptap
* **PDF Processing:** pdf-parse
* **Deployment:** Vercel

## 🧠 How It Works

```text
Upload PDF
    ↓
Convex Storage
    ↓
Extract PDF Text
    ↓
Split Text into Chunks
    ↓
Generate Embeddings
    ↓
Store Embeddings in Convex
    ↓
User Query
    ↓
Vector Search
    ↓
Relevant Document Chunks
    ↓
Gemini
    ↓
AI Response
```

The application uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant content from uploaded PDFs before generating AI responses.

## 📂 Project Structure

```text
Padh_ai/
├── app/
│   ├── dashboard/
│   ├── workspace/
│   │   └── [fileId]/
│   └── page.tsx
├── components/
├── config/
├── convex/
├── lib/
├── public/
├── middleware.ts
└── package.json
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ridham-sharma19/Padh_ai.git
cd Padh_ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CONVEX_URL=your_convex_url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start Convex

```bash
npx convex dev
```

### 5. Start the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

## 🚀 Deployment

The application can be deployed using **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables.
4. Configure the Convex deployment.
5. Deploy.

## 🎯 Key Learning

Through this project, I worked with:

* Next.js App Router
* Clerk authentication
* Convex database and file storage
* PDF processing
* Embeddings and vector search
* Retrieval-Augmented Generation (RAG)
* Gemini AI
* LangChain
* Tiptap editor
* Vercel deployment

## 👨‍💻 Author

**Ridham Sharma**

[GitHub](https://github.com/Ridham-sharma19)
