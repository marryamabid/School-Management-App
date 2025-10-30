# 🏫 School Management Dashboard (Next.js)

A modern, full-stack **School Management Dashboard** built with **Next.js, Tailwind CSS, PostgreSQL, Prisma ORM, Docker, and Clerk Authentication**.  
This dashboard enables efficient management of students, teachers, and administrative data with a clean UI and reusable components.

🔗 **Live Demo:** [https://school-management-app-sigma.vercel.app/](https://school-management-app-sigma.vercel.app/)  
📦 **GitHub Repository:** [Your GitHub Repo Link Here]

---

## 🚀 Features

- 📊 **Dashboard Overview:** Displays key statistics for students, classes, and staff.
- 👩‍🏫 **Role-Based Management:** Manage students, teachers, and admins securely.
- 🧩 **Reusable Components:** Modular design for easy scalability and maintenance.
- 🧠 **React Hooks & Context API:** Efficient state management and dynamic updates.
- 🗄️ **Database Integration:** PostgreSQL database connected via Prisma ORM.
- 🔒 **User Authentication:** Secure login system powered by Clerk.
- 🐳 **Docker Support:** Easily containerized setup for consistent development environments.
- 🧰 **API Routes:** Optimized API endpoints for CRUD operations.

---

## 🛠️ Technologies Used

| Category           | Technologies                 |
| ------------------ | ---------------------------- |
| **Frontend**       | Next.js, React, Tailwind CSS |
| **Backend**        | Next.js API Routes           |
| **Database**       | PostgreSQL with Prisma ORM   |
| **Authentication** | Clerk                        |
| **DevOps**         | Docker, Vercel               |
| **Other Tools**    | TypeScript, ESLint, Prettier |

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/school-management-dashboard.git
cd school-management-dashboard
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


Now open http://localhost:3000
in your browser

Author

Marryam Abid

License

This project is licensed under the MIT License – feel free to use and modify for your own learning or projects.

✨ Developed with passion using Next.js and modern web technologies.




```
