<<<<<<< HEAD
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efzgpbneonewotqxozau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmemdwYm5lb25ld290cXhvemF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTc5NDIsImV4cCI6MjA2MzY5Mzk0Mn0.nTGx7dLuieQqA_AKhlTncUtCPWA2I0tWq1qAJEmu8sg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
=======
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://efzgpbneonewotqxozau.supabase.co"  // metti qui l'URL del tuo progetto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmemdwYm5lb25ld290cXhvemF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTc5NDIsImV4cCI6MjA2MzY5Mzk0Mn0.nTGx7dLuieQqA_AKhlTncUtCPWA2I0tWq1qAJEmu8sg' // metti qui la chiave anonima del tuo progetto

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
>>>>>>> efad4fb (Aggiornato WellnessForm e aggiunto supabaseClient)
