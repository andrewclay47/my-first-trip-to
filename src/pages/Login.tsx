import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GoogleButton from '../components/GoogleButton'

export default function Login() {
  const { signIn, signInWithGoogle, signInDemo, isDemoMode } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not log in.')
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600'

  return (
    <section className="mx-auto max-w-sm px-4 py-14">
      <h1 className="text-center font-display text-3xl font-bold text-stone-900">
        Welcome back
      </h1>

      {isDemoMode && (
        <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
          <p className="font-semibold">Preview mode</p>
          <p className="mt-1">
            Real accounts aren't available until the backend is connected. You
            can preview the logged-in experience instead:
          </p>
          <button
            onClick={() => {
              signInDemo()
              navigate(from, { replace: true })
            }}
            className="mt-3 w-full rounded-full bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
          >
            Continue as Demo Traveler
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-stone-800">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-stone-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || isDemoMode}
          className="w-full rounded-full bg-teal-800 px-6 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
        >
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-stone-400">
        <div className="h-px flex-1 bg-stone-200" />
        or
        <div className="h-px flex-1 bg-stone-200" />
      </div>

      <GoogleButton
        disabled={isDemoMode}
        onClick={async () => {
          setError(null)
          try {
            await signInWithGoogle()
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Google sign-in failed.')
          }
        }}
      />

      <p className="mt-8 text-center text-sm text-stone-600">
        First time here?{' '}
        <Link to="/signup" className="font-semibold text-teal-800 hover:underline">
          Create an account
        </Link>
      </p>
    </section>
  )
}
