const { client, q } = require('./utils/config');

exports.handler = async (event, context) => {
  try {
    const response = await client.query(
      q.Create(q.Collection('todos'), {
        data: JSON.parse(event.body),
      })
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
