# Post Browser

**🌍 Live Demo:** [https://cc-7-tejas.vercel.app/](https://cc-7-tejas.vercel.app/)

A sleek, responsive web application built with **Vanilla TypeScript** and **Plain CSS** that allows users to browse posts and comments. This project utilizes a clean, functional architecture and features a custom in-memory caching system to optimize API calls.

---

## ✨ Features

- **Streamlined Architecture:** Core application logic, state management, and DOM manipulation are consolidated functionally for excellent readability and low boilerplate.
- **Custom Caching System:** Utilizes a JavaScript `Map` via `CacheService` to store previously fetched posts and comments, drastically reducing redundant network requests.
- **Simulated Network Delays:** API calls include an artificial 1-second delay to visually demonstrate the speed of cache hits (which load instantly).
- **Cache Management:** A dedicated "Refresh" button allows users to manually clear the cache and fetch fresh data.
- **Visitor Counter:** Tracks local page visits using browser Storage APIs.

---

## 🛠️ Tech Stack

| Tool                                                     | Purpose                                               |
| -------------------------------------------------------- | ----------------------------------------------------- |
| [Vite](https://vitejs.dev/)                              | Fast frontend tooling and development server          |
| TypeScript                                               | Strictly typed Vanilla JS                             |
| CSS3                                                     | Plain CSS with no external UI libraries or frameworks |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Mock REST API for fetching posts and comments         |

---

## 📂 Project Structure

The project breaks down complex features into focused utilities while orchestrating them centrally:

```
.
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── public/
└── src/
    ├── main.ts           # Central brain — state, data fetching, rendering, event delegation
    ├── style.css
    ├── assets/
    ├── APIService.ts     # Handles all async fetch requests to the JSONPlaceholder API
    ├── CacheService.ts   # Generic in-memory cache utility built on JavaScript Map
    └── delays.ts         # Utility for simulating network latency
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation & Execution

1. Navigate to the project directory:

   ```bash
   cd "Assignment 3/Tasks/Task 8"
   ```

2. Install the local Vite dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## 🛡️ Code Quality & Git Hooks

This project inherits the root-level repository configurations for code quality. Before any commit is allowed, [Husky](https://typicode.github.io/husky/) triggers `lint-staged` and `pretty-quick` to run:

- **ESLint:** Ensures TypeScript best practices and catches unused variables.
- **Prettier:** Enforces consistent code formatting.

> Commits will automatically fail if the linter catches errors that cannot be auto-fixed.

---

## 🌐 Deployment

This application is deployed on [Vercel](https://vercel.com/).

| Setting          | Value                       |
| ---------------- | --------------------------- |
| Framework Preset | Vite                        |
| Root Directory   | `Assignment 3/Tasks/Task 8` |
| Build Command    | `npm run build`             |
| Output Directory | `dist`                      |
