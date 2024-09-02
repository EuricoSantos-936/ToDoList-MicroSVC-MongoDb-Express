const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT  || 3001;

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

// Schemna for task codes
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// Model for task codes
const Counter = mongoose.model("Counter", counterSchema);

async function initializeCounter() {
     const counter = await Counter.findById("_id");
     if (!counter) {
       await Counter.create({ _id: "_id", seq: 0 });
     }
}

initializeCounter();

// Create a new task
app.post('/task',async (req, res) => {
   
    try {
        const counter = await Counter.findByIdAndUpdate(
            "_id",
            { $inc: { seq: 1 } },
            { new: true });
        
        if (!counter) {
            return res.status(500).json({ message: "Internal server error" });
        }
        const task = new Task({
          ...req.body,
          taskCode: counter.seq,
        });
        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));