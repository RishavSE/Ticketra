#  Ticketra – MERN Help Desk Ticketing System

Ticketra is a **role-based help desk ticketing system** built using the **MERN stack**. It is designed to simulate real-world customer support workflows, allowing users to raise tickets and communicate with support agents, while support staff manage, respond to, and resolve issues efficiently.

The project emphasizes **secure authentication**, **clean UI with Tailwind CSS**, and **scalable backend architecture**, making it a strong portfolio and resume-ready application.

---

## 🚀 Features

## 🔐 Authentication & Role Management

* Secure user authentication using **JWT**
* Password hashing with **bcrypt**
* Role-based access control (`User`, `Support`)
* Protected routes for dashboards
* Backend-enforced authorization (not frontend-only)

---

## 👤 User Features

* Register and log in as a user
* Create new support tickets with title and description
* View all submitted tickets
* Add comments to tickets for ongoing communication
* Track ticket status (`Open`, `In Progress`, `Resolved`)
* Responsive UI built with **Tailwind CSS**

---

## 🛠️ Support Agent Features

* Dedicated support dashboard
* View all user-submitted tickets in one place
* Respond to tickets via threaded comments
* Update ticket status based on progress
* Efficient ticket handling with organized listings

---

## 🌟 Unique & Standout Features

### 🧠 Role-Based Dashboard Architecture

* Separate dashboards for Users and Support Agents
* Role validation handled securely at API level
* Prevents unauthorized access to sensitive routes

### 💬 Threaded Ticket Conversations

* Comment-based ticket discussions
* Maintains full ticket communication history
* Enables smooth back-and-forth between users and support

### 🔄 Dynamic Ticket Workflow

* Defined ticket lifecycle:

  * `Open` → `In Progress` → `Resolved`
* Status updates reflected instantly across dashboards

### 🎨 Tailwind CSS UI System

* Utility-first styling for rapid UI development
* Consistent design system
* Fully responsive across devices

### 🔐 Security-First Design

* Passwords never stored in plain text
* JWT validation middleware on protected APIs
* Role-based API authorization (defense-in-depth)

### 🧩 Scalable Backend Architecture

* Modular MVC structure (Controllers, Routes, Models)
* Easily extendable for admin features and analytics

---

## 🚧 Future Enhancements

* 👑 Admin panel (user management & system control)
* 🔔 Email notifications on ticket updates
* ⚡ Ticket priority levels & SLA tracking
* 🔍 Search, filter, and sort tickets
* 📊 Support analytics (resolution time, ticket volume)
* 🧠 AI-assisted ticket categorization (future scope)

---

## 🏗️ Tech Stack

| Layer          | Technology          |
| -------------- | ------------------- |
| Frontend       | React + Vite        |
| Styling        | Tailwind CSS        |
| Backend        | Node.js, Express.js |
| Database       | MongoDB, Mongoose   |
| Authentication | JWT, bcrypt         |
| Utilities      | dotenv, cors        |

---


## 🔑 Roles & Permissions

| Role    | Access                                         |
| ------- | ---------------------------------------------- |
| User    | Create tickets, view own tickets, add comments |
| Support | View all tickets, update status, respond       |
| Admin   | (Planned) Full system access                   |

---

## 🧪 Security Highlights

* Secure password hashing using bcrypt
* JWT-based authentication & authorization
* Role validation at API level
* Protected routes for dashboards

---

## 👨‍💻 Author

**Rishav Kumar Singh**
MERN Stack Developer

* GitHub: [@rishavSE](https://github.com/rishavSE)
* Email: [rishavse06@gmail.com](mailto:rishavse06@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute this project.

---

⭐ If you found this project useful
