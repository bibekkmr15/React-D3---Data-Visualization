import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function ScaterplotGraph({ data }) {
  const [selectedData, setSelectedData] = useState(null);

  const svgRef = useRef();

  const xAxisArray = data.map((item) => item.intensity);
  const publishedArray = data.map((item) => new Date(item.published));

  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.8;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const x = d3
      .scaleLinear()
      .domain([d3.min(xAxisArray) - 1, d3.max(xAxisArray) + 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleTime()
      .domain(d3.extent(publishedArray))
      .range([height - margin.bottom, margin.top]);

    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(10))
      .append("text")
      .attr("fill", "#000")
      .attr("x", width / 2)
      .attr("y", 35)
      .text("Intensity");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(10))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("dy", "0.71em")
      .text("Published Date");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.intensity))
      .attr("cy", (d) => y(new Date(d.published)))
      .attr("r", 5)
      .attr("opacity", 0.2)
      .attr("fill", "steelblue")
      .on("click", (event, d) => {
        setSelectedData(d);
        event.stopPropagation();
      });

    // Add a tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("box-shadow", "0 0 5px rgba(0,0,0,0.2)")
      .style("border-radius", "3px")
      .style("display", "none");

    svg
      .selectAll("circle")
      .on("mouseover", function (event, d) {
        tooltip
          .style("display", "block")
          .html(
            `Intensity: ${d.intensity}<br>Date: ${new Date(
              d.published
            ).toLocaleDateString()}`
          )
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => tooltip.style("display", "none"));
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!svgRef.current.contains(event.target)) {
        setSelectedData(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2>Intensity vs. Published Date Graph</h2>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ overflow: "visible" }}
        className="bg-red-300"
      ></svg>
      {selectedData && (
        <div>
          <h3>Details:</h3>
          <p>Intensity: {selectedData.intensity}</p>
          <p>Published: {Date(selectedData.published)}</p>
        </div>
      )}
    </div>
  );
}
