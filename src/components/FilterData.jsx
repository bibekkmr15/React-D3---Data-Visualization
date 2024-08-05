import { useState } from "react";
import { Button } from "./ui/button";

const FilterComponent = ({ data, setDataForGraph }) => {
  const [intensity, setIntensity] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setIntensity(value);

    const newFilteredData = data.filter(
      (item) => item.intensity === parseInt(value, 10)
    );
    setFilteredData(newFilteredData);
  };

  return (
    <div>
      <h1>Filter Data by Intensity</h1>
      <label>
        Intensity:
        <input
          type="number"
          value={intensity}
          onChange={handleFilterChange}
          placeholder="Enter intensity"
        />
      </label>
      <Button onClick={() => setDataForGraph(filteredData)}>Filter Data</Button>
    </div>
  );
};

export default FilterComponent;
