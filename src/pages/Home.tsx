import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listPosts } from '../lib/api'
import { slugify } from '../lib/format'
import { COUNTRIES } from '../lib/countries'
import type { Post } from '../lib/types'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    listPosts()
      .then(setPosts)
      .catch(() => setError('Could not load stories. Please try again.'))
  }, [])

  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (query.length < 2) return []
    return COUNTRIES.filter((c) => c.toLowerCase().includes(query)).slice(0, 6)
  }, [search])

  function goToCountry(country: string) {
    navigate(`/destination/${slugify(country)}`)
  }

  return (
    <>
      <section className="bg-gradient-to-b from-teal-900 to-teal-800 px-4 py-16 text-center sm:py-24">
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
          Where are you going for the <span className="text-amber-400">first time</span>?
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-teal-100">
          Read honest stories from people who just took their first trip there —
          what surprised them, what it cost, and what they'd do differently.
        </p>
        <div className="relative mx-auto mt-8 max-w-md">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && suggestions[0]) goToCountry(suggestions[0])
            }}
            placeholder="Search a country, e.g. Japan"
            className="w-full rounded-full border-0 bg-white px-6 py-3.5 text-stone-900 shadow-lg outline-none ring-amber-400 placeholder:text-stone-400 focus:ring-2"
          />
          {suggestions.length > 0 && (
            <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white text-left shadow-xl ring-1 ring-stone-200">
              {suggestions.map((country) => (
                <li key={country}>
                  <button
                    onClick={() => goToCountry(country)}
                    className="block w-full px-6 py-3 text-left text-sm font-medium text-stone-800 hover:bg-teal-50"
                  >
                    {country}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Latest trips
          </h2>
          <Link
            to="/destinations"
            className="text-sm font-semibold text-teal-800 hover:underline"
          >
            Browse by destination →
          </Link>
        </div>

        {error && <p className="py-12 text-center text-stone-500">{error}</p>}
        {!error && posts === null && (
          <p className="py-12 text-center text-stone-500">Loading stories…</p>
        )}
        {posts && posts.length === 0 && (
          <p className="py-12 text-center text-stone-500">
            No stories yet — be the first to share one!
          </p>
        )}
        {posts && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
