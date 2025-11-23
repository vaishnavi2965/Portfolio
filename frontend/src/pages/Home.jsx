import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About'; 
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

const Home = () => {
  const [data, setData] = useState({
    general: {},
    skills: [],
    experience: [],
    projects: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gen, skill, exp, proj] = await Promise.all([
           axios.get('http://localhost:5000/api/general'),
           axios.get('http://localhost:5000/api/skills'),
           axios.get('http://localhost:5000/api/experience'),
           axios.get('http://localhost:5000/api/projects')
        ]);
        setData({
            general: gen.data,
            skills: skill.data,
            experience: exp.data,
            projects: proj.data
        });
        setLoading(false);
      } catch (err) {
        console.error("Error connecting to backend", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex justify-center items-center text-teal-400">Loading Portfolio...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero data={data.general} />
      
      {/* About Component (Switched from manual HTML to Component) */}
      <About data={data.general} />

      {/* Skills Section */}
      <Skills skills={data.skills} />
      
      {/* Experience Section */}
      <Experience experience={data.experience} />
      
      {/* Projects Section */}
      <Projects projects={data.projects} />
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
         <h2 className="text-4xl font-bold text-center text-white mb-10">Contact Me</h2>
         <form className="max-w-md mx-auto flex flex-col gap-4 px-6"
            onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    message: e.target.message.value
                };
                axios.post('http://localhost:5000/api/contact', formData)
                     .then(() => {
                       alert('Message Sent!');
                       e.target.reset(); // Clear form after sending
                     });
            }}
         >
             <input name="name" placeholder="Your Name" className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 ring-teal-500" required />
             <input name="email" type="email" placeholder="Your Email" className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 ring-teal-500" required />
             <textarea name="message" placeholder="Message" className="p-3 rounded bg-gray-700 text-white h-32 outline-none focus:ring-2 ring-teal-500" required />
             <button className="bg-teal-500 py-3 rounded font-bold hover:bg-teal-600 transition">Send Message</button>
         </form>
      </section>

      {/* Footer Component - This is where the Social Icons live */}
      {/* We pass 'data.general' because that contains { github, linkedin, etc } */}
      <Footer data={data.general} />
    </div>
  );
};

export default Home;