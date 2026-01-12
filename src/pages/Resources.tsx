import { useState } from 'react';
import { FileText, Link as LinkIcon, Code, Download, BookOpen, Video, FileCode, ExternalLink, Search } from 'lucide-react';

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'documentation', name: 'Documentation', icon: FileText },
    { id: 'cheatsheets', name: 'Cheat Sheets', icon: FileCode },
    { id: 'tutorials', name: 'Tutorials', icon: Video },
    { id: 'tools', name: 'Tools & Links', icon: LinkIcon },
    { id: 'code', name: 'Code Samples', icon: Code },
  ];

  const resources = [
    {
      category: 'documentation',
      title: 'Azure DevOps Complete Guide',
      description: 'Comprehensive documentation covering Azure DevOps services, pipelines, and best practices',
      type: 'PDF',
      size: '12 MB',
      url: 'https://docs.microsoft.com/azure/devops/',
      downloads: 1240,
    },
    {
      category: 'documentation',
      title: 'AWS Cloud Practitioner Study Guide',
      description: 'Complete study materials for AWS Cloud Practitioner certification',
      type: 'PDF',
      size: '8 MB',
      url: 'https://aws.amazon.com/certification/',
      downloads: 2150,
    },
    {
      category: 'cheatsheets',
      title: 'Docker Commands Cheat Sheet',
      description: 'Quick reference for essential Docker commands and best practices',
      type: 'PDF',
      size: '2 MB',
      url: '#',
      downloads: 3420,
    },
    {
      category: 'cheatsheets',
      title: 'Kubernetes kubectl Reference',
      description: 'Complete kubectl command reference with examples',
      type: 'PDF',
      size: '3 MB',
      url: 'https://kubernetes.io/docs/reference/kubectl/',
      downloads: 2890,
    },
    {
      category: 'cheatsheets',
      title: 'Terraform Commands & Syntax',
      description: 'Essential Terraform commands and HCL syntax reference',
      type: 'PDF',
      size: '2.5 MB',
      url: 'https://terraform.io/docs/',
      downloads: 1950,
    },
    {
      category: 'tutorials',
      title: 'CI/CD Pipeline Setup Tutorial',
      description: 'Step-by-step guide to setting up CI/CD with Jenkins and GitHub Actions',
      type: 'Video',
      size: '45 min',
      url: '#',
      downloads: 1680,
    },
    {
      category: 'tutorials',
      title: 'Kubernetes Deployment Walkthrough',
      description: 'Deploy your first application to Kubernetes cluster',
      type: 'Video',
      size: '60 min',
      url: '#',
      downloads: 2340,
    },
    {
      category: 'tools',
      title: 'Azure Portal',
      description: 'Official Microsoft Azure cloud management portal',
      type: 'Link',
      url: 'https://portal.azure.com',
      downloads: 0,
    },
    {
      category: 'tools',
      title: 'AWS Console',
      description: 'Amazon Web Services management console',
      type: 'Link',
      url: 'https://console.aws.amazon.com',
      downloads: 0,
    },
    {
      category: 'tools',
      title: 'Docker Hub',
      description: 'Container image registry and community',
      type: 'Link',
      url: 'https://hub.docker.com',
      downloads: 0,
    },
    {
      category: 'tools',
      title: 'Terraform Registry',
      description: 'Browse providers and modules for Terraform',
      type: 'Link',
      url: 'https://registry.terraform.io',
      downloads: 0,
    },
    {
      category: 'code',
      title: 'Terraform Infrastructure Examples',
      description: 'Production-ready Terraform code samples for AWS, Azure, and GCP',
      type: 'GitHub',
      url: '#',
      downloads: 890,
    },
    {
      category: 'code',
      title: 'Kubernetes Deployment Templates',
      description: 'Ready-to-use Kubernetes YAML configurations',
      type: 'GitHub',
      url: '#',
      downloads: 1120,
    },
    {
      category: 'code',
      title: 'CI/CD Pipeline Templates',
      description: 'Jenkins, GitHub Actions, and GitLab CI pipeline examples',
      type: 'GitHub',
      url: '#',
      downloads: 1540,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const searchMatch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return FileText;
      case 'Video':
        return Video;
      case 'Link':
        return ExternalLink;
      case 'GitHub':
        return Code;
      default:
        return FileText;
    }
  };

  return (
    <section id="resources" className="py-24 bg-white dark:bg-gray-900 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">FREE RESOURCES</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Resources Library
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive learning materials including documentation, cheat sheets, code samples,
            and curated links to the best DevOps and Cloud resources available online.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all shadow-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const Icon = getIcon(resource.type);
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-white dark:bg-gray-900 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
                    {resource.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {resource.size && <span>{resource.size}</span>}
                    {resource.downloads > 0 && (
                      <span className="ml-2">• {resource.downloads} downloads</span>
                    )}
                  </div>
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  {resource.type === 'Link' ? (
                    <>
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Link</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </a>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
              No resources found matching your criteria
            </p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Need More Resources?</h3>
              <p className="text-blue-100">
                Our premium courses include exclusive downloadable materials, project templates, and lifetime access to all resources.
              </p>
            </div>
            <a
              href="#courses"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Browse Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
