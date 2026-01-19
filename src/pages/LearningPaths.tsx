import { useState, useEffect } from 'react';
import { MapPin, Clock, Award, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

type LearningPath = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail_url: string | null;
  total_duration_hours: number;
  order_index: number;
  is_published: boolean;
  created_at: string;
};

export function LearningPaths() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLearningPaths();
  }, []);

  const loadLearningPaths = async () => {
    try {
      const { data } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('is_published', true)
        .order('order_index');

      if (data) setPaths(data);
    } catch (error) {
      console.error('Error loading learning paths:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return BookOpen;
      case 'intermediate':
        return TrendingUp;
      case 'advanced':
        return Award;
      default:
        return BookOpen;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section id="learning-paths" className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">GUIDED LEARNING</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Learning Paths
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Follow structured learning paths designed to take you from beginner to expert.
            Each path includes curated courses, hands-on projects, and industry certifications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {paths.map((path) => {
            const DifficultyIcon = getDifficultyIcon(path.difficulty);
            return (
              <div
                key={path.id}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>

                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(path.difficulty)}`}>
                          {path.difficulty}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {path.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold">{path.total_duration_hours}+ hours</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <DifficultyIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold capitalize">{path.difficulty}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                      What You'll Achieve
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                        Industry-recognized certification
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                        Real-world portfolio projects
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                        Job-ready practical skills
                      </li>
                    </ul>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                    <span>Start This Path</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take our skill assessment to get personalized learning path recommendations based on your experience and career goals.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
            Take Skill Assessment
          </button>
        </div>
      </div>
    </section>
  );
}
