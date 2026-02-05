import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Node, Link } from '../types';

const NeuralBackground: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    // Data generation
    const numNodes = 60;
    const nodes: Node[] = Array.from({ length: numNodes }, (_, i) => ({
      id: `node-${i}`,
      group: Math.floor(Math.random() * 5),
      x: Math.random() * width,
      y: Math.random() * height
    }));

    const links: Link[] = [];
    nodes.forEach((node, i) => {
      // Connect to nearest neighbors roughly
      const numLinks = Math.floor(Math.random() * 3) + 1;
      for (let j = 1; j <= numLinks; j++) {
        const targetIndex = (i + j) % numNodes;
        links.push({
          source: node,
          target: nodes[targetIndex],
          value: Math.random()
        });
      }
    });

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")
      .style("position", "absolute")
      .style("top", 0)
      .style("left", 0)
      .style("z-index", 0)
      .style("opacity", 0.4);

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05))
      .force("x", d3.forceX(width / 2).strength(0.01))
      .force("y", d3.forceY(height / 2).strength(0.01));

    const link = svg.append("g")
      .attr("stroke", "#3b82f6") // Blue-500
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 3)
      .attr("fill", "#22d3ee") // Cyan-400
      .attr("opacity", 0.6);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    const handleResize = () => {
        // Basic responsiveness - just reload for simplicity in this context
        // in a real app, we'd update forces
    };

    window.addEventListener('resize', handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <svg ref={svgRef} className="fixed inset-0 pointer-events-none" />;
};

export default NeuralBackground;