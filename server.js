const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize AI (Replace 'YOUR_API_KEY' with your actual Gemini API Key)
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

// --- AI Learning Logic ---
app.post('/api/generate-lesson', async (req, res) => {
    const { topic } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Create a structured lesson about "${topic}". 
        Include: 1. A short explanation. 2. Three key bullet points. 3. One quiz question.
        Format the response strictly as a JSON object with keys: title, explanation, points[], and quiz.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Return the AI generated lesson
        res.json(JSON.parse(text));
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate lesson at peak performance." });
    }
});

// --- Global Ranking (Mock Data for now) ---
app.get('/api/rankings', (req, res) => {
    const topLearners = [
        { rank: 1, name: "User_Alpha", points: 1500 },
        { rank: 2, name: "User_Beta", points: 1250 },
        { rank: 3, name: "User_Gamma", points: 900 }
    ];
    res.json(topLearners);
});

// Serve static files from the React app (once built)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Vect.ai Engine running at ${PORT}`);
});

