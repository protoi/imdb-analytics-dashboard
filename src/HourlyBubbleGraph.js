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

let domain = null;
let range = [16, 225];

const ScatterGenerator = ({ data, text_label }) => {
  return (
    <ScatterChart>
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
        width={80}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value: {text_label}, position: "insideRight" }}
      />
      <ZAxis type="number" dataKey="queries" domain={domain} range={range} />
      <Tooltip
        cursor={{ strokeDasharray: "3 3" }}
        wrapperStyle={{ zIndex: 100 }}
        // content={renderTooltip}
      />
      <Scatter data={data} fill="#8884d8" />
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
    console.log("hello world");
  let [first_part, second_part, third_part] = [
    data_to_plot.slice(0, 20),
    data_to_plot.slice(20, 40),
    data_to_plot.slice(40, 60),
  ];

  domain = parseDomain(first_part, second_part, third_part);

  let bubble_chart_1 = ScatterGenerator(first_part, "00:00-07:59");
  let bubble_chart_2 = ScatterGenerator(second_part, "08:00-15:99");
  let bubble_chart_3 = ScatterGenerator(third_part, "16:00-23:99");

  return (
    <>
      <h3>{title_text}</h3>
      <div style={{ width: "70%", height: 400 }}>
        <ResponsiveContainer>
          {bubble_chart_1}
          {bubble_chart_2}
          {bubble_chart_3}
        </ResponsiveContainer>
      </div>
    </>
  );
}
