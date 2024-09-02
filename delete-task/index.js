const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3005;

// Connect to MongoDB
mongoose
  .connect("mongodb://mongodb-container:27017/todolist", {})
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

// Endpoint to delete task by task code
app.delete("/task/:taskCode", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ taskCode: req.params.taskCode });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));