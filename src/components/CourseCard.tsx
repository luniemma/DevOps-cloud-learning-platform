import { Clock, BarChart3, CheckCircle2, PlayCircle, Award } from 'lucide-react';
import { Course } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type CourseCardProps = {
  course: Course;
  featured?: boolean;
};

export function CourseCard({ course, featured = false }: CourseCardProps) {
  const { user } = useAuth();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const mockLessons = [
    'Introduction to Cloud Architecture',
    'Setting Up Development Environment',
    'Core Concepts and Fundamentals',
    'Hands-On Lab Sessions',
    'Best Practices and Real-World Examples',
  ];

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
        featured ? 'border-2 border-cyan-500 shadow-2xl shadow-cyan-500/20' : 'shadow-lg border border-gray-100 dark:border-gray-700'
      }`}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center space-x-1">
            <Award className="w-3 h-3" />
            <span>FEATURED</span>
          </span>
        </div>
      )}

      <div className="relative h-56 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-white opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="absolute top-4 right-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          {course.is_free && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-lg">
              Free
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-4 text-white text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{course.duration_hours} hours</span>
            </div>
            <div className="flex items-center space-x-1">
              <PlayCircle className="w-4 h-4" />
              <span className="font-semibold">{mockLessons.length}+ lessons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
          {course.description || 'Master essential skills with hands-on labs and real-world projects.'}
        </p>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">What You'll Learn</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{mockLessons.length} modules</span>
          </div>
          <div className="space-y-2">
            {mockLessons.slice(0, 3).map((lesson, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{lesson}</span>
              </div>
            ))}
            {mockLessons.length > 3 && (
              <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                +{mockLessons.length - 3} more modules
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            {user ? 'Enroll Now' : 'Sign In to Enroll'}
          </button>
          <button className="p-3 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 rounded-xl transition-all">
            <PlayCircle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {featured && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity -z-10"></div>
      )}
    </div>
  );
}
