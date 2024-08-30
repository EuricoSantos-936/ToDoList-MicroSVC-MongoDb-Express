const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.put("/task:id", (req, res) => {
  const taskId = req.params.id;
  const updateTask = req.body;

  res.status(200).json({ message: "Task ${taskId} updated successfully", task });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
