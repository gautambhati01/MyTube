const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const videoRoutes = require('./routes/videos');
app.use('/api/videos', videoRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('MyTube Backend Running');
});

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mytube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => {
    console.log('🚀 Server running on http://localhost:5000');
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:', error.message);
});
