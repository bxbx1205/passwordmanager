const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Password = require("./Password");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("mongo on hogya"))
    .catch((err) => console.error("MongoDB error:", err));

app.get("/api/passwords", async (req, res) => {
    const passwords = await Password.find();
    res.json(passwords);
});

app.post("/api/passwords", async (req, res) => {
    const newPassword = new Password(req.body);
    const saved = await newPassword.save();
    res.json(saved);
});

app.put("/api/passwords/:id", async (req, res) => {
    const updated = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

app.delete("/api/passwords/:id", async (req, res) => {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
