interface AvatarProps {
  name: string
  url: string | null
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-16 text-xl',
}

export default function Avatar({ name, url, size = 'md' }: AvatarProps) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  if (url) {
    return (
      <img
        src={url}
        alt={name}
        className={`${SIZES[size]} rounded-full object-cover`}
      />
    )
  }
  return (
    <div
      className={`${SIZES[size]} flex items-center justify-center rounded-full bg-teal-700 font-semibold text-white`}
      aria-hidden
    >
      {initials || '?'}
    </div>
  )
}
