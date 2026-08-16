import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProfile, listPostsByAuthor } from '../lib/api'
import type { Post, Profile as ProfileType } from '../lib/types'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import Avatar from '../components/Avatar'

export default function Profile() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)

  useEffect(() => {
    if (!id) return
    setProfile(null)
    setPosts(null)
    getProfile(id).then(setProfile).catch(() => setProfile(null))
    listPostsByAuthor(id).then(setPosts).catch(() => setPosts([]))
  }, [id])

  const ownProfile = user && user.id === id ? user : null
  const displayName =
    profile?.displayName ?? ownProfile?.displayName ?? 'Traveler'

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-4">
        <Avatar
          name={displayName}
          url={profile?.avatarUrl ?? ownProfile?.avatarUrl ?? null}
          size="lg"
        />
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900">
            {displayName}
          </h1>
          {profile?.bio && <p className="mt-1 text-stone-600">{profile.bio}</p>}
          {posts && (
            <p className="mt-1 text-sm text-stone-500">
              {posts.length} {posts.length === 1 ? 'trip' : 'trips'} shared
            </p>
          )}
        </div>
      </div>

      {posts === null && (
        <p className="py-12 text-center text-stone-500">Loading trips…</p>
      )}
      {posts && posts.length === 0 && (
        <p className="py-12 text-center text-stone-500">
          {ownProfile
            ? "You haven't shared a trip yet."
            : 'No trips shared yet.'}
        </p>
      )}
      {posts && posts.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}
