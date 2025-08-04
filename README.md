# ⚡ OrchestrAI – AI Workflow Builder (v0.9 Pre-Image-Gen)

> **No-code, drag-and-drop AI pipeline builder** with real-time collaboration, powered by **Next.js 15**, **React Flow**, **Postgres**, **Redis**, and **OpenAI**.

---

## 📸 Preview

> *(Replace with real screenshots in repo at `preview1.png` and `preview2.png`)*

<p align="center">
  <img src="preview1.png" alt="Preview 1" width="800"/>
</p>

<p align="center">
  <img src="preview2.png" alt="Preview 2" width="800"/>
</p>

---

## 🎯 What is OrchestrAI?

OrchestrAI is a **visual AI workflow builder** that lets you design, execute, and share AI-powered pipelines **without writing code**.  
Think of it as a **Figma for AI workflows** – connect nodes like **LLM, Summarizer, Translator, Web Scraper, Emailer, CSV Writer**, and watch the magic happen.

Built for **developers, data analysts, and AI enthusiasts** who want **full control** over their AI automations.

---

## 🧩 Current Features (v0.9)

| Feature Area       | Description |
|--------------------|-------------|
| **Canvas**         | Blank React Flow canvas with drag-drop AI and utility nodes. |
| **Node Palette**   | JSON-driven sidebar (`src/config/nodes.json`) – add new nodes by editing a single file. |
| **Node Config**    | Double-click a node → edit prompts/settings in a shadcn Sheet. |
| **Run Workflow**   | ▶ **Run** executes the flow via `/api/run`, returns AI results. |
| **Delete Node**    | Dedicated delete button inside each config sheet. |
| **Real-time Sync** | Y.js + Socket.IO – multi-tab/collaborative editing. |
| **Backend**        | Express + Prisma + Postgres (Supabase) + Redis + WebSocket. |
| **Frontend**       | Next.js 15 + React Flow 11 + Tailwind v4 + shadcn/ui + Sonner. |

---

## 🗂️ Project Structure

orchestrai/
├── apps/
│ ├── api/ # Backend API (Node + Express + Prisma)
│ │ ├── src/
│ │ │ ├── lib/
│ │ │ │ └── executor.ts # Maps node types → real OpenAI/LLM calls
│ │ │ ├── socket.ts # WebSocket server for real-time sync
│ │ │ └── routes/ # API route handlers (e.g., workflows, run logic)
│ │ ├── prisma/
│ │ │ └── schema.prisma # Database schema for Postgres
│ │ └── package.json # Backend package config (build/start scripts)
│ └── web/ # Frontend (Next.js + React Flow)
│ ├── src/
│ │ ├── lib/
│ │ │ └── useSocket.ts # Client hook for real-time sync
│ │ ├── components/
│ │ │ └── workflow/
│ │ │ └── NodeConfigSheet.tsx # Prompt editor + delete UI
│ │ └── config/
│ │ └── nodes.json # Node definitions for palette
│ └── package.json # Frontend package config
├── README.md # This file
└── .gitignore # Ignored files (e.g., .env, node_modules)

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React Flow 11, Tailwind CSS v4, shadcn/ui, Sonner  
- **Backend**: Node.js 22, Express, Prisma, Postgres (Supabase), Redis, Socket.IO  
- **AI**: OpenAI API, LangChain  
- **Collaboration**: Y.js + Socket.IO  
- **Dev Tools**: TypeScript, tsx, dotenv  

---

## 🚀 Quick Start (Local)

### Backend
```bash
cd apps/api
pnpm install
pnpm dev  # Runs API & WebSocket on localhost:4000

### Frontend
```bash
cd apps/web
pnpm install
pnpm dev  # Runs UI on localhost:3000

# 🔐 Environment Variables (example template)
DATABASE_URL=postgresql://<user>:<password>@...:5432/postgres
REDIS_URL=<your-remote-redis-endpoint>
OPENAI_API_KEY=sk-xxxxxxx
PORT=4000  # optional, platform usually injects its own

