import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const SineWave = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Define sine wave properties
    const frequency = 2;
    const amplitude = 1;
    const numPoints = 1000;
    const phase = 0;

    // Create an array representing the sine wave
    const sineWaveData = Array.from({ length: numPoints }, (_, i) => {
      const t = (i / numPoints) * (2 * Math.PI);
      return {
        x: t,
        y: amplitude * Math.sin(frequency * t + phase),
      };
    });

    // Set up scales
    const xScale = d3
      .scaleLinear()
      .domain([0, 2 * Math.PI])
      .range([0, 600]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([150, -150]);

    // Define the line
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    // Create the SVG element
    const svg = d3.select(ref.current);
    svg
      .append("path")
      .datum(sineWaveData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, []);

  return <svg ref={ref} width="600" height="300"></svg>;
};

export default SineWave;
