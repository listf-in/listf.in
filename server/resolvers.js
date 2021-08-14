const dgraph = require('dgraph-js');
const grpc = require('grpc');
const db = require('../db/index');

// eslint-disable-next-line no-undef
module.exports = {
  Query: {
    GetUser: (email) => {
      debugger;
      return db.fetchUser(email);
    },
  },
  Mutation: {
    //
  },
};
