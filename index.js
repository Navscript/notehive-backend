const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ======================
   MIDDLEWARE
====================== */

// ✅ CORS (IMPORTANT FIX)
app.use(cors());

// parse JSON bodies
app.use(express.json());

/* ======================
   DATABASE CONNECTION
====================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/* ======================
   ROUTES
====================== */

// import routes
const roomRoutes = require("./routes/roomRoutes");
const noteRoutes = require("./routes/noteRoutes");

// use routes
app.use("/rooms", roomRoutes);
app.use("/notes", noteRoutes);

// test route (optional)
app.get("/", (req, res) => {
  res.send("NoteHive Backend is running");
});

/* ======================
   SERVER START
====================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
