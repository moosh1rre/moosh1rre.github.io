# moosh1rre.github.io – Apartment Listings Web App

This repository hosts an interactive web app for browsing and managing apartment listings.

## 🏠 Features

- Modern React frontend (deployable via GitHub Pages)
- Node.js/Express backend REST API (run it locally or deploy externally)
- Apartment listing cards (title, description, price, etc.)
- Add new apartment listings via a simple form
- Fetch apartment data from the backend

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/moosh1rre/moosh1rre.github.io.git
cd moosh1rre.github.io
```

### 2. Install dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

### 3. Run the backend

```bash
cd backend
npm start
```
The API will be available at [http://localhost:5000](http://localhost:5000).

### 4. Run the frontend

Open a new terminal and run:

```bash
cd frontend
npm start
```
The React app will open at [http://localhost:3000](http://localhost:3000).

**Note:** The frontend expects the backend to be running locally at port 5000. You can change this in `frontend/src/api.js`.

---

## 🌐 Deployment

- **Frontend:** Deploy the `frontend/build` folder to GitHub Pages.
- **Backend:** Deploy separately (e.g., Heroku, Vercel, or Render).

---

## 🛠️ Structure

```
/frontend   # React app
/backend    # Node.js Express backend
```

---

## ✨ Customize & Extend

- Add authentication, filtering, or messaging features.
- Update the design in `frontend/src/components`.
- Extend backend routes in `backend/routes/apartments.js`.

---

Happy hacking! 🎉
