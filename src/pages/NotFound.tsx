import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-6xl" aria-hidden>
        🧭
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-stone-900">
        Off the map
      </h1>
      <p className="mt-2 text-stone-600">This page doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-teal-800 px-6 py-3 font-semibold text-white hover:bg-teal-700"
      >
        Back to latest trips
      </Link>
    </div>
  )
}
