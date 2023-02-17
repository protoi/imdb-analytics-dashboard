import React, { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function TimeGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
  interval=0,
  handleClickPassedFromParent,
}) {
  let line_chart = (
    <LineChart data={data_to_plot}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        dataKey={x_axis_param}
        padding={{ left: 30, right: 30 }}
        interval={0}
        angle={0}
        dx={20}
        textAnchor={"end"}
      />
      <YAxis padding={{ top: 30 }} interval="preserveEnd" />
      <Tooltip />
      {/* <Legend /> */}
      <Line
        type="monotone"
        dataKey={y_axis_param}
        stroke="#8884d8"
        activeDot={{ r: 10 }}
      />
    </LineChart>
  );
  let area_chart = (
    <AreaChart
      data={data_to_plot}
      onClick={(e) => {
        if (e == null) return;
        console.log(e);
        handleClickPassedFromParent(e.activeTooltipIndex);
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={x_axis_param}
        // padding={{ left: 5, right: 5 }}
        interval={interval == 0 ? null : interval}
        // angle={0}
        // dx={20}
      />
      <YAxis padding={{ top: 5 }} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey={y_axis_param}
        stroke="#8884d8"
        fill="#8884d8"
        activeDot={{ r: 10 }}
      />
    </AreaChart>
  );
  return (
    <>
      <h3>{title_text}</h3>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>{area_chart}</ResponsiveContainer>
      </div>
    </>
  );
}
