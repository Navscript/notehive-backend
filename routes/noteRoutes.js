const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * ADD NOTE
 * POST /notes
 */
router.post("/", async (req, res) => {
  try {
    const { roomId, content } = req.body;

    if (!roomId || !content) {
      return res.status(400).json({ error: "roomId and content required" });
    }

    const note = new Note({ roomId, content });
    await note.save();

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * 🔥 GENERATE QUESTIONS USING GEMINI
 * GET /notes/generate/:roomId
 * (MUST COME BEFORE /notes/:roomId)
 */
router.get("/generate/:roomId", async (req, res) => {
  try {
    const notes = await Note.find({ roomId: req.params.roomId });

    if (notes.length === 0) {
      return res.json({ output: "No notes found for this room." });
    }

    const combinedText = notes.map(n => n.content).join("\n");

    const prompt = `
Generate 5 clear exam-oriented questions with answers
from the following study notes.

Format strictly as:
Q1: question
A1: answer

Notes:
${combinedText}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ output });

  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

/**
 * GET NOTES BY ROOM
 * GET /notes/:roomId
 */
router.get("/:roomId", async (req, res) => {
  try {
    const notes = await Note.find({ roomId: req.params.roomId });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
