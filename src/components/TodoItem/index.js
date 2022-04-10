import ContentEditable from '../../components/ContentEditable';
import { Layout } from '../../layouts/default';

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
      <div key={index} className="todo-item">
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
          <div className="todo-list-title">
            <ContentEditable
              tagName="span"
              editKey={id}
              onBlur={updateTodoTitle} // save on enter/blur
              html={info.title}
              // onChange={this.handleDataChange} // save on change
            />
          </div>
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
      </div>
    </Layout>
  );
};

export { TodoItem };
