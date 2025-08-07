<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<h2 align="center">Laravel + React + Inertia.js</h2>

<p align="center">
  Full-stack web application using Laravel (backend), Inertia.js (middleware), and React (frontend).
</p>

---

## 🚀 About This Project

This project is built using:

- **[Laravel](https://laravel.com/)** – as the backend framework
- **[React](https://reactjs.org/)** – for building reactive user interfaces
- **[Inertia.js](https://inertiajs.com/)** – to connect Laravel and React without building an API

The goal is to deliver a modern, full-stack SPA experience without the complexity of a traditional API + frontend architecture.

---

## 📦 Tech Stack

- PHP 8.x
- Laravel 10+
- React 18+
- Inertia.js
- Vite (for asset bundling)
- Tailwind CSS (optional, if you're using it)
- PostgreSQL / MySQL (or other supported DB)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project.git
cd your-project

2. Install Backend Dependencies
composer install
cp .env.example .env
php artisan key:generate

3. Install Frontend Dependencies
npm install

4. Run Database Migrations (and Seed if needed)
php artisan migrate

5. Start Development Servers
# Start Laravel server
php artisan serve

# In a separate terminal, start Vite
npm run dev
```
