import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import { CreateTodo } from "./components/CreateTodo";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import "./style.css";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {}, [todos]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="App">
      <Container>
        <Header />
        <CreateTodo
          onSubmit={(value) => {
            setTodos((prevTodos) => [...prevTodos, value]);
          }}
        />
        <TodoList
          handleToggleCompleted={handleToggleCompleted}
          handleDelete={handleDelete}
          todos={todos}
          handleClearCompleted={handleClearCompleted}
        />
      </Container>
    </div>
  );
}

export default App;
