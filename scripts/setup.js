import { client, q } from './config';

(async () => {
  let response;
  response = await client.query(
    q.If(
      q.Not(q.Exists(q.Collection('todos'))),
      q.CreateCollection({ name: 'todos' }),
      `already exists, not create collection.`
    )
  );
  console.log(response);
  response = await client.query(
    q.If(
      q.Not(q.Exists(q.Index('all_todos'))),
      q.CreateIndex({ name: 'all_todos' }),
      `already exists, not create index.`
    )
  );
  console.log(response);
})();
