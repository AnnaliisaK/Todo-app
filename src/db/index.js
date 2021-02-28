const mongoose = require('mongoose');
const path = require('path');

// Sqlite DB filepath relative to the current file
const DB_PATH = path.join(__dirname, '..', '..', 'database', process.env.DB_NAME);

const db = new mongoose.Database(DB_PATH, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log(`Connected to "${process.env.DB_NAME}" database!`);
});

module.exports = db;