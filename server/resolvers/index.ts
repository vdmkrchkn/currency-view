import users from '../db';

const resolvers = {
  Query: {
    user: (parent: any, {id}: any, context: any, info: any) => {
      return users.find(user => user.id === id);
    },
    users: (parent: any, args: any, context: any, info: any) => {
      return users;
    },
  },
};

export default resolvers;
