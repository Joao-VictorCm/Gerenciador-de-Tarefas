import { useState } from "react";
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";

function App() {
  const [task, setTask] = useState([
    {
      id: 1,
      title: "Estudar programação",
      description: "Estudar programação para conseguir uma vaga na area",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Criar um Saas",
      description: "Criar um Saas para colocar no portfolio",
      isCompleted: false,
    },
  ]);

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
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Task
        </h1>
        <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={task} onTaskClick={onTaskClick} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
