<div align="center">
  <h1>✦ cutuu</h1>
  <p><strong>Your memory-first daily companion.</strong></p>
  <p>
    <a href="https://cutuu.unstory.app">Live App</a> ·
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
| 🔐 **Stack Auth Integration** | Secure, managed authentication with project-specific credentials |
| 🌚 **Deep Dark Design** | Premium "glassmorphism" aesthetic tailored for late-night reflection |

---

## Architecture

```
cutuu/
├── app/
│   ├── (chat)/           # Chat UI + memory timeline page
│   ├── handler/          # Stack Auth handler routes
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
├── stack/
│   ├── server.ts         # Stack Auth Server Config
│   └── client.ts         # Stack Auth Client Config
```

---

## Setup

### Prerequisites

- Node.js 20+
- pnpm
- Supabase project (for PostgreSQL)
- Stack Auth Project ID & Secret Key
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
# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=8272a8b1-b06a-493e-8f96-af8726fb5ed7
STACK_SECRET_SERVER_KEY=ssk_...

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

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Vercel AI SDK 6.x
- **Database**: PostgreSQL via Supabase + Drizzle ORM
- **Auth**: [Stack Auth](https://stack-auth.com/)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment**: Vercel

---

<div align="center">
  <sub>Made with care. © 2026 Cutuu.</sub>
</div>
