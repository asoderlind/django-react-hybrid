import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { config } from "../config";
import { Todo } from "../models";
import TodoForm from "../components/TodoForm";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const styles = {
  header: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

const HomePage = () => {
  const { decodedAuthToken, authTokens } = React.useContext(AuthContext);
  const [todos, setTodos] = React.useState<Todo[]>([]);

  if (!authTokens) {
    throw new Error("No auth tokens");
  }

  const commonHeaders = {
    Authorization: `Bearer ${authTokens.access}`,
  };

  async function fetchTodos() {
    const res = await fetch(`${config.apiUrl}/todos/`, {
      credentials: config.credentials,
      headers: {
        ...commonHeaders,
      },
    });
    if (!res.ok) {
      console.log("Error fetching todos");
    } else {
      const data = await res.json();
      setTodos(data);
    }
  }

  async function createTodo(task: string) {
    const res = await fetch(`${config.apiUrl}/todos/`, {
      method: "POST",
      credentials: config.credentials,
      headers: {
        ...commonHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        created_by: decodedAuthToken ? decodedAuthToken.user_id : "",
      }),
    });
    if (!res.ok) {
      console.log("Error creating new todo");
    } else {
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
    }
  }

  async function deleteTodo(todo_id: string) {
    const res = await fetch(`${config.apiUrl}/todos/${todo_id}/`, {
      method: "DELETE",
      credentials: config.credentials,
      headers: {
        ...commonHeaders,
      },
    });
  }

  useEffect(() => {
    fetchTodos();
  }, [authTokens]);

  return decodedAuthToken ? (
    <Container>
      <Typography variant="h4" sx={styles.header}>
        Welcome, {decodedAuthToken.username}!
      </Typography>
      <TodoForm createTodo={createTodo} />
      <Typography variant="h5">Todos</Typography>
      {todos ? (
        <List>
          {todos.map((todo: any) => (
            <ListItem key={todo.id}>
              <ListItemText
                primary={todo.task}
                secondary={`Completed: ${todo.is_complete ? "Yes" : "No"}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </Container>
  ) : (
    <Container>
      <Typography variant="h6">
        You are not logged in, redirecting...
      </Typography>
    </Container>
  );
};

export default HomePage;
