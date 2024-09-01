const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3003;

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

// Endpont to update a task
app.put("/task/:taskCode", async (req, res) => {
  try {
    const { taskCode } = req.params;
    const task = await Task.findOneAndUpdate(
      { taskCode: parseInt(taskCode, 10) },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
