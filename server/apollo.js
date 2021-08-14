const gql = require('graphql-tag');
const ApolloClient = require('apollo-client').ApolloClient;
const fetch = require('node-fetch');
const createHttpLink = require('apollo-link-http').createHttpLink;
const setContext = require('apollo-link-context').setContext;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;

const httpLink = createHttpLink({
  uri: 'http://144.126.217.146:8080/graphql',
  fetch: fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const query = async (req, res) => {
  debugger;

  if (!req.body || !req.body.query) {
    res.sendStatus(500);
    return;
  }

  const query = gql(req.body.query);
  let variables = undefined;
  if (req.body.variables && Object.keys(req.body.variables).length !== 0) {
    variables = JSON.parse(decodeURIComponent(req.body.variables));
  }

  try {
    const result = await client.query({
      query,
      variables,
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send(JSON.stringify(err));
  }
};

const mutate = async (req, res) => {
  debugger;
  if (!req.body || !req.body.query) {
    res.sendStatus(500);
    return;
  }

  const query = gql(req.body.query);
  let variables = undefined;
  if (req.body.variables && Object.keys(req.body.variables).length !== 0) {
    variables = JSON.parse(decodeURIComponent(req.body.variables));
  }

  try {
    debugger;

    const result = await client.mutate({
      query,
      variables,
    });
    debugger;

    res.json(result);
  } catch (err) {
    debugger;

    console.log(err);
    res.sendStatus(500).send(JSON.stringify(err));
  }
};

const apollo = async (req, res, next) => {
  if (req.body.query.startsWith('mutation')) {
    await mutate(req, res);
  } else {
    await query(req, res);
  }

  next();
};

module.exports = apollo;
