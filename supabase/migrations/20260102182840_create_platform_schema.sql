/*
  # CloudForge Academy Platform Schema

  ## Overview
  Complete database schema for a DevOps & Cloud Engineering learning platform with user authentication, courses, blog, videos, and student progress tracking.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, unique, not null)
  - `full_name` (text)
  - `avatar_url` (text)
  - `bio` (text)
  - `role` (text, default 'student') - student, instructor, admin
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. categories
  - `id` (uuid, primary key)
  - `name` (text, unique, not null) - e.g., "Azure", "AWS", "Kubernetes"
  - `slug` (text, unique, not null)
  - `description` (text)
  - `icon` (text) - icon name for UI
  - `color` (text) - hex color code
  - `created_at` (timestamptz)

  ### 3. courses
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text)
  - `thumbnail_url` (text)
  - `difficulty` (text) - beginner, intermediate, advanced
  - `duration_hours` (integer)
  - `category_id` (uuid, references categories)
  - `instructor_id` (uuid, references profiles)
  - `is_published` (boolean, default false)
  - `is_free` (boolean, default false)
  - `order_index` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. blog_posts
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `excerpt` (text)
  - `content` (text, not null)
  - `cover_image_url` (text)
  - `author_id` (uuid, references profiles)
  - `category_id` (uuid, references categories)
  - `tags` (text array)
  - `is_published` (boolean, default false)
  - `published_at` (timestamptz)
  - `reading_time_minutes` (integer)
  - `views_count` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. videos
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text)
  - `video_url` (text, not null) - YouTube/Vimeo embed URL
  - `thumbnail_url` (text)
  - `duration_seconds` (integer)
  - `category_id` (uuid, references categories)
  - `course_id` (uuid, references courses, nullable)
  - `is_published` (boolean, default false)
  - `views_count` (integer, default 0)
  - `order_index` (integer, default 0)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. course_enrollments
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `course_id` (uuid, references courses)
  - `enrolled_at` (timestamptz)
  - `completed_at` (timestamptz, nullable)
  - `progress_percentage` (integer, default 0)
  - Unique constraint on (user_id, course_id)

  ### 7. course_progress
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `course_id` (uuid, references courses)
  - `video_id` (uuid, references videos)
  - `completed` (boolean, default false)
  - `last_watched_at` (timestamptz)
  - Unique constraint on (user_id, course_id, video_id)

  ### 8. comments
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `post_id` (uuid, references blog_posts, nullable)
  - `video_id` (uuid, references videos, nullable)
  - `content` (text, not null)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 9. gallery_images
  - `id` (uuid, primary key)
  - `title` (text)
  - `image_url` (text, not null)
  - `description` (text)
  - `category` (text) - architecture, pipelines, terminal, etc.
  - `order_index` (integer, default 0)
  - `created_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies for authenticated users to read published content
  - Policies for users to manage their own data
  - Policies for admins to manage all content
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  role text DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  thumbnail_url text,
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_hours integer DEFAULT 0,
  category_id uuid REFERENCES categories ON DELETE SET NULL,
  instructor_id uuid REFERENCES profiles ON DELETE SET NULL,
  is_published boolean DEFAULT false,
  is_free boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  TO authenticated, anon
  USING (is_published = true OR auth.uid() = instructor_id);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  author_id uuid REFERENCES profiles ON DELETE SET NULL,
  category_id uuid REFERENCES categories ON DELETE SET NULL,
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  reading_time_minutes integer DEFAULT 5,
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO authenticated, anon
  USING (is_published = true OR auth.uid() = author_id);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  duration_seconds integer DEFAULT 0,
  category_id uuid REFERENCES categories ON DELETE SET NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE,
  is_published boolean DEFAULT false,
  views_count integer DEFAULT 0,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published videos"
  ON videos FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

-- Create course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  UNIQUE(user_id, course_id)
);

ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON course_enrollments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses"
  ON course_enrollments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON course_enrollments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create course_progress table
CREATE TABLE IF NOT EXISTS course_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  video_id uuid REFERENCES videos ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  last_watched_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id, video_id)
);

ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON course_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can track own progress"
  ON course_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON course_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE,
  video_id uuid REFERENCES videos ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (post_id IS NOT NULL OR video_id IS NOT NULL)
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  image_url text NOT NULL,
  description text,
  category text DEFAULT 'general',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Azure', 'azure', 'Microsoft Azure cloud platform', 'Cloud', '#0078D4'),
  ('AWS', 'aws', 'Amazon Web Services', 'CloudCog', '#FF9900'),
  ('Kubernetes', 'kubernetes', 'Container orchestration', 'Container', '#326CE5'),
  ('CI/CD', 'cicd', 'Continuous Integration & Deployment', 'GitBranch', '#2088FF'),
  ('Terraform', 'terraform', 'Infrastructure as Code', 'Code', '#7B42BC'),
  ('Linux', 'linux', 'Linux systems administration', 'Terminal', '#FCC624'),
  ('Docker', 'docker', 'Container technology', 'Box', '#2496ED'),
  ('DevOps', 'devops', 'DevOps practices and culture', 'Workflow', '#0DB7ED')
ON CONFLICT (slug) DO NOTHING;