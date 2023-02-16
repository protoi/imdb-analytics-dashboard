import React from "react";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import ReactDOM from "react-dom/client";

import "./App.css";
import GraphContainer from "./GraphContainer";
import MyBarGraph from "./BarGraph";
import Demo from "./navbar";
import Homepage from "./Homepage";
// import TimeGraph from "./TimeGraph";
const barData = require("./data.json");

const data = require("./DATA/output.json");

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Homepage></Homepage>
      // <div>
      //   <h1>🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒🐒</h1>
      //   {/* <Link to="about">About Us</Link> */}
      // </div>
    ),
  },
  {
    path: "time",
    element: (
      <div>
        <GraphContainer data={data}></GraphContainer>
      </div>
    ),
  },
  {
    path: "intent",
    element: (
      <div>
        <MyBarGraph data={barData}></MyBarGraph>
      </div>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <Demo></Demo>
      <RouterProvider router={router} />
      {/* <MyBarGraph data={data}></MyBarGraph> */}
      {/* <TimeGraph data={data}></TimeGraph> */}
      {/* <GraphContainer data={data}></GraphContainer> */}
    </div>
  );
}

export default App;
