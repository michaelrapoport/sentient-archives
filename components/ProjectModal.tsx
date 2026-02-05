
import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, Layers, Zap, GitBranch } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onViewPatent: (id: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onViewPatent }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    if (project) document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 backdrop-blur">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${project.diagramType === 'network' ? 'bg-cyan-500' : 'bg-violet-500'} animate-pulse`}></div>
             <h2 className="text-lg font-mono text-slate-200 truncate max-w-[200px] sm:max-w-md">
               RUN_ID: {project.id.toUpperCase()}
             </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                  <Layers className="w-4 h-4" />
                  <span>{project.field}</span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Abstract & Technical Logic
                </h3>
                <p className="text-slate-300 leading-relaxed text-justify">
                  {project.fullAbstract}
                </p>
              </div>

              {/* Data Visualization Placeholder */}
              <div className="w-full h-48 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="text-center">
                   <GitBranch className="w-8 h-8 text-slate-600 mx-auto mb-2 group-hover:text-cyan-500 transition-colors" />
                   <span className="text-xs font-mono text-slate-500">Topology Visualization Unavailable</span>
                </div>
              </div>
            </div>

            {/* Right Column: Meta & Actions */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  System Parameters
                </h3>
                <div className="space-y-3">
                   {project.tags.map(tag => (
                     <div key={tag} className="flex items-center justify-between text-sm">
                       <span className="text-slate-300">{tag}</span>
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-3">
                <a href={project.repoLink} className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-white text-slate-900 rounded-lg font-bold hover:bg-cyan-50 transition-colors">
                  <Github className="w-5 h-5" />
                  View Source Code
                </a>
                <button 
                  onClick={() => {
                    onClose();
                    onViewPatent(project.id);
                  }}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 border border-slate-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Technical Specification
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
