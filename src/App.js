import React, { useState, useEffect, useRef } from 'react';
import ContentEditable from './components/ContentEditable';
import { AppHeader } from './components/AppHeader';
import { SettingsMenu } from './components/SettingsMenu';
import SettingsIcon from './components/SettingsIcon';
import analytics from './utils/analytics';
import api from './utils/api';
import sortByDate from './utils/sortByDate';
import isLocalHost from './utils/isLocalHost';
import './App.css';

import { ToastContainer } from 'react-toastify';
import { notify } from './utils/notify';

import { getTodoId } from './utils/getTodoId';

import { TodoItemList } from './components/TodoItemList';

const App = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [task, setTask] = useState('');
  const taskRef = useRef(null);

  useEffect(() => {
    /* Track a page view */
    analytics.page();
    // Fetch all todos
    api.readAll().then((todos) => {
      console.log('all todos', todos);
      setTodos(todos);
    });
  }, []);

  const handleTodoChange = (e) => {
    setTask(e.target.value);
  };
  const handleOpenModal = (e) => {
    setShowMenu(true);
    analytics.track('modalOpened', {
      category: 'modal',
    });
  };
  const handleCloseModal = (e) => {
    setShowMenu(false);
    analytics.track('modalClosed', {
      category: 'modal',
    });
  };

  const clearCompleted = async (e) => {
    // Optimistically remove todos from UI
    const data = todos.reduce(
      (acc, current) => {
        if (current.data.completed) {
          // save item being removed for rollback
          acc.completedTodoIds = acc.completedTodoIds.concat(
            getTodoId(current)
          );
          return acc;
        }
        // filter deleted todo out of the todos list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        completedTodoIds: [],
        optimisticState: [],
      }
    );

    console.log(data);

    if (!data.completedTodoIds.length) {
      handleCloseModal();
      return `Please check off some todos to batch remove them`;
    }

    try {
      const response = await api.batchDelete(data.completedTodoIds);
      console.log(response);
      analytics.track('todosBatchDeleted', {
        category: 'todos',
      });
      setTodos(data.optimisticState);
      return `Batch removal complete ${data.completedTodoIds}`;
    } catch (error) {
      return `Something went wrong...`;
    }
  };
  const saveTodo = async (e) => {
    e.preventDefault();
    if (!task) {
      taskRef.current.focus();
      notify({ message: `Please add Todo title` });
      return false;
    }

    const todoInfo = {
      title: task,
      completed: false,
    };

    try {
      const response = await api.create(todoInfo);
      analytics.track('todoCreated', {
        category: 'todos',
        label: task,
      });
      notify({ message: `Nice Work! Add Todo.` });
    } catch (error) {
      taskRef.current.focus();
      notify({ message: `Something went worng...` });
    }
    return false;
  };

  const handleTodoCheckbox = async (e) => {
    const { target } = e;
    const todoCompleted = target.checked;
    const todoId = target.dataset.id;

    const updatedTodos = todos.map((todo, i) => {
      const { data } = todo;
      const id = getTodoId(todo);
      if (id === todoId && data.completed !== todoCompleted) {
        data.completed = todoCompleted;
      }
      return todo;
    });

    try {
      const response = await api.update(todoId, {
        completed: todoCompleted,
      });
      const eventName = todoCompleted ? 'todoCompleted' : 'todoUnfinished';
      analytics.track(eventName, {
        category: 'todos',
      });
      setTodos(updatedTodos);
      notify({ message: `Nice Work! Update Todo.` });
    } catch (error) {
      notify({ message: `Something went worng...` });
    }
  };

  const updateTodoTitle = async (event, currentValue) => {
    let isDifferent = false;
    const todoId = event.target.dataset.key;

    const updatedTodos = todos.map((todo, i) => {
      const id = getTodoId(todo);
      if (id === todoId && todo.data.title !== currentValue) {
        todo.data.title = currentValue;
        isDifferent = true;
      }
      return todo;
    });

    // only set state if input different
    if (isDifferent) {
      try {
        const response = await api.update(todoId, {
          title: currentValue,
        });
        analytics.track('todoUpdated', {
          category: 'todos',
          label: currentValue,
        });
        setTodos(updatedTodos);
        notify({ message: `Nice Work! Update Todo Title.` });
      } catch (error) {
        notify({ message: `Something went worng...` });
      }
    }
  };

  const deleteTodo = async (e) => {
    const todoId = e.target.dataset.id;

    // Optimistically remove todo from UI
    const filteredTodos = todos.reduce(
      (acc, current) => {
        const currentId = getTodoId(current);
        if (currentId === todoId) {
          // save item being removed for rollback
          acc.rollbackTodo = current;
          return acc;
        }
        // filter deleted todo out of the todos list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackTodo: {},
        optimisticState: [],
      }
    );
    console.log(filteredTodos);

    try {
      const response = await api.delete(todoId);
      analytics.track('todoDeleted', {
        category: 'todos',
      });
      setTodos(filteredTodos.optimisticState);
      notify({ message: `Nice Work! Delete Todo.` });
    } catch (error) {
      notify({ message: `Something went worng...` });
      setTodos(
        filteredTodos.optimisticState.concat(filteredTodos.rollbackTodo)
      );
    }
  };

  const renderTodoItemList = () => {
    const timeStampKey = 'ts';
    const orderBy = 'desc'; // or `asc`
    const sortOrder = sortByDate(timeStampKey, orderBy);
    const todosByDate = todos.sort(sortOrder);
    console.log(todosByDate);
    return (
      <TodoItemList
        itemInfoList={todosByDate}
        handleTodoCheckbox={handleTodoCheckbox}
        updateTodoTitle={updateTodoTitle}
        deleteTodo={deleteTodo}
      />
    );
  };

  return (
    <div>
      <div>
        <h2>
          Create todo
          <SettingsIcon onClick={handleOpenModal} className="mobile-toggle" />
        </h2>
        <form className="todo-create-wrapper" onSubmit={saveTodo}>
          <input
            className="todo-create-input"
            placeholder="Add a todo item"
            name="name"
            value={task}
            onChange={handleTodoChange}
            autoComplete="off"
            style={{ marginRight: 20 }}
            ref={taskRef}
          />
          <div className="todo-actions">
            <button className="todo-create-button">Create todo</button>
            <SettingsIcon
              onClick={handleOpenModal}
              className="desktop-toggle"
            />
          </div>
        </form>
        {renderTodoItemList()}
      </div>
      <SettingsMenu
        showMenu={showMenu}
        handleModalClose={handleCloseModal}
        handleClearCompleted={clearCompleted}
      />
    </div>
  );
};

export { App };
