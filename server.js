const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Task } = require('./models');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// Create task
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title });
  res.status(201).json(task);
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findByPk(id);
  if (!task) return res.status(404).send('Task not found');

  task.title = title;
  task.completed = completed;
  await task.save();

  res.json(task);
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).send('Task not found');

  await task.destroy();
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
