import { FaCode, FaCheckCircle, FaStar, FaTools } from 'react-icons/fa';

const Skills = ({ skills }) => {
  
  // Helper to determine label based on percentage
  const getLevelLabel = (level) => {
    const num = parseInt(level);
    if (num >= 90) return { text: "Expert", color: "text-purple-400", border: "border-purple-500/50" };
    if (num >= 75) return { text: "Advanced", color: "text-teal-400", border: "border-teal-500/50" };
    if (num >= 50) return { text: "Intermediate", color: "text-blue-400", border: "border-blue-500/50" };
    return { text: "Beginner", color: "text-gray-400", border: "border-gray-600" };
  };

  return (
    <section id="skills" className="py-24 bg-gray-900 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Proficiency</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A distinct list of technologies and tools I utilize to build performant, scalable web applications.
          </p>
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => {
            const status = getLevelLabel(skill.level);
            
            return (
              <div 
                key={skill._id} 
                className={`group relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(20,184,166,0.2)] flex flex-col justify-between min-h-[140px]`}
              >
                {/* Decorative Icon Background */}
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FaCode size={80} />
                </div>

                {/* Header: Label */}
                <div className="flex justify-between items-start mb-3">
                    <div className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-900/80 border ${status.border} ${status.color} flex items-center gap-1`}>
                        {parseInt(skill.level) > 85 ? <FaStar size={10} /> : <FaCheckCircle size={10} />}
                        {status.text}
                    </div>
                </div>

                {/* Skill Name */}
                <div>
                    <h3 className="text-xl font-bold text-white tracking-wide break-words pr-2">
                        {skill.name}
                    </h3>
                </div>

                {/* Minimalist Bar (Bottom) */}
                <div className="w-full bg-gray-700 h-1 mt-4 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${parseInt(skill.level) > 80 ? 'bg-gradient-to-r from-teal-400 to-purple-500' : 'bg-teal-500'}`} 
                        style={{ width: `${skill.level}%` }}
                    ></div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;