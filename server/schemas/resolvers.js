const { User, Snippet } = require('../models');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },

    snippet: async () => {
        return Snippet.find({});
      },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      return user;
    },
  }
};

module.exports = resolvers;
