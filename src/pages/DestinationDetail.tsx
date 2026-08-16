import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { listPostsByCountry } from '../lib/api'
import type { Post } from '../lib/types'
import PostCard from '../components/PostCard'

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    if (!slug) return
    setPosts(null)
    listPostsByCountry(slug).then(setPosts).catch(() => setPosts([]))
  }, [slug])

  const countryName = posts?.[0]?.destinationCountry

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/destinations" className="text-sm font-semibold text-teal-800 hover:underline">
        ← All destinations
      </Link>
      <h1 className="mt-3 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
        My first trip to{' '}
        <span className="text-teal-800">
          {countryName ?? slug?.replace(/-/g, ' ')}
        </span>
      </h1>

      {posts === null && (
        <p className="py-12 text-center text-stone-500">Loading stories…</p>
      )}
      {posts && posts.length === 0 && (
        <div className="py-12 text-center text-stone-500">
          <p>No stories about this place yet.</p>
          <Link
            to="/write"
            className="mt-4 inline-block rounded-full bg-teal-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Be the first to share yours
          </Link>
        </div>
      )}
      {posts && posts.length > 0 && (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
