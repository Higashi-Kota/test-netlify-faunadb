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
    height = 500,
  }) => {
    if (itemInfoList.length === 0) {
      return <div>{'Nothing Todo...'}</div>;
    } else {
      // https://addyosmani.com/blog/react-window/
      // https://react-window.vercel.app/#/examples/list/variable-size
      return (
        <List
          height={height}
          itemCount={itemInfoList.length}
          itemSize={Math.floor(height / itemInfoList.length) + 10}
          className={css`
            width: 100%;
            @media screen and (max-width: 768px) {
              width: 100%;
              height: auto;
            }
          `}
          style={{
            overflow: 'hidden',
            overflowY: 'auto',
          }}
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
  }
);

export { TodoItemList };
