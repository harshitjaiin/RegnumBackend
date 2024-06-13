const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');  // Import path module

const app = express();
const port = process.env.PORT || 3000;  // Ensure port is defined

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Use user routes
app.use('/api', userRoutes);

// Fallback route to serve index.html for any undefined routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Connect to MongoDB
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
