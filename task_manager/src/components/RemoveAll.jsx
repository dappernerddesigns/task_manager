import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useTheme } from "next-themes";
export const RemoveAll = ({ handleMassDelete }) => {
  const { resolvedTheme } = useTheme();
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          alignSelf="flex-start"
          type="submit"
          variant={resolvedTheme === "dark" ? "surface" : "solid"}
          colorPalette="red"
        >
          Delete All Completed Tasks <RiDeleteBin2Fill />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Warning</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>This will permanently remove all completed tasks</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => {
                    handleMassDelete();
                  }}
                >
                  Ok
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
