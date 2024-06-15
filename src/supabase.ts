import { createClient } from '@supabase/supabase-js';
import { environment } from './environment';

const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
