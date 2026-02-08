const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const roomRoutes = require("./routes/roomRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/rooms", roomRoutes);
app.use("/notes", noteRoutes);

// test route
app.get("/", (req, res) => {
  res.send("NoteHive Backend is running");
});

// 🔴 CONNECT TO MONGODB FIRST, THEN START SERVER
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
