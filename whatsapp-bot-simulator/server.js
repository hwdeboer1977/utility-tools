// server.js - Express server with web interface

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const botLogic = require('./bot-logic');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Main chat interface
app.get('/', (req, res) => {
  res.render('index');
});

// API: Send message
app.post('/api/message', (req, res) => {
  const { userId, message } = req.body;
  
  if (!userId || !message) {
    return res.status(400).json({ error: 'userId and message required' });
  }

  console.log(`[${userId}] User: ${message}`);
  
  const response = botLogic.handleMessage(userId, message);
  
  console.log(`[${userId}] Bot: ${response}`);

  res.json({
    success: true,
    response: response,
    timestamp: new Date().toISOString()
  });
});

// API: Get session history
app.get('/api/history/:userId', (req, res) => {
  const { userId } = req.params;
  const history = botLogic.getSessionHistory(userId);
  res.json(history);
});

// API: Clear session
app.post('/api/clear/:userId', (req, res) => {
  const { userId } = req.params;
  botLogic.clearSession(userId);
  res.json({ success: true, message: 'Session cleared' });
});

// API: Get all sessions (for debugging)
app.get('/api/sessions', (req, res) => {
  const sessions = botLogic.getAllSessions();
  res.json(sessions);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    activeSessions: botLogic.getAllSessions().length
  });
});

app.listen(PORT, () => {
  console.log(`\n🤖 WhatsApp Bot Simulator`);
  console.log(`📱 Open: http://localhost:${PORT}`);
  console.log(`📊 Sessions: http://localhost:${PORT}/api/sessions`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log(`\n✅ Server running on port ${PORT}\n`);
});
