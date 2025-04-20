const db = require("../db/connection.js");
const app = require("../app");
const seed = require("../db/seed.js");
const request = require("supertest");
const testData = require("../db/data/test_data/todo.js");
const endpointsJson = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("/tasks", () => {
  describe("GET", () => {
    test("200:Server responds with an object containing an array of all tasks", async () => {
      const {
        body: { tasks },
      } = await request(app).get("/api/tasks").expect(200);
      expect(tasks.length).toBe(21);
      tasks.forEach((task) => {
        expect(task).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            status: expect.any(String),
            due: expect.any(String),
          })
        );
      });
    });
    test("200:Endpoint accepts a query to sort tasks by status", async () => {
      const {
        body: { tasks },
      } = await request(app).get("/api/tasks?status=todo").expect(200);
      expect(tasks.length).toBeGreaterThan(0);
      tasks.forEach(({ status }) => {
        expect(status).toBe("todo");
      });
    });
    test("200:Endpoint accepts a query to sort tasks by due date", async () => {
      const {
        body: { tasks },
      } = await request(app)
        .get("/api/tasks?sorted_by=due&order=asc")
        .expect(200);
      expect(tasks).toBeSortedBy("due", { descending: false });
    });
    test("400:Server responds with a Bad Request for an invalid sort query", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/tasks?sorted_by=title").expect(400);
      expect(msg).toBe("Bad Request");
    });
    test("400:Server responds with a Bad Request for an invalid order query", async () => {
      const {
        body: { msg },
      } = await request(app)
        .get("/api/tasks?sorted_by=due&order=up")
        .expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
  describe("POST", () => {
    test("201:Server responds with newly created task", async () => {
      const newTask = {
        title: "walk dog",
        description: "",
        status: "todo",
        due: "2025-04-10 12:00:00",
      };
      const {
        body: { task },
      } = await request(app).post("/api/tasks").send(newTask).expect(201);
      const { title, description, status, due } = task;
      expect(title).toBe("walk dog");
      expect(description).toBe("");
      expect(status).toBe("todo");
      expect(typeof due).toBe("string");
    });
    test("400:Server responds with a bad request if mandatory keys are missing", async () => {
      const {
        body: { msg },
      } = await request(app).post("/api/tasks").send({}).expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});

describe("/tasks/:id", () => {
  describe("GET", () => {
    test("200:Server responds with the requested task", async () => {
      const {
        body: { task },
      } = await request(app).get("/api/tasks/1").expect(200);
      const { id, title, description, status, due } = task;
      expect(id).toBe(1);
      expect(title).toBe(
        "ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper"
      );
      expect(description).toBe(
        "odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor"
      );
      expect(status).toBe("todo");
      expect(due).toBe("2024-12-05T05:39:44.000Z");
    });
    test("404:Server responds with a task not found message for a valid request with no results", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/tasks/99").expect(404);
      expect(msg).toBe("Task Not Found");
    });
    test("400:Server responds with a bad request message for request with an invalid id", async () => {
      const {
        body: { msg },
      } = await request(app).get("/api/tasks/one").expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
  describe("PATCH", () => {
    test("200:Server responds with the updated task status", async () => {
      const {
        body: { task },
      } = await request(app)
        .patch("/api/tasks/1")
        .send({ status: "doing" })
        .expect(200);
      expect(task.status).toBe("doing");
    });
    test("200:Server accepts any valid key update, responds with updated task", async () => {
      const {
        body: { task },
      } = await request(app)
        .patch("/api/tasks/1")
        .send({ title: "walk the dog", description: "Find an enclosed park" })
        .expect(200);
      const { title, description } = task;
      expect(title).toBe("walk the dog");
      expect(description).toBe("Find an enclosed park");
    });
    test("404:Server responds with Task not found when trying to update a task that does not exist", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/tasks/25")
        .send({ status: "doing" })
        .expect(404);
      expect(msg).toBe("Task Not Found");
    });
    test("400:Server responds with a bad request for an invalid id", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/tasks/one")
        .send({ status: "doing" })
        .expect(400);
      expect(msg).toBe("Bad Request");
    });
    test("400:Server responds with a bad request for an invalid keys in the post", async () => {
      const {
        body: { msg },
      } = await request(app)
        .patch("/api/tasks/one")
        .send({ task_title: "New task" })
        .expect(400);
      expect(msg).toBe("Bad Request");
    });
    test("400:Server responds with a bad request missing keys in the post", async () => {
      const {
        body: { msg },
      } = await request(app).patch("/api/tasks/one").send({}).expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
  describe("DELETE", () => {
    test("204:Server responds with no body after deleting the task", async () => {
      const { body } = await request(app).delete("/api/tasks/1").expect(204);
      expect(body).toEqual({});
    });
    test("404:Server responds with Task Not Found when deleting a task that is not in the database", async () => {
      const {
        body: { msg },
      } = await request(app).delete("/api/tasks/25").expect(404);
      expect(msg).toBe("Task Not Found");
    });
    test("400:Server responds with Bad Request when attempting to delete an invalid id", async () => {
      const {
        body: { msg },
      } = await request(app).delete("/api/tasks/one").expect(400);
      expect(msg).toBe("Bad Request");
    });
  });
});
