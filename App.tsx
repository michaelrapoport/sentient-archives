
import React, { useState, useEffect } from 'react';
import NeuralBackground from './components/NeuralBackground';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './constants';
import { Project } from './types';
import { Terminal, Cpu, Radio, Github, Twitter, ArrowLeft } from 'lucide-react';

const PatentView: React.FC<{ projectId: string, onBack: () => void }> = ({ projectId, onBack }) => {
  const project = PROJECTS.find(p => p.id === projectId);
  
  if (!project) return <div>Project not found</div>;

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800 p-4 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK_TO_ARCHIVE
        </button>
        <div className="flex items-center gap-4">
          <h2 className="text-cyan-400 font-mono text-sm hidden sm:block">
            {project.title.toUpperCase()} // SPEC_V1.0
          </h2>
          <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-500 text-xs font-mono">
            CLASSIFIED
          </div>
        </div>
      </div>
      
      <div className="pt-20 h-screen w-full">
        <iframe 
          src={`/sentient-archives/patents/${projectId}.html`} 
          className="w-full h-full border-none bg-white"
          title={project.title}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  if (currentHash.startsWith('#/patent/')) {
    const projectId = currentHash.replace('#/patent/', '');
    return <PatentView projectId={projectId} onBack={() => navigateTo('')} />;
  }

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30">
      <NeuralBackground />
      
      {/* Overlay to darken background slightly for content readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950/90 pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <Terminal className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                SENTIENT<span className="text-cyan-500">_ARCHIVES</span>
              </h1>
              <p className="text-slate-400 text-sm font-mono mt-1">
                AGI Prototype Repository // v2.4.0
              </p>
            </div>
          </div>

          <div className="flex gap-4">
             <a href="https://github.com/michaelrapoport/sentient-archives" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-mono">
               <Github className="w-4 h-4" />
               GitHub
             </a>
             <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-mono">
               <Twitter className="w-4 h-4" />
               Twitter
             </a>
          </div>
        </header>

        {/* Hero Text */}
        <section className="max-w-3xl mb-24">
           <h2 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 mb-6 leading-tight">
             Engineering the <br />
             <span className="text-cyan-400">Biological Singularity.</span>
           </h2>
           <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
             A curated collection of advanced neural architectures, fungal computing substrates, and closed-loop neuromorphic control systems. Each model represents a step towards verifiable Artificial General Intelligence.
           </p>
           
           <div className="flex items-center gap-8 mt-8 text-sm font-mono text-slate-500">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               System Operational
             </div>
             <div className="flex items-center gap-2">
               <Cpu className="w-4 h-4" />
               {PROJECTS.length} Models Loaded
             </div>
             <div className="flex items-center gap-2">
               <Radio className="w-4 h-4" />
               Live Telemetry
             </div>
           </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {PROJECTS.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onSelect={setSelectedProject} 
            />
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-mono">
          <p>© 2024 Sentient Archives. All research open-sourced under MIT License.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>Latency: 12ms</span>
             <span>Region: US-EAST-1</span>
          </div>
        </footer>

      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onViewPatent={(id) => navigateTo(`#/patent/${id}`)}
      />
    </div>
  );
};

export default App;
