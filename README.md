# 📝 Task Manager

Designed mobile first with convenience in mind. A simple and modern full-stack **Todo Application** with a RESTful API powered by **Express**, and a sleek **React** frontend to manage your tasks. Add, edit, complete, or delete todos with ease — all backed by your own server.

---

## 🚀 Features

- 🧠 Create, read, update, and delete tasks (CRUD)
- ⚡ Express backend API
- 🎨 React frontend with Chakra Component Library
- 🔁 Real-time updates via REST calls
- 🧩 Simple start script to run both frontend and backend together

---

## 🛠️ Tech Stack

- **Frontend**: React + Axios
- **Backend**: Node.js + Express + nodePostgres
- **Scripting**: Bash

---

## ⚙️ Setup Instructions

A bash script has been added to the repo that will take care of setting up both the backend and front end of this application, there are a few prerequisites:

## ✅ Prerequisites

- PostgreSQL installed locally
- The psql and createdb CLI tools available
- Environment user has permission to create the database
- User has permission to run scripts
- Node v20

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Project Structure

```
todo-app/
├── task_manager/       # React frontend
├── task_api/           # Express backend
└── start-dev.sh        # Start script for dev mode
```

---

### 3. Make the Script Executable

```bash
chmod +x start-script.sh
```

---

### 4. Run the App (Dev Mode)

From the root of the project:

```bash
./start-dev.sh
```

This will:

- Navigate to `/server`,
  - install dependencies,
  - create the .env files,
  - create the databases,
  - seed production database
  - and finally start the Express API.
- Navigate to `/client`,
  - install dependencies,
  - and start the React frontend.
- Provide logs with helpful, color-coded output.

---

### 5. Access the App

Once running:

- 🖥️ Frontend: [http://localhost:3000](http://localhost:3000)
- 🛠️ Backend API: [http://localhost:9090/api](http://localhost:9090/api)

---

## ✅ Todo API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/todos`     | Get all tasks     |
| POST   | `/api/todos`     | Create a new task |
| PATCH  | `/api/todos/:id` | Update a task     |
| DELETE | `/api/todos/:id` | Delete a task     |

---

## 📄 License

MIT — [Do what you want](https://choosealicense.com/licenses/mit/), just don’t forget to give credit 😄
