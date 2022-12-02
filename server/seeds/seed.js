const db = require('../config/connection');
const { User, Snippet } = require('../models');

const userData = require('./userData.json');
const snippetData = require('./snippetData.json');

db.once('open', async () => {
  // this deletes the table so we're starting fresh
  await User.deleteMany({});
  console.log("dropped User table successfully.")

  const Users = await User.insertMany(userData);
  console.log('Users seeded!');

  await Snippet.deleteMany({});
  console.log("dropped Snippet table successfully.")

  const Snippets = await Snippet.insertMany(snippetData);

  console.log('Snippets seeded!');

  process.exit(0);
});
