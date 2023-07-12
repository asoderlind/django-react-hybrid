import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { config } from "../config";
import { Todo } from "../models";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";

const HomePage = () => {
  const { user, authTokens } = React.useContext(AuthContext);
  const [todos, setTodos] = React.useState<Todo[]>([]);

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

  useEffect(() => {
    fetchTodos();
  }, [authTokens]);

  return user ? (
    <Container>
      <Typography variant="h4">
        You are logged in to the homepage! {user.username}
      </Typography>
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
