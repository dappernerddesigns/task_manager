import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:9090/api",
});

export const getTasks = async () => {
  const { data } = await taskApi.get("/tasks");
  return data;
};

export const deleteTask = async (id) => {
  await taskApi.delete(`/tasks/${id}`);
};

export const updateTask = async (id, updates) => {
  const { data } = await taskApi.patch(`/tasks/${id}`, updates);
  return data;
};

export const postTask = async (task) => {
  const { data } = await taskApi.post(`/tasks`, task);
};
