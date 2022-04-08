const { client, q } = require('./utils/config');

exports.handler = async (event, context) => {
  try {
    const { data } = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_todos'))),
        q.Lambda('todo', q.Get(q.Var('todo')))
      )
    );
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
