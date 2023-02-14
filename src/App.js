import React from "react";
import "./App.css";
import MyBarGraph from "./BarGraph";
const data = require("./data.json");

function App() {
  return (
    <div className="App">
      <MyBarGraph data={data}></MyBarGraph>
    </div>
  );
}

export default App;
