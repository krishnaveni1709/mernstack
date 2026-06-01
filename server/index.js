const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

const path = require('path');

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/build');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-tasks';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.warn('Could not connect to MongoDB at', MONGO_URI);
    console.warn('Falling back to in-memory MongoDB for development.');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB');
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB', memErr);
      process.exit(1);
    }
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
