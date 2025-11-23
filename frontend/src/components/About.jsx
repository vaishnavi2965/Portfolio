import { FaCode, FaServer, FaDatabase } from 'react-icons/fa';

const About = ({ data }) => {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white px-6 md:px-12 border-b border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Bio */}
        <div className="md:w-1/2">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase bg-teal-400 rounded-full">
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turning complex problems into <span className="text-teal-400">simple solutions</span>.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            {data.bio || "I am a passionate Full Stack Developer dedicated to building efficient and scalable web applications. With a strong foundation in both frontend and backend technologies, I bridge the gap between design and functionality."}
          </p>
          
          {/* Quick Stats (Optional static display or dynamic if you add to DB) */}
          <div className="flex gap-8 mt-8">
           
            <div>
              <h4 className="text-3xl font-bold text-white">4+</h4>
              <p className="text-gray-500 text-sm">Projects Completed</p>
            </div>
          </div>
        </div>

        {/* Right Side: Highlights */}
        <div className="md:w-1/2 grid grid-cols-1 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-teal-500 shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <FaCode className="text-2xl text-teal-400" />
              <h3 className="text-xl font-bold">Frontend Development</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Building responsive, interactive UIs using React, Tailwind CSS, and modern JavaScript.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500 shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <FaServer className="text-2xl text-blue-400" />
              <h3 className="text-xl font-bold">Backend Development</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Creating robust APIs with Python (Flask) and managing server-side logic efficiently.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500 shadow-lg">
            <div className="flex items-center gap-4 mb-2">
              <FaDatabase className="text-2xl text-green-400" />
              <h3 className="text-xl font-bold">Database Management</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Designing and managing NoSQL databases using MongoDB for scalable data solutions.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;