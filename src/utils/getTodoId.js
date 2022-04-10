function getTodoId(todo) {
  if (!todo.ref) {
    return null;
  }
  return todo.ref['@ref'].id;
}

export { getTodoId };
