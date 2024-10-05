import React, { ReactFragment } from "react";
import styles from "./TaskList.module.scss";
import Todo from "../../@type/todo.type";

interface TaskListProps {
  doneTaskList?: boolean;
  todos: Todo[];
  handleDoneTodo: (id: string, done: boolean) => void;
  deleteTodo: (id: string) => void;
  startEditTask: (id:string) =>void;
}
function TaskList(props: TaskListProps) {
  const { todos, handleDoneTodo, doneTaskList, deleteTodo, startEditTask } = props;
  const onCheckedChange =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleDoneTodo(id, event.target.checked);
    };

  const handleDeleteTask = (id: string) => {
    deleteTodo(id);
  };

  const handleStartEditTask = (id: string) => {
    startEditTask(id)
  };
  return (
    <div>
      <h2 className={styles.title}>
        {doneTaskList ? "Hoàn thành" : "Chưa hoàn thành"}
      </h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <div className={styles.check}>
              <input
                type="checkbox"
                className={styles.taskCheckbox}
                checked={todo.done}
                onChange={onCheckedChange(todo.id)}
              />
              <span className={`${styles.taskName} ${doneTaskList? styles.taskdone : ''}`}>{todo.name}</span>
            </div>
            <div className={styles.taskActions}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  handleStartEditTask(todo.id);
                }}
              >
                🖊️
              </button>
              <button
                className={styles.taskBtn}
                onClick={() => handleDeleteTask(todo.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
