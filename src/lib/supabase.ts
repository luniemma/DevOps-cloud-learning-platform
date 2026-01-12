import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string;
  created_at: string;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail_url: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  category_id: string | null;
  instructor_id: string | null;
  is_published: boolean;
  is_free: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_id: string | null;
  category_id: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  reading_time_minutes: number;
  views_count: number;
  created_at: string;
  updated_at: string;
};

export type Video = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  duration_seconds: number;
  category_id: string | null;
  course_id: string | null;
  is_published: boolean;
  views_count: number;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type CourseEnrollment = {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at: string | null;
  progress_percentage: number;
};
