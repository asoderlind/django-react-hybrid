import React from "react";
import {
  Input,
  Button,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";

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

export default TodoForm;
