import { ArrowRight, Cloud, Code, GitBranch, Server, Award, Users, BookOpen, Star, Zap, Shield, TrendingUp, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { AuthModal } from '../components/AuthModal';

export function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const features = [
    {
      icon: Cloud,
      title: 'Multi-Cloud Mastery',
      description: 'Master Azure, AWS, and GCP with hands-on labs covering real-world enterprise scenarios and best practices',
      color: 'from-blue-500 via-blue-600 to-cyan-500',
      highlight: 'Azure & AWS Certified',
    },
    {
      icon: GitBranch,
      title: 'CI/CD Excellence',
      description: 'Build production-grade deployment pipelines with Jenkins, GitHub Actions, Azure DevOps, and GitLab CI',
      color: 'from-blue-600 via-cyan-600 to-blue-700',
      highlight: 'Industry Standard Tools',
    },
    {
      icon: Server,
      title: 'Infrastructure as Code',
      description: 'Master Terraform, ARM templates, CloudFormation, and Ansible for automated infrastructure management',
      color: 'from-cyan-600 via-blue-600 to-blue-700',
      highlight: 'Production Ready',
    },
    {
      icon: Code,
      title: 'Container Orchestration',
      description: 'Deploy and scale applications with Docker, Kubernetes, Helm, and service mesh technologies',
      color: 'from-blue-700 via-cyan-600 to-cyan-700',
      highlight: 'K8s Expertise',
    },
  ];

  const stats = [
    { icon: Users, value: '12,000+', label: 'Active Students', subtext: 'Learning worldwide' },
    { icon: BookOpen, value: '65+', label: 'Expert Courses', subtext: 'Production-focused' },
    { icon: Award, value: '98%', label: 'Success Rate', subtext: 'Career advancement' },
    { icon: Zap, value: '24/7', label: 'Lab Access', subtext: 'Hands-on practice' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior DevOps Engineer at Microsoft',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'CloudForge Academy transformed my career. The hands-on labs and real-world scenarios prepared me perfectly for enterprise DevOps challenges.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Cloud Architect at AWS',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'The most practical and comprehensive cloud engineering training available. Every lesson is directly applicable to production environments.',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Lead SRE at Google Cloud',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: 'Finally, a platform that teaches DevOps the right way. The instructor clearly has deep enterprise experience.',
      rating: 5,
    },
  ];

  const learningPath = [
    { step: '1', title: 'Fundamentals', description: 'Linux, Networking, Git, Scripting', duration: '4 weeks' },
    { step: '2', title: 'Cloud Platforms', description: 'Azure, AWS, GCP Architecture', duration: '6 weeks' },
    { step: '3', title: 'Automation', description: 'CI/CD, IaC, Configuration Management', duration: '8 weeks' },
    { step: '4', title: 'Advanced', description: 'Kubernetes, Service Mesh, Security', duration: '8 weeks' },
  ];

  const benefits = [
    { icon: Shield, title: 'Lifetime Access', description: 'All courses, forever' },
    { icon: PlayCircle, title: 'New Content Monthly', description: 'Stay current' },
    { icon: Award, title: 'Certificates', description: 'Industry recognized' },
    { icon: TrendingUp, title: 'Career Support', description: 'Job placement help' },
  ];

  return (
    <>
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8 animate-fade-in">
              <Star className="w-4 h-4 text-yellow-400 mr-2 fill-yellow-400" />
              <span className="text-sm font-semibold text-white mr-2">Trusted by 12,000+ professionals</span>
              <span className="text-yellow-400">★★★★★</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-slide-up leading-tight">
              Master DevOps & Cloud
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Engineering Excellence
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto animate-slide-up animation-delay-200 leading-relaxed">
              Transform your career with production-ready skills in Azure, AWS, Kubernetes, Terraform, and CI/CD.
              Learn from enterprise-grade curriculum designed by industry experts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up animation-delay-400 mb-16">
              <a
                href="#courses"
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 hover:from-cyan-400 hover:via-blue-400 hover:to-blue-500 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/50 flex items-center space-x-3"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white text-lg font-bold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Free Trial
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in animation-delay-600">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-blue-200 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-blue-300">
                      {stat.subtext}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">PREMIUM CURRICULUM</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise-Grade Training
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every course is meticulously crafted with real-world scenarios, hands-on labs,
              and production-ready best practices used by Fortune 500 companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{feature.highlight}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">YOUR JOURNEY</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Structured Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Progress from fundamentals to advanced topics with our carefully designed curriculum
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 transform -translate-y-1/2 z-0"></div>

            {learningPath.map((phase, index) => (
              <div key={index} className="relative z-10">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-blue-200 dark:border-blue-800">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6 mx-auto shadow-lg">
                    {phase.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                    {phase.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">SUCCESS STORIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join thousands of professionals who transformed their careers with CloudForge Academy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-white shadow-lg"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Premium Benefits Included
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to master DevOps and Cloud Engineering
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-200">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-12 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl inline-flex items-center space-x-3"
            >
              <span>Start Your Journey Today</span>
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-blue-200 mt-4">No credit card required • 7-day free trial</p>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="register"
      />
    </>
  );
}
