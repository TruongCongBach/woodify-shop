import { createClient } from '@supabase/supabase-js'
import config from '@/config'

const supabaseUrl = config.database.url!
const supabaseKey = config.database.anonKey!
export const supabase = createClient(supabaseUrl, supabaseKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
	},
	realtime: {
		params: {
			// Thêm các tham số tùy chỉnh nếu cần
			// Ví dụ: 'v=2.0'
		},
	},
})
