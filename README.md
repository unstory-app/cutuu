<div align="center">
  <h1>✦ cutuu</h1>
  <p><strong>Your memory-first daily companion.</strong></p>
  <p>
    <a href="https://cutuu.vercel.app">Live App</a> ·
    <a href="#features">Features</a> ·
    <a href="#setup">Setup</a> ·
    <a href="#architecture">Architecture</a>
  </p>
</div>

---

Cutuu is a personal AI companion that **remembers you** across every conversation. It's not a general assistant — it's a thoughtful friend that listens, journals, reflects, and builds long-term memory about your life.

> "I like piano."  
> *(50 chats later)*  
> "You usually feel calm when you talk about piano."

That's the goal.

---

## Features

| Feature | Description |
|---|---|
| 🧠 **Long-term Memory** | Automatically extracts and stores facts, preferences, and emotional patterns from each conversation |
| 💬 **Warm Companion AI** | Talks like a thoughtful friend — no bullet lists, no robotic tone |
| 📓 **Daily Reflection** | "Reflect Today" button summarizes recent chats and stores key themes |
| 🗂️ **Memory Timeline** | Visual timeline of everything the AI remembers about you |
| 🔐 **Private by default** | All conversations and memories are authenticated and user-scoped |

---

## Architecture

```
cutuu/
├── app/
│   ├── (chat)/           # Chat UI + memory timeline page
│   ├── (auth)/           # Authentication
│   ├── landing/          # Public landing page
│   └── api/
│       ├── reflect/      # Reflection API (summarizes recent chats)
│       └── memories/     # Memories CRUD API
├── lib/
│   ├── ai/
│   │   ├── companionPrompt.ts  # Core personality definition
│   │   └── providers.ts        # AI model gateway
│   ├── memory/
│   │   ├── embeddings.ts       # OpenAI text-embedding-3-small
│   │   ├── saveMemory.ts       # Store memory + embedding
│   │   ├── searchMemories.ts   # Cosine similarity search
│   │   └── extractMemory.ts    # LLM-based fact extraction
│   └── db/
│       ├── schema.ts           # Drizzle schema (incl. Memory table)
│       └── queries.ts          # Database query helpers
```

### Memory Flow

```
User Message
     │
     ▼
1. Generate embedding for message
2. Search top-5 relevant memories
3. Inject memories into system prompt
4. Stream AI response
     │
     ▼ (after response)
5. Extract new facts via LLM
6. Save new memories with embeddings
```

---

## Setup

### Prerequisites

- Node.js 20+
- pnpm
- Supabase project (for PostgreSQL + auth)
- Vercel AI Gateway API key

### 1. Clone and install

```bash
git clone https://github.com/your-username/cutuu.git
cd cutuu
pnpm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```env
AUTH_SECRET=<generate with: openssl rand -base64 32>

# Vercel AI Gateway
AI_GATEWAY_API_KEY=****

# Supabase Postgres (Shared Connection Pooler)
POSTGRES_URL="postgresql://postgres.YOUR_PROJECT_REF:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://postgres.YOUR_PROJECT_REF:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
```

### 3. Push database schema

```bash
pnpm db:push
```

### 4. Start the dev server

```bash
pnpm dev
```

Visit `http://localhost:3000`.

---

## AI Models

Cutuu uses the **Vercel AI Gateway** and supports:

| Model | Provider |
|---|---|
| GPT-4.1 Mini | OpenAI (default) |
| GPT-5 Mini | OpenAI |
| Claude Haiku 4.5 | Anthropic |
| Gemini 2.5 Flash Lite | Google |
| Grok 4.1 Fast | xAI |

Embeddings are generated with `text-embedding-3-small` via OpenAI.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Vercel AI SDK 6.x
- **Database**: PostgreSQL via Supabase + Drizzle ORM
- **Auth**: NextAuth 5
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

---

## Contributing

PRs are welcome. Please open an issue first to discuss major changes.

---

<div align="center">
  <sub>Made with care. © 2026 Cutuu.</sub>
</div>
