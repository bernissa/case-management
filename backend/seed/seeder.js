const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Case = require('../models/Case');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error('MongoDB Connection Failed:', err);
});

// Read mock data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'mockcaselist.json'), 'utf-8'));


// Insert data
const seedData = async () => {
  try {
    await Case.deleteMany(); // optional: clear collection first
    await Case.insertMany(data);
    console.log('Data successfully seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
