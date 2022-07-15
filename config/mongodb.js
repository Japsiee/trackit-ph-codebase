const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    return result;
  } catch(error) {
    console.log(error)
  }
}

module.exports = mongoConnect;