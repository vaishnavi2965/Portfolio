const Experience = ({ experience }) => {
  return (
    <section id="experience" className="py-20 bg-gray-900 text-white px-10">
      <h2 className="text-4xl font-bold text-center mb-12">My Journey</h2>
      <div className="max-w-4xl mx-auto space-y-8 relative border-l-4 border-teal-500 pl-8 ml-4 md:ml-auto">
        {experience.map(exp => (
          <div key={exp._id} className="relative">
            <div className="absolute -left-[42px] bg-teal-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
              <h4 className="text-teal-400 font-semibold">{exp.company}</h4>
              <p className="text-sm text-gray-400 mb-4">{exp.date}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Experience;