import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Message } from "./models/Message.model.mjs";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_connection_string";
const DB_NAME = "message-board";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json({
      message: "Messages retrieved",
      messages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/create", async (req, res) => {
  try {
    const message = new Message(req.body);
    const result = await message.save();
    res.status(201).json({
      message: "Message created",
      result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
});
