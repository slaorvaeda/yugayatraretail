import { createClient } from '@supabase/supabase-js';
import env from './env.js';

if (!env.supabaseUrl || !env.supabaseServiceKey) {
  throw new Error('Supabase configuration is missing. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

export const supabase = createClient(env.supabaseUrl, env.supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

