import { useState, useEffect } from "react";
import IntensityGraph from "./components/IntensityGraph";
// import Temp from "./components/Temp";
import FilterData from "./components/FilterData";

function App() {
  const [data, setData] = useState(null);
  const [dataForGraph, setDataForGraph] = useState(null);

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

        // // Convert each date string to a Date object and filter by year
        // const filteredData = data.filter((dateString) => {
        //   const date = new Date(dateString.published);
        //   return date.getFullYear() === 2017;
        // });

        // setData(filteredData);
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
          <FilterData data={data} setDataForGraph={setDataForGraph} />
          <IntensityGraph data={dataForGraph} />
        </>
      )}
      {/* <Temp /> */}
    </div>
  );
}

export default App;
