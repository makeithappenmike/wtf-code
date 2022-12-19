const db = require('../config/connection');
const { User, Snippet } = require('../models');

const userData = require('./userData.json');
const snippetData = require('./snippetData.json');

db.once('open', async () => {

  // Drop the User table to start fresh
  await User.deleteMany({});
  console.log('User table dropped successfully!')

  // Seed the database with Users
  const Users = await User.insertMany(userData);
  console.log('Users seeded!');

  // Drop the Snippet table to start fresh
  await Snippet.deleteMany({});
  console.log('dropped Snippet table successfully.')

  // Seed the database with Snippets
  const Snippets = await Snippet.insertMany(snippetData);
  console.log('Snippets seeded!');

  // Exit
  process.exit(0);

});
