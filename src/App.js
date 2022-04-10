import React, { useState, useEffect, useRef, useCallback } from 'react';
import ContentEditable from './components/ContentEditable';
import { AppHeader } from './components/AppHeader';
import { SettingsMenu } from './components/SettingsMenu';
import SettingsIcon from './components/SettingsIcon';
import analytics from './utils/analytics';
import api from './utils/api';
import { sortByDate } from './utils/sortByDate';
import './App.css';

import styled from '@emotion/styled';

import { ToastContainer } from 'react-toastify';
import { notify } from './utils/notify';

import { getTodoId } from './utils/getTodoId';

import { TodoItemList } from './components/TodoItemList';

import { Nice } from './components/Nice';

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 400px;
  margin-top: 5vh;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const StyledHeader = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vh;
  @media screen and (max-width: 768px) {
    justify-content: space-around;
  }
`;

const StyledInput = styled.input`
  font-size: 14px;
  padding: 11px 15px;
  display: inline-block;
  box-shadow: 0px 0px 0px 2px rgba(120, 130, 152, 0.25);
  border: none;
  outline: none;
  transition: all 0.3s ease;
  &:hover,
  &:active,
  &:focus {
    box-shadow: 0px 0px 0px 2px rgb(43, 190, 185);
    box-shadow: 0px 0px 0px 2px #00ad9f;
  }
  min-width: 200px;
  @media screen and (max-width: 768px) {
    min-width: 300px;
  }
`;

const StyledForm = styled.form`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledFormController = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 15px;
  }
`;

const App = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
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

    if (!data.completedTodoIds.length) {
      handleCloseModal();
      return `Please check off some todos to batch remove them`;
    }

    try {
      const response = await api.batchDelete(data.completedTodoIds);
      analytics.track('todosBatchDeleted', {
        category: 'todos',
      });
      setTodos(data.optimisticState);
      handleCloseModal();
      return `Batch removal complete ${data.completedTodoIds}`;
    } catch (error) {
      return `Something went wrong...`;
    }
  };
  const saveTodo = async (e) => {
    e.preventDefault();
    const task = taskRef.current.value;
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
      setTodos([...todos, response]);
      notify({ message: `Nice Work! Add Todo.` });
      taskRef.current.value = ``;
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
    return (
      <TodoItemList
        itemInfoList={todos}
        handleTodoCheckbox={handleTodoCheckbox}
        updateTodoTitle={updateTodoTitle}
        deleteTodo={deleteTodo}
      />
    );
  };

  const [hoge, setHoge] = useState('');

  return (
    <StyledContainer>
      <StyledHeader>
        Create todo
        <SettingsIcon onClick={handleOpenModal} />
      </StyledHeader>
      <StyledForm onSubmit={saveTodo}>
        <StyledInput
          placeholder="Add a todo item"
          name="name"
          autoComplete="off"
          ref={taskRef}
        />
        <StyledFormController>
          <button className="todo-create-button">Create todo</button>
        </StyledFormController>
      </StyledForm>
      {renderTodoItemList()}
      <SettingsMenu
        showMenu={showMenu}
        handleModalClose={handleCloseModal}
        handleClearCompleted={clearCompleted}
      />
    </StyledContainer>
  );
};

export { App };
