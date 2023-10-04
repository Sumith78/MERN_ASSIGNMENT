const Task = require('../models/Task');

const taskController = {
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const task = new Task({ name, description });
      await task.save();
      res.json({ success: true, task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
      if (!updatedTask) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, task: updatedTask });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
      res.json({ success: true, task: deletedTask });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = taskController;
