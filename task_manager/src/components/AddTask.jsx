import { postTask } from "../api";
import {
  Field,
  Fieldset,
  Input,
  Textarea,
  Stack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "next-themes";

export const AddTask = ({ setTasks }) => {
  const { resolvedTheme } = useTheme();

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    due: "",
  });
  const [errors, setErrors] = useState({ title: false, due: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      return;
    }
    const { title, description, due } = formValues;
    const sqlDateTime = due.replace("T", " ") + ":00";
    setFormValues({ title: "", description: "", due: "" });
    const newTask = { title, description, status: "todo", due: sqlDateTime };
    setTasks((curr) => [newTask, ...curr]);
    await postTask(newTask);
  };

  const handleChanges = (name, e) => {
    const value = e.target.value;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };
  const validation = () => {
    const newErrors = {
      title: formValues.title.trim() === "",
      due: formValues.due.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root m="auto" width="10/12" marginTop="60px">
        <Fieldset.Content>
          <Field.Root invalid={errors.title}>
            <Field.Label>Title</Field.Label>
            <Field.RequiredIndicator
              fallback={
                <Badge
                  size="xs"
                  variant={resolvedTheme === "dark" ? "subtle" : "surface"}
                  color="red.400"
                >
                  Required
                </Badge>
              }
            />

            <Input
              name="title"
              value={formValues.title}
              onChange={(e) => {
                handleChanges("title", e);
              }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Description</Field.Label>
            <Field.RequiredIndicator
              fallback={
                <Badge
                  size="xs"
                  variant={resolvedTheme === "dark" ? "subtle" : "surface"}
                  color="green.400"
                >
                  Optional
                </Badge>
              }
            />
            <Textarea
              name="description"
              type="text"
              value={formValues.description}
              onChange={(e) => {
                handleChanges("description", e);
              }}
            />
          </Field.Root>
          <Field.Root invalid={errors.due}>
            <Field.Label>Due By</Field.Label>
            <Field.RequiredIndicator
              fallback={
                <Badge
                  size="xs"
                  variant={resolvedTheme === "dark" ? "subtle" : "surface"}
                  color="red.400"
                >
                  Required
                </Badge>
              }
            />
            <Input
              key={formValues.due || "empty-due"}
              value={formValues.due}
              name="due"
              type="datetime-local"
              onChange={(e) => {
                handleChanges("due", e);
              }}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          alignSelf="flex-start"
          type="submit"
          variant={resolvedTheme === "dark" ? "surface" : "solid"}
          colorPalette="teal"
        >
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};
