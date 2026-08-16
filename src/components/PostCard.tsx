import { Link } from 'react-router-dom'
import type { Post } from '../lib/types'
import { formatMonthYear, snippet } from '../lib/format'
import Avatar from './Avatar'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
      <Link to={`/post/${post.id}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-stone-200">
          {post.photoUrls[0] ? (
            <img
              src={post.photoUrls[0]}
              alt={post.title}
              loading="lazy"
              className="size-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-4xl">
              🗺️
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-teal-800 backdrop-blur">
            {post.destinationCity
              ? `${post.destinationCity}, ${post.destinationCountry}`
              : post.destinationCountry}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-stone-900 group-hover:text-teal-800">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {snippet(post.body, 120)}
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <Avatar name={post.authorName} url={post.authorAvatarUrl} size="sm" />
            <div className="text-xs">
              <p className="font-medium text-stone-800">{post.authorName}</p>
              <p className="text-stone-500">
                Traveled {formatMonthYear(post.tripDate)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
