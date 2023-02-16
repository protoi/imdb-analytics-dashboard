import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeGraph from "./TimeGraph";
import HourlyBubbleGraph from "./HourlyBubbleGraph";

const jump_mapping = { weekly: null, daily: "weekly", hourly: "daily" };

function extract_minute_from_date(time_data) {
  return parseInt(time_data.substring(3, 5));
}

function group_data_by_hour(hourly_data) {
  let minutes = [];
  for (let i = 0; i < 60; ++i)
    minutes.push({ minute: i, queries: 0, data: [], index: 1 });

  hourly_data.forEach((element) => {
    let minute = extract_minute_from_date(element["exact_time"]);
    minutes[minute].queries += 1;
    minutes[minute].data.push(element);
  });

  return minutes;
}

export default function GraphContainer({ data }) {
  // let dis = true;

  const [posts, setPosts] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://movie-bot-backend-26orzciwg-ghutoon.vercel.app/query/group_queries_by_date_week?date=2023/02/09"
      )
      .then((res) => {
        console.dir(res, { depth: null });
        return res;
      })
      // .then((data) => {
      //   console.log(data);
      //   setPosts(data);
      // })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let [weeklyGraphClickedIndex, setWeeklyGraphClickedIndex] = useState(null);
  let [dailyGraphClickedIndex, setDailyGraphClickedIndex] = useState(null);
  // let [hourlyGraphClickedIndex, setHourlyGraphClickedIndex] = useState(null);

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

  function handleBackButtonClick() {
    let previousStateOfGraph = jump_mapping[stateOfGraph];
    if (previousStateOfGraph == null) return;
    setStateOfGraph(previousStateOfGraph);
  }

  return (
    <Container
      maxWidth="xl"
      style={{
        
        outline: "1px red solid",
      }}
    >
      <Box
        sx={{
          //   width: 4 / 5, // 80%
          height: 4 / 5, // 80%
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

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* <div
          style={{
            width: 100,
            height: 200,
            backgroundColor: "red",
            outline: "5px pink solid",
          }}
        ></div> */}
        <Box
          sx={{
            width: 4 / 5, // 80%
            height: 4 / 5, // 80%

            backgroundColor: "#f5f5f5",
            outline: "1px pink solid",
          }}
        >
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
              // handleClickPassedFromParent={handleHourlyGraphClickedIndex}
            />
          )}
        </Box>
      </Box>
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
