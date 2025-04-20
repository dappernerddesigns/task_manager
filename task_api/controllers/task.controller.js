const {
  fetchTasks,
  addTask,
  fetchTask,
  editTask,
  deleteTask,
} = require("../models/task.model");

exports.getAllTasks = async (req, res) => {
  const tasks = await fetchTasks(req.query);
  res.status(200).send({ tasks });
};

exports.postTask = async (req, res, next) => {
  try {
    const task = await addTask(req.body);
    res.status(201).send({ task });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await fetchTask(id);
    res.status(200).send({ task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await editTask(id, req.body);
    res.status(200).send({ task });
  } catch (err) {
    next(err);
  }
};

exports.removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTask(id);

    res.status(204).send({});
  } catch (err) {
    next(err);
  }
};
