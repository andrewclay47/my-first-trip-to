import { supabase } from './supabase'
import { slugify } from './format'
import { DEMO_POSTS } from './demoData'
import type { DestinationSummary, NewPost, Post, Profile } from './types'

// In demo mode, posts written during the session live here so the full
// write -> read flow can be previewed before Supabase is connected.
const demoStore: Post[] = [...DEMO_POSTS]

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToPost(row: any): Post {
  return {
    id: row.id,
    authorId: row.author_id,
    authorName: row.profiles?.display_name ?? 'Traveler',
    authorAvatarUrl: row.profiles?.avatar_url ?? null,
    title: row.title,
    destinationCity: row.destination_city,
    destinationCountry: row.destination_country,
    countrySlug: row.country_slug,
    tripDate: row.trip_date,
    body: row.body,
    photoUrls: row.photo_urls ?? [],
    createdAt: row.created_at,
  }
}

const POST_SELECT = '*, profiles(display_name, avatar_url)'

export async function listPosts(): Promise<Post[]> {
  if (!supabase) {
    return [...demoStore].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(rowToPost)
}

export async function getPost(id: string): Promise<Post | null> {
  if (!supabase) {
    return demoStore.find((p) => p.id === id) ?? null
  }
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data ? rowToPost(data) : null
}

export async function listPostsByCountry(slug: string): Promise<Post[]> {
  if (!supabase) {
    return demoStore
      .filter((p) => p.countrySlug === slug)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('country_slug', slug)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(rowToPost)
}

export async function listPostsByAuthor(authorId: string): Promise<Post[]> {
  if (!supabase) {
    return demoStore
      .filter((p) => p.authorId === authorId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('author_id', authorId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(rowToPost)
}

export async function listDestinations(): Promise<DestinationSummary[]> {
  const posts = await listPosts()
  const bySlug = new Map<string, DestinationSummary>()
  for (const post of posts) {
    const existing = bySlug.get(post.countrySlug)
    if (existing) {
      existing.postCount += 1
    } else {
      bySlug.set(post.countrySlug, {
        country: post.destinationCountry,
        slug: post.countrySlug,
        postCount: 1,
        coverPhotoUrl: post.photoUrls[0] ?? null,
      })
    }
  }
  return [...bySlug.values()].sort((a, b) => b.postCount - a.postCount)
}

export async function getProfile(userId: string): Promise<Profile | null> {
  if (!supabase) {
    const post = demoStore.find((p) => p.authorId === userId)
    if (!post) return null
    return {
      id: userId,
      displayName: post.authorName,
      avatarUrl: post.authorAvatarUrl,
      bio: null,
      createdAt: post.createdAt,
    }
  }
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()
  if (error) throw error
  if (!data) return null
  return {
    id: data.id,
    displayName: data.display_name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    createdAt: data.created_at,
  }
}

async function uploadPhotos(userId: string, photos: File[]): Promise<string[]> {
  if (!supabase) return []
  const urls: string[] = []
  for (const file of photos) {
    const ext = file.name.split('.').pop() ?? 'jpg'
    const path = `${userId}/${crypto.randomUUID()}.${ext}`
    const { error } = await supabase.storage.from('photos').upload(path, file)
    if (error) throw error
    const { data } = supabase.storage.from('photos').getPublicUrl(path)
    urls.push(data.publicUrl)
  }
  return urls
}

export async function createPost(
  author: { id: string; displayName: string },
  input: NewPost
): Promise<Post> {
  const countrySlug = slugify(input.destinationCountry)

  if (!supabase) {
    const post: Post = {
      id: `demo-${crypto.randomUUID()}`,
      authorId: author.id,
      authorName: author.displayName,
      authorAvatarUrl: null,
      title: input.title,
      destinationCity: input.destinationCity,
      destinationCountry: input.destinationCountry,
      countrySlug,
      tripDate: input.tripDate,
      body: input.body,
      // Object URLs let photo previews work in demo mode for the session
      photoUrls: input.photos.map((f) => URL.createObjectURL(f)),
      createdAt: new Date().toISOString(),
    }
    demoStore.unshift(post)
    return post
  }

  const photoUrls = await uploadPhotos(author.id, input.photos)
  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: author.id,
      title: input.title,
      destination_city: input.destinationCity,
      destination_country: input.destinationCountry,
      country_slug: countrySlug,
      trip_date: input.tripDate,
      body: input.body,
      photo_urls: photoUrls,
    })
    .select(POST_SELECT)
    .single()
  if (error) throw error
  return rowToPost(data)
}
