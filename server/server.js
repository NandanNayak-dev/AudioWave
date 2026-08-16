require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const syncRoutes = require('./routes/syncRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/local-sync', syncRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Sync server running on port ${PORT}`));
