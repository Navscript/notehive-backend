const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

/**
 * CREATE A ROOM
 * POST /rooms
 */
router.post("/", async (req, res) => {
  try {
    const { roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({ error: "roomName is required" });
    }

    const room = new Room({ roomName });
    await room.save();

    res.json({
      message: "Room created",
      room,
    });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET ALL ROOMS
 * GET /rooms
 */
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ _id: -1 });
    res.json({ rooms });
  } catch (error) {
    console.error("Fetch rooms error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
