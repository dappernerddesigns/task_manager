import { useEffect, useState } from "react";

import { Heading, Spinner } from "@chakra-ui/react";
import "./App.css";
import { Todos } from "./components/Todos";

import { getTasks } from "./api";
import { AddTask } from "./components/AddTask";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTasks().then(({ tasks }) => {
      setLoading(false);
      setTasks(tasks);
    });
  }, []);

  if (loading) {
    return <Spinner size="xl" borderWidth="6px" color="purple" />;
  }
  return (
    <>
      <Heading size="2xl" m="3">
        Task Manager
      </Heading>
      <ThemeToggle />

      <Todos tasks={tasks} setTasks={setTasks} />
      <AddTask setTasks={setTasks} />
    </>
  );
}

export default App;
