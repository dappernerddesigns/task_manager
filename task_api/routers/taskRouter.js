const taskRouter = require("express").Router();
const {
  getAllTasks,
  postTask,
  getTask,
  updateTask,
  removeTask,
} = require("../controllers/task.controller");

taskRouter.get("/", getAllTasks);
taskRouter.post("/", postTask);
taskRouter.get("/:id", getTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", removeTask);
module.exports = taskRouter;
