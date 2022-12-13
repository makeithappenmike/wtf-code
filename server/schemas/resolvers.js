const { User, Snippet } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  // TODO: need to get env working
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const mandrill = require("@mailchimp/mailchimp_transactional")(
  process.env.REACT_APP_MANDRILL
);


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
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
      const token = signToken(user);
      return {token, user};
      } catch (error) {
        console.log(error);
      }
      
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

    explainCode: async (parent, {code, explainer}) => {
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createCompletion({
          model: "code-davinci-002",
          prompt: code + explainer,
          temperature: 0,
          max_tokens: 10,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["\"\"\""],
        });

        const answer = response['data']['choices'][0].text;
        console.log(answer);
        return answer;
    
      }  catch (e) {
        console.log(e)
    }
    },

    share: async (parent, {recipient}) => {
      const message = {
        from_email: "jon@fart.cool",
        subject: "Hello WTDcode",
        text: "Welcome to Mailchimp Transactional!",
        to: [
          {
            email: recipient,
            type: "to"
          }
        ]
      };
      
        const response = await mandrill.messages.send({
          message
        });
        console.log(response);
      
    },
    
  }
};

module.exports = resolvers;
