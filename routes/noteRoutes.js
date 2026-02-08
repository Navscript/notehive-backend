const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Add a note
router.post("/", async (req, res) => {
  try {
    const { roomId, content } = req.body;

    const note = new Note({ roomId, content });
    await note.save();

    res.json({ message: "Note added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get notes by room
router.get("/:roomId", async (req, res) => {
  try {
    const notes = await Note.find({ roomId: req.params.roomId });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
