import { useState, useEffect } from "react";
import ScaterplotGraph from "./components/ScaterplotGraph";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // setData(data);

        // Convert each date string to a Date object and filter by year
        const filteredData = data.filter((dateString) => {
          const date = new Date(dateString.published);
          return date.getFullYear() > 2000;
        });

        setData(filteredData);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p className="text-xl ">BC Internship Project</p>
      {data && (
        <ScaterplotGraph data={data} xData={"intensity"} yData={"published"} />
      )}
    </div>
  );
}

export default App;
