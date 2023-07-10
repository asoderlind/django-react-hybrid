import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { config } from "../config";
import { Todo } from "../models";

const HomePage = () => {
  const { user, authTokens } = React.useContext(AuthContext);
  const [todos, setTodos] = React.useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      if (authTokens) {
        const res = await fetch(`${config.apiUrl}/todos/`, {
          credentials: config.credentials,
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        const data = await res.json();
        console.log(data);
        setTodos(data);
      }
    }

    fetchTodos();
  }, [authTokens]);

  return user ? (
    <div>
      <p>You are logged in to the homepage! {user.username}</p>
      <h2>Todos</h2>
      {todos ? (
        <ul>
          {todos.map((todo: any) => (
            <li key={todo.id}>
              {todo.task} {String(todo.is_complete)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  ) : (
    <div>
      <p>You are not logged in, redirecting...</p>
    </div>
  );
};

export default HomePage;
