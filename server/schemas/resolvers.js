const { User, Snippet } = require('../models');
const { signToken } = require('../utils/auth');

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
      const token = signToken(user);
      return {token, user};
    },
    createSnippet: async (parent, args) => {
        const snippet = await Snippet.create(args);
        return snippet;
      },
      login: async (parent, { email, password }) => {

        // Searching for one User based on an Email address
        const user = await User.findOne({ email });

        console.log(user);

        console.log('Attempting to login');
  
        // If the User is not there, throw an error
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        // Set the Password and check if its correct
        const correctPw = await user.isCorrectPassword(password);
  
        // If its not, throw an error
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        // Return the User and the signed Token
        const token = signToken(user);
        console.log("Token", token);
        return { token, user };
      },
  }
};

module.exports = resolvers;
