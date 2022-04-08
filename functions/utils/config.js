const faunadb = require('faunadb');

function createFaunaClient() {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SERVER_KEY,
    domain: 'db.fauna.com',
    // NOTE: Use the correct domain for your database's Region Group.
    port: 443,
    scheme: 'https',
  });
  return client;
}

const faunaClient = createFaunaClient();

module.exports = {
  client: faunaClient,
  q: faunadb.query,
};
