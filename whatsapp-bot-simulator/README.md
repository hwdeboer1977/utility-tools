# WhatsApp Bot Simulator

Test your WhatsApp bot locally without Twilio verification. Perfect for development when you're abroad or don't have access to Twilio.

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

### 3. Open Browser

Navigate to: **http://localhost:3000**

That's it! Start chatting with your bot. 🎉

## 📂 Project Structure

```
whatsapp-bot-simulator/
├── bot-logic.js        # Bot conversation logic (Twilio-independent)
├── server.js           # Express server with API endpoints
├── views/
│   └── index.ejs       # WhatsApp-like chat interface
├── package.json        # Dependencies
└── README.md          # This file
```

## ✨ Features

- **No Twilio Required** - Works completely offline
- **WhatsApp-like UI** - Realistic chat interface
- **Multi-user Testing** - Switch between User 1, 2, 3
- **Session Management** - Persistent conversations per user
- **Export Conversations** - Save chats as text files
- **Real-time Testing** - Instant feedback on bot logic

## 🎮 How to Use

### Basic Usage

1. Type a message in the input field
2. Press Enter or click the send button
3. Bot responds immediately
4. Test different conversation flows

### Testing Multiple Users

1. Use the dropdown to switch between User 1, 2, 3
2. Each user has their own independent session
3. Perfect for testing concurrent conversations

### Menu Navigation

Try these commands:
- Type `hello` or any message to start
- Reply `1` for Get Started
- Reply `2` for Learn More
- Reply `3` for Support
- Type `menu` to return to main menu

### Clearing Sessions

Click "Clear Chat" to reset the current user's conversation and start fresh.

### Exporting Conversations

Click "Export" to download the conversation as a text file for documentation or review.

## 🛠️ Customizing the Bot

### Modify Bot Logic

Edit `bot-logic.js` to customize:
- Welcome messages
- Menu options
- Conversation flows
- Response logic

Example:
```javascript
handleMainMenu(userId, input) {
  switch (input) {
    case '1':
      this.updateSession(userId, { conversationState: 'YOUR_STATE' });
      return 'Your custom response here';
    // Add more cases...
  }
}
```

### Add New Conversation States

1. Define a new state in `handleMainMenu`
2. Handle the state in `handleConversationState`
3. Create a handler function like `handleYourState`

Example:
```javascript
handleYourState(userId, input) {
  // Your logic here
  return 'Your response';
}
```

## 📡 API Endpoints

### Send Message
```bash
POST /api/message
Content-Type: application/json

{
  "userId": "user1",
  "message": "hello"
}
```

### Get History
```bash
GET /api/history/user1
```

### Clear Session
```bash
POST /api/clear/user1
```

### View All Sessions
```bash
GET /api/sessions
```

### Health Check
```bash
GET /health
```

## 🧪 Testing Scenarios

### Test First-time User
1. Clear chat for User 1
2. Send "hello"
3. Should receive welcome message

### Test Menu Navigation
1. Reply "1" → Should go to Get Started
2. Reply "a" → Should show account creation
3. Type "menu" → Should return to main menu

### Test Multi-user
1. Start conversation as User 1
2. Switch to User 2
3. Start different conversation
4. Switch back to User 1
5. Previous conversation should be intact

### Test Support Flow
1. Reply "3" from main menu
2. Type your issue
3. Should receive ticket confirmation

## 🔧 Development Mode

For auto-reload during development:

```bash
# Install nodemon (if not already)
npm install -D nodemon

# Run in dev mode
npm run dev
```

## 🚀 Migrating to Production (Twilio)

When you're ready to connect to real WhatsApp:

1. **Keep `bot-logic.js` unchanged** - It's already production-ready
2. **Replace server.js** with Twilio webhook handler
3. **Use the same `handleMessage()` function**
4. **All conversation logic transfers directly**

The bot logic you develop here works exactly the same with real Twilio!

## 🎯 What's Next?

Once you've tested your bot thoroughly:

- [ ] Refine conversation flows
- [ ] Add more menu options
- [ ] Implement custom logic for your use case
- [ ] Document conversation patterns
- [ ] When Twilio is available, integrate seamlessly

## 💡 Tips

- **Test edge cases**: Try gibberish, empty messages, rapid firing
- **Multiple users**: Test concurrent conversations
- **Session persistence**: Verify state is maintained between messages
- **Response time**: Bot should respond instantly
- **Export logs**: Save important test conversations

## 🐛 Troubleshooting

### Port already in use
```bash
# Use a different port
PORT=4000 npm start
```

### Can't see the interface
- Check console for errors
- Ensure all files are in correct locations
- Clear browser cache

### Sessions not persisting
- Sessions are in-memory (reset on server restart)
- This is normal for development
- For production, add database persistence

## 📚 Resources

- Main Implementation Guide: `phase-0-implementation-plan.md`
- Standalone Testing Guide: `WHATSAPP-BOT-STANDALONE-TESTING.md`
- Local Simulator Guide: `LOCAL-WHATSAPP-SIMULATOR.md`

## 🙋 Need Help?

The bot logic is straightforward:
1. User sends message
2. Bot checks conversation state
3. Bot processes input
4. Bot returns response
5. State updates (if needed)

All logic is in `bot-logic.js` - start there for customizations!

---

**Happy Bot Building! 🤖💬**
