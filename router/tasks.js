const express = require("express")
const db = require("../db")
const router = express.Router()

// Fetch all tasks

router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Fetch a single task by ID

router.get('/tasks/:id', (req, res) => {
    // console.log("reques");
  const taskId = req.params.id;
  db.query('SELECT * FROM tasks WHERE task_id = ?', [taskId], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new task

router.post('/tasks', (req, res) => {
  const { user_id, description } = req.body;
  db.query('INSERT INTO tasks (user_id, description) VALUES (?, ?)', [user_id, description], (error, results) => {
    if (error) throw error;
    res.status(201).json({ message: 'Task added successfully', taskId: results.insertId });
  });
});

// Update a task by ID

router.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { description } = req.body;
  db.query('UPDATE tasks SET description = ? WHERE task_id = ?', [description, taskId], (error) => {
    if (error) throw error;
    res.json({ message: 'Task updated successfully' });
  });
});

// Delete a task by ID

router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE task_id = ?', [taskId], (error, results) => {
    if (error) throw error;
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
});

module.exports = router