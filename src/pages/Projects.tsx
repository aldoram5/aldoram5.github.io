import React from 'react';
import Layout from '../components/Layout';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  completedDate: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 'personal-blog',
      title: 'Personal Blog Platform',
      description: 'A modern blog built with React, Vite, and Tailwind CSS',
      longDescription: 'This personal blog platform is where I publish my thoughts and devlogs. Features include markdown support, tag-based filtering, dark/light mode toggle, responsive design, and automatic GitHub Pages deployment.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GitHub Pages'],
      liveUrl: 'https://aldoram5.github.io',
      githubUrl: 'https://github.com/aldoram5/aldoram5.github.io',
      completedDate: '2025-09-10',
      featured: true
    },
    {
      id: 'crimson-r-games',
      title: 'Crimson R Games Website',
      description: 'React based website to showcase my games',
      longDescription: 'Modern website showcasing my games, it offers a centralized place to see the finished products and games I\'ve developed. Features include game details, trailers, and links to play, fast search functionality, and a responsive design. All games showcased there are my own and there you will find even more projects I\'m not showing here',
      technologies: ['TypeScript', 'React', 'Tailwind CSS'],
      liveUrl: 'https://crimsonrgames.com',
      completedDate: '2025-01-15',
      featured: true
    },
    {
      id: 'simple-html-tester',
      title: 'Simple HTML Tester',
      description: 'Simple Android app for quickly testing HTML Markup',
      longDescription: 'A simple Android application designed for quickly testing and previewing HTML markup. Features include live editing, instant previews, and a user-friendly interface.',
      technologies: ['Kotlin', 'Android', 'WebView'],
      liveUrl: 'https://play.google.com/store/apps/details?id=com.crimsonrgames.titanium.htmltester&pli=1',
      githubUrl: 'https://github.com/aldoram5/SimpleHTMLTesterAndroid',
      completedDate: '2021-01-28',
      featured: false
    },
    {
      id: 'live2d-widget',
      title: 'Live2D Widget',
      description: 'Interactive Live2D model viewer',
      longDescription: 'A customizable Live2D widget for displaying interactive 2D models on websites. Features include model loading, animation control, and user interaction handling. Forked from the original Live2D widget project, but enhanced it to allow interactions with the model.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'WebGL'],
      githubUrl: 'https://github.com/aldoram5/live2d-widget.js',
      completedDate: '2021-03-06',
      featured: false
    },
    {
      id: 'monika-mod',
      title: 'DDLC Mod: Monika After Story',
      description: 'A mod that changes Doki Doki Literature Club into a virtual girlfriend simulator.',
      longDescription: 'A mod that expands act 3 of the game so the player can interact with Monika through a framework that allows for dynamic dialogue and events and keeps track of the interactions in a more robust way. I contributed to many systems like the calendar and affection, did some minor graphic additions. No longer contributing to the project but was a stepping stone for me, because of the experience working with a team around the world and following open source practices.',
      technologies: ['Python', 'Ren\'Py'],
      liveUrl: 'http://www.monikaafterstory.com',
      githubUrl: 'https://github.com/yourusername/portfolio',
      completedDate: '2024-03-15',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const ProjectCard: React.FC<{ project: Project; featured?: boolean }> = ({ project, featured = false }) => (
    <div className={`card p-6 hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-crimson-200 dark:ring-crimson-800' : ''}`}>
      {featured && (
        <div className="inline-block px-3 py-1 bg-crimson-600 text-white text-xs font-medium rounded-full mb-4">
          Featured
        </div>
      )}
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {project.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {project.description}
      </p>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {project.longDescription}
      </p>
      
      {/* Technologies */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span 
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Date */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Completed {formatDate(project.completedDate)}</span>
      </div>
      
      {/* Links */}
      <div className="flex items-center space-x-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-crimson-600 dark:text-crimson-400 hover:text-crimson-700 dark:hover:text-crimson-300 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Live Demo</span>
          </a>
        )}
        
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>Source Code</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my development skills and passion for creating 
            engaging digital experiences
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Tag className="h-5 w-5 text-crimson-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Featured Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <div className="flex items-center mb-8">
            <Tag className="h-5 w-5 text-warm-orange-400 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Other Projects
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="card p-8 bg-gradient-to-br from-crimson-50 to-warm-orange-50 dark:from-crimson-900/10 dark:to-warm-orange-900/10 border-crimson-200 dark:border-crimson-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Let's connect!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm not currently looking for new opportunities, but I appreciate your interest!
              However, if you wanna reach out for a quick question, ask about my projects or tech stack, feel free to drop me a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:aldo@crimsonrgames.com"
                className="btn-primary"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/aldoram5"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View More on GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;