/*
  # Add Course Modules and Learning Resources

  ## Overview
  Extends the course system with detailed modules, lessons, and downloadable resources
  to provide comprehensive learning materials for students.

  ## New Tables

  ### 1. course_modules
  - `id` (uuid, primary key)
  - `course_id` (uuid, references courses)
  - `title` (text, not null)
  - `description` (text)
  - `order_index` (integer, default 0)
  - `duration_minutes` (integer, default 0)
  - `is_published` (boolean, default false)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. module_lessons
  - `id` (uuid, primary key)
  - `module_id` (uuid, references course_modules)
  - `title` (text, not null)
  - `description` (text)
  - `content_type` (text) - video, article, lab, quiz
  - `content_url` (text)
  - `duration_minutes` (integer, default 0)
  - `order_index` (integer, default 0)
  - `is_free_preview` (boolean, default false)
  - `is_published` (boolean, default false)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. course_resources
  - `id` (uuid, primary key)
  - `course_id` (uuid, references courses)
  - `title` (text, not null)
  - `description` (text)
  - `resource_type` (text) - pdf, link, code, document
  - `resource_url` (text, not null)
  - `file_size` (text)
  - `is_downloadable` (boolean, default true)
  - `order_index` (integer, default 0)
  - `created_at` (timestamptz)

  ### 4. learning_paths
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `slug` (text, unique, not null)
  - `description` (text)
  - `difficulty` (text)
  - `thumbnail_url` (text)
  - `total_duration_hours` (integer, default 0)
  - `order_index` (integer, default 0)
  - `is_published` (boolean, default false)
  - `created_at` (timestamptz)

  ### 5. learning_path_courses
  - `id` (uuid, primary key)
  - `path_id` (uuid, references learning_paths)
  - `course_id` (uuid, references courses)
  - `order_index` (integer, default 0)
  - Unique constraint on (path_id, course_id)

  ## Security
  - RLS enabled on all tables
  - Public read access for published content
  - Authenticated users can track their progress
*/

-- Create course_modules table
CREATE TABLE IF NOT EXISTS course_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  order_index integer DEFAULT 0,
  duration_minutes integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published modules"
  ON course_modules FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

-- Create module_lessons table
CREATE TABLE IF NOT EXISTS module_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES course_modules ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  content_type text DEFAULT 'video' CHECK (content_type IN ('video', 'article', 'lab', 'quiz')),
  content_url text,
  duration_minutes integer DEFAULT 0,
  order_index integer DEFAULT 0,
  is_free_preview boolean DEFAULT false,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE module_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published lessons"
  ON module_lessons FOR SELECT
  TO authenticated, anon
  USING (is_published = true OR is_free_preview = true);

-- Create course_resources table
CREATE TABLE IF NOT EXISTS course_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  resource_type text DEFAULT 'link' CHECK (resource_type IN ('pdf', 'link', 'code', 'document')),
  resource_url text NOT NULL,
  file_size text,
  is_downloadable boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE course_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view course resources"
  ON course_resources FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create learning_paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  difficulty text DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  thumbnail_url text,
  total_duration_hours integer DEFAULT 0,
  order_index integer DEFAULT 0,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published learning paths"
  ON learning_paths FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

-- Create learning_path_courses junction table
CREATE TABLE IF NOT EXISTS learning_path_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path_id uuid REFERENCES learning_paths ON DELETE CASCADE NOT NULL,
  course_id uuid REFERENCES courses ON DELETE CASCADE NOT NULL,
  order_index integer DEFAULT 0,
  UNIQUE(path_id, course_id)
);

ALTER TABLE learning_path_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view learning path courses"
  ON learning_path_courses FOR SELECT
  TO authenticated, anon
  USING (true);

-- Update course_progress to track lesson progress
ALTER TABLE course_progress ADD COLUMN IF NOT EXISTS lesson_id uuid REFERENCES module_lessons ON DELETE CASCADE;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_module_lessons_module_id ON module_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_course_resources_course_id ON course_resources(course_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_courses_path_id ON learning_path_courses(path_id);
CREATE INDEX IF NOT EXISTS idx_learning_path_courses_course_id ON learning_path_courses(course_id);

-- Insert sample learning paths
INSERT INTO learning_paths (title, slug, description, difficulty, total_duration_hours, is_published, order_index) VALUES
  (
    'Complete DevOps Engineer Path',
    'complete-devops-engineer',
    'Master all aspects of DevOps from fundamentals to advanced practices. Perfect for beginners starting their DevOps journey.',
    'beginner',
    120,
    true,
    1
  ),
  (
    'Cloud Architect Professional',
    'cloud-architect-professional',
    'Become a certified cloud architect with expertise in multi-cloud environments including Azure, AWS, and GCP.',
    'advanced',
    150,
    true,
    2
  ),
  (
    'Kubernetes & Container Orchestration',
    'kubernetes-container-orchestration',
    'Deep dive into Kubernetes, Docker, and modern container orchestration practices.',
    'intermediate',
    80,
    true,
    3
  ),
  (
    'CI/CD Pipeline Mastery',
    'cicd-pipeline-mastery',
    'Build production-grade CI/CD pipelines with Jenkins, GitHub Actions, GitLab CI, and Azure DevOps.',
    'intermediate',
    60,
    true,
    4
  )
ON CONFLICT (slug) DO NOTHING;