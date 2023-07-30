import AuthContext from "../context/AuthContext";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import DeleteIcon from "@mui/material/icon/Delete";
import {
  AppBar,
  Container,
  CssBaseline,
  InputBase,
  IconButton,
  Toolbar,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Checkbox,
  Grid,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@mui/material";

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

const ToDoView: React.FC<TodoViewProps> = ({ userDetails }) => {
  const classes = useStyles();
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  let history = useHistory();

  function signoff() {
    var url = `${config.base_url}/auth/logout`;
    fetch(url, {
      method: "GET",
      credentials: config.credentials,
    })
      .then((response) => {
        if (!response.ok) {
          return { success: false };
        } else {
          return { success: true };
        }
      })
      .then((res) => {
        if ("success" in res && res["success"]) {
          sessionStorage.clear();
          history.push("/");
        }
      })
      .catch((error) => {
        console.error("Something went wrong with connection!:", error);
      });
  }

  const getData = React.useCallback(() => {
    var url = `${config.base_url}/api/todo`;
    loading &&
      fetch(url, {
        method: "GET",
        credentials: config.credentials,
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

  React.useEffect(getData, [loading]);

  function handleRemove(id: string) {}

  function handleCheck(id: string, checkStatus: boolean) {
    todos[id].is_complete = checkStatus;
  }

  function handleAdd(todo) {}

  return (
    <section className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`${userdetails.first_name}'s To-Do list`}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div>
            <IconButton
              aria-label="Sign Off"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={signoff}
              color="inherit"
            >
              <PowerSettingsNewIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          To-Do list
        </Typography>
        <TodoList
          todos={todos}
          handleRemove={handleRemove}
          handleCheck={handleCheck}
        />
        <br />
        <AddTodo handleAdd={handleAdd} />
      </Container>

      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </section>
  );
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleRemove,
  handleCheck,
}) => {
  var todoNode = todos.map((todo, index) => {
    return (
      <Todo
        key={index}
        todo={todo.task}
        id={index}
        checked={todo.is_complete}
        handleRemove={handleRemove}
        handleCheck={handleCheck}
      />
    );
  });

  return <List style={{ marginLeft: "5%" }}>{todoNode}</List>;
};

const listElementStyles = {
  fontSize: 18,
  lineHeight: "24px",
};

const listElementCheckedStyles = {
  ...listElementStyles,
  textDecoration: "line-through",
};

function Todo({ todo, id, checked, handleRemove, handleCheck }) {
  const [selected, setSelected] = React.useState(checked);
  const listStyles = !selected ? listElementStyles : listElementCheckedStyles;

  function onClick(event) {
    handleRemove(id);
  }

  function onCheck(event) {
    setSelected(event.target.checked);
    handleCheck(id, selected);
  }

  return (
    <ListItem key={id} divider={true} style={listStyles}>
      <ListItemText id={id} primary={todo} />
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={selected}
          tabIndex={-1}
          disableRipple
          inputProps={{ "aria-labelledby": id }}
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

function AddTodo({ handleAdd }) {
  const [inputValue, setInputValue] = React.useState("");

  function onClick(event) {
    event.preventDefault();
    var todo = inputValue;
    if (todo === "") return;
    else {
      var form = document.getElementById("myForm");
      form.reset();
      handleAdd(todo);
      setInputValue("");
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
              primary="true"
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
