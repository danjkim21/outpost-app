const mongoose = require('mongoose');
const express = require('express');
const app = express();

const connectDB = async () => {
  try {
    // ***** DB Connection ***** //
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // ***** Run Server Connection ***** //
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}/`);
    });
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
