import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import config from '@/config'

const supabaseUrl = config.database.url!
const supabaseKey = config.database.anonKey!

export async function createSupabaseServerClient() {
	const cookieStore = await cookies() // ✅ await để lấy ReadonlyRequestCookies

	return createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll()
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						cookieStore.set(name, value, options)
					})
				} catch {
					// ignore for server components
				}
			}
		}
	})
}
export const supabase = createSupabaseServerClient()
