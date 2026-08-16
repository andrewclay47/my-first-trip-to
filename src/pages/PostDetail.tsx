import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../lib/api'
import type { Post } from '../lib/types'
import { formatDate, formatMonthYear, slugify } from '../lib/format'
import Avatar from '../components/Avatar'

export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null | 'missing'>(null)

  useEffect(() => {
    if (!id) return
    setPost(null)
    getPost(id)
      .then((result) => setPost(result ?? 'missing'))
      .catch(() => setPost('missing'))
  }, [id])

  if (post === null) {
    return <p className="py-24 text-center text-stone-500">Loading story…</p>
  }
  if (post === 'missing') {
    return (
      <div className="py-24 text-center">
        <p className="text-stone-600">This story doesn't exist (or was removed).</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-teal-800 hover:underline">
          ← Back to latest trips
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to={`/destination/${post.countrySlug || slugify(post.destinationCountry)}`}
        className="text-sm font-semibold text-teal-800 hover:underline"
      >
        ← More trips to {post.destinationCountry}
      </Link>

      <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-stone-200 pb-5">
        <Link to={`/u/${post.authorId}`} className="flex items-center gap-2.5">
          <Avatar name={post.authorName} url={post.authorAvatarUrl} size="sm" />
          <span className="text-sm font-semibold text-stone-800 hover:text-teal-800">
            {post.authorName}
          </span>
        </Link>
        <span className="text-sm text-stone-500">
          Traveled {formatMonthYear(post.tripDate)}
        </span>
        <span className="text-sm text-stone-500">
          Posted {formatDate(post.createdAt)}
        </span>
      </div>

      {post.photoUrls.length > 0 && (
        <div className="mt-6 grid gap-3">
          <img
            src={post.photoUrls[0]}
            alt=""
            className="w-full rounded-2xl object-cover"
          />
          {post.photoUrls.length > 1 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {post.photoUrls.slice(1).map((url) => (
                <img
                  key={url}
                  src={url}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="prose-travel mt-8 space-y-5 text-[1.05rem] leading-relaxed text-stone-700">
        {post.body.split(/\n{2,}/).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}
