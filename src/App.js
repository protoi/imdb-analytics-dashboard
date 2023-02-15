import React from "react";
import "./App.css";
import GraphContainer from "./GraphContainer";
// import MyBarGraph from "./BarGraph";
// import TimeGraph from "./TimeGraph";
// const data = require("./data.json");

const data = require("./DATA/output.json");

function App() {
  return (
    <div className="App">
      {/* <MyBarGraph data={data}></MyBarGraph> */}
      {/* <TimeGraph data={data}></TimeGraph> */}
      <GraphContainer data={data}></GraphContainer>
    </div>
  );
}

export default App;
