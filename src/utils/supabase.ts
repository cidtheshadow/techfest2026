import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://suekbzuxnpvolpdhbdkr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1ZWtienV4bnB2b2xwZGhiZGtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNzczOTQsImV4cCI6MjA5OTg1MzM5NH0.DIzPhHw1_EnQnBcubAHCkPt9KwNdf3WvBdvNlSyE_o8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
