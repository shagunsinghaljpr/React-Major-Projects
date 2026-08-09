const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post('/', auth, async (req, res) => {
  const task = new Task({ ...req.body, user: req.user.id });
  await task.save();
  res.json(task);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ msg: 'Task not found' });
  res.json({ msg: 'Task deleted' });
});

module.exports = router;
