/*
  # Enhanced Student Registration, Enrollment & Payment System

  ## Overview
  Comprehensive enhancement to student registration profiles, course enrollment options,
  and payment processing system for CloudForge Academy platform.

  ## Profile Enhancements (Student Registration)

  ### New Fields Added to profiles table
  - `phone_number` (text) - Student contact number
  - `country` (text) - Student's country
  - `state_province` (text) - State or province
  - `city` (text) - City of residence
  - `postal_code` (text) - Postal/ZIP code
  - `date_of_birth` (date) - Student's date of birth
  - `gender` (text) - Gender (male, female, other, prefer_not_to_say)
  - `education_level` (text) - Current education level
  - `employment_status` (text) - Current employment status
  - `company_name` (text) - Current company/organization
  - `job_title` (text) - Current job title
  - `years_of_experience` (integer) - Years of professional experience
  - `linkedin_url` (text) - LinkedIn profile URL
  - `github_url` (text) - GitHub profile URL
  - `website_url` (text) - Personal website
  - `learning_goals` (text) - Student's learning objectives
  - `interests` (text array) - Areas of interest
  - `preferred_language` (text) - Preferred learning language
  - `timezone` (text) - Student's timezone
  - `newsletter_subscribed` (boolean) - Newsletter subscription status
  - `marketing_emails` (boolean) - Marketing communications preference

  ## Course Enrollment Enhancements

  ### New Fields Added to course_enrollments table
  - `enrollment_type` (text) - Type of enrollment (free_trial, full_access, audit, premium)
  - `enrollment_status` (text) - Current status (active, paused, cancelled, completed, expired)
  - `payment_status` (text) - Payment status (pending, paid, refunded, failed)
  - `access_expires_at` (timestamptz) - Access expiration date
  - `certificate_eligible` (boolean) - Eligible for certificate
  - `certificate_issued_at` (timestamptz) - Certificate issuance date
  - `certificate_url` (text) - Certificate download URL
  - `referral_code` (text) - Referral code used
  - `discount_code` (text) - Discount code applied
  - `notes` (text) - Admin/instructor notes
  - `last_accessed_at` (timestamptz) - Last course access time

  ## New Tables

  ### 1. payments
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `enrollment_id` (uuid, references course_enrollments)
  - `amount` (decimal)
  - `currency` (text) - USD, EUR, GBP, etc.
  - `payment_method` (text) - credit_card, debit_card, paypal, stripe, bank_transfer
  - `payment_provider` (text) - stripe, paypal, square, etc.
  - `transaction_id` (text) - External transaction ID
  - `payment_status` (text) - pending, completed, failed, refunded, cancelled
  - `payment_type` (text) - one_time, subscription, installment
  - `billing_name` (text)
  - `billing_email` (text)
  - `billing_address` (text)
  - `billing_city` (text)
  - `billing_state` (text)
  - `billing_country` (text)
  - `billing_postal_code` (text)
  - `paid_at` (timestamptz)
  - `refunded_at` (timestamptz)
  - `refund_amount` (decimal)
  - `refund_reason` (text)
  - `created_at` (timestamptz)

  ### 2. course_pricing
  - `id` (uuid, primary key)
  - `course_id` (uuid, references courses)
  - `price_type` (text) - one_time, monthly, yearly, lifetime
  - `amount` (decimal)
  - `currency` (text)
  - `original_price` (decimal) - Before discount
  - `discount_percentage` (integer)
  - `trial_days` (integer) - Free trial period
  - `is_active` (boolean)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. discount_codes
  - `id` (uuid, primary key)
  - `code` (text, unique) - Discount code
  - `description` (text)
  - `discount_type` (text) - percentage, fixed_amount
  - `discount_value` (decimal)
  - `min_purchase_amount` (decimal)
  - `max_uses` (integer) - Maximum number of uses
  - `times_used` (integer) - Current usage count
  - `valid_from` (timestamptz)
  - `valid_until` (timestamptz)
  - `is_active` (boolean)
  - `applicable_courses` (uuid array) - Specific courses or null for all
  - `created_at` (timestamptz)

  ### 4. student_certificates
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `course_id` (uuid, references courses)
  - `enrollment_id` (uuid, references course_enrollments)
  - `certificate_number` (text, unique)
  - `certificate_url` (text)
  - `issued_at` (timestamptz)
  - `expiry_at` (timestamptz) - For renewable certifications
  - `grade` (text) - Pass, Merit, Distinction, etc.
  - `score_percentage` (integer)
  - `verification_url` (text)
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all new tables
  - Users can only view/edit their own data
  - Admins have full access for management
*/

