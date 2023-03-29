import { useState } from "react";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";

function NewTodo({ user }) {
  const [title, setTitle] = useState("My Awesome Todo");
  const [description, setDescription] = useState("This is my awesome todo.");
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(null);

  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://task-train-rails-7l2f.onrender.com//todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleDelete() {
    setIsLoading(true);
    fetch(`https://task-train-rails-7l2f.onrender.com//todos/${id}`, {
      method: "DELETE",
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  function handleEdit() {
    setIsLoading(true);
    fetch(`https://task-train-rails-7l2f.onrender.com//todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        completed,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h2>New Todo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCompleted">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form.Group>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <Button variant="primary" type="submit">
              Create Todo
            </Button>{" "}
            <Button variant="danger" onClick={handleDelete}>
              Delete Todo
            </Button>{" "}
            <Button variant="warning" onClick={handleEdit}>
              Edit Todo
            </Button>
          </>
        )}
        {errors.map((err) => (
          <p style={{ color: "red" }}>{err}</p>
        ))}
      </Form>
    </div>
  );
}

export default NewTodo;
