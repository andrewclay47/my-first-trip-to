import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createPost } from '../lib/api'
import { COUNTRIES } from '../lib/countries'

const MAX_PHOTOS = 6
const MAX_PHOTO_MB = 5

export default function Write() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [tripDate, setTripDate] = useState('')
  const [body, setBody] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const previews = useMemo(
    () => photos.map((file) => URL.createObjectURL(file)),
    [photos]
  )
  useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews]
  )

  if (loading) {
    return <p className="py-24 text-center text-stone-500">Loading…</p>
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/write' }} />
  }

  function addPhotos(files: FileList | null) {
    if (!files) return
    setError(null)
    const incoming = [...files]
    const tooBig = incoming.find((f) => f.size > MAX_PHOTO_MB * 1024 * 1024)
    if (tooBig) {
      setError(`"${tooBig.name}" is over ${MAX_PHOTO_MB}MB. Please use smaller photos.`)
      return
    }
    setPhotos((current) => [...current, ...incoming].slice(0, MAX_PHOTOS))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setError(null)

    if (!country) {
      setError('Please choose the country you visited.')
      return
    }
    if (body.trim().length < 100) {
      setError('Tell us a bit more — stories need at least 100 characters.')
      return
    }

    setSubmitting(true)
    try {
      const post = await createPost(
        { id: user.id, displayName: user.displayName },
        {
          title: title.trim(),
          destinationCity: city.trim(),
          destinationCountry: country,
          tripDate,
          body: body.trim(),
          photos,
        }
      )
      navigate(`/post/${post.id}`)
    } catch {
      setError('Something went wrong publishing your story. Please try again.')
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600'

  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-stone-900">
        Share your first trip
      </h1>
      <p className="mt-2 text-stone-600">
        Help the next first-timer: what surprised you, what did it cost, what
        would you do differently?
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-stone-800">
            Title
          </label>
          <input
            id="title"
            required
            maxLength={120}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='e.g. "Three days in Cairo — chaotic, loud, unmissable"'
            className={inputClass}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Country
            </label>
            <select
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Choose a country…
              </option>
              {COUNTRIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="mb-1.5 block text-sm font-semibold text-stone-800">
              City <span className="font-normal text-stone-500">(optional)</span>
            </label>
            <input
              id="city"
              maxLength={80}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Tokyo"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="tripDate" className="mb-1.5 block text-sm font-semibold text-stone-800">
            When did you go?
          </label>
          <input
            id="tripDate"
            type="date"
            required
            max={new Date().toISOString().split('T')[0]}
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="body" className="mb-1.5 block text-sm font-semibold text-stone-800">
            Your story
          </label>
          <textarea
            id="body"
            required
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Start from the moment you landed…"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-stone-500">
            Tip: blank lines create paragraphs.
          </p>
        </div>

        <div>
          <span className="mb-1.5 block text-sm font-semibold text-stone-800">
            Photos <span className="font-normal text-stone-500">(up to {MAX_PHOTOS}, {MAX_PHOTO_MB}MB each)</span>
          </span>
          <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-white px-4 py-8 text-sm text-stone-500 transition hover:border-teal-600 hover:text-teal-800">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addPhotos(e.target.files)
                e.target.value = ''
              }}
            />
            {photos.length === 0
              ? 'Tap to add photos'
              : `Add more photos (${photos.length}/${MAX_PHOTOS})`}
          </label>
          {previews.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {previews.map((url, i) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt={`Photo ${i + 1}`}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                    className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-teal-800 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
        >
          {submitting ? 'Publishing…' : 'Publish your story'}
        </button>
      </form>
    </section>
  )
}
