require('dotenv').config();
const { User, Snippet } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const mandrill = require("@mailchimp/mailchimp_transactional")(
  process.env.REACT_APP_MANDRILL)

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

    share: async (parent, {recipient, code, explanation, name}) => {
      const response = await mandrill.messages.sendTemplate({
        template_name: "wtfcode-share",
        template_content: [{}],

        message: {
          from_email: "WTFcode@fart.cool",
          from_name: "WTFcode",
          subject: "Hello from WTFcode",
          merge: true,
          merge_language: "handlebars",
          global_merge_vars: [
            {
              name: "SNIPPET_NAME",
              content: "Code Snippet"
            },
            {
              name: "CODE_SNIPPET",
              content: "This is an example code snippet."
            },
            {
              name: "CODE_EXPLANATION",
              content: "This is an example explanation."
            }
          ],
          merge_vars: [
            {
              rcpt: recipient,
              vars: [
                {
                  name: "SNIPPET_NAME",
                  content: name
                },
                {
                  name: "CODE_SNIPPET",
                  content: code
                },
                {
                  name: "CODE_EXPLANATION",
                  content: explanation
                }
              ]
              
            }
          ],

          to: [
            {
              email: recipient,
              name: "Hey!",
              type: "to"
            }
          ]
        }
      })
      console.log(response);
    }
  }
};

module.exports = resolvers;
