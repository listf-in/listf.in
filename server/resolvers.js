const dgraph = require('dgraph-js');
const grpc = require('grpc');
const PubSub = require('graphql-subscriptions');
const pubsub = new PubSub.PubSub();

// eslint-disable-next-line no-undef
module.exports = {
  Query: {
    //
  },
  Mutation: {
    //
  },
  Subscription: {
    BoardUpdate: {
      subscribe: () => pubsub.asyncIterator(['POST_CREATED']),
    },
  },
};
