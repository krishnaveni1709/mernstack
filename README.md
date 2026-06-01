# MERN Task Dashboard

This workspace contains a minimal MERN stack task management dashboard.

Structure:
- server: Express + Mongoose API (port 5000)
- client: React app (port 3000)

Quick start:

1. Start MongoDB (local) or set `MONGO_URI` in `server/.env`

2. Backend:

```bash
cd server
npm install
npm run dev
```

3. Frontend (in a separate terminal):

```bash
cd client
npm install
npm start
```

API base: `http://localhost:5000/api/tasks`

Next steps: add auth, pagination, filtering, and deployment.
