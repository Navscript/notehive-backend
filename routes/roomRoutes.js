const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Create a room
router.post("/", async (req, res) => {
  try {
    const { roomName } = req.body;

    const room = new Room({ roomName });
    await room.save();

    res.json({
      message: "Room created",
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
