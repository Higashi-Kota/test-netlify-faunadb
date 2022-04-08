import faunadb from 'faunadb';

import dotenv from 'dotenv';

dotenv.config();

const q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SERVER_KEY,
  domain: 'db.fauna.com',
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
});

export { q, client };
