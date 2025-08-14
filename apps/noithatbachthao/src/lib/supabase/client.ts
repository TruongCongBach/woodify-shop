
import { createBrowserClient } from "@supabase/ssr";
import config from '@/config'

const supabaseUrl = config.database.url!
const supabaseKey = config.database.anonKey!

export const createSupabaseBrowserClient = () =>
	createBrowserClient(
		supabaseUrl!,
		supabaseKey!,
	);
export const supabase = createSupabaseBrowserClient();
