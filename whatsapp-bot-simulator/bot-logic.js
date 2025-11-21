// bot-logic.js - Your bot conversation logic (Twilio-independent)

class BotLogic {
  constructor() {
    this.sessions = new Map();
  }

  getSession(userId) {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        hasInteracted: false,
        conversationState: 'MAIN_MENU',
        lastMessageAt: new Date(),
        messageHistory: []
      });
    }
    return this.sessions.get(userId);
  }

  updateSession(userId, updates) {
    const session = this.getSession(userId);
    Object.assign(session, updates, { lastMessageAt: new Date() });
  }

  handleMessage(userId, message) {
    const session = this.getSession(userId);
    const input = message.trim().toLowerCase();

    // Log message
    session.messageHistory.push({
      from: 'user',
      text: message,
      timestamp: new Date()
    });

    let response;

    // First-time user
    if (!session.hasInteracted) {
      this.updateSession(userId, {
        hasInteracted: true,
        conversationState: 'MAIN_MENU'
      });
      response = `👋 Welcome! I'm your assistant bot.

How can I help you today?

1️⃣ Get started
2️⃣ Learn more
3️⃣ Contact support

Reply with a number to continue.`;
    }
    // Main menu
    else if (session.conversationState === 'MAIN_MENU') {
      response = this.handleMainMenu(userId, input);
    }
    // Return to menu
    else if (input === 'menu') {
      this.updateSession(userId, { conversationState: 'MAIN_MENU' });
      response = `🏠 Main Menu:

1️⃣ Get started
2️⃣ Learn more
3️⃣ Contact support

Reply with a number.`;
    }
    // Handle other states
    else {
      response = this.handleConversationState(userId, input, session.conversationState);
    }

    // Log response
    session.messageHistory.push({
      from: 'bot',
      text: response,
      timestamp: new Date()
    });

    return response;
  }

  handleMainMenu(userId, input) {
    switch (input) {
      case '1':
        this.updateSession(userId, { conversationState: 'GET_STARTED' });
        return `🚀 Great! Let's get you started.

What would you like to do?

A) Create account
B) View features
C) Back to menu

Reply with a letter.`;

      case '2':
        this.updateSession(userId, { conversationState: 'INFO' });
        return `📚 Here's what you can do:

• Feature 1: Real-time notifications
• Feature 2: Multi-channel support
• Feature 3: Smart automation
• Feature 4: Analytics dashboard

Reply "menu" to return to main menu.`;

      case '3':
        this.updateSession(userId, { conversationState: 'SUPPORT' });
        return `📞 Support Information:

Email: support@example.com
Phone: +1-XXX-XXX-XXXX
Hours: Mon-Fri 9AM-5PM EST

Or describe your issue and we'll get back to you within 24 hours!

Reply "menu" to return.`;

      default:
        return `I didn't understand that. Please reply with:
1 for Get Started
2 for Learn More
3 for Support`;
    }
  }

  handleConversationState(userId, input, state) {
    switch (state) {
      case 'GET_STARTED':
        return this.handleGetStarted(userId, input);
      case 'INFO':
        return 'Reply "menu" to return to main menu, or ask me anything!';
      case 'SUPPORT':
        return this.handleSupport(userId, input);
      default:
        this.updateSession(userId, { conversationState: 'MAIN_MENU' });
        return 'Something went wrong. Reply "menu" to start over.';
    }
  }

  handleGetStarted(userId, input) {
    switch (input) {
      case 'a':
        return `📝 To create an account, you'll need:

1. Valid email address
2. Phone number
3. Choose a password

Visit: https://yourapp.com/signup

Reply "menu" to return.`;

      case 'b':
        return `✨ Our key features include:

🔔 Real-time Notifications
- Instant alerts for important events
- Customizable notification preferences

🌐 Multi-channel Support
- Web, mobile, and WhatsApp
- Seamless sync across devices

🤖 Smart Automation
- AI-powered responses
- Workflow automation

📊 Analytics Dashboard
- Track your metrics
- Generate reports

Reply "menu" to return.`;

      case 'c':
        this.updateSession(userId, { conversationState: 'MAIN_MENU' });
        return `🏠 Main Menu:

1️⃣ Get started
2️⃣ Learn more
3️⃣ Contact support`;

      default:
        return 'Please reply with A, B, or C.';
    }
  }

  handleSupport(userId, message) {
    // In real app, would save to database
    console.log(`Support request from ${userId}: ${message}`);
    
    this.updateSession(userId, { 
      conversationState: 'MAIN_MENU',
      supportTicket: {
        message: message,
        createdAt: new Date()
      }
    });

    return `✅ Thanks for reaching out!

We've received your message:
"${message}"

Our support team will respond within 24 hours.

Ticket #${Date.now().toString().slice(-6)}

Reply "menu" to return to main menu.`;
  }

  getAllSessions() {
    return Array.from(this.sessions.entries()).map(([userId, session]) => ({
      userId,
      state: session.conversationState,
      hasInteracted: session.hasInteracted,
      lastMessageAt: session.lastMessageAt,
      messageCount: session.messageHistory.length
    }));
  }

  getSessionHistory(userId) {
    const session = this.getSession(userId);
    return session.messageHistory;
  }

  clearSession(userId) {
    this.sessions.delete(userId);
  }
}

module.exports = new BotLogic();
