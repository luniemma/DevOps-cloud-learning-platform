import { useState, useEffect } from 'react';
import { BookOpen, Award, Clock, TrendingUp, Edit2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, CourseEnrollment, Course } from '../lib/supabase';

export function Dashboard() {
  const { user, profile, updateProfile } = useAuth();
  const [enrollments, setEnrollments] = useState<(CourseEnrollment & { course: Course | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
      });
    }
  }, [profile]);

  const loadDashboardData = async () => {
    try {
      const { data: enrollmentsData } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', user!.id)
        .order('enrolled_at', { ascending: false });

      if (enrollmentsData) {
        setEnrollments(enrollmentsData as any);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    const { error } = await updateProfile(formData);
    if (!error) {
      setEditing(false);
    }
  };

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: enrollments.length,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Award,
      label: 'Completed',
      value: enrollments.filter((e) => e.progress_percentage === 100).length,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Clock,
      label: 'In Progress',
      value: enrollments.filter((e) => e.progress_percentage > 0 && e.progress_percentage < 100).length,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: TrendingUp,
      label: 'Avg Progress',
      value: `${Math.round(enrollments.reduce((acc, e) => acc + e.progress_percentage, 0) / (enrollments.length || 1))}%`,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  if (!user) {
    return (
      <section id="dashboard" className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please sign in to view your dashboard
          </h2>
          <a
            href="#home"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Go to Home
          </a>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="dashboard" className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {profile?.full_name || 'Student'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Continue your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Courses
              </h3>

              {enrollments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't enrolled in any courses yet.
                  </p>
                  <a
                    href="#courses"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Browse Courses
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {enrollment.course?.title || 'Course'}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                          </p>
                        </div>
                        {enrollment.completed_at && (
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">
                            Completed
                          </span>
                        )}
                      </div>

                      <div className="mb-2">
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>Progress</span>
                          <span className="font-semibold">{enrollment.progress_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all"
                            style={{ width: `${enrollment.progress_percentage}%` }}
                          />
                        </div>
                      </div>

                      <button className="mt-3 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                        Continue Learning →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h3>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                ) : (
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                )}
              </div>

              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">
                    {(profile?.full_name || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 dark:text-white">{profile?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Role
                    </label>
                    <p className="text-gray-900 dark:text-white capitalize">{profile?.role}</p>
                  </div>
                  {profile?.bio && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Bio
                      </label>
                      <p className="text-gray-900 dark:text-white">{profile.bio}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(profile?.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
