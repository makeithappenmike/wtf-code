const { User } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
  },
};

module.exports = resolvers;
