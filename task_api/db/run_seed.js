const seed = require("./seed.js");
const db = require("./connection.js");
const data = require("./data/dev_data/todo.js");

seed(data).then(() => {
  return db.end();
});
