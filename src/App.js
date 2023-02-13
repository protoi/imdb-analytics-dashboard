import React from "react";
import "./App.css";
import MyBarGraph from "./BarGraph";
const data = require("./data.json");
// import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

/* import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
*/
const ddddd = [
  {
    name: "actor",
    queries: 400,
  },
  {
    name: "genre",
    queries: 300,
  },
  {
    name: "movie",
    queries: 200,
  },
  {
    name: "plot",
    queries: 270,
  },
  {
    name: "release_year",
    queries: 190,
  },
];
/* 
function BarPlot({ d }) {
  return (
      <BarChart
        width={500}
        height={500}
        data={d}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 100,
        }}
        onClick={(e) => {
          console.log(e);
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        
        <Bar dataKey="queries" fill="#8884d8" />
      </BarChart>
  );
}
 */
function App() {
  return (
    <div className="App">
      <MyBarGraph data={data}></MyBarGraph>
    </div>
  );
}

export default App;
