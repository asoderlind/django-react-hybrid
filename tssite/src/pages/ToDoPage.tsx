import React, { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { config } from "../config";
import {
  Button,
  CircularProgress,
  Container,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

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

interface AddTodoProps {
  handleAdd: (task: string) => void;
}

const ToDoView: React.FC = () => {
  const { decodedAuthToken, authTokens } = React.useContext(AuthContext);
  const [todos, setTodos] = React.useState<TodoProps[]>([]);
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
    var url = `${config.apiUrl}/todos/`;
    fetch(url, {
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
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Something went wrong!");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setTodos([...todos, res]);
      })
      .catch((error) => {
        console.error("Something went wrong when adding todo!: ", error);
      });
  }

  async function handleRemove(id: number) {
    var url = `${config.apiUrl}/todos/${id}`;
    fetch(url, {
      method: "DELETE",
      credentials: config.credentials,
      headers: {
        ...commonHeaders,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTodos(todos.filter((todo) => todo.id !== id));
        }
      })
      .catch((error) => {
        console.error("Something went wrong!", error);
      });
  }

  async function handleCheck(id: number) {
    var url = `${config.apiUrl}/todos/${id}`;
    const todoToCheck = todos.find((todo) => todo.id === id);
    if (todoToCheck) {
      const updatedTodo = {
        ...todoToCheck,
        is_complete: !todoToCheck.is_complete,
      };
      fetch(url, {
        method: "PATCH",
        credentials: config.credentials,
        headers: {
          ...commonHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      }).then((res) => {
        if (!res.ok) {
          console.log("Something went wrong when checking todo");
        }
      });
    }
  }

  useEffect(() => {
    getData();
  }, [authTokens]);

  return decodedAuthToken ? (
    <Container>
      <Typography variant="h4" sx={styles.header}>
        Welcome, {decodedAuthToken.username}!
      </Typography>
      <Container component="main" maxWidth="sm">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          To-Do list
        </Typography>
        {todos ? (
          <TodoList
            todos={todos}
            handleRemove={handleRemove}
            handleCheck={handleCheck}
          />
        ) : (
          <CircularProgress />
        )}
        <br />
        <AddTodo handleAdd={handleAdd} />
      </Container>
    </Container>
  ) : (
    <Container>
      <Typography variant="h6">
        You are not logged in, redirecting...
      </Typography>
    </Container>
  );
};

function Todo({ id, task, is_complete, handleRemove, handleCheck }: TodoProps) {
  const [selected, setSelected] = React.useState(is_complete);

  function onClick(event: React.MouseEvent) {
    handleRemove(id);
  }

  function onCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setSelected(event.target.checked);
    handleCheck(id, selected);
  }

  return (
    <ListItem key={id} divider={true}>
      <ListItemText id={String(id)} primary={task} />
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={selected}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": String(id) }}
          onChange={onCheck}
        />
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleRemove,
  handleCheck,
}) => {
  var todoNode = todos.map((todo, index) => {
    return (
      <Todo
        id={todo.id}
        key={todo.id}
        task={todo.task}
        is_complete={todo.is_complete}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    );
  });

  return <List style={{ marginLeft: "5%" }}>{todoNode}</List>;
};

function AddTodo({ handleAdd }: AddTodoProps) {
  const [inputValue, setInputValue] = React.useState("");

  function onClick(event: React.MouseEvent) {
    event.preventDefault();
    var todo = inputValue;
    if (todo === "") return;
    else {
      var form = document.getElementById("myForm") as HTMLFormElement;
      if (form) {
        form.reset();
        handleAdd(todo);
        setInputValue("");
      }
    }
  }

  return (
    <Container>
      <form id="myForm">
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <TextField
              fullWidth={true}
              onChange={(e) => setInputValue(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={onClick}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ToDoView;
