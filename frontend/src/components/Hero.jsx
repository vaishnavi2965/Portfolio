const Hero = ({ data }) => {
  return (
    <section id="home" className="h-screen flex flex-col justify-center items-center text-center bg-gray-900 text-white">
      <img src={data.avatar || "https://via.placeholder.com/150"} alt="Profile" className="w-40 h-40 rounded-full border-4 border-teal-400 mb-6 object-cover shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
      <h1 className="text-5xl font-bold mb-4">Hi, I'm <span className="text-teal-400">{data.name || "Developer"}</span></h1>
      <p className="text-xl text-gray-400 max-w-2xl">{data.tagline || "Full Stack Developer | Python & React Enthusiast"}</p>
      <div className="mt-8 flex gap-4">
        <a href={data.resumeLink} target="_blank" className="px-8 py-3 bg-teal-500 rounded-full font-bold hover:bg-teal-600 transition">Download Resume</a>
        <a href="#contact" className="px-8 py-3 border border-teal-500 text-teal-400 rounded-full font-bold hover:bg-teal-500 hover:text-white transition">Hire Me</a>
      </div>
    </section>
  );
};
export default Hero;