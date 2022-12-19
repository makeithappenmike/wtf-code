require('dotenv').config();
const { User } = require('../models');
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
    users: async () => {
      return User.find({});
    },

    me: async (parent, args, context) => {
        if(context.user) {
          try {
            const me = await User.findOne(
              {email: context.user.email})
              return me;
          } catch (error) {
            console.log(error);
        }
      }
    }
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
    createSnippet: async (parent, { name, code, explanation }, context) => {
        try {
          const updatedUser = await User.findOneAndUpdate(
            { email: context.user.email },
            {
              $addToSet: { snippets: { name: name, code: code, explanation: explanation } },
            }, 
            {
              new: true,
            }
        );

        return updatedUser;

        } catch (error) {
          console.log(error);
          
        }
    },

    deleteUser: async (parent, {_id}) => {
        const user = await User.findByIdAndDelete(_id);
        return user;
    },

    deleteSnippet: async (parent, {_id}, context) => {
      try {
        const user = await User.findOneAndUpdate(
          { email: context.user.email },
          {
            $pull: { snippets: { _id: _id } },
          },
      );

      return user;

      } catch (error) {
        console.log(error);
        
      }
  },

    login: async (parent, { email, password }) => {

      // Searching for one User based on an Email address
      const user = await User.findOne({ email });

      console.log(user);


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
        throw new AuthenticationError('Incorrect credentials');
      } else {
      }
      
      // Return the User and the signed Token
      const token = signToken(user);
      return { token, user };
    },

    explainCode: async (parent, {code, explainer}) => {
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createCompletion({
          model: "code-davinci-002",
          prompt: code + explainer,
          temperature: 0,
          max_tokens: 200,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["\"\"\""],
        });

        const answer = response['data']['choices'][0].text;
        return answer;
    
      }  catch (e) {
        console.log(e)
    }
    },

    share: async (parent, {code, explanation, name}, context) => {
      if(context.user) {
        try {
          const me = await User.findOne(
            {email: context.user.email})
        } catch (error) {
          console.log(error);
      }
    }
      
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
              rcpt: context.user.email,
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
              email: context.user.email,
              name: "Hey!",
              type: "to"
            }
          ]
        }
      })
      console.log(response);
    },

    contact: async (parent, {email, name, message}) => {
      const response = await mandrill.messages.send({
        message: {
          from_email: "contact@wtf-code.com",
          from_name: "WTFcode Contact Form",
          subject: `New Message from ${name}`,
          text: `A new message has been sent from the WTFcode contact form! \n
           ${name} with the email address ${email} has the following to say: \n
           \n${message}
          `,

          to: [
            {
              email: "hello@wtf-code.com",
              name: "WTF devs",
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
