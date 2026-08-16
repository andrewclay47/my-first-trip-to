interface GoogleButtonProps {
  onClick: () => void
  disabled?: boolean
  label?: string
}

export default function GoogleButton({
  onClick,
  disabled,
  label = 'Continue with Google',
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-800 transition hover:bg-stone-100 disabled:opacity-60"
    >
      <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.3-2.1 3.7-5.1 3.7-8.6z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.2 0 6-1.1 8-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.2 1.2-3.2 0-5.9-2.1-6.9-5l-3.9 3C3.2 21.3 7.3 24 12 24z"
        />
        <path
          fill="#FBBC05"
          d="M5.1 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-4-3C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l3.9-3z"
        />
        <path
          fill="#EA4335"
          d="M12 4.7c2.3 0 3.8 1 4.7 1.8l3.4-3.3C18 1.2 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4 3c.9-2.8 3.6-4.9 6.8-4.9z"
        />
      </svg>
      {label}
    </button>
  )
}
