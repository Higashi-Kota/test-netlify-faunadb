import ContentEditable from '../../components/ContentEditable';
import { Layout } from '../../layouts/default';
import styled from '@emotion/styled';

const StyledTodoListTitle = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #5a5a5a;
  flex-grow: 1;
  position: relative;
  z-index: 2;
  margin-left: 45px;
  width: 100%;
  max-width: 80%;
  &:hover span[contenteditable='false']:before {
    content: 'click to edit';
    position: absolute;
    top: -6px;
    left: 11px;
    font-size: 11px;
    font-weight: 300;
    color: #adadad;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    /* Disable Auto Zoom in Input “Text” tag - Safari on iPhone */
    font-size: 16px;
    max-width: 88%;
    margin-left: 40px;
    &:hover span[contenteditable='false']:before {
      content: '';
    }
    &:hover span[contenteditable='true']:before {
      content: 'click to edit';
      position: absolute;
      top: -20px;
      left: 9px;
      font-size: 11px;
      font-weight: 300;
      color: #adadad;
      letter-spacing: 1px;
    }
  }
`;

const StyledTodoItem = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoItem = ({
  index,
  style,
  id,
  info,
  handleTodoCheckbox,
  updateTodoTitle,
  deleteTodo,
}) => {
  const boxIcon = info.completed ? '#todo__box__done' : '#todo__box';
  return (
    <Layout>
      <StyledTodoItem key={index}>
        <label className="todo">
          <input
            data-id={id}
            className="todo__state"
            type="checkbox"
            onChange={handleTodoCheckbox}
            checked={info.completed}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 25"
            className="todo__icon"
          >
            <use xlinkHref={`${boxIcon}`} className="todo__box"></use>
            <use xlinkHref="#todo__check" className="todo__check"></use>
          </svg>
          <StyledTodoListTitle>
            <ContentEditable
              tagName="span"
              editKey={id}
              onBlur={updateTodoTitle} // save on enter/blur
              html={info.title}
              // onChange={this.handleDataChange} // save on change
            />
          </StyledTodoListTitle>
        </label>
        <button
          data-id={id}
          onClick={deleteTodo}
          style={{
            marginRight: 10,
            zIndex: 1,
          }}
        >
          delete
        </button>
      </StyledTodoItem>
    </Layout>
  );
};

export { TodoItem };
