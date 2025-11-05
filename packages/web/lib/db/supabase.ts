import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Supabase client for client-side usage
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
