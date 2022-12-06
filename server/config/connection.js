require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Jon:gak6paf!RJA8keu3yqv@cluster0.4nbmm6f.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
