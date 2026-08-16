import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listDestinations } from '../lib/api'
import type { DestinationSummary } from '../lib/types'

export default function Destinations() {
  const [destinations, setDestinations] = useState<DestinationSummary[] | null>(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    listDestinations().then(setDestinations).catch(() => setDestinations([]))
  }, [])

  const visible = useMemo(() => {
    if (!destinations) return null
    const query = filter.trim().toLowerCase()
    if (!query) return destinations
    return destinations.filter((d) => d.country.toLowerCase().includes(query))
  }, [destinations, filter])

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-stone-900">
        Browse by destination
      </h1>
      <p className="mt-2 text-stone-600">
        Every country someone has written a first-trip story about.
      </p>

      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter countries…"
        className="mt-6 w-full max-w-sm rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
      />

      {visible === null && (
        <p className="py-12 text-center text-stone-500">Loading destinations…</p>
      )}
      {visible && visible.length === 0 && (
        <p className="py-12 text-center text-stone-500">
          No destinations found. Be the first to write about one!
        </p>
      )}
      {visible && visible.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((dest) => (
            <Link
              key={dest.slug}
              to={`/destination/${dest.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-stone-200 transition hover:shadow-md"
            >
              <div className="aspect-[4/3] bg-stone-200">
                {dest.coverPhotoUrl && (
                  <img
                    src={dest.coverPhotoUrl}
                    alt={dest.country}
                    loading="lazy"
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                <h2 className="font-display text-xl font-bold text-white">
                  {dest.country}
                </h2>
                <p className="text-xs font-medium text-stone-200">
                  {dest.postCount} {dest.postCount === 1 ? 'story' : 'stories'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
