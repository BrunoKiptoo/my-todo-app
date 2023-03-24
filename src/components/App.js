import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import TodoList from "../pages/TodoList";
import NewTodo from "../pages/NewTodo";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/new">
            <NewTodo user={user} />
          </Route>
          <Route path="/">
            <TodoList />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
