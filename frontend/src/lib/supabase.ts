import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { setAccessTokenProvider } from "../api/client.ts"

let client: SupabaseClient | null = null

export function isSupabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}

export function getSupabase(): SupabaseClient {
  if (client) return client
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error("Supabase is not configured")
  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: "grece-admin-auth",
    },
  })
  return client
}

export function bindApiAuth(): void {
  setAccessTokenProvider(async () => {
    if (!isSupabaseConfigured()) return null
    const { data } = await getSupabase().auth.getSession()
    return data.session?.access_token ?? null
  })
}

export async function uploadProductImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
  const suffix = /^[a-z0-9]+$/.test(extension) ? `.${extension}` : ""
  const path = `${crypto.randomUUID()}${suffix}`
  const supabase = getSupabase()
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  })
  if (error) throw error
  return supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl
}
