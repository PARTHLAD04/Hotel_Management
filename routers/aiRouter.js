const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

router.post('/content', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt + "\nRespond in plain text only.",
        });

        const raw = response.text;
        const cleaned = raw
            .replace(/[\n\r]/g, " ")
            .replace(/\*/g, "")
            .replace(/\s+/g, " ")
            .trim();

        res.status(200).json({ response: cleaned });
        // res.status(200).json({ response: response.text });
    } catch (err) {
        console.error('Error generating AI content:', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post("/chat", async (req, res) => {
    try {
        const { message, history } = req.body;
        const formattedHistory = (history || []).map(msg => ({
            role: msg.role,
            parts: [{ text: msg.parts }]
        }));
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                ...formattedHistory,
                {
                    role: "user",
                    parts: [{ text: message }]
                }],
        });
        const reply = response.text;

        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI error" });
    }
});

module.exports = router;