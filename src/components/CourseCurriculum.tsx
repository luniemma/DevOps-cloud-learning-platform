import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, FileText, Code, CheckCircle, Lock, Clock } from 'lucide-react';

type Lesson = {
  id: string;
  title: string;
  duration: number;
  type: 'video' | 'article' | 'lab' | 'quiz';
  isFree: boolean;
};

type Module = {
  id: string;
  title: string;
  description: string;
  duration: number;
  lessons: Lesson[];
};

type CourseCurriculumProps = {
  modules?: Module[];
};

export function CourseCurriculum({ modules }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set([modules?.[0]?.id]));

  const sampleModules: Module[] = modules || [
    {
      id: '1',
      title: 'Introduction to DevOps & Cloud',
      description: 'Get started with DevOps fundamentals and cloud computing basics',
      duration: 45,
      lessons: [
        { id: '1-1', title: 'What is DevOps?', duration: 8, type: 'video', isFree: true },
        { id: '1-2', title: 'Cloud Computing Fundamentals', duration: 12, type: 'video', isFree: true },
        { id: '1-3', title: 'DevOps Culture and Practices', duration: 10, type: 'article', isFree: false },
        { id: '1-4', title: 'Setting Up Your Development Environment', duration: 15, type: 'lab', isFree: false },
      ],
    },
    {
      id: '2',
      title: 'Version Control with Git',
      description: 'Master Git and GitHub for effective version control and collaboration',
      duration: 60,
      lessons: [
        { id: '2-1', title: 'Git Basics and Installation', duration: 10, type: 'video', isFree: false },
        { id: '2-2', title: 'Branching and Merging', duration: 15, type: 'video', isFree: false },
        { id: '2-3', title: 'Collaborative Workflows', duration: 12, type: 'article', isFree: false },
        { id: '2-4', title: 'Hands-On: Git Project', duration: 23, type: 'lab', isFree: false },
      ],
    },
    {
      id: '3',
      title: 'CI/CD Pipeline Fundamentals',
      description: 'Build automated deployment pipelines with industry-standard tools',
      duration: 90,
      lessons: [
        { id: '3-1', title: 'Introduction to CI/CD', duration: 15, type: 'video', isFree: false },
        { id: '3-2', title: 'Jenkins Setup and Configuration', duration: 20, type: 'video', isFree: false },
        { id: '3-3', title: 'GitHub Actions Workflows', duration: 18, type: 'video', isFree: false },
        { id: '3-4', title: 'Building Your First Pipeline', duration: 30, type: 'lab', isFree: false },
        { id: '3-5', title: 'Pipeline Best Practices', duration: 7, type: 'article', isFree: false },
      ],
    },
    {
      id: '4',
      title: 'Container Technologies',
      description: 'Learn Docker and containerization for modern application deployment',
      duration: 75,
      lessons: [
        { id: '4-1', title: 'Docker Fundamentals', duration: 20, type: 'video', isFree: false },
        { id: '4-2', title: 'Creating Docker Images', duration: 15, type: 'video', isFree: false },
        { id: '4-3', title: 'Docker Compose', duration: 12, type: 'video', isFree: false },
        { id: '4-4', title: 'Containerizing Applications', duration: 28, type: 'lab', isFree: false },
      ],
    },
    {
      id: '5',
      title: 'Cloud Platform Deep Dive',
      description: 'Comprehensive coverage of Azure and AWS cloud services',
      duration: 120,
      lessons: [
        { id: '5-1', title: 'Azure Cloud Services Overview', duration: 25, type: 'video', isFree: false },
        { id: '5-2', title: 'AWS Core Services', duration: 25, type: 'video', isFree: false },
        { id: '5-3', title: 'Identity and Access Management', duration: 18, type: 'video', isFree: false },
        { id: '5-4', title: 'Deploying to the Cloud', duration: 45, type: 'lab', isFree: false },
        { id: '5-5', title: 'Cloud Cost Optimization', duration: 7, type: 'article', isFree: false },
      ],
    },
  ];

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'article':
        return FileText;
      case 'lab':
        return Code;
      case 'quiz':
        return CheckCircle;
      default:
        return PlayCircle;
    }
  };

  const totalDuration = sampleModules.reduce((acc, module) => acc + module.duration, 0);
  const totalLessons = sampleModules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Course Curriculum</h3>
        <div className="flex items-center gap-6 text-sm">
          <span className="flex items-center">
            <PlayCircle className="w-4 h-4 mr-2" />
            {sampleModules.length} Modules
          </span>
          <span className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            {totalLessons} Lessons
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sampleModules.map((module, index) => {
          const isExpanded = expandedModules.has(module.id);
          return (
            <div key={module.id}>
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start space-x-4 flex-1 text-left">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      {module.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span>{module.lessons.length} lessons</span>
                      <span>•</span>
                      <span>{module.duration} min</span>
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-2">
                  {module.lessons.map((lesson) => {
                    const Icon = getIcon(lesson.type);
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {lesson.duration} min
                          </span>
                          {lesson.isFree ? (
                            <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded">
                              FREE
                            </span>
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Ready to start learning?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Get full access to all {totalLessons} lessons
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
