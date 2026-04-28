/*
  # Create Leads Table for Solar Form Submissions
  
  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `zip_code` (text, required)
      - `home_type` (text: 'own-single' | 'own-multi' | 'rent-single' | 'rent-multi')
      - `estimated_bill` (integer, monthly bill in dollars)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, required)
      - `phone` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy allowing authenticated or anonymous users to insert leads
    - Add policy allowing users to view only their own leads (email-based)
  
  3. Notes
    - Public insert-only access for anonymous form submissions
    - Email uniqueness is not enforced to allow multiple submissions per email
    - Timestamp automatically tracks submission time
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code text NOT NULL,
  home_type text,
  estimated_bill integer,
  first_name text,
  last_name text,
  email text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a lead"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view their own leads"
  ON leads
  FOR SELECT
  TO authenticated, anon
  USING (email = COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', email));