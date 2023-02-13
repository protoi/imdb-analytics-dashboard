import React, { useState } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
} from "recharts";
/* const sampleData = [
  { x: "A", y: 150 },
  { x: "B", y: 200 },
  { x: "C", y: 400 },
]; */

const MyBarGraph = ({ d }) => {
  let [graphData, setGraphData] = useState(d); //array
  let [barOrPie, setBarOrPie] = useState("bar");
  //barorpie
  function someEvent(e) {
    console.log(e);
    console.dir(e.activeTooltipIndex);
    /* setGraphData(
      graphData.map((x) => {
        return {
          name: x.name,
          queries: x.queries * (e.activeTooltipIndex + 1),
        };
      })
    ); */
    if (barOrPie === "bar") setBarOrPie("pie");
    else setBarOrPie("bar");
  }
  if (barOrPie === "bar") {
    return (
      <BarChart
        width={500}
        height={500}
        data={graphData}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 100,
        }}
        onClick={(e) => {
          if (e == null) return;
          someEvent(e);
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="queries" fill="salmon" />
      </BarChart>
    );
  } else {
    return (
      <PieChart
        width={500}
        height={500}
        onClick={(e) => {
          if (e == null) return;
          someEvent(e);
        }}
      >
        <Pie
          dataKey="queries"
          isAnimationActive={false}
          data={graphData}
          cx={250}
          cy={250}
          outerRadius={200}
          fill="salmon"
          label
        />
        <Tooltip />
      </PieChart>
    );
  }
};

export default MyBarGraph;
