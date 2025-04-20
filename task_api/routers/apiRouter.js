const apiRouter = require("express").Router();
const taskRouter = require("./taskRouter");
const endpoints = require("../endpoints.json");
apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/tasks", taskRouter);

module.exports = apiRouter;
