const { Schema, model } = require('mongoose');

const snippetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  explaination: {
    type: String,
    required: true
  }
});

const Snippet = model('Snippet', snippetSchema);

module.exports = Snippet;
