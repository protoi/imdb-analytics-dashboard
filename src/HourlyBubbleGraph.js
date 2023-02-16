import React, { useState } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
} from "recharts";

//finds out the max number of queries in a minute inside all the three arrays
const parseDomain = (a, b, c) => [
  0,
  Math.max(
    Math.max.apply(
      null,
      a.map((entry) => entry.queries)
    ),
    Math.max.apply(
      null,
      b.map((entry) => entry.queries)
    ),
    Math.max.apply(
      null,
      c.map((entry) => entry.queries)
    )
  ),
];

const renderBubbleTooltip = (props) => {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #999",
          margin: 0,
          padding: 10,
        }}
      >
        <p>minute #{data.minute}</p>
        <p>
          <span>No of Queries: </span>
          {data.queries}
        </p>
      </div>
    );
  }

  return null;
};

let domain = null;
let range = [32, 512];

const ScatterGenerator = (data, text_label, handleClickPassedFromParent) => {
  /* return (
    <ScatterChart
      width={800}
      height={100}
      margin={{
        top: 20,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <XAxis
        type="category"
        dataKey="minute"
        interval={0}
        tickLine={{ transform: "translate(0, -6)" }}
      />
      <YAxis
        type="number"
        dataKey="queries"
        name={text_label}
        height={10}
        width={100}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: text_label, position: "insideRight" }}
      />
      <ZAxis type="number" dataKey="queries" domain={domain} range={range} />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        wrapperStyle={{ zIndex: 100 }}
        content={renderTooltip}
      />
      <Scatter data={data} fill="#8884d8" />
    </ScatterChart>
  ); */

  const handleBubbleClick = (e) => {
    //not working as intended
    handleClickPassedFromParent(e.minute);
  };

  return (
    <ScatterChart
      width={600}
      height={120}
      margin={{
        top: 70,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <XAxis
        type="category"
        dataKey="minute"
        interval={0}
        tickLine={{ transform: "translate(0, -6)" }}
      />
      <YAxis
        type="number"
        dataKey="index"
        name={text_label}
        height={100}
        width={100}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: text_label, position: "insideRight" }}
      />
      <ZAxis type="number" dataKey="queries" domain={domain} range={range} />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        wrapperStyle={{ zIndex: 100 }}
        content={renderBubbleTooltip}
      />
      <Scatter
        data={data}
        fill="#8884d8"
        onClick={(e) => {
          // console.dir(e, { depth: null });
          handleBubbleClick(e);
          // handleClickPassedFromParent(e.minute);
        }}
      />
    </ScatterChart>
  );
};

export default function HourlyBubbleGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  handleClickPassedFromParent,
}) {
  let [first_part, second_part, third_part] = [
    data_to_plot.slice(0, 20),
    data_to_plot.slice(20, 40),
    data_to_plot.slice(40, 60),
  ];
  // console.log(first_part);

  domain = parseDomain(first_part, second_part, third_part);

  //   let bubble_chart_1 = ScatterGenerator(first_part, "00:00-07:59");
  //   let bubble_chart_2 = ScatterGenerator(second_part, "08:00-15:99");
  //   let bubble_chart_3 = ScatterGenerator(third_part, "16:00-23:99");

  return (
    <>
      <h3>{title_text}</h3>
      <div style={{ width: "70%", height: 400 }}>
        {ScatterGenerator(
          first_part,
          "00:00-19:59",
          handleClickPassedFromParent
        )}
        {ScatterGenerator(
          second_part,
          "20:00-39:99",
          handleClickPassedFromParent
        )}
        {ScatterGenerator(
          third_part,
          "40:00-59:99",
          handleClickPassedFromParent
        )}
      </div>
    </>
  );
}
