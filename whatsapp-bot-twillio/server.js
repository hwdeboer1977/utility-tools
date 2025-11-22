require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const { handleMessage } = require("./bot/bot-logic");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio webhook for WhatsApp
app.post("/whatsapp", (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  const from = req.body.From;       // whatsapp:+316xxxx
  const body = req.body.Body || ""; // message content

  const reply = handleMessage(from, body);

  twiml.message(reply);

  res.type("text/xml");
  res.send(twiml.toString());
});

const PORT = 3000;
app.listen(PORT, () => console.log("WhatsApp bot running on port", PORT));
