const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
// app.use(cors());
const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(express.json()); // To parse JSON request bodies

// Register case routes
const caseRoutes = require('./routes/caseRoutes');
app.use('/api/cases', caseRoutes);

// Use the route
app.use('/api/users', userRoutes);

// routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
