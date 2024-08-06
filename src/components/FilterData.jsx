import { useState } from "react";
import { Button } from "./ui/button";
import SelectAxes from "./SelectAxes";

const FilterComponent = ({ data, setDataForGraph, setXAxis, setYAxis }) => {
  const [year, setYear] = useState("");
  const [intensity, setIntensity] = useState("");

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleIntensityChange = (e) => {
    setIntensity(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const newFilteredData = data.filter((item) => {
      const publishedYear = new Date(item.published).getFullYear();
      const matchesYear = year ? publishedYear.toString() === year : true;
      const matchesIntensity = intensity
        ? item.intensity === parseInt(intensity, 10)
        : true;
      return matchesYear && matchesIntensity;
    });

    setDataForGraph(newFilteredData);
  };

  return (
    <div className="flex mt-6">
      <h2 className="text-xl font-bold ">Filter Data</h2>

      <form onSubmit={handleFilterSubmit} className="flex ml-10">
        <SelectAxes setXAxis={setXAxis} setYAxis={setYAxis} />
        <label>
          <strong className="mr-2">Published Year:</strong>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            placeholder="Enter published year"
          />
        </label>
        <br />
        <label>
          <strong className="mr-2">Intensity:</strong>
          <input
            type="number"
            value={intensity}
            onChange={handleIntensityChange}
            placeholder="Enter intensity"
          />
        </label>
        <br />
        <Button type="submit">Filter Data</Button>
      </form>
    </div>
  );
};

export default FilterComponent;
