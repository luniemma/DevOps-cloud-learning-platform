import { useState, useEffect } from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { supabase, Course, Category } from '../lib/supabase';
import { CourseCard } from '../components/CourseCard';

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesRes, categoriesRes] = await Promise.all([
        supabase.from('courses').select('*').eq('is_published', true).order('order_index'),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (coursesRes.data) setCourses(coursesRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const categoryMatch = selectedCategory === 'all' || course.category_id === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const featuredCourses = filteredCourses.slice(0, 2);
  const regularCourses = filteredCourses.slice(2);

  if (loading) {
    return (
      <section id="courses" className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">COMPREHENSIVE CURRICULUM</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Learning Paths
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Master DevOps and Cloud technologies with structured, production-focused courses designed by industry experts.
            Each course includes hands-on labs, real-world projects, and lifetime access.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">Filter Courses</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
              <div className="flex gap-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={`flex-1 px-3 py-2 rounded-xl font-semibold capitalize transition-all transform hover:scale-105 text-sm ${
                      selectedDifficulty === level
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              No courses found matching your criteria
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Try adjusting your filters or check back soon for new content
            </p>
          </div>
        ) : (
          <>
            {featuredCourses.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-6 h-6 text-cyan-500" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Courses</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} featured />
                  ))}
                </div>
              </div>
            )}

            {regularCourses.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  All Courses ({regularCourses.length})
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
