# CodeAlpha Social Media App

Full-stack social media scaffold with Node.js, Express, MongoDB, and static frontend pages.

## Structure

- `backend/` — Express API, Mongoose models, authentication,
- `css/` — shared frontend styles,
- `js/` — client-side page scripts,
- `index.html`, `login.html`, `register.html`, `feed.html`, `profile.html` — frontend views.

## Setup

1. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```
2. Configure MongoDB in `backend/.env`
3. Start backend server
   ```bash
   npm run dev
   ```
4. Open `index.html` in a browser or serve the root folder.

## Notes

- Auth is JWT-based. Tokens are stored in `localStorage`.
- Backend serves API on `/api/*` and static frontend from the workspace root.
- This scaffold is a starting point and needs production hardening before deployment.