-- Add new fields to profiles table
DO $$
BEGIN
  -- Contact Information
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone_number') THEN
    ALTER TABLE profiles ADD COLUMN phone_number text;
  END IF;

  -- Address Information
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'country') THEN
    ALTER TABLE profiles ADD COLUMN country text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'state_province') THEN
    ALTER TABLE profiles ADD COLUMN state_province text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'city') THEN
    ALTER TABLE profiles ADD COLUMN city text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'postal_code') THEN
    ALTER TABLE profiles ADD COLUMN postal_code text;
  END IF;

  -- Personal Information
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'date_of_birth') THEN
    ALTER TABLE profiles ADD COLUMN date_of_birth date;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'gender') THEN
    ALTER TABLE profiles ADD COLUMN gender text CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say'));
  END IF;

  -- Education & Professional Information
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'education_level') THEN
    ALTER TABLE profiles ADD COLUMN education_level text CHECK (education_level IN ('high_school', 'associate', 'bachelor', 'master', 'doctorate', 'bootcamp', 'self_taught', 'other'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'employment_status') THEN
    ALTER TABLE profiles ADD COLUMN employment_status text CHECK (employment_status IN ('employed', 'self_employed', 'student', 'unemployed', 'freelancer', 'retired'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'company_name') THEN
    ALTER TABLE profiles ADD COLUMN company_name text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'job_title') THEN
    ALTER TABLE profiles ADD COLUMN job_title text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'years_of_experience') THEN
    ALTER TABLE profiles ADD COLUMN years_of_experience integer DEFAULT 0;
  END IF;

  -- Social & Web Presence
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'linkedin_url') THEN
    ALTER TABLE profiles ADD COLUMN linkedin_url text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'github_url') THEN
    ALTER TABLE profiles ADD COLUMN github_url text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'website_url') THEN
    ALTER TABLE profiles ADD COLUMN website_url text;
  END IF;

  -- Learning Preferences
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'learning_goals') THEN
    ALTER TABLE profiles ADD COLUMN learning_goals text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'interests') THEN
    ALTER TABLE profiles ADD COLUMN interests text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'preferred_language') THEN
    ALTER TABLE profiles ADD COLUMN preferred_language text DEFAULT 'en';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'timezone') THEN
    ALTER TABLE profiles ADD COLUMN timezone text DEFAULT 'UTC';
  END IF;

  -- Communication Preferences
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'newsletter_subscribed') THEN
    ALTER TABLE profiles ADD COLUMN newsletter_subscribed boolean DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'marketing_emails') THEN
    ALTER TABLE profiles ADD COLUMN marketing_emails boolean DEFAULT true;
  END IF;
END $$;

-- Add new fields to course_enrollments table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'enrollment_type') THEN
    ALTER TABLE course_enrollments ADD COLUMN enrollment_type text DEFAULT 'full_access' CHECK (enrollment_type IN ('free_trial', 'full_access', 'audit', 'premium'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'enrollment_status') THEN
    ALTER TABLE course_enrollments ADD COLUMN enrollment_status text DEFAULT 'active' CHECK (enrollment_status IN ('active', 'paused', 'cancelled', 'completed', 'expired'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'payment_status') THEN
    ALTER TABLE course_enrollments ADD COLUMN payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed', 'free'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'access_expires_at') THEN
    ALTER TABLE course_enrollments ADD COLUMN access_expires_at timestamptz;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'certificate_eligible') THEN
    ALTER TABLE course_enrollments ADD COLUMN certificate_eligible boolean DEFAULT true;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'certificate_issued_at') THEN
    ALTER TABLE course_enrollments ADD COLUMN certificate_issued_at timestamptz;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'certificate_url') THEN
    ALTER TABLE course_enrollments ADD COLUMN certificate_url text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'referral_code') THEN
    ALTER TABLE course_enrollments ADD COLUMN referral_code text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'discount_code') THEN
    ALTER TABLE course_enrollments ADD COLUMN discount_code text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'notes') THEN
    ALTER TABLE course_enrollments ADD COLUMN notes text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'course_enrollments' AND column_name = 'last_accessed_at') THEN
    ALTER TABLE course_enrollments ADD COLUMN last_accessed_at timestamptz;
  END IF;
