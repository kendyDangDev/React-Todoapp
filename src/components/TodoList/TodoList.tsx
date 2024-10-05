import React, { useEffect, useState } from "react";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./TodoList.module.scss";
import Todo from "../../@type/todo.type";
import { json } from "stream/consumers";
type handleNewTodos = (todos: Todo[]) => Todo[];

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const DoneTodos = todos.filter((todo) => !todo.done);
  const NotDoneTodos = todos.filter((todo) => todo.done);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos") || "[]"));
  }, []);

  const syncToLocalStorage = (handleNewTodos: handleNewTodos) => {
    const todosString = localStorage.getItem("todos");
    const todosObj: Todo[] = JSON.parse(todosString || "[]");
    const newTodos = handleNewTodos(todosObj);

    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, todo]);
    syncToLocalStorage((todosObj: Todo[]) => [...todosObj, todo]);
  };

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, done };
        }
        return todo;
      });
    });
    const handler = (todosObj :Todo[])=>{
      return todosObj.map(todo=>{
        if(todo.id === id){
          return {...todo,done}
        }
        return todo
      })
    }
    syncToLocalStorage(handler)
  };

  const deleteTodo = (id: string) => {
    const handler = (todoList: Todo[]) => {
      const findedIndex = todoList.findIndex((todo) => todo.id === id);
      if (findedIndex !== -1) {
        const newTodos = [...todoList];
        newTodos.splice(findedIndex, 1);
        return newTodos;
      }
      return todoList;
    };
    setTodos(handler);
    syncToLocalStorage(handler);
  };

  const handleStartEditTask = (id: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (currentTodo) {
      setCurrentTodo(currentTodo);
    }
  };
  const handleEditTask = (name: string) => {
    setCurrentTodo((prev) => {
      return { ...prev, name } as Todo;
      // return null;
    });

    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return { ...currentTodo as Todo, name };
        }
        return todo;
      });
    };
    setCurrentTodo(null);
    syncToLocalStorage(handler);
  };

  return (
    <div className={styles.todoList}>
      <h1 className={styles.title}>Todo List Typescript</h1>
      <TaskInput
        addTodo={addTodo}
        currentTodo={currentTodo}
        editTask={handleEditTask}
      />
      <TaskList
        todos={DoneTodos}
        handleDoneTodo={handleDoneTodo}
        doneTaskList={false}
        deleteTodo={deleteTodo}
        startEditTask={handleStartEditTask}
      />
      <TaskList
        todos={NotDoneTodos}
        handleDoneTodo={handleDoneTodo}
        doneTaskList
        deleteTodo={deleteTodo}
        startEditTask={handleStartEditTask}
      />
    </div>
  );
}

export default TodoList;
