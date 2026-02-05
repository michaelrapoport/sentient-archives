import * as d3 from 'd3';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullAbstract: string;
  field: string;
  tags: string[];
  diagramType: 'network' | 'flow' | 'hierarchical'; // For visual flavor
  repoLink: string;
  demoLink: string;
}

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
}

export interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | number | Node;
  target: string | number | Node;
  value: number;
}