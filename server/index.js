const { ApolloServer, gql } = require("apollo-server");

//schema
const typeDefs = gql`
  type user {
    id: Int!
    name: String!
    email: String!
  }
  input userInput {
    id: Int!
    name: String!
    email: String!
  }
  type Mutation {
    adduser(input: userInput): user
  }

  type Query {
    users: [user]!
  }
`;

const users = [
  { id: 1, name: "hamzah", email: "hamzah@abc.com" },
  { id: 2, name: "areeb", email: "areeb@abc.com" },
  { id: 3, name: "ali", email: "ali@abc.com" },
];

const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    adduser: (_, { input }) => {
      console.log(input);
      return input;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`server url ${url}`);
});
