const express = require('express');
const app = express();
const PORT = process.env.PORT  || 3001;

app.use(express.json());

app.get('/task', (req, res) => {
    const task = req.body;
    res.status(201).json({message:'Task created successfully', task});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));