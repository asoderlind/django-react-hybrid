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
  Button,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";

const styles = {
  header: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

interface TodoProps {
  id: number;
  task: string;
  is_complete: boolean;
  handleRemove: (id: number) => void;
  handleCheck: (id: number, checked: boolean) => void;
}

interface TodoListProps {
  todos: Array<TodoProps>;
  handleRemove: (id: number) => void;
  handleCheck: (id: number, checked: boolean) => void;
}

const ToDoView: React.FC = () => {
  const { decodedAuthToken, authTokens } = React.useContext(AuthContext);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);

  if (!authTokens) {
    throw new Error("No auth tokens");
  }

  const commonHeaders = {
    Authorization: `Bearer ${authTokens.access}`,
  };

  const getData = React.useCallback(() => {
    var url = `${config.apiUrl}/todos`;
    loading &&
      fetch(url, {
        credentials: config.credentials,
        headers: {
          ...commonHeaders,
        },
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          if (!response.ok) {
            return [];
          } else if (
            contentType &&
            contentType.indexOf("application/json") !== -1
          ) {
            return response.json();
          } else {
            return [];
          }
        })
        .then((res) => {
          setTodos(res);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Something went wrong with connection!:", error);
        });
  }, [loading]);

  async function handleAdd(task: string) {
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

  async function handleRemove(todo_id: string) {
    const res = await fetch(`${config.apiUrl}/todos/${todo_id}/`, {
      method: "DELETE",
      credentials: config.credentials,
      headers: {
        ...commonHeaders,
      },
    });
  }

  function handleCheck() {}

  useEffect(() => {
    getData();
  }, [authTokens]);

  return decodedAuthToken ? (
    <Container>
      <Typography variant="h4" sx={styles.header}>
        Welcome, {decodedAuthToken.username}!
      </Typography>
      <TodoForm createTodo={handleAdd} />
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

interface TodoFormProps {
  createTodo: (task: string) => void;
}

const TodoForm = ({ createTodo }: TodoFormProps) => {
  const [newTodo, setNewTodo] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo(newTodo);
        setNewTodo("");
      }}
    >
      <FormControl>
        <FormLabel htmlFor="newTodo">New Todo</FormLabel>
        <TextField
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
          required
        />
        <Button type="submit">Add Todo</Button>
      </FormControl>
    </form>
  );
};

export default ToDoView;
