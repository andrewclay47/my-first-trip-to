export interface Profile {
  id: string
  displayName: string
  avatarUrl: string | null
  bio: string | null
  createdAt: string
}

export interface Post {
  id: string
  authorId: string
  authorName: string
  authorAvatarUrl: string | null
  title: string
  destinationCity: string
  destinationCountry: string
  countrySlug: string
  tripDate: string
  body: string
  photoUrls: string[]
  createdAt: string
}

export interface DestinationSummary {
  country: string
  slug: string
  postCount: number
  coverPhotoUrl: string | null
}

export interface NewPost {
  title: string
  destinationCity: string
  destinationCountry: string
  tripDate: string
  body: string
  photos: File[]
}
