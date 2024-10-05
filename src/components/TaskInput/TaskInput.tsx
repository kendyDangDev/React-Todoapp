import React, { useState } from "react";
import styles from "./TaskInput.module.scss"
import Todo from "../../@type/todo.type";

interface taskInputProps {
  addTodo: (todoName: string) => void;
  currentTodo: Todo | null;
  editTask: (name: string) => void;
}

function TaskInput(props: taskInputProps) {
  const [todoName, setTodoName] = useState("");
  const { addTodo, currentTodo, editTask } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (currentTodo) {
      currentTodo.name = value;
    }
    setTodoName(value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentTodo) {
      editTask(currentTodo.name);
    } else {
      addTodo(todoName);
    }
    setTodoName("");

  };

  return (
    <div>
      <form action="" onSubmit={handleSubmitForm} className={styles.form}>
        <input
        className={styles.input}
          type="text"
          placeholder="Enter Task..."
          value={currentTodo ? currentTodo.name : todoName}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>{currentTodo? '✔️' : '➕' }</button>
      </form>
    </div>
  );
}

export default TaskInput;
