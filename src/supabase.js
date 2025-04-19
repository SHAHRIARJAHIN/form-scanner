import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdozfnzdbhzhzhwznagh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkb3pmbnpkYmh6aHpod3puYWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNDU1NTAsImV4cCI6MjA2MDYyMTU1MH0.M5u8RdLQ-gd6eK9SDfBSS1TWJi_cllSMnDNL7tpxhj8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;