import React from "react";
import { FC } from "react";
import { Todo } from "../../App";
import { Checkbox } from "../Checkbox";
import "./style.css";

interface TodoListProps {
  todos: Todo[];
  handleDelete: (id: number) => void;
  handleToggleCompleted: (id: number) => void;
  handleClearCompleted: () => void;
}

export const TodoList: FC<TodoListProps> = ({
  todos,
  handleDelete,
  handleToggleCompleted,
  handleClearCompleted,
}) => {
  const [filter, setFilter] = React.useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todolist">
      {filteredTodos.map((todo) => (
        <div className="todolist__item" key={todo.id}>
          <Checkbox
            checked={todo.completed}
            change={() => {
              handleToggleCompleted(todo.id);
            }}
          />

          <p
            className={
              todo.completed
                ? "todolist__item__text todolist__item__text--mod"
                : "todolist__item__text"
            }
          >
            {todo.text}
          </p>
          <span onClick={() => handleDelete(todo.id)}>X</span>
        </div>
      ))}

      <div className="footer">
        <p>{filteredTodos.length} items left</p>
        <div className="footer__status">
          <button
            className={`footer__status__button ${
              filter === "all" ? "active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            all{" "}
          </button>
          <button
            className={`footer__status__button ${
              filter === "active" ? "active" : ""
            }`}
            onClick={() => setFilter("active")}
          >
            active
          </button>
          <button
            className={`footer__status__button ${
              filter === "completed" ? "active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            {" "}
            completed
          </button>
        </div>
        {
          <button className="clear-completed" onClick={handleClearCompleted}>
            Clear Completed
          </button>
        }
      </div>
    </div>
  );
};
