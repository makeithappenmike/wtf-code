const db = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

db.once('open', async () => {
    // this deletes the table so we're starting fresh
  await User.deleteMany({});
  console.log("dropped the table successfully.")

  const Users = await User.insertMany(userData);

  console.log('Users seeded!');
  process.exit(0);
});
