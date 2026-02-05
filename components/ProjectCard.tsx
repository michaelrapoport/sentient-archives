import React from 'react';
import { Project } from '../types';
import { ArrowRight, Cpu, Network, Activity } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getIcon = () => {
    switch (project.diagramType) {
      case 'network': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'hierarchical': return <Cpu className="w-5 h-5 text-violet-400" />;
      case 'flow': return <Activity className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div 
      className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer overflow-hidden"
      onClick={() => onSelect(project)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-10 transition duration-500 blur"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
            {getIcon()}
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">{project.id.split('-')[0]}</span>
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-sm font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
          View Specs <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;