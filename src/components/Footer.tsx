import { Cloud, Github, Linkedin, Twitter, Youtube, Zap } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learn: [
      { name: 'Courses', href: '#courses' },
      { name: 'Blog', href: '#blog' },
      { name: 'Videos', href: '#videos' },
      { name: 'Learning Paths', href: '#courses' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
      { name: 'Gallery', href: '#gallery' },
    ],
    technologies: [
      { name: 'Azure', href: '#courses' },
      { name: 'AWS', href: '#courses' },
      { name: 'Kubernetes', href: '#courses' },
      { name: 'Docker', href: '#courses' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center space-x-3 mb-4 group inline-flex">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                  <Cloud className="w-6 h-6 text-white" />
                  <Zap className="w-3 h-3 text-cyan-200 absolute -bottom-0.5 -right-0.5" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-blue-600 transition-all">
                  CloudForge
                </h2>
                <p className="text-[10px] font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                  Academy
                </p>
              </div>
            </a>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Master DevOps and Cloud Engineering with hands-on, real-world training. Build the skills that matter in today's cloud-first world.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Technologies
            </h3>
            <ul className="space-y-2">
              {footerLinks.technologies.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {currentYear} CloudForge Academy. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
