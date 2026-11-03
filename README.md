# BookNook – A Small Online Library

**Live site:** https://booknook-client.vercel.app _(replace with your live URL after deploying)_

**Server repo:** _(add the link to the booknook-server repository)_

BookNook is a small community library on the web. Readers share the books on their shelves, borrow a book for 7 days and return it when they're done: add a book, borrow a book, return a book.

## Features

- **Sign up and log in your way:** email and password (with password rules) or Google, powered by BetterAuth and MongoDB. After logging in you land back on the page you were trying to open.
- **Browse the whole shelf:** a home page with a Swiper banner, the 6 newest arrivals and category shortcuts, plus an All Books page with category filters.
- **Share your own books:** add a book with a cover image uploaded to imgbb, then edit or delete it from My Books. Deleting asks for confirmation in a custom modal.
- **Borrow and return in one click:** borrow a book from its details page for 7 days and return it from My Borrows. Available copies go down and up automatically.
- **Fair borrowing rules:** a book with no copies left shows "Not Available", and you can't borrow the same book twice at the same time.
- **Secure API:** private routes in the Express server are protected with JWTs issued by BetterAuth, and users can only change their own books and borrows.
- **Light and dark themes** with a toggle in the navbar, smooth scroll animations (Framer Motion), and a layout that works on phones, tablets and desktops.

## Pages

| Route | Access | What it does |
| --- | --- | --- |
| `/` | Public | Banner slider, New Arrivals, How Borrowing Works, Browse by Category |
| `/books` | Public | All books in a 3-column grid, with category filters |
| `/books/[id]` | Private | Book details and the Borrow This Book modal |
| `/add-book` | Private | Add a book (image upload to imgbb) |
| `/my-books` | Private | Your books, with Edit and Delete |
| `/my-borrows` | Private | Your borrowed books, with Return Book |
| `/profile` | Private | Your account details |
| `/login`, `/register` | Public | Email/password and Google login |

## Tech stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, DaisyUI 5, Swiper, Framer Motion, react-hot-toast
- **Auth:** BetterAuth with the MongoDB adapter, Google sign-in and the JWT plugin
- **Backend:** Express + MongoDB ([booknook-server](#))

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

The Express server must also be running (see the server repo).

### Environment variables

| Name | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Random secret used by BetterAuth |
| `BETTER_AUTH_URL` | This site's address, e.g. `http://localhost:3000` or your live URL |
| `MONGODB_URI`, `DB_NAME` | MongoDB Atlas connection (same database as the server) |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `NEXT_PUBLIC_API_URL` | The Express server's address |
| `IMGBB_API_KEY` | imgbb key for cover uploads (kept on the server) |
