const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!

  }

  type Auth {
    token: ID!
    user: User
  }

  type Snippet {
    _id: ID!
    name: String!
    code: String!
    explaination: String!

  }

  type Query {
    user: [User]
    snippet: [Snippet]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createSnippet(name: String!, code: String!, explaination: String!): Snippet
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
