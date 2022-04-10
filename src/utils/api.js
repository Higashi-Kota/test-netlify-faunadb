const create = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/.netlify/functions/todos-create', {
        body: JSON.stringify(data),
        method: 'POST',
      });
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

const readAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/.netlify/functions/todos-read-all');
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

const update = (todoId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/.netlify/functions/todos-update/${todoId}`,
        {
          body: JSON.stringify(data),
          method: 'POST',
        }
      );
      const json = await response.json();

      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTodo = (todoId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/.netlify/functions/todos-delete/${todoId}`,
        {
          method: 'POST',
        }
      );
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

const batchDeleteTodo = (todoIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`/.netlify/functions/todos-delete-batch`, {
        body: JSON.stringify({
          ids: todoIds,
        }),
        method: 'POST',
      });
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  create: create,
  readAll: readAll,
  update: update,
  delete: deleteTodo,
  batchDelete: batchDeleteTodo,
};
