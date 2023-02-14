import React, { useState } from "react";
import { TagCloud } from "react-tagcloud";
// import { render } from "react-dom";
/* import WordCloud from "react-d3-cloud";

import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic"; */

import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  // Legend,
} from "recharts";

// const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

/* const sampleData = [
  { x: "A", y: 150 },
  { x: "B", y: 200 },
  { x: "C", y: 400 },
]; */

// const colors = ["#FC7333", "#BFDD38", "#1F8A70", "#334299", "#16AA55"];

function color_maker(hexval, offset) {
  return `#${((hexval + offset * 8 + offset * 4) % 16777216).toString(16)}`;
  // let hexString = "0123456789ABCDEF";
  // return (
  // String(hexString.substring((offset >> 4) & 0x0f, 1)) +
  // hexString.substring(offset & 0x0f, 1)
  // );
}

const MyBarGraph = ({ data }) => {
  let [graphData, setGraphData] = useState(data); //array
  let [intentComponentToRender, setIntentComponentToRender] = useState(null);
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
    if (intentComponentToRender === null)
      setIntentComponentToRender(e.activeLabel);
    else
      setIntentComponentToRender(
        intentComponentToRender === e.activeLabel ? null : e.activeLabel
      );
  }

  // if (barOrPie === "bar") {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {BarMaker(
          someEvent,
          graphData,
          "Frequency vs Intent mapping",
          "name",
          "total_count"
        )}
        {/*     {intentComponentToRender === "genre" &&
          PieMaker(
            someEvent,
            graphData[0].genre_distribution,
            "Genre Distributions"
          )} */}

        {
          {
            genre: PieMaker(
              null,
              graphData[0].genre_distribution,
              "Genre Distributions"
            ),
            actor: CloudMaker(
              graphData[1].top_5_actor_distribution,
              "Top 5 Actors"
            ),
            /* actor: BarMaker(
              null,
              graphData[1].top_5_actor_distribution,
              "Top 5 Actors",
              "name",
              "searches"
            ), */
            movie: BarMaker(
              null,
              graphData[2].top_5_movie_distribution,
              "Top 5 Movies",
              "name",
              "searches"
            ),
            release_year: BarMaker(
              null,
              graphData[4].year_distribution,
              "Frequency vs Year of Release",
              "year",
              "searches"
            ),
          }[intentComponentToRender]
        }
      </div>
    </div>
  );
  /* } else {
    return <div>{PieMaker(someEvent, graphData[0].genre_distribution)}</div>;
  } */
};

export default MyBarGraph;
function BarMaker(someEvent, graphData, title_text, x_axis_key, y_axis_key) {
  return (
    <div>
      <h1>{title_text}</h1>
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
          if (e == null || someEvent == null) return;
          someEvent(e);
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={x_axis_key} />
        <YAxis />
        <Tooltip content={TooltipGen("hello", "world")} />
        <Bar dataKey={y_axis_key} fill="salmon">
          {graphData.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                // fill={colors[index % colors.length]}
                fill={color_maker(0xffaaff, (index + 1) * 4)}
              />
            );
          })}
        </Bar>
      </BarChart>
    </div>
  );
}

function PieMaker(someEvent, graphData, title_text) {
  return (
    <div>
      <h1>{title_text}</h1>
      <PieChart
        width={500}
        height={500}
        onClick={(e) => {
          if (e == null || someEvent == null) return;
          someEvent(e);
        }}
      >
        <Pie
          dataKey="searches"
          isAnimationActive={true}
          data={graphData}
          cx={250}
          cy={250}
          outerRadius={200}
          fill="salmon"
          label
        >
          {graphData.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={color_maker(0x996699, (index + 1) * 4)}
                onClick={(e) => {
                  console.log(e);
                }}
              />
            );
          })}
        </Pie>
        <Tooltip  />
      </PieChart>
    </div>
  );
}

function TooltipGen(name, count) {
  return (
    <div>
      <h3>Name: {name}</h3>
      <h3>Count: {count}</h3>
    </div>
  );
}

function CustomRenderer(tag, size, color) {
  return (
    <>
      <span
        id={`${tag.name}-${size}`}
        key={tag.name}
        style={{
          animation: "blinker 10s linear infinite",
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${size}px`,
          // border: `2px solid ${color}`,
          // outline: `1px solid ${color}`,
          margin: "1px",
          padding: "1px",
          display: "inline-block",
          color: `${color}`,
        }}
      >
        {tag.name}
      </span>
      <ReactTooltip
        anchorId={`${tag.name}-${size}`}
        place="bottom"
        content={TooltipGen(tag.name, tag.count)}
      />
    </>
  );
}

function CloudMaker(graphData, title_text) {
  return (
    <div>
      <h1>{title_text}</h1>
      <TagCloud
        style={{
          width: 500,
          height: 500,
          outline: "1px dashed red",
          overflow: "hidden",
        }}
        minSize={1}
        maxSize={25}
        tags={graphData}
        colorOptions={{
          luminosity: "dark",
          hue: "#ff0000",
        }}
        renderer={CustomRenderer}
        onMouseOver={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}