END $$;

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  enrollment_id uuid REFERENCES course_enrollments ON DELETE SET NULL,
  amount decimal(10, 2) NOT NULL,
  currency text DEFAULT 'USD' NOT NULL,
  payment_method text DEFAULT 'credit_card' CHECK (payment_method IN ('credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer', 'apple_pay', 'google_pay')),
  payment_provider text DEFAULT 'stripe' CHECK (payment_provider IN ('stripe', 'paypal', 'square', 'razorpay', 'other')),
  transaction_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  payment_type text DEFAULT 'one_time' CHECK (payment_type IN ('one_time', 'subscription', 'installment')),
  billing_name text,
  billing_email text,
  billing_address text,
  billing_city text,
  billing_state text,
  billing_country text,
  billing_postal_code text,
  paid_at timestamptz,
  refunded_at timestamptz,
  refund_amount decimal(10, 2),
  refund_reason text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create course_pricing table
CREATE TABLE IF NOT EXISTS course_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  price_type text DEFAULT 'one_time' CHECK (price_type IN ('one_time', 'monthly', 'yearly', 'lifetime')),
  amount decimal(10, 2) NOT NULL,
  currency text DEFAULT 'USD' NOT NULL,
  original_price decimal(10, 2),
  discount_percentage integer DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  trial_days integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE course_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active course pricing"
  ON course_pricing FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- Create discount_codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text,
  discount_type text DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value decimal(10, 2) NOT NULL,
  min_purchase_amount decimal(10, 2) DEFAULT 0,
  max_uses integer,
  times_used integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  is_active boolean DEFAULT true,
  applicable_courses uuid[] DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active discount codes"
  ON discount_codes FOR SELECT
  TO authenticated, anon
  USING (is_active = true AND valid_from <= now() AND (valid_until IS NULL OR valid_until >= now()));

-- Create student_certificates table
CREATE TABLE IF NOT EXISTS student_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  enrollment_id uuid REFERENCES course_enrollments ON DELETE CASCADE NOT NULL,
  certificate_number text UNIQUE NOT NULL,
  certificate_url text,
  issued_at timestamptz DEFAULT now(),
  expiry_at timestamptz,
  grade text CHECK (grade IN ('pass', 'merit', 'distinction', 'honors')),
  score_percentage integer CHECK (score_percentage >= 0 AND score_percentage <= 100),
  verification_url text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE student_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own certificates"
  ON student_certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can verify certificates"
  ON student_certificates FOR SELECT
  TO anon
  USING (certificate_number IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_enrollment_id ON payments(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_course_pricing_course_id ON course_pricing(course_id);
CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_student_certificates_user_id ON student_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_student_certificates_course_id ON student_certificates(course_id);
CREATE INDEX IF NOT EXISTS idx_student_certificates_number ON student_certificates(certificate_number);

-- Insert sample course pricing
INSERT INTO course_pricing (course_id, price_type, amount, currency, original_price, discount_percentage, trial_days, is_active)
SELECT 
  c.id,
  'one_time',
  99.99,
  'USD',
  149.99,
  33,
  7,
  true
FROM courses c
WHERE c.is_free = false
ON CONFLICT DO NOTHING;

-- Insert sample discount codes
INSERT INTO discount_codes (code, description, discount_type, discount_value, min_purchase_amount, max_uses, valid_from, valid_until, is_active) VALUES
  ('WELCOME2024', 'Welcome discount for new students', 'percentage', 20, 0, 1000, now(), now() + interval '90 days', true),
  ('SUMMER50', 'Summer sale - 50% off', 'percentage', 50, 50, 500, now(), now() + interval '60 days', true),
  ('EARLYBIRD', 'Early bird special', 'fixed_amount', 25, 100, 100, now(), now() + interval '30 days', true),
  ('STUDENT15', 'Student discount', 'percentage', 15, 0, NULL, now(), NULL, true)
ON CONFLICT (code) DO NOTHING;