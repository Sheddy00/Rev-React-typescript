import React, { useState, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

export const TaskManager: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, newTitle: string): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (): void => {
    if (title.trim() === "") {
      return;
    }
    const newTask: Task = {
      id: nanoid(),
      title: title.trim(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Enter task title"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                value={task.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTask(task.id, e.target.value)
                }
                placeholder="Edit task title"
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
