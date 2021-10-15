/* eslint-disable no-undef */
const gql = require('graphql-tag');
const ApolloClient = require('apollo-client').ApolloClient;
const fetch = require('node-fetch');
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

const httpLink = createHttpLink({
  uri: 'https://icy-snowflake.us-west-2.aws.cloud.dgraph.io/graphql',
  fetch: fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const whatToDelete = (container) => {
  let containers = [];
  let boards = [];
  let lowerParents = [];
  let newParents = [];
  if (container.board.listItems) {
    containers.push(container.id);
    boards.push(container.board.id);
    container.board.listItems.forEach((cont) => {
      if (cont.board.parents > 1) {
        containers.push(cont.id);
        lowerParents.push(cont.board.id);
        newParents.push(cont.board.parents - 1);
      } else {
        const [conts, boardies, notOrphans, newerParents] = whatToDelete(cont);
        containers = containers.concat(conts);
        boards = boards.concat(boardies);
        lowerParents = lowerParents.concat(notOrphans);
        newParents = newParents.concat(newerParents);
      }
    });
  } else {
    deleter(container.id);
  }

  return [containers, boards, lowerParents, newParents];
};

const containerFetch = (id) => {
  return client
    .query({
      query: gql`
      query { getOrder(id: "${id}") {
    id
    board {
      id
      parents
      listItems {
        id
        board {
          parents
          id
        }
      }
    }
  }
    }
    `,
    })
    .then((data) => data.data.getOrder)
    .catch((err) => console.log(err));
};

const deleteContainer = (id, attempt = 0) => {
  return client
    .mutate({
      mutation: gql`
      mutation {
        deleteOrder(filter: {id: "${id}"}) {
          msg
        }
      }
    `,
    })
    .then((data) => {
      console.log(id);
      return data.data.deleteOrder;
    })
    .catch((err) => {
      if (attempt < 10) {
        deleteContainer(id, attempt + 1);
      }
      console.log(err);
    });
};

const deleteBoard = (id, attempt = 0) => {
  return client
    .mutate({
      mutation: gql`
      mutation {
        deleteBoard(filter: {id: "${id}"}) {
          msg
        }
      }
    `,
    })
    .then((data) => {
      console.log(id);
      return data.data.deleteBoard;
    })
    .catch((err) => {
      if (attempt < 10) {
        deleteBoard(id, attempt + 1);
      }
      console.log(err);
    });
};

const lowerParent = (id, parents) => {
  return client
    .mutate({
      mutation: gql`
      mutation {
        updateBoard(input: {filter: {id: "${id}"}, set: {parents: ${parents}}}) {
          numUids
      }
    }
    `,
    })
    .then((data) => data.data.updateBoard)
    .catch((err) => console.log(err));
};

const deleter = (id) => {
  containerFetch(id)
    .then((container) => {
      return whatToDelete(container);
    })
    .then(([containers, boards, lowerParents, newParents]) => {
      console.log(containers, boards, lowerParents, newParents);
      containers.map((id) => deleteContainer(id));
      boards.map((id) => deleteBoard(id));
      lowerParents.map((id, i) => lowerParent(id, newParents[i]));
    })
    .catch((err) => console.log(err));
};

module.exports = deleter;
