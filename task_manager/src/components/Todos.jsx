import {
  Collapsible,
  Box,
  Accordion,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { deleteTask } from "../api";
import { Status } from "./Status";
import { RemoveAll } from "./RemoveAll";

export const Todos = ({ tasks, setTasks }) => {
  const { todo, doing, done } = tasks.reduce(
    (group, task) => {
      group[task.status].push(task);
      return group;
    },
    { todo: [], doing: [], done: [] }
  );
  const jobs = [
    ["To Do", todo],
    ["In Progress", doing],
    ["Complete", done],
  ];
  const handleDelete = async (idToDelete) => {
    try {
      setTasks((curr) => {
        return curr.filter(({ id }) => id !== idToDelete);
      });
      await deleteTask(idToDelete);
    } catch (err) {}
  };
  const handleMassDelete = async () => {
    const deletes = done.map(({ id }) => deleteTask(id));
    setTasks([...todo, ...doing]);
    await Promise.all(deletes);
  };
  return (
    <div>
      {jobs.map(([taskType, tasks]) => {
        return (
          <Accordion.Root multiple key={taskType} m="auto" width="10/12">
            <Accordion.Item value={taskType}>
              <Accordion.ItemTrigger>
                <Heading size="2xl" className="task_clickables">
                  {taskType} : {tasks.length}
                </Heading>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  {tasks.map(({ id, title, description, due }) => {
                    return (
                      <Collapsible.Root key={id}>
                        <Collapsible.Trigger paddingY="3">
                          <Heading size="md" className="task_clickables">
                            {title}
                          </Heading>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          <Box padding="4" borderWidth="1px">
                            <Text> {description}</Text>
                            <Text> Due:{dayjs(due).format("DD/MM/YYYY")}</Text>
                            <Status
                              status={taskType}
                              id={id}
                              handleDelete={handleDelete}
                              setTasks={setTasks}
                            />
                          </Box>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    );
                  })}
                  {taskType === "Complete" ? (
                    <RemoveAll handleMassDelete={handleMassDelete} />
                  ) : null}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        );
      })}
    </div>
  );
};
