import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="py-20 bg-gray-800 text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-teal-400 mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've built using Python, React, and MongoDB.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 group hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300"
            >
              {/* Image Area */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image || "https://via.placeholder.com/400x300"} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-teal-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-teal-600 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    View Live <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 h-20 overflow-hidden">
                  {project.description}
                </p>
                
                {/* Footer of Card */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Full Stack</span>
                  <div className="flex gap-3">
                    {/* You can add specific github links in your DB later, using generic project link for now */}
                    <a href={project.link} target="_blank" className="text-gray-400 hover:text-white text-xl"><FaGithub /></a>
                    <a href={project.link} target="_blank" className="text-gray-400 hover:text-white text-xl"><FaExternalLinkAlt /></a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;