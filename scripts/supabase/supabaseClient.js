// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

// Use your Supabase project credentials
const SUPABASE_URL = process.env.SUPABASE_URL; // Replace with your Supabase URL
const SUPABASE_KEY = process.env.SUPABASE_PUBLIC_KEY; // Replace with your Supabase public key

// Create the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = {supabase}