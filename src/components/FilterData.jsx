import { useReducer } from "react";
import { Button } from "./ui/button";
import CustomSelect from "./CustomSelect";

const initialState = {
  year: "",
  intensity: "",
  sector: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_INTENSITY":
      return { ...state, intensity: action.payload };
    case "SET_SECTOR":
      return { ...state, sector: action.payload };
    default:
      return state;
  }
};

const FilterData = ({ data, setDataForGraph }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const uniqueSectors = [
    ...new Set(
      data.map((item) => item.sector).filter((sector) => sector !== "")
    ),
  ];

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const newFilteredData = data.filter((item) => {
      const publishedYear = new Date(item.published).getFullYear();
      const matchesYear = state.year
        ? publishedYear.toString() === state.year
        : true;
      const matchesIntensity = state.intensity
        ? item.intensity === parseInt(state.intensity, 10)
        : true;
      let matchesSector = false;
      if (state.sector === "All Sectors" || item.sector === state.sector) {
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
            setValue={(value) =>
              dispatch({ type: "SET_SECTOR", payload: value })
            }
            placeholder="Select sector"
          />
        </label>
        <br />
        <label>
          <strong className="mr-2">Published Year:</strong>
          <input
            type="number"
            value={state.year}
            onChange={(e) =>
              dispatch({ type: "SET_YEAR", payload: e.target.value })
            }
            placeholder="Enter published year"
          />
        </label>
        <br />
        <label>
          <strong className="mr-2">Intensity:</strong>
          <input
            type="number"
            value={state.intensity}
            onChange={(e) =>
              dispatch({ type: "SET_INTENSITY", payload: e.target.value })
            }
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
