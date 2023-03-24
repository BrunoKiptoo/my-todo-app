import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/todos")
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  return (
    <div>
      <h1 className="mb-4">Todo List</h1>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TodoList;
