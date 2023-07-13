import React from "react";
import Button from "@mui/material/Button";

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
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
        required
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
};

export default TodoForm;
