<div align="center">
# 🎓 SmartLearn School Management Dashboard
### Smarter Learning. Simplified Management.

A modern, full-stack **School Management System** built with **Next.js, Tailwind CSS, PostgreSQL, Prisma ORM, Docker, and Clerk Authentication**.  
SmartLearn empowers schools to manage classes, students, teachers, attendance, and communication — all in one smart platform.

🔗 **Live Demo:** [https://school-management-app-sigma.vercel.app/](https://school-management-app-sigma.vercel.app/)  
📦 **GitHub Repository:** [https://github.com/marryamabid/School-Management-App.git](https://github.com/marryamabid/School-Management-App.git)

## </div>

## 🚀 Features

- 🧠 **Smart Dashboard** – Overview of school stats, attendance, and performance.
- 👩‍🏫 **Role-Based Access** – Manage students, teachers, and admins securely.
- 🗂️ **Automated Attendance** – Track attendance in real time.
- 📄 **Digital Reports** – Generate student performance insights instantly.
- 💬 **Seamless Communication** – Teachers, parents, and students stay connected.
- 🧩 **Reusable Components** – Modular design for easy scalability.
- 🔒 **Secure Authentication** – Clerk integration ensures data privacy and access control.
- 🐳 **Docker Support** – Consistent development and deployment environments.
- ✉️ **Contact Form Integration** – Stores messages directly in your PostgreSQL database.

---

## 🛠️ Tech Stack

| Category           | Technologies                 |
| ------------------ | ---------------------------- |
| **Frontend**       | Next.js, React, Tailwind CSS |
| **Backend**        | Next.js API Routes           |
| **Database**       | PostgreSQL + Prisma ORM      |
| **Authentication** | Clerk                        |
| **Validation**     | Zod + React Hook Form        |
| **DevOps**         | Docker, Vercel               |
| **Utilities**      | TypeScript, ESLint, Prettier |

---

## ⚙️ Getting Started

###

```bash
1️⃣ Clone the Repository
git clone https://github.com/marryamabid/School-Management-App.git
cd School-Management-App
2️⃣ Install Dependencies

npm install
# or
yarn install
3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add your environment variables:
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/school_db
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
4️⃣ Run Database Migrations & Seed Data
npx prisma migrate dev
npx prisma db seed
5️⃣ Run the Development Server
npm run dev
# or
yarn dev
Now open http://localhost:3000 in your browser 🚀

👩‍💻 Author
Marryam Abid
🪪 License
This project is licensed under the MIT License – feel free to use and modify it for your own learning or projects.

✨ Developed with passion using Next.js and modern web technologies.
```
