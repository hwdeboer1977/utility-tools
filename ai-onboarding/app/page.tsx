"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m your AI onboarding guide 👋\nSay hi to start and I’ll ask 3 quick questions to personalize things.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Hmm, something went wrong talking to the AI backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-xl flex flex-col flex-1 p-4 gap-4">
        <header className="border-b border-slate-800 pb-3">
          <h1 className="text-xl font-semibold">AI Onboarding (MVP)</h1>
          <p className="text-sm text-slate-400">
            Standalone test – 4-step onboarding, then Q&amp;A mode.
          </p>
        </header>

        <section className="flex-1 overflow-y-auto border border-slate-800 rounded-md p-3 bg-slate-900">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`mb-3 flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap text-sm rounded-lg px-3 py-2 ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-xs text-slate-400 italic">Thinking…</div>
          )}
        </section>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-slate-800 pt-3"
        >
          <input
            className="flex-1 rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your message and press Enter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 rounded-md bg-blue-600 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </main>
  );
}
