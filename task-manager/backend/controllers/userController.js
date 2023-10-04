// userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  signUp: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ username, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;
