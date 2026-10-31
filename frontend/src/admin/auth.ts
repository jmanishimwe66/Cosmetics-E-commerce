import { useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"

import { getSupabase, isSupabaseConfigured } from "../lib/supabase.ts"

const LEGACY_SESSION = "grece-admin-session"

export function isAdminConfigured(): boolean {
  return isSupabaseConfigured()
}

export function isAdminUser(user: User | null | undefined): boolean {
  return user?.app_metadata?.role === "admin"
}

export function isAdminSession(session: Session | null | undefined): boolean {
  if (!session) return false
  if (isAdminUser(session.user)) return true
  return roleFromAccessToken(session.access_token) === "admin"
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<"ok" | "invalid" | "forbidden"> {
  sessionStorage.removeItem(LEGACY_SESSION)
  const { data, error } = await getSupabase().auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  if (error || !data.session) return "invalid"
  if (!isAdminSession(data.session)) {
    await getSupabase().auth.signOut()
    return "forbidden"
  }
  return "ok"
}

export async function logoutAdmin(): Promise<void> {
  sessionStorage.removeItem(LEGACY_SESSION)
  if (!isSupabaseConfigured()) return
  await getSupabase().auth.signOut()
}

function roleFromAccessToken(token: string): string | null {
  const payload = token.split(".")[1]
  if (!payload) return null
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    const parsed: unknown = JSON.parse(atob(normalized))
    if (!parsed || typeof parsed !== "object") return null
    const role = (parsed as { app_metadata?: { role?: unknown } }).app_metadata?.role
    return typeof role === "string" ? role : null
  } catch {
    return null
  }
}

export function clearLegacyAdminStore(): void {
  localStorage.removeItem("grece-admin-v1")
  sessionStorage.removeItem(LEGACY_SESSION)
}

export function useAdminSession(): "loading" | "admin" | "guest" {
  const [state, setState] = useState<"loading" | "admin" | "guest">(() =>
    isSupabaseConfigured() ? "loading" : "guest",
  )

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    const supabase = getSupabase()
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setState("guest")
        return
      }
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        setState(isAdminSession(session) ? "admin" : "guest")
      }
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return state
}
