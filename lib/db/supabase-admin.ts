import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Server-side client with service role (use with caution - SERVER ONLY)
// This should NEVER be imported by client-side code
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
