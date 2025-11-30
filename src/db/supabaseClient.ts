import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '@/lib/utils';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';


if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY');
}

export const supabase: SupabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);