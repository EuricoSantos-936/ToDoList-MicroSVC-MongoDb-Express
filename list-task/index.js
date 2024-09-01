const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3004;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todolist", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Middleware to parse JSON request body
app.use(express.json());

// Schema for tasks
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: Boolean,
  taskCode: { type: Number, unique: true, required: true },
});

// Model for tasks
const Task = mongoose.model("Task", taskSchema);

// Endpoint to list all tasks
app.get("/task", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Endpoint to list a task by taskCode
app.get("/task/:taskCode", async (req, res) => {
  try {
    const task = await Task.findOne({ taskCode: req.params.taskCode });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));