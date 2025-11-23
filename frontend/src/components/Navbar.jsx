import { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // List of Navigation Links
  const links = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    // Fixed Navbar with Bottom Border
    <nav className="fixed w-full top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 px-6 md:px-12 transition-all duration-300">
      
      <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="cursor-pointer">
          <Link to="home" smooth={true} duration={500}>
            <h1 className="text-3xl font-bold text-white tracking-wide hover:text-teal-400 transition-colors">
            <span className="text-teal-400">Vaishnavi Rajole</span>
            </h1>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.to} 
                smooth={true} 
                duration={500} 
                spy={true} 
                offset={-80} // Offsets the scroll so header doesn't cover title
                activeClass="text-teal-400 font-bold"
                className="cursor-pointer hover:text-teal-400 transition-colors relative group"
              >
                {link.name}
                {/* Underline Animation */}
                <span className="absolute left-0 bottom-[-5px] w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 animate-slide-in">
          <ul className="flex flex-col items-center py-6 space-y-6 text-gray-300 font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.to} 
                  smooth={true} 
                  duration={500} 
                  offset={-80}
                  onClick={() => setIsOpen(false)} // Close menu on click
                  className="cursor-pointer hover:text-teal-400 transition-colors text-xl"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;