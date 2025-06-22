import { useEffect, useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import { v4 } from "uuid";

function App() {
  const [task, setTask] = useState(
    JSON.parse(localStorage.getItem("task")) || []
  );

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );
      const data = await response.json();

      setTask(data);
    }
    fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = task.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTask(newTasks);
  }

  function deleteTask(taskId) {
    const newTask = task.filter((task) => task.id !== taskId);
    setTask(newTask);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };

    setTask([...task, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={task} onTaskClick={onTaskClick} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
