import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import TimeGraph from "./TimeGraph";
import HourlyBubbleGraph from "./HourlyBubbleGraph";

const jump_mapping = { weekly: null, daily: "weekly", hourly: "daily" };

function extract_minute_from_date(time_data) {
  return parseInt(time_data.substring(3, 5));
}

function group_data_by_hour(hourly_data) {
  let minutes = [];
  for (let i = 0; i < 60; ++i)
    minutes.push({ minute: i, queries: 0, data: [] });

  hourly_data.forEach((element) => {
    let minute = extract_minute_from_date(element["exact_time"]);
    minutes[minute].queries += 1;
    minutes[minute].data.push(element);
  });

  return minutes;
}

export default function GraphContainer({ data }) {
  let dis = true;

  let [weeklyGraphClickedIndex, setWeeklyGraphClickedIndex] = useState("nope");
  let [dailyGraphClickedIndex, setDailyGraphClickedIndex] = useState("nope");
  let [hourlyGraphClickedIndex, setHourlyGraphClickedIndex] = useState("nope");

  let [stateOfGraph, setStateOfGraph] = useState("weekly");

  function handleWeeklyGraphClickedIndex(index) {
    console.log(`clicked index on the weekly graph was: ${index}`);
    setWeeklyGraphClickedIndex(index);
    setStateOfGraph("daily");
  }
  function handleDailyGraphClickedIndex(index) {
    console.log(`clicked index on the daily graph was: ${index}`);
    setDailyGraphClickedIndex(index);
    setStateOfGraph("hourly");
  }
  function handleHourlyGraphClickedIndex(index) {
    console.log(`clicked index on the hourly graph was: ${index}`);
    setHourlyGraphClickedIndex(index);
    // setStateOfGraph("hourly");
  }

  function handleBackButtonClick() {
    let previousStateOfGraph = jump_mapping[stateOfGraph];
    if (previousStateOfGraph == null) return;
    setStateOfGraph(previousStateOfGraph);
  }

  return (
    <Container
      maxWidth="lg"
      style={
        {
          /*  backgroundColor: "salmon"  */
        }
      }
    >
      <Box
        sx={{
          //   width: 4 / 5, // 80%
          //   height: 4 / 5, // 80%
          backgroundColor: "primary.light",
        }}
      >
        {/* add 3 buttons, one for back and 2 for left and right navigation */}
        <Button variant="contained" onClick={handleBackButtonClick}>
          Back
        </Button>
        <ButtonGroup
          variant="contained"
          //   disabled
          aria-label="outlined primary button group"
        >
          <Button>{"<<<"}</Button>
          <Button>{">>>"}</Button>
        </ButtonGroup>
      </Box>
      {stateOfGraph === "weekly" && (
        <TimeGraph
          data_to_plot={data}
          x_axis_param={"day"}
          y_axis_param={"queries"}
          title_text={"Weekly Queries"}
          handleClickPassedFromParent={handleWeeklyGraphClickedIndex}
        />
      )}
      {stateOfGraph === "daily" && (
        <TimeGraph
          data_to_plot={data[weeklyGraphClickedIndex]["daily_queries"]}
          x_axis_param={"hour"}
          y_axis_param={"queries"}
          title_text={"Daily Queries"}
          handleClickPassedFromParent={handleDailyGraphClickedIndex}
        />
      )}

      {stateOfGraph === "hourly" && (
        <HourlyBubbleGraph
          data_to_plot={group_data_by_hour(
            data[weeklyGraphClickedIndex]["daily_queries"][
              dailyGraphClickedIndex
            ]["data"]
          )}
          x_axis_param={"minute"}
          y_axis_param={"queries"}
          title_text={"Hourly Queries"}
          handleClickPassedFromParent={handleHourlyGraphClickedIndex}
        />
      )}
    </Container>
  );
  /* return (
    <>
      <Container maxWidth="lg" style={{ backgroundColor: "salmon" }}>
        <p>Hello world</p>
        <p>Test 123</p>
      </Container>
    </>
  ); */
}
