const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const port = process.env.port || 3000

// Use CORS middleware
app.use(express.json());
app.use(userRoutes);
app.use(cors({
    origin: 'https://regnum-web.vercel.app' // Allow requests only from this origin
  }));
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Could not connect to MongoDB:', error));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});