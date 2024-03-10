import React, { useState } from "react";
import { nanoid } from "nanoid";
import './TaskManager.css'

interface Task {
  id: string;
  title: string;
}

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    if (title.trim() !== "") {
      const newTask: Task = {
        id: nanoid(),
        title: title.trim(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  const filterTasks = (keyword: string) => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return {
    tasks,
    addTask,
    removeTask,
    updateTask,
    filterTasks,
  };
};

export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const { tasks, addTask, removeTask, updateTask, filterTasks } = useTaskManager();

  const handleAddTask = () => {
    addTask(title);
    setTitle("");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="container">
        {filterTasks("").map((task) => (
          <li key={task.id} className="task">
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, e.target.value)}
            />
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
