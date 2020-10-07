import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;

export default typeDefs;
