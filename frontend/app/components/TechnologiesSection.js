'use client';

import { 
  SiReact, 
  SiNextdotjs, 
  SiVuedotjs, 
  SiAngular, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiDjango,
  SiSpring,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiIonic,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiAmazon,
  SiDocker,
  SiKubernetes,
  SiTerraform,
  SiJenkins,
  SiGit,
  SiGraphql
} from 'react-icons/si';
import { FaCode, FaCloud, FaPlug, FaJava, FaSitemap, FaMobileAlt } from 'react-icons/fa';

// Icon mapping for technologies
const techIcons = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'Angular': SiAngular,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Python': SiPython,
  'Java': FaJava,
  'Express': SiExpress,
  'Django': SiDjango,
  'Spring Boot': SiSpring,
  'React Native': SiReact,
  'Flutter': SiFlutter,
  'Swift': SiSwift,
  'Kotlin': SiKotlin,
  'Ionic': SiIonic,
  'Xamarin': FaMobileAlt,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Redis': SiRedis,
  'Firebase': SiFirebase,
  'Supabase': SiSupabase,
  'AWS': SiAmazon,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'CI/CD': FaCode,
  'Terraform': SiTerraform,
  'Jenkins': SiJenkins,
  'Git': SiGit,
  'GraphQL': SiGraphql,
  'REST API': FaPlug,
  'WebSocket': FaSitemap,
  'Microservices': FaCloud,
  'Serverless': FaCloud,
};

const technologies = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Java', 'Express', 'Django', 'Spring Boot'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Jenkins'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Tools & Others',
    items: ['Git', 'GraphQL', 'REST API', 'WebSocket', 'Microservices', 'Serverless'],
    color: 'from-blue-500 to-blue-600'
  },
];

export default function TechnologiesSection() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600 mb-6">
            Technologies
          </span>
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 mb-6">
            Our Tech Stack
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We work with cutting-edge technologies to build modern, scalable, and high-performance solutions
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.category}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {tech.category}
              </h3>

              {/* Technology Items */}
              <div className="flex flex-wrap gap-3">
                {tech.items.map((item) => {
                  const IconComponent = techIcons[item] || FaCode;
                  return (
                    <div
                      key={item}
                      className={`group flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer relative`}
                      title={item}
                    >
                      <IconComponent className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

