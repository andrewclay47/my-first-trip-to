# My First Trip To…

A travel blog where people share stories from their **first trip** to a place,
so future first-timers know what to expect. Built as a static React site
(hosted on GitHub Pages) with [Supabase](https://supabase.com) providing user
accounts, the post database, and photo storage.

## Running it locally

```bash
npm install
npm run dev
```

Without Supabase credentials the site runs in **preview mode**: it shows
sample stories, and a "Demo Traveler" login lets you try the posting flow
(nothing is saved).

## Connecting the real backend (Supabase)

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor**, paste the contents of
   `supabase/schema.sql`, and run it. This creates the tables, security
   rules, and the photo storage bucket.
3. Copy `.env.example` to `.env` and fill in the values from
   **Project Settings → API** (the Project URL and the `anon` public key).
4. Restart `npm run dev` — the preview banner disappears and real
   signups/posts work.

### Google sign-in (optional, after email login works)

1. In Supabase: **Authentication → Providers → Google** and follow the
   instructions there to create OAuth credentials in Google Cloud Console.
2. Add your site's domain to the authorized redirect URLs in both Google
   Cloud and Supabase (**Authentication → URL Configuration**).

## Deploying to GitHub Pages

The site builds to static files (`npm run build` → `dist/`), which GitHub
Pages serves. A GitHub Actions workflow can build and publish automatically
on every push; the `public/404.html` file makes deep links (like
`/destination/japan`) work on Pages.

For a custom domain, add it in the repository's **Settings → Pages** and
point your DNS at GitHub per the instructions shown there.

## Tech stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) for styling
- [React Router 7](https://reactrouter.com) for pages
- [Supabase](https://supabase.com) for auth, database, and photo storage
