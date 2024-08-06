import { useState, useEffect } from "react";
import ScatterPlotGraph from "./components/ScatterPlotGraph";
import FilterData from "./components/FilterData";
import SelectAxes from "./components/SelectAxes";

function App() {
  const [data, setData] = useState(null);
  const [dataForGraph, setDataForGraph] = useState(null);
  const [xAxis, setXAxis] = useState("published");
  const [yAxis, setYAxis] = useState("intensity");

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((dataFromDB) => {
        setData(dataFromDB);
        setDataForGraph(dataFromDB);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold ">BC Internship Project</h1>

      {dataForGraph && (
        <>
          <SelectAxes setXAxis={setXAxis} setYAxis={setYAxis} />
          <FilterData data={data} setDataForGraph={setDataForGraph} />
          <ScatterPlotGraph data={dataForGraph} xAxis={xAxis} yAxis={yAxis} />
        </>
      )}
    </div>
  );
}

export default App;
