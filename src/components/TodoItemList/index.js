import { FixedSizeList as List } from 'react-window';
import { TodoItem } from '../TodoItem';
import { getTodoId } from '../../utils/getTodoId';
import { css } from '@emotion/css';
import { memo } from 'react';
const TodoItemList = memo(
  ({
    itemInfoList,
    handleTodoCheckbox,
    updateTodoTitle,
    deleteTodo,
    width = 300,
    height = 400,
  }) => {
    // https://addyosmani.com/blog/react-window/
    // https://react-window.vercel.app/#/examples/list/variable-size
    return (
      <List
        height={height}
        itemCount={itemInfoList.length}
        itemSize={height * 0.3}
        item
        className={css`
          width: 100%;
          @media screen and (max-width: 768px) {
            width: 300px;
          }
        `}
      >
        {({ index, style }) => {
          const todo = itemInfoList[index];
          const { data } = { ...todo };
          const id = getTodoId(todo);
          return (
            <TodoItem
              key={index}
              index={index}
              style={style}
              id={id}
              handleTodoCheckbox={handleTodoCheckbox}
              updateTodoTitle={updateTodoTitle}
              deleteTodo={deleteTodo}
              info={data}
            ></TodoItem>
          );
        }}
      </List>
    );
  }
);

export { TodoItemList };
