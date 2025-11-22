# WhatsApp Bot (Twilio + Node.js)

This project is a simple WhatsApp bot built using **Node.js**, **Express**, **Twilio WhatsApp Sandbox**, and **ngrok**.  
It allows you to receive WhatsApp messages, process them with custom bot logic, and reply automatically.

---

## 🚀 Features

- Real WhatsApp integration using Twilio Sandbox  
- Clean bot logic with session tracking  
- Express server with Twilio webhook  
- ngrok tunneling for local development  
- Fully extensible (AI responses, flows, database, etc.)

---

## 📁 Project Structure

```
whatsapp-bot-twilio/
  ├── bot/
  │     └── bot-logic.js       # Conversation logic
  ├── server.js                # Express server + Twilio webhook
  ├── .env                     # Environment variables
  ├── package.json
  └── README.md
```

---

## ⚙️ Installation

### 1. Clone or create the folder
```bash
mkdir whatsapp-bot-twilio
cd whatsapp-bot-twilio
```

### 2. Install dependencies
```bash
npm install express twilio dotenv body-parser
```

---

## 🔑 Environment Variables

Create a **.env** file:

```
TWILIO_AUTH_TOKEN=your_auth_token_here
```

Your Twilio auth token can be found in:  
**Twilio Console → Account → Account Info**

---

## 🤖 Bot Logic (`bot/bot-logic.js`)

This contains minimal session logic for a menu-driven bot:

- “1 → Get started”
- “2 → Learn more”
- “3 → Support”

You can extend this file to build full flows or connect AI.

---

## 🌐 Server (`server.js`)

The Express server:

- Listens on port **3000**
- Exposes a POST webhook at **/whatsapp**
- Handles incoming messages from Twilio
- Sends replies via Twilio’s MessagingResponse

---

## 🛜 Run the Server

Start it:

```bash
node server.js
```

You should see:

```
WhatsApp bot running on port 3000
```

---

## 🌍 Expose Server to Internet (ngrok)

Install or download `ngrok`, then run:

```bash
ngrok http 3000
```

Copy the URL shown:

```
https://something.ngrok-free.dev
```

Your public webhook will be:

```
https://something.ngrok-free.dev/whatsapp
```

---

## 📲 Connect to Twilio WhatsApp Sandbox

1. In Twilio dashboard:  
   **Messaging → Try It Out → Send a WhatsApp Message**

2. Send the join code (example):

```
join tone-describe
```

to the number:

```
+1 415 523 8886
```

This links your phone to the sandbox.

---

## 🔗 Configure Twilio Webhook

In Twilio Sandbox settings, find:

### **“WHEN A MESSAGE COMES IN”**

Paste your ngrok URL:

```
https://<your-ngrok-url>.ngrok-free.dev/whatsapp
```

Save the settings.

---

## 🧪 Test the Bot

In WhatsApp, send:

```
hi
```

You should receive the bot’s menu.

Try:

```
1
```
or  
```
2
```
or  
```
3
```

---

## 🎉 Done!

You now have a **fully working WhatsApp bot**.

You can extend it with:

- OpenAI / Claude AI support  
- Multi-step onboarding  
- Integration with your GroupWallet project  
- Database session storage  
- Deployment on Render / Railway  

Just ask if you'd like the next upgrade!

---

## 📜 License

MIT License.
