import { CheckCheckIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Tasks({ tasks, onTaskClick, deleteTask }) {
  const navigate = useNavigate();

  function onDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/detalhes?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 w-full text-left text-white p-2 rounded-md  ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.isCompleted && <CheckCheckIcon />}
            {task.title}
          </button>
          <Button onClick={() => onDetailsClick(task)}>
            <ChevronRightIcon />
          </Button>
          <Button>
            <TrashIcon onClick={() => deleteTask(task.id)} />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
