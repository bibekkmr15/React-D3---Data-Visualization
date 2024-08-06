import { useState } from "react";
import { Button } from "./ui/button";
import CustomSelect from "./CustomSelect";

const FilterData = ({ data, setDataForGraph }) => {
  const [year, setYear] = useState("");
  const [intensity, setIntensity] = useState("");
  const [sector, setSector] = useState("");

  const uniqueSectors = [
    ...new Set(
      data.map((item) => item.sector).filter((sector) => sector !== "")
    ),
  ];

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
      let matchesSector = false;
      if (sector === "All Sectors" || item.sector === sector) {
        matchesSector = true;
      }
      return matchesYear && matchesIntensity && matchesSector;
    });

    setDataForGraph(newFilteredData);
  };

  return (
    <div className="flex mt-6">
      <h2 className="text-xl font-bold ">Filter Data</h2>

      <form onSubmit={handleFilterSubmit} className="flex ml-10">
        <label>
          <strong className="mr-2">Sector:</strong>
          <CustomSelect
            options={["All Sectors", ...uniqueSectors]}
            setValue={setSector}
            placeholder="Select sector"
          />
        </label>
        <br />
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
        <Button type="submit">Redraw Graph</Button>
      </form>
    </div>
  );
};

export default FilterData;
