import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Avatar from './Avatar'

const NAV_LINKS = [
  { to: '/', label: 'Latest trips' },
  { to: '/destinations', label: 'Destinations' },
]

export default function Layout() {
  const { user, isDemoMode, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
    navigate('/')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-teal-800 text-white'
        : 'text-stone-700 hover:bg-stone-200'
    }`

  return (
    <div className="flex min-h-screen flex-col">
      {isDemoMode && (
        <div className="bg-amber-100 px-4 py-2 text-center text-xs font-medium text-amber-900">
          Preview mode — the backend isn't connected yet, so you're seeing
          sample stories. Sign-ups and posts aren't saved.
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <span className="text-2xl" aria-hidden>✈️</span>
            <span className="font-display text-xl font-bold tracking-tight text-teal-900">
              My First Trip To<span className="text-amber-500">…</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link
                  to="/write"
                  className="rounded-full bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Share your trip
                </Link>
                <Link to={`/u/${user.id}`} title="Your profile">
                  <Avatar name={user.displayName} url={user.avatarUrl} size="sm" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-stone-500 hover:text-stone-800"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-teal-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-lg p-2 text-stone-700 hover:bg-stone-200 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-stone-200 bg-stone-50 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <NavLink to="/write" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Share your trip
                  </NavLink>
                  <NavLink to={`/u/${user.id}`} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Your profile
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className="rounded-full px-4 py-2 text-left text-sm font-medium text-stone-500 hover:bg-stone-200"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Log in
                  </NavLink>
                  <NavLink to="/signup" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Sign up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-stone-500">
          <p className="font-display text-base font-semibold text-teal-900">
            My First Trip To…
          </p>
          <p>Real stories from first-time travelers, for first-time travelers.</p>
        </div>
      </footer>
    </div>
  )
}
