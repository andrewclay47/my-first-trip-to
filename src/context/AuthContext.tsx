import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase, isDemoMode } from '../lib/supabase'
import { DEMO_USER } from '../lib/demoData'

export interface AuthUser {
  id: string
  email: string | null
  displayName: string
  avatarUrl: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  isDemoMode: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInDemo: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(!isDemoMode)

  useEffect(() => {
    if (!supabase) return
    const client = supabase

    async function loadUser(sessionUserId: string | undefined) {
      if (!sessionUserId) {
        setUser(null)
        setLoading(false)
        return
      }
      const { data: auth } = await client.auth.getUser()
      const authUser = auth.user
      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }
      const { data: profile } = await client
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', authUser.id)
        .maybeSingle()
      setUser({
        id: authUser.id,
        email: authUser.email ?? null,
        displayName:
          profile?.display_name ??
          (authUser.user_metadata?.display_name as string | undefined) ??
          authUser.email?.split('@')[0] ??
          'Traveler',
        avatarUrl: profile?.avatar_url ?? null,
      })
      setLoading(false)
    }

    client.auth.getSession().then(({ data }) => loadUser(data.session?.user.id))
    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user.id)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      if (!supabase) throw new Error('Backend not connected yet.')
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      })
      if (error) throw error
    },
    []
  )

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Backend not connected yet.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error('Backend not connected yet.')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw error
  }, [])

  const signInDemo = useCallback(() => {
    setUser({
      id: DEMO_USER.id,
      email: 'demo@example.com',
      displayName: DEMO_USER.displayName,
      avatarUrl: DEMO_USER.avatarUrl,
    })
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isDemoMode,
      signUp,
      signIn,
      signInWithGoogle,
      signInDemo,
      signOut,
    }),
    [user, loading, signUp, signIn, signInWithGoogle, signInDemo, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
