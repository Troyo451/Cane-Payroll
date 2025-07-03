// supabase.js
// Initializes the Supabase client for your project

// Your Supabase project URL and anon key
const SUPABASE_URL = 'https://zgacwkiklejtgmmmands.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnYWN3a2lrbGVqdGdtbW1hbmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MzEzODksImV4cCI6MjA2NzEwNzM4OX0.EZ4DnfKhKjVuPISX_G5vPnUoxyOI9EOi2pH4CpO_KB0';

// Load the Supabase client from CDN if not already loaded
if (typeof window.createClient === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
  script.type = 'module';
  document.head.appendChild(script);
}

// Export a function to get the Supabase client
export const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null; 