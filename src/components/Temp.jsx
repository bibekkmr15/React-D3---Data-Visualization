import React from "react";
import * as d3 from "d3";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

// Mock data for demonstration purposes
const data = [
  { id: 1, intensity: 5, published: "2024-08-04", xValue: 10, yValue: 15 },
  { id: 2, intensity: 7, published: "2024-07-04", xValue: 20, yValue: 25 },
  // Add more data as needed
];

const ScatterPlotWithHoverCard = () => {
  const width = 800; // Width of the SVG
  const height = 600; // Height of the SVG
  const margin = { top: 20, right: 20, bottom: 40, left: 50 }; // Margins

  // Function to create the scatter plot
  const createScatterPlot = () => {
    const svg = d3.select("#scatterPlot"); // Select the SVG element

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.xValue))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.yValue))
      .range([height - margin.bottom, margin.top]);

    // Bind data to circles
    const circles = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.xValue))
      .attr("cy", (d) => y(d.yValue))
      .attr("r", 5)
      .attr("fill", "steelblue");

    circles.each(function (d) {
      const circleElement = this;
      const hoverCard = d3
        .select(circleElement.parentNode)
        .append("foreignObject")
        .attr("x", x(d.xValue) - 50)
        .attr("y", y(d.yValue) - 50)
        .attr("width", 100)
        .attr("height", 100)
        .style("pointer-events", "none");

      const hoverCardComponent = (
        <HoverCard>
          <HoverCardTrigger>
            <circle
              cx={x(d.xValue)}
              cy={y(d.yValue)}
              r={5}
              fill="transparent"
              style={{ pointerEvents: "all" }}
            />
          </HoverCardTrigger>
          <HoverCardContent>
            <div style={{ padding: "10px" }}>
              <strong>Intensity:</strong> {d.intensity}
              <br />
              <strong>Date:</strong>{" "}
              {new Date(d.published).toLocaleDateString()}
            </div>
          </HoverCardContent>
        </HoverCard>
      );

      d3.select(hoverCard.node()).append(() => {
        const el = document.createElement("div");
        el.style.width = "100%";
        el.style.height = "100%";
        ReactDOM.render(hoverCardComponent, el);
        return el;
      });
    });

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  // Create the scatter plot when the component mounts
  React.useEffect(() => {
    createScatterPlot();
  }, [data]);

  return (
    <div style={{ position: "relative" }}>
      <svg id="scatterPlot" width={width} height={height} />
    </div>
  );
};

export default ScatterPlotWithHoverCard;
