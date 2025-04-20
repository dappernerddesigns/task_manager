import { Button, Menu, Portal } from "@chakra-ui/react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { updateTask } from "../api";
export const Status = ({ id, status, handleDelete, setTasks }) => {
  const statuses = {
    "To Do": { display: ["In Progress", "Complete"], serverStatus: "todo" },
    "In Progress": { display: ["To Do", "Complete"], serverStatus: "doing" },
    Complete: { display: ["To Do", "In Progress"], serverStatus: "done" },
  };
  const handleUpdate = async (statusType, idToUpdate) => {
    setTasks((curr) => {
      return curr.map((task) => {
        const newTask = { ...task };
        if (newTask.id === idToUpdate) {
          newTask.status = statuses[statusType].serverStatus;
        }
        return newTask;
      });
    });

    await updateTask(idToUpdate, { status: statuses[statusType].serverStatus });
  };
  return (
    <Menu.Root positioning={{ placement: "right-start" }}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {status}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {statuses[status].display.map((statusType) => {
              return (
                <Menu.Item
                  key={statusType}
                  onClick={() => {
                    handleUpdate(statusType, id);
                  }}
                >
                  {statusType}
                </Menu.Item>
              );
            })}
            <Menu.Item
              value="delete"
              color="fg.error"
              _hover={{ bg: "bg.error", color: "fg.error" }}
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete <RiDeleteBin2Fill />
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
