import React from "react";

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
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
