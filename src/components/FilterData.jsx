import { useReducer } from "react";
import { Button } from "./ui/button";
import CustomSelect from "./CustomSelect";

const initialState = {
  published_year: "",
  intensity: "",
  sector: "",
  topic: "",
  region: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PUBLISHED_YEAR":
      return { ...state, published_year: action.payload };
    case "SET_INTENSITY":
      return { ...state, intensity: action.payload };
    case "SET_SECTOR":
      return { ...state, sector: action.payload };
    case "SET_TOPIC": {
      return { ...state, topic: action.payload };
    }
    case "SET_REGION": {
      return { ...state, region: action.payload };
    }
    default:
      return state;
  }
};

const FilterData = ({ data, setDataForGraph }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sectorsArray = [
    ...new Set(
      data.map((item) => item.sector).filter((sector) => sector !== "")
    ),
  ];

  const topicsArray = [
    ...new Set(data.map((item) => item.topic).filter((topic) => topic !== "")),
  ];

  const regionArray = [
    ...new Set(
      data.map((item) => item.region).filter((region) => region !== "")
    ),
  ];

  const countryArray = [
    ...new Set(
      data.map((item) => item.country).filter((country) => country !== "")
    ),
  ];

  // console.log(countryArray);

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    const newFilteredData = data.filter((item) => {
      const publishedYear = new Date(item.published).getFullYear();
      const matchesPublishedYear = state.published_year
        ? publishedYear.toString() === state.published_year
        : true;
      const matchesIntensity = state.intensity
        ? item.intensity === parseInt(state.intensity, 10)
        : true;
      let matchesSector = false;
      if (
        state.sector === "all sectors" ||
        item.sector === state.sector ||
        state.sector === ""
      ) {
        matchesSector = true;
      }
      let matchesTopic = false;
      if (
        state.topic === "All Topics" ||
        item.topic === state.topic ||
        state.topic === ""
      ) {
        matchesTopic = true;
      }
      let matchesRegion = false;
      if (
        state.region === "All Regions" ||
        item.region === state.region ||
        state.region === ""
      ) {
        matchesRegion = true;
      }
      return (
        matchesPublishedYear &&
        matchesIntensity &&
        matchesSector &&
        matchesTopic &&
        matchesRegion
      );
    });
    console.log(newFilteredData.length);
    setDataForGraph(newFilteredData);
  };

  return (
    <div className="flex mt-6">
      <h2 className="text-xl font-bold ">Filter Data</h2>

      <form onSubmit={handleFilterSubmit} className="flex ml-10">
        <label className="flex flex-col">
          <strong className="">Sector</strong>
          <CustomSelect
            options={["all sectors", ...sectorsArray]}
            setValue={(value) =>
              dispatch({ type: "SET_SECTOR", payload: value })
            }
            placeholder="Select sector"
          />
        </label>
        <br />
        <label className="flex flex-col">
          <strong className="">Topic</strong>
          <CustomSelect
            options={["All Topics", ...topicsArray]}
            setValue={(value) =>
              dispatch({ type: "SET_TOPIC", payload: value })
            }
            placeholder="Select topic"
          />
        </label>
        <br />
        <label className="flex flex-col">
          <strong className="">Region</strong>
          <CustomSelect
            options={["All Regions", ...regionArray]}
            setValue={(value) =>
              dispatch({ type: "SET_REGION", payload: value })
            }
            placeholder="Select region"
          />
        </label>
        <br />
        <label className="flex flex-col">
          <strong className="mr-2">Published Year:</strong>
          <input
            type="number"
            value={state.published_year}
            onChange={(e) =>
              dispatch({ type: "SET_PUBLISHED_YEAR", payload: e.target.value })
            }
            placeholder="Enter published year"
          />
        </label>
        <br />
        <label className="flex flex-col">
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
