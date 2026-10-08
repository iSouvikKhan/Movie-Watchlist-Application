# Movie Watchlist Application

A full-stack movie watchlist app. Users sign up or sign in, then add movies to a list, edit them, mark them as watched or unwatched, rate and review them, and delete them. The project has a React + TypeScript frontend and an Express + MongoDB REST API backend secured with JWT.

## Deployed link

- Frontend - https://lighthearted-torrone-790312.netlify.app/ (Netlify)
- Backend - https://movie-watchlist-application-hf26.onrender.com/ (Render)

Creds:

- username - souvik@gmail.com
- password - 123456

## Features

- Sign up and sign in with email and password; a JWT is returned and stored in the browser's `localStorage`
- Protected pages that redirect to the sign-in page when no token is present
- Add and edit movies with title, description, release year, genre, watch status, rating (1-5) and review
- Movie list shown as cards, with a toggle to switch between watched and unwatched
- Movie detail page
- Delete movies
- Request validation on the backend with Zod

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, Mongoose (MongoDB), jsonwebtoken, Zod, CORS

## Project structure

```
backend/
  index.js            Express server (mounts routes under /api/v1)
  config.js           JWT secret
  db/index.js         MongoDB connection and User / Movie models
  middleware/index.js JWT auth middleware (Bearer token)
  routes/
    index.js          Router mounting /user and /movie
    user.js           /signup and /signin
    movie.js          Movie CRUD endpoints
frontend/
  src/
    App.tsx           Routes and private-route guard
    components/       Signin, Signup, Home, AddOrEdit, Description, MovieCard, Navbar
    model/            Movie type definition
```

## Prerequisites

- Node.js and npm
- A MongoDB database (the connection string is set in `backend/db/index.js`)

## Set up locally

Backend (`/backend`):

```bash
cd backend
npm i
node index.js
```

The server listens on the port in the `PORT` environment variable, or `3000` by default.

Frontend (`/frontend`):

```bash
cd frontend
npm i
npm run dev
```

Other frontend scripts: `npm run build`, `npm run preview`, `npm run lint`.

Note: the frontend calls the deployed backend URL (`https://movie-watchlist-application-hf26.onrender.com`), which is hard-coded in the components under `frontend/src/components`. To use a local backend, replace that URL with `http://localhost:3000` (or your chosen port).

## API

All routes are prefixed with `/api/v1`. Movie routes require an `Authorization: Bearer <token>` header.

| Method | Route | Description |
| ------ | ----- | ----------- |
| POST | `/user/signup` | Create an account (`username` as email, `password`, `firstname`, `lastname`) and return a token |
| POST | `/user/signin` | Sign in with `username` and `password` and return a token |
| GET | `/movie` | List movies |
| GET | `/movie/:id` | Get a movie by id |
| POST | `/movie` | Add a movie |
| PUT | `/movie/:id` | Update a movie |
| DELETE | `/movie/:id` | Delete a movie |
