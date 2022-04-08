const { client, q } = require('./utils/config');

exports.handler = async (event, context) => {
  const { ids } = { ...JSON.parse(event.body) };

  try {
    const response = await client.query(
      q.Map(
        ids,
        q.Lambda('id', q.Delete(q.Ref(q.Collection('todos'), q.Var('id'))))
      )
    );
    console.log(response);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
