const { client, q } = require('./utils/config');
const { getId } = require('./utils/getId');

exports.handler = async (event, context) => {
  const willUpdatedData = JSON.parse(event.body);
  const id = getId(event.path);
  try {
    const response = await client.query(
      q.Update(q.Ref(q.Collection('todos'), id), {
        data: willUpdatedData,
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
