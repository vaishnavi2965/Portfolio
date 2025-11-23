import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('general');
  const API = 'http://localhost:5000/api';

  // --- STATE: DATA ---
  const [general, setGeneral] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  // --- STATE: FORMS ---
  // Files
  const [avatarFile, setAvatarFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  
  // Text Inputs
  const [newSkill, setNewSkill] = useState({ name: '', level: '' });
  const [newExp, setNewExp] = useState({ role: '', company: '', date: '', description: '' });
  const [newProj, setNewProj] = useState({ title: '', description: '', link: '' });

  // --- FETCH ALL DATA ---
  const fetchData = async () => {
    try {
      const resGen = await axios.get(`${API}/general`);
      setGeneral(resGen.data);
      
      const resSkill = await axios.get(`${API}/skills`);
      setSkills(resSkill.data);
      
      const resExp = await axios.get(`${API}/experience`);
      setExperience(resExp.data);
      
      const resProj = await axios.get(`${API}/projects`);
      setProjects(resProj.data);

      const resMsg = await axios.get(`${API}/messages`);
      setMessages(resMsg.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- HANDLERS ---

  // 1. General (Multipart File Upload)
  const updateGeneral = async () => {
    const formData = new FormData();
    formData.append('name', general.name || '');
    formData.append('tagline', general.tagline || '');
    formData.append('bio', general.bio || '');
    formData.append('email', general.email || '');
    formData.append('github', general.github || '');
    formData.append('linkedin', general.linkedin || '');
   formData.append('whatsapp', general.whatsapp || ''); // User should paste https://wa.me/number
   formData.append('phone', general.phone || '');

    
    if (avatarFile) formData.append('avatar', avatarFile);
    if (resumeFile) formData.append('resume', resumeFile);
    try {
    await axios.post(`${API}/general`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Profile Updated!');
    setAvatarFile(null);
    setResumeFile(null);
    fetchData();
   } catch (error) {
    console.error(error);
  }
  };

  // 2. Skills (Standard JSON)
  const addSkill = async () => {
    await axios.post(`${API}/skills`, newSkill);
    setNewSkill({ name: '', level: '' });
    fetchData();
  };
  const deleteSkill = async (id) => {
    await axios.delete(`${API}/skills/${id}`);
    fetchData();
  };

  // 3. Experience (Standard JSON)
  const addExperience = async () => {
    await axios.post(`${API}/experience`, newExp);
    setNewExp({ role: '', company: '', date: '', description: '' });
    fetchData();
  };
  const deleteExperience = async (id) => {
    await axios.delete(`${API}/experience/${id}`);
    fetchData();
  };

  // 4. Projects (Multipart File Upload)
  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newProj.title);
    formData.append('description', newProj.description);
    formData.append('link', newProj.link);
    if (projectFile) formData.append('image', projectFile);

    await axios.post(`${API}/projects`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setNewProj({ title: '', description: '', link: '' });
    setProjectFile(null);
    fetchData();
  };
  const deleteProject = async (id) => {
    await axios.delete(`${API}/projects/${id}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>
      </header>

      {/* TABS */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['general', 'skills', 'experience', 'projects', 'messages'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              activeTab === tab 
                ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.5)]' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 min-h-[500px]">
        
        {/* --- TAB 1: GENERAL --- */}
        {activeTab === 'general' && (
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-4">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Full Name</label>
                    <input value={general.name || ''} onChange={e => setGeneral({...general, name: e.target.value})} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-teal-500 focus:outline-none transition"/>
                </div>
                <div>
                    <label className="block text-gray-400 mb-1 text-sm">Tagline</label>
                    <input value={general.tagline || ''} onChange={e => setGeneral({...general, tagline: e.target.value})} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-teal-500 focus:outline-none transition"/>
                </div>
            </div>

            <div>
                <label className="block text-gray-400 mb-1 text-sm">Bio</label>
                <textarea value={general.bio || ''} onChange={e => setGeneral({...general, bio: e.target.value})} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-teal-500 focus:outline-none h-32 transition"/>
            </div>



<div className="bg-gray-700 p-4 rounded border border-gray-600 mt-4">
        <h4 className="text-teal-400 font-bold mb-3">Social Media & Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-gray-400 text-sm">Email Address</label>
                <input value={general.email || ''} onChange={e => setGeneral({...general, email: e.target.value})} className="w-full p-2 bg-gray-600 rounded text-white"/>
            </div>
            <div>
                <label className="text-gray-400 text-sm">Phone Number</label>
                <input value={general.phone || ''} onChange={e => setGeneral({...general, phone: e.target.value})} className="w-full p-2 bg-gray-600 rounded text-white"/>
            </div>
            <div>
                <label className="text-gray-400 text-sm">LinkedIn URL</label>
                <input placeholder="https://linkedin.com/in/..." value={general.linkedin || ''} onChange={e => setGeneral({...general, linkedin: e.target.value})} className="w-full p-2 bg-gray-600 rounded text-white"/>
            </div>
            <div>
                <label className="text-gray-400 text-sm">GitHub URL</label>
                <input placeholder="https://github.com/..." value={general.github || ''} onChange={e => setGeneral({...general, github: e.target.value})} className="w-full p-2 bg-gray-600 rounded text-white"/>
            </div>
            <div className="md:col-span-2">
                <label className="text-gray-400 text-sm">WhatsApp Link</label>
                <input placeholder="https://wa.me/1234567890" value={general.whatsapp || ''} onChange={e => setGeneral({...general, whatsapp: e.target.value})} className="w-full p-2 bg-gray-600 rounded text-white"/>
                <p className="text-xs text-gray-500 mt-1">Format: https://wa.me/YourNumberWithCountryCode</p>
            </div>
        </div>
    </div>

    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <label className="block text-teal-400 font-bold mb-2">Profile Picture</label>
                    {general.avatar && <img src={general.avatar} className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-teal-500" alt="Avatar" />}
                    <input type="file" onChange={e => setAvatarFile(e.target.files[0])} className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"/>
                </div>
                
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <label className="block text-teal-400 font-bold mb-2">Resume (PDF)</label>
                    {general.resumeLink && <a href={general.resumeLink} target="_blank" className="text-blue-300 text-sm underline block mb-3">View Current Resume</a>}
                    <input type="file" accept=".pdf" onChange={e => setResumeFile(e.target.files[0])} className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"/>
                </div>
            </div>

            <button onClick={updateGeneral} className="bg-teal-500 text-white px-8 py-3 rounded font-bold shadow-lg hover:bg-teal-600 transition-transform transform active:scale-95">Save Changes</button>
          </div>
          
          
        )}

        {/* --- TAB 2: SKILLS --- */}
        {activeTab === 'skills' && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap gap-4 mb-8 bg-gray-700 p-6 rounded-lg border border-gray-600">
              <input placeholder="Skill Name (e.g. React)" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="flex-1 p-3 bg-gray-600 rounded text-white placeholder-gray-400 outline-none focus:ring-2 ring-teal-500"/>
              <input placeholder="Level % (e.g. 90)" value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: e.target.value})} className="w-24 p-3 bg-gray-600 rounded text-white placeholder-gray-400 outline-none focus:ring-2 ring-teal-500"/>
              <button onClick={addSkill} className="bg-teal-500 px-6 py-3 rounded font-bold hover:bg-teal-600 transition">Add Skill</button>
            </div>
            
            <h4 className="text-xl font-bold mb-4 text-teal-400">Existing Skills</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map(s => (
                <div key={s._id} className="bg-gray-700 p-4 rounded shadow-md flex justify-between items-center border border-gray-600 hover:border-teal-500 transition">
                   <div>
                     <h5 className="font-bold text-white">{s.name}</h5>
                     <div className="w-full bg-gray-600 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-1" style={{width: `${s.level}%`}}></div>
                     </div>
                   </div>
                   <button onClick={() => deleteSkill(s._id)} className="text-red-400 hover:text-red-300 font-bold text-xl ml-4">&times;</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: EXPERIENCE --- */}
        {activeTab === 'experience' && (
          <div className="animate-fade-in">
            <div className="bg-gray-700 p-6 rounded-lg mb-8 border border-gray-600">
                <h4 className="text-lg font-bold mb-4 text-teal-300">Add New Experience</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input placeholder="Role (e.g. Frontend Dev)" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="p-3 bg-gray-600 rounded outline-none focus:ring-2 ring-teal-500"/>
                    <input placeholder="Company" value={newExp.company} onChange={e => setNewExp({...newExp, company: e.target.value})} className="p-3 bg-gray-600 rounded outline-none focus:ring-2 ring-teal-500"/>
                </div>
                <input placeholder="Date Range (e.g. Jan 2022 - Present)" value={newExp.date} onChange={e => setNewExp({...newExp, date: e.target.value})} className="w-full p-3 bg-gray-600 rounded mb-4 outline-none focus:ring-2 ring-teal-500"/>
                <textarea placeholder="Description of works..." value={newExp.description} onChange={e => setNewExp({...newExp, description: e.target.value})} className="w-full p-3 bg-gray-600 rounded mb-4 h-24 outline-none focus:ring-2 ring-teal-500"/>
                <button onClick={addExperience} className="bg-teal-500 px-6 py-2 rounded font-bold hover:bg-teal-600">Add Experience</button>
            </div>

            <div className="space-y-4">
                {experience.map(e => (
                    <div key={e._id} className="bg-gray-700 p-5 rounded flex justify-between items-start border-l-4 border-teal-500">
                        <div>
                            <h4 className="text-xl font-bold text-white">{e.role} <span className="text-teal-400">@ {e.company}</span></h4>
                            <p className="text-sm text-gray-400 mb-2">{e.date}</p>
                            <p className="text-gray-300">{e.description}</p>
                        </div>
                        <button onClick={() => deleteExperience(e._id)} className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition">Delete</button>
                    </div>
                ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: PROJECTS --- */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in">
             <form onSubmit={addProject} className="bg-gray-700 p-6 rounded-lg mb-8 border border-gray-600 max-w-2xl">
                <h3 className="text-lg font-bold mb-4 text-teal-300">Add New Project</h3>
                <input placeholder="Project Title" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} className="w-full p-3 mb-3 bg-gray-600 rounded focus:ring-2 ring-teal-500 outline-none"/>
                <input placeholder="Live Link" value={newProj.link} onChange={e => setNewProj({...newProj, link: e.target.value})} className="w-full p-3 mb-3 bg-gray-600 rounded focus:ring-2 ring-teal-500 outline-none"/>
                <textarea placeholder="Description" value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="w-full p-3 mb-3 bg-gray-600 rounded h-24 focus:ring-2 ring-teal-500 outline-none"/>
                
                <label className="block text-sm mb-2 text-gray-400">Project Image</label>
                <input type="file" onChange={e => setProjectFile(e.target.files[0])} className="w-full mb-4 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"/>
                
                <button className="bg-teal-500 px-6 py-2 rounded font-bold">Add Project</button>
             </form>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                   <div key={p._id} className="bg-gray-700 rounded-lg overflow-hidden shadow-lg group">
                      <div className="h-40 overflow-hidden relative">
                         <img src={p.image} alt="proj" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                      </div>
                      <div className="p-4">
                         <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                         <p className="text-gray-400 text-sm h-10 overflow-hidden mb-3">{p.description}</p>
                         <button onClick={() => deleteProject(p._id)} className="w-full bg-red-500/20 text-red-400 py-2 rounded hover:bg-red-500 hover:text-white transition">Delete Project</button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {/* --- TAB 5: MESSAGES --- */}
        {activeTab === 'messages' && (
           <div className="animate-fade-in">
               <h3 className="text-2xl font-bold mb-6 text-teal-400">Inbox</h3>
               {messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : null}
               <div className="space-y-4">
                 {messages.map(m => (
                     <div key={m._id} className="bg-gray-700 p-4 rounded border-l-4 border-blue-500">
                         <div className="flex justify-between mb-2">
                            <h4 className="font-bold text-white">{m.name}</h4>
                            <span className="text-teal-400 text-sm">{m.email}</span>
                         </div>
                         <p className="text-gray-300 bg-gray-800 p-3 rounded">{m.message}</p>
                     </div>
                 ))}
               </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default Admin;