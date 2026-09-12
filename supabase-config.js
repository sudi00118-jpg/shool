// supabase-config.js
const SUPABASE_URL = 'https://bakigpmgiuoytjskmdfj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_s8rK6dSkw_2ubaryRiqctw_OfZ8QoQF';

// supabaseClient በሚል አዲስ ስም መፍጠር
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
