# 🧠 AI Onboarding (Minimal MVP)

A minimal, standalone **AI onboarding** prototype built with **Next.js
14** and **OpenAI**.\
This project demonstrates a simple **4-step conversational onboarding
flow**, followed by a normal Q&A assistant mode.

It is intentionally lightweight, with **no database**, **no PWA**, and
**no external integrations**.\
Perfect for experimentation, demos, and testing conversational
onboarding logic.

------------------------------------------------------------------------

## 🚀 Features

### ✅ 4-Step AI Onboarding Flow

The assistant automatically guides users through:

1.  **Role identification**\
2.  **Goal identification**\
3.  **A "first-win" suggestion** (small actionable step tailored to
    role + goal)\
4.  **Summary + switch to Q&A mode**

### ✅ Q&A Mode

After onboarding is complete, the assistant behaves like a normal
helper, using the knowledge collected during onboarding.

### ✅ Stateless Backend

The entire conversation history is kept in the frontend and sent to
`/api/chat` each turn.\
No DB or sessions needed.

### ✅ Clean & Minimal Next.js Setup

-   `/` → frontend chat UI\
-   `/api/chat` → backend endpoint calling OpenAI

------------------------------------------------------------------------

# 📂 Project Structure

    ai-onboarding/
    │
    ├── app/
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts     → OpenAI backend for chat
    │   └── page.tsx             → Minimal chat UI
    │
    ├── .env.local               → OpenAI API key
    ├── package.json
    └── README.md

------------------------------------------------------------------------

# ⚙️ Installation

### 1. Clone or create the project

``` bash
npx create-next-app@latest ai-onboarding   --typescript   --app   --eslint   --src-dir false   --import-alias "@/*"   --use-npm
```

Move into the folder:

``` bash
cd ai-onboarding
```

### 2. Install dependencies

``` bash
npm install openai
```

### 3. Add your API key

Create a file:

    .env.local

Add:

``` bash
OPENAI_API_KEY=sk-...
```

### 4. Start development server

``` bash
npm run dev
```

Open:

    http://localhost:3000

------------------------------------------------------------------------

# 🧩 How It Works

## 1. System Prompt (Onboarding Logic)

The backend sends a **fixed system prompt** to OpenAI that enforces a
conversational structure:

-   Ask one question at a time\
-   Guide user through four onboarding steps\
-   Be conversational and short\
-   After step 4, switch to assistant mode

This logic is defined in `app/api/chat/route.ts`.

------------------------------------------------------------------------

## 2. Stateless API Backend

The frontend sends the entire `messages[]` array to `/api/chat`.\
The backend:

-   Prepends the system prompt\
-   Sends everything to OpenAI\
-   Returns the assistant response

This makes the system simple and robust --- no database, no sessions.

------------------------------------------------------------------------

## 3. Chat UI Frontend

The chat UI:

-   Stores messages in React state\
-   Renders chat bubbles\
-   Sends messages + history to `/api/chat`\
-   Supports loading states\
-   Initializes with a welcome message

This lives in `app/page.tsx`.

------------------------------------------------------------------------

# 🛠️ Files To Copy

### `/app/api/chat/route.ts`

Handles all OpenAI logic.

### `/app/page.tsx`

Minimal chat interface with input box, output bubbles, and loading
indicator.

------------------------------------------------------------------------

# 🧪 Example Usage

1.  User visits `/`\
2.  Assistant: *"Hi! I'm your onboarding guide. Say hi to start."*\
3.  User: *"Hi"*\
4.  Assistant begins Step 1: *"What best describes you?"*\
5.  User responds\
6.  Flow continues automatically\
7.  After summary, assistant switches into Q&A mode

This allows you to test: - Conversation design\
- State-less AI logic\
- Tailoring responses based on earlier answers

------------------------------------------------------------------------

# 🧱 Technology Stack

-   **Next.js 14 (App Router)**
-   **React (Client components)**
-   **OpenAI API (gpt-4.1-mini)**
-   **TypeScript**
-   Optional: TailwindCSS (already used in styling classes, but not
    required)

------------------------------------------------------------------------

# 🔮 Next Steps (Optional Enhancements)

This MVP can easily grow into:

### 🟦 1. Add RAG (Retrieval Over Custom Docs)

Let the assistant answer real product questions based on uploaded docs.

### 🟧 2. Add Session Persistence

Store role, goal, and conversation using: - Supabase\
- Redis\
- PostgreSQL\
- JSON store

### 🟩 3. Add Multi-Step Flows

More complex onboarding: - Tool selection\
- Checklists\
- Generating personalized plans\
- Integration walkthroughs

### 🟪 4. Convert to PWA

Turn it into a mobile onboarding experience.

### 🟨 5. Link to WhatsApp onboarding

In future, trigger automated WhatsApp sequences after Step 4.

------------------------------------------------------------------------

# 📜 License

MIT License --- free to use, extend, and customize.
