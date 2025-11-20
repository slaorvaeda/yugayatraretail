'use client';
import { useState } from 'react';
import Image from 'next/image';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id: 1,
    title: 'Enterprise Learning Platform',
    category: 'Web Development',
    description: 'A comprehensive learning management system built for enterprise training with real-time analytics and progress tracking.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    client: 'Tech Solutions India',
    year: '2024',
    status: 'Completed',
    features: ['User Dashboard', 'Course Management', 'Progress Tracking', 'Certification System'],
    link: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Solution',
    category: 'E-Commerce',
    description: 'Modern e-commerce platform with payment integration, inventory management, and customer analytics.',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    client: 'Retail Mart India',
    year: '2024',
    status: 'Live',
    features: ['Shopping Cart', 'Payment Gateway', 'Order Management', 'Admin Panel'],
    link: '#',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    category: 'Mobile',
    description: 'Cross-platform mobile application for workforce management with offline capabilities and real-time sync.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
    client: 'InnovateStart India',
    year: '2024',
    status: 'Completed',
    features: ['Offline Mode', 'Push Notifications', 'Biometric Auth', 'Cloud Sync'],
    link: '#',
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Setup',
    category: 'DevOps',
    description: 'Scalable cloud infrastructure deployment with CI/CD pipelines and automated monitoring systems.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    client: 'Enterprise Solutions India',
    year: '2024',
    status: 'Live',
    features: ['Auto Scaling', 'Load Balancing', 'Monitoring', 'Backup System'],
    link: '#',
  },
  {
    id: 5,
    title: 'Data Analytics Dashboard',
    category: 'Data Science',
    description: 'Advanced analytics dashboard with real-time data visualization and predictive insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Python', 'React', 'D3.js', 'PostgreSQL'],
    client: 'Data Insights India',
    year: '2024',
    status: 'Completed',
    features: ['Real-time Charts', 'Data Export', 'Custom Reports', 'Alert System'],
    link: '#',
  },
  {
    id: 6,
    title: 'API Integration Platform',
    category: 'Backend',
    description: 'RESTful API platform with comprehensive documentation, rate limiting, and authentication system.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Swagger'],
    client: 'TechVenture India',
    year: '2024',
    status: 'Live',
    features: ['API Gateway', 'Documentation', 'Rate Limiting', 'Webhook Support'],
    link: '#',
  },
];

const categories = ['All', 'Web Development', 'E-Commerce', 'Mobile', 'DevOps', 'Data Science', 'Backend'];

export default function ProjectsGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our diverse range of projects across different industries and technologies
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="300">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02]"
              data-aos="zoom-in"
              data-aos-delay={400 + index * 100}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-700 ease-in-out">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Live' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-700 ease-in-out">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-700 ease-in-out">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-700 ease-in-out">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded bg-blue-50 text-xs font-medium text-blue-700 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-700 ease-in-out">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-600 group-hover:bg-gray-200 group-hover:scale-105 transition-all duration-700 ease-in-out">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-blue-200 transition-colors duration-700 ease-in-out">
                  <div className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-700 ease-in-out">
                    {project.client} • {project.year}
                  </div>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 group-hover:translate-x-2 transition-all duration-700 ease-in-out">
                    <span className="text-sm font-semibold mr-2">View Details</span>
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-700 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none" />
              
              {/* Smooth Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none blur-xl" />
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {isModalOpen && selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </div>
    </section>
  );
}

