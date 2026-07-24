const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { OpenAI } = require('openai');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Smart Study AI Backend' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage: storage });

let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}


// 1. CHATBOT (REAL AI)
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    if (!openai) {
      return res.json({ response: `[MOCK] OpenAI API Key missing in server/.env.\n\nExplanation for "${message}": \n1. Define concepts \n2. Iterate logic \n3. Execute output.` });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful study assistant. Breakdown concepts step by step." }, { role: "user", content: message }],
      model: "gpt-3.5-turbo",
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process chat" });
  }
});

// 2. TRANSLATION FEATURE
app.post('/api/translate', async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) return res.status(400).json({ error: "Text and targetLang required" });

    if (!openai) {
       return res.json({ response: `[MOCK] Translated to ${targetLang}: ${text}` });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `You are a translator. Translate the text to ${targetLang}. Only respond with the translation.` }, { role: "user", content: text }],
      model: "gpt-3.5-turbo",
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to translate text" });
  }
});

// 3. FILE UPLOAD SYSTEM
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    
    // Simulate parsing the file text (since actual pdf-parse isn't requested but simulated analysis is)
    res.json({
      success: true,
      filename: req.file.originalname,
      extractedText: `Successfully parsed document ${req.file.originalname}. Key topics highlighted.`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process upload" });
  }
});

app.listen(port, () => {
  console.log(`Study Assistant Backend running on port ${port}`);
});
