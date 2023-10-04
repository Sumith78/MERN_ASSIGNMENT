const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/task_manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Error connecting to database', err);
});

app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
