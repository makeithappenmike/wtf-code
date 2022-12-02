require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = 'test'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
