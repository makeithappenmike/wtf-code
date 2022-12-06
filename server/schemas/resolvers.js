const { User, Snippet } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


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
    createUser: async (parent, username, email, password) => {
      const user = await User.create(username, email, password);
      const token = signToken(user);
      return {token, user};
    },
    createSnippet: async (parent, args) => {
        const snippet = await Snippet.create(args);
        return snippet;
    },

    deleteUser: async (parent, {_id}) => {
        const user = await User.findByIdAndDelete(_id);
        return user;
    },

    deleteSnippet: async (parent, {_id}) => {
      const snippet = await Snippet.findByIdAndDelete(_id);
      return snippet;
 }        
      },
      login: async (parent, { email, password }) => {

        // Searching for one User based on an Email address
        const user = await User.findOne({ email });

        console.log(user);

        console.log('Attempting to login');
  
        // If the User is not there, throw an error
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        } else {
          console.log('User found, checking password.');
        }
  
        // Set the Password and check if its correct
        const correctPw = await user.isCorrectPassword(password);
  
        // If its not, throw an error
        if (!correctPw) {
          console.log('password', password);
          throw new AuthenticationError('Incorrect credentials');
        } else {
          console.log('Logged in!');
        }
        
        // Return the User and the signed Token
        const token = signToken(user);
        console.log("Token", token);
        return { token, user };
      },
  };

module.exports = resolvers;
