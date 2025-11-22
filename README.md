# 📦 Utility Tools Collection

This repository contains a collection of small, self-contained development tools and prototypes.
Each tool lives in its own subfolder and includes its own dedicated README.md with setup instructions
and technical details.

## 🔧 Included Tools

### 1. AI Onboarding (`ai-onboarding`)
A minimal prototype demonstrating a simple AI-driven onboarding flow.
Useful as a starting point for designing guided onboarding assistants or conversational flows.

---

### 2. Mobile PWA Webapp (`webapp-mobile-pwa`)
A tiny Next.js-based Progressive Web App.
It includes installability (Add to Home Screen), offline support via service workers, and lightweight PWA configuration.

---

### 3. WhatsApp Bot Simulator (`whatsapp-bot-simulator`)
A basic Express + EJS application that simulates WhatsApp-like message flows.
Designed for testing conversational flows without relying on real WhatsApp integrations.

---

### 4. WhatsApp Bot (Twilio) (`whatsapp-bot-twilio`)
A real WhatsApp bot connected to Twilio's WhatsApp Sandbox.
It uses Node.js, Express, Twilio webhooks, and ngrok tunneling to receive and reply to real WhatsApp messages.
This folder contains the bot logic, webhook server, `.env` setup, and Twilio configuration instructions.

---

## 📁 Structure

```
utility-tools/
│
├── ai-onboarding/
├── webapp-mobile-pwa/
├── whatsapp-bot-simulator/
└── whatsapp-bot-twilio/
```

Each folder contains:
- full source code  
- its own README.md  
- installation & usage instructions  

---

## 🏁 Purpose

This repository acts as a central hub for small experiments, prototypes, and utility tools used across various larger projects such as:
- onboarding flows  
- PWA testing  
- conversational UI experiments  
- WhatsApp bot development  

These tools are intended for learning, rapid prototyping, and internal use.

---

## 🧹 Git Cleanup (Node Projects)

For any Node.js tool in this repository, remember:

- Add a `.gitignore` that excludes `node_modules/` and `.env`
- If node_modules was already committed, reset Git cache:

```
git rm -r --cached .
git add .
git commit -m "Clean repo and apply .gitignore"
```

This keeps the repository clean and prevents large unnecessary commits.
