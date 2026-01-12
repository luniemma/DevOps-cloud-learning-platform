import { Award, Briefcase, GraduationCap, Heart, Target, Users } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Real-World Focus',
      description: 'Every course is designed around practical, hands-on scenarios you will encounter in production environments.',
    },
    {
      icon: GraduationCap,
      title: 'Student Success',
      description: 'Your learning journey is our priority. We provide comprehensive support from beginner to expert level.',
    },
    {
      icon: Heart,
      title: 'Passion for Teaching',
      description: 'We love what we do and it shows in the quality of content and dedication to helping you succeed.',
    },
    {
      icon: Award,
      title: 'Industry Expertise',
      description: 'Learn from professionals with years of real-world experience in enterprise cloud and DevOps.',
    },
  ];

  const achievements = [
    { number: '10+', label: 'Years Experience' },
    { number: '50+', label: 'Courses Created' },
    { number: '10K+', label: 'Students Taught' },
    { number: '15+', label: 'Certifications' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About CloudForge Academy
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Empowering the next generation of DevOps and Cloud Engineers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              CloudForge Academy was born from a simple observation: too many DevOps and Cloud courses teach theory
              without practice, leaving students unprepared for real-world challenges.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              As a DevOps and Cloud Engineer with over a decade of experience in enterprise environments, I've worked
              with Azure, AWS, Kubernetes, Terraform, and countless other tools in production. I've seen what works,
              what doesn't, and what skills actually matter.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              That's why every course here is built around real-world scenarios, practical labs, and the exact skills
              you need to succeed in the industry. No fluff, no outdated practices, just the knowledge that matters.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="DevOps Engineer"
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center transform hover:scale-105 transition-all"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {achievement.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{achievement.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Become part of a growing community of DevOps and Cloud professionals learning, sharing, and growing together.
          </p>
          <a
            href="#courses"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105"
          >
            Start Learning Today
          </a>
        </div>
      </div>
    </section>
  );
}
