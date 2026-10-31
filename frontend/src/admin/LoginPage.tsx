import { useState, type FormEvent } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import { isAdminConfigured, loginAdmin, useAdminSession } from "./auth.ts"

const fieldClass = "min-h-11 w-full border border-[var(--line)] bg-white px-3 text-sm"

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? "/admin"

  const session = useAdminSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  if (session === "loading") {
    return (
      <p className="flex min-h-screen items-center justify-center bg-[#f4f2ec] text-sm text-[#3f2a22]">
        Checking session.
      </p>
    )
  }

  if (session === "admin") {
    return <Navigate to="/admin" replace />
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!isAdminConfigured()) {
      setError("Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the repository .env file.")
      return
    }
    const result = await loginAdmin(email, password)
    if (result === "forbidden") {
      setError("This account is not an admin.")
      return
    }
    if (result !== "ok") {
      setError("Invalid email or password.")
      return
    }
    setError("")
    navigate(from, { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f2ec] px-4 font-[family-name:var(--font-button)] text-[#1a120f]">
      <div className="w-full max-w-md border border-[var(--line)] bg-[#f8f4ef] p-8">
        <p className="text-xs font-bold tracking-[0.18em]">GRECE FOV CYCLES</p>
        <h1 className="mt-4 font-serif text-3xl font-bold text-[#1a120f]">Admin sign in</h1>
        <form className="mt-6 flex flex-col gap-4" onSubmit={submit}>
          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              className={fieldClass}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Password
            <input
              className={fieldClass}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? (
            <p className="text-sm text-[#3f2a22]" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="btn-font mt-2 inline-flex min-h-11 items-center justify-center bg-[#1a120f] px-5 text-xs font-bold tracking-[0.14em] text-white uppercase"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
