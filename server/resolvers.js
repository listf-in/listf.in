/* eslint-disable no-undef */
const dgraph = require('dgraph-js');
const grpc = require('grpc');
const graphqlSubscriptions = require('graphql-subscriptions');
const pubsub = new graphqlSubscriptions.PubSub();

module.exports = {
  Query: {
    //
  },
  Mutation: {
    //
  },
  Subscription: {
    BoardUpdate: {
      subscribe: () => {
        return {
          id: '',
          owner: { id: '', name: '' },
          name: 'wow',
          home: true,
          members: [
            {
              id: '',
              name: '',
            },
          ],
          listItems: [],
        };
      },
    },
  },
};
