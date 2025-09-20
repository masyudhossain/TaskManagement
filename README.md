# 📝 Task Management System (Backend)

A **Node.js + Express.js + MongoDB** backend for managing tasks and team members with **JWT-based authentication** and **role-based access control (RBAC)**.

This system supports two roles:
- **Admin** → Manage users and tasks
- **Member** → View and update their own tasks

---

## 🚀 Features

### 🔑 Authentication
- **JWT-based authentication**
- Admin-only registration for new users
- Secure password hashing with bcrypt

### 👥 User Roles
- **Admin**
  - Manage tasks (CRUD)
  - Assign tasks to members
  - View and delete members
- **Member**
  - View only their own tasks
  - Update their assigned tasks

### 📋 Task Management
- Task fields:
  - `title`
  - `description`
  - `status` → (todo, in-progress, done)
  - `priority` → (low, medium, high, critical)
  - `assignedTo` → Member reference

---

## 🏗 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT + bcrypt
- **Middleware**: Custom role-based `protect` + `authorize`


## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/masyudhossain/TaskManagement.git
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Server

```bash
npm run dev
```

Server runs on → **[http://localhost:5000](http://localhost:5000)**

---

## 📌 API Routes

### 🔑 Auth Routes (`/api/auth`)

| Method | Endpoint    | Access | Description                        |
| ------ | ----------- | ------ | ---------------------------------- |
| POST   | `/register` | Admin  | Register a new user (admin/member) |
| POST   | `/login`    | Public | Login and receive JWT              |

---

### 👥 Admin Routes (`/api/admin`)

| Method | Endpoint                 | Description                                 |
| ------ | ------------------------ | ------------------------------------------- |
| POST   | `/createtask`            | Create new task                             |
| GET    | `/getAllTask`            | Get all tasks                               |
| GET    | `/getTaskById/:id`       | Get task by ID                              |
| PUT    | `/updateTask/:id`        | Update task by ID                           |
| DELETE | `/deleteTaskById/:id`    | Delete task by ID                           |
| GET    | `/getTaskByEmail/:email` | Get tasks assigned to a member by email     |
| GET    | `/getAllMember`          | Get all members                             |
| DELETE | `/deleteMemberById/:id`  | Delete member (only if not assigned a task) |

---

### 📋 Member Routes (`/api/member`)

| Method | Endpoint          | Description                            |
| ------ | ----------------- | -------------------------------------- |
| GET    | `/mytasks`        | Get logged-in member's tasks           |
| GET    | `/taskById/:id`   | Get a specific task (only if assigned) |
| PUT    | `/updateTask/:id` | Update own assigned task               |

---

## 🧪 Testing with Postman

1. **Login** via `/api/auth/login` → copy JWT.
2. In Postman, set Header:

   ```
   Authorization: Bearer <your_token>
   ```
3. Use Admin token for **Admin routes** and Member token for **Member routes**.

---
## 📌 API Routes & Examples

### 🔑 Auth Routes (`/api/auth`)
#### ✅ Register User (Admin only)
**POST** `/api/auth/register`  
Request (Admin token required):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "member"
}
````

Response:

```json
{
  "_id": "6501c2e4d8b87b8c12345678",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "member",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### ✅ Login User

**POST** `/api/auth/login`
Request:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "_id": "6501c2e4d8b87b8c12345678",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "member",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 👥 Admin Routes (`/api/admin`)

#### ➕ Create Task

**POST** `/api/admin/createtask`
Request:

```json
{
  "title": "Setup AWS EC2",
  "description": "Launch an EC2 instance for production",
  "status": "todo",
  "priority": "high",
  "assignedToEmail": "john@example.com"
}
```

Response:

```json
{
  "_id": "6501c3f8d8b87b8c98765432",
  "title": "Setup AWS EC2",
  "description": "Launch an EC2 instance for production",
  "status": "todo",
  "priority": "high",
  "assignedTo": "6501c2e4d8b87b8c12345678",
  "createdAt": "2025-09-20T10:45:30.123Z"
}
```

#### 📋 Get All Tasks

**GET** `/api/admin/getAllTask`
Response:

```json
[
  {
    "_id": "6501c3f8d8b87b8c98765432",
    "title": "Setup AWS EC2",
    "status": "todo",
    "priority": "high",
    "assignedTo": {
      "_id": "6501c2e4d8b87b8c12345678",
      "email": "john@example.com"
    }
  }
]
```

#### 🔍 Get Task by ID

**GET** `/api/admin/getTaskById/:id`

#### ✏️ Update Task

**PUT** `/api/admin/updateTask/:id`
Request:

```json
{
  "status": "in-progress",
  "priority": "critical"
}
```

Response:

```json
{
  "_id": "6501c3f8d8b87b8c98765432",
  "title": "Setup AWS EC2",
  "status": "in-progress",
  "priority": "critical"
}
```

#### ❌ Delete Task

**DELETE** `/api/admin/deleteTaskById/:id`
Response:

```json
{ "message": "Task deleted successfully" }
```

#### 📧 Get Tasks by Member Email

**GET** `/api/admin/getTaskByEmail/:email`

---

#### 👤 Get All Members

**GET** `/api/admin/getAllMember`
Response:

```json
[
  {
    "_id": "6501c2e4d8b87b8c12345678",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
]
```

#### ❌ Delete Member

**DELETE** `/api/admin/deleteMemberById/:id`
Response:

```json
{ "message": "Member deleted successfully" }
```

---

### 📋 Member Routes (`/api/member`)

#### 📋 Get My Tasks

**GET** `/api/member/mytasks`
Response:

```json
[
  {
    "_id": "6501c3f8d8b87b8c98765432",
    "title": "Setup AWS EC2",
    "description": "Launch an EC2 instance for production",
    "status": "in-progress",
    "priority": "high"
  }
]
```

#### 🔍 Get Task by ID

**GET** `/api/member/taskById/:id`

#### ✏️ Update My Task

**PUT** `/api/member/updateTask/:id`
Request:

```json
{
  "status": "done"
}
```

Response:

```json
{
  "_id": "6501c3f8d8b87b8c98765432",
  "title": "Setup AWS EC2",
  "status": "done",
  "priority": "high"
}
```

---

## 🧪 Testing with Postman

1. **Login** → copy JWT token from `/api/auth/login`.
2. Add Header in Postman:

   ```
   Authorization: Bearer <your_token>
   ```
3. Test Admin vs Member routes with respective tokens.

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Masyud Hossain**
Backend Developer 
