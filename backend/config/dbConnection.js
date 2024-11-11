const mongoose = require('mongoose');

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    // console.log('Connected to MongoDB database');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  }
};


module.exports = dbConnection;
