import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaPhone } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Footer = ({ data }) => {
  // DEBUG: Check your console (F12) to see if links appear here
  console.log("Footer Data Received:", data); 

  const year = new Date().getFullYear();

  // If data hasn't loaded yet, show nothing or a loader
  if (!data) return null;

  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">{data.name || "Portfolio"}</h2>
          <p className="text-gray-500 text-sm mt-2">{data.tagline}</p>
        </div>

        {/* Social Icons - Only render if the link exists */}
        <div className="flex gap-5">
           
           {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white text-2xl transition-transform hover:scale-110">
                <FaGithub />
            </a>
           )}

           {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition-transform hover:scale-110">
                <FaLinkedin />
            </a>
           )}

           {data.whatsapp && (
            <a href={data.whatsapp} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 text-2xl transition-transform hover:scale-110">
                <FaWhatsapp />
            </a>
           )}

           {data.email && (
            <a href={`mailto:${data.email}`} className="text-gray-400 hover:text-red-400 text-2xl transition-transform hover:scale-110">
                <FaEnvelope />
            </a>
           )}

           {data.phone && (
            <a href={`tel:${data.phone}`} className="text-gray-400 hover:text-teal-400 text-2xl transition-transform hover:scale-110">
                <FaPhone />
            </a>
           )}

        </div>
      </div>

      <div className="text-center text-gray-600 text-sm mt-12 border-t border-gray-800 pt-6">
        <p>© {year} {data.name}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;