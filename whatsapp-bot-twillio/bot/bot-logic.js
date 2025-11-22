// bot/bot-logic.js

const sessions = {};

function getSession(user) {
  if (!sessions[user]) {
    sessions[user] = { state: "start" };
  }
  return sessions[user];
}

function handleMessage(user, message) {
  const session = getSession(user);

  if (session.state === "start") {
    session.state = "menu";
    return (
      "👋 Welcome to the WhatsApp bot!\n\n" +
      "Reply with:\n" +
      "1️⃣ Get started\n" +
      "2️⃣ Learn more\n" +
      "3️⃣ Support"
    );
  }

  if (session.state === "menu") {
    if (message === "1") return "Great! Let's get started 🚀";
    if (message === "2") return "This bot shows how to build a WhatsApp flow.";
    if (message === "3") return "Support team: support@example.com";
    return "Please reply 1, 2, or 3.";
  }

  return "Something went wrong.";
}

module.exports = { handleMessage };
