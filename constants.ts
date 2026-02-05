import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'mycogenesis',
    title: 'MycoGenesis Digital Twin',
    shortDescription: 'High-fidelity simulation and real-time morphological control of fungal computing architectures.',
    fullAbstract: 'A system for high-fidelity simulation and real-time morphological control of fungal computing architectures acting as a digital twin for a physical mycelial network. The system comprises a modeling engine for virtual representation, a signal propagation module for simulating stochastic logic and noise, and a growth-trajectory deviation engine. An adaptive steering controller generates localized correction instructions—such as thermal or nutrient modulators—to align the physical substrate\'s growth with the virtual computational topology.',
    field: 'Biological Computing / Synthetic Biology',
    tags: ['Digital Twin', 'Bio-Computing', 'Stochastic Logic', 'Control Systems'],
    diagramType: 'network',
    repoLink: '#',
    demoLink: '/sentient-archives/patents/mycogenesis.html'
