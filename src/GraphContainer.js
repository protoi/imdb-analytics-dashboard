import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeGraph from "./TimeGraph";
import HourlyBubbleGraph from "./HourlyBubbleGraph";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const jump_mapping = { weekly: null, daily: "weekly", hourly: "daily" };

function extract_minute_from_date(time_data) {
  return parseInt(time_data.substring(14, 16));
}

function group_data_by_hour(hourly_data) {
  let minutes = [];
  for (let i = 0; i < 60; ++i)
    minutes.push({ minute: i, queries: 0, hourly_queries: [], index: 1 });

  hourly_data.forEach((element) => {
    let minute = extract_minute_from_date(element["timestamp"]);
    minutes[minute].queries += 1;
    minutes[minute].hourly_queries.push({
      timestamp: element.timestamp,
      genre: element.data.entity.genre,
      actor: element.data.entity.actor,
      daterange: element.data.entity.daterange,
      moviename: element.data.entity.moviename,
      intent: element.data.intent,
      actual_message: element.data.actual_message,
      response_message: element.data.response_message,
    });
  });

  console.log("minutes: ");
  console.log(minutes);

  return minutes;
}

function DatePicker({ dateSelected, setDateSelected, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="YYYY/MM/DD"
        value={dateSelected}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default function GraphContainer({ dummy_data }) {
  // let dis = true;

  //States
  // const [posts, setPosts] = useState("");
  let [data, setData] = useState(data);
  let [dateSelected, setDateSelected] = useState(new Date());
  let [weeklyGraphClickedIndex, setWeeklyGraphClickedIndex] = useState(null);
  let [dailyGraphClickedIndex, setDailyGraphClickedIndex] = useState(null);
  let [stateOfGraph, setStateOfGraph] = useState("weekly");

  // Effects
  useEffect(() => {
    let yyyy_mm_dd_Date_string = dayjs(dateSelected).format("YYYY/MM/DD");
    axios
      .get(
        `https://movie-bot-backend-mkh6s9erg-ghutoon.vercel.app/query/group_queries_by_date_week?date=${yyyy_mm_dd_Date_string}`
      )
      .then((res) => {
        console.dir(res, { depth: null });
        setData(res.data);

        return res;
      })
      // .then((data) => {
      //   console.log(data);
      //   setPosts(data);
      // })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dateSelected]);
  function handleWeeklyGraphClickedIndex(index) {
    console.log(`clicked index on the weekly graph was: ${index}`);
    setWeeklyGraphClickedIndex(index);
    if (
      data[index]["daily_queries"] != null &&
      data[index]["daily_queries"].length > 0
    ) {
      setStateOfGraph("daily");
    }
  }
  function handleDailyGraphClickedIndex(index) {
    console.log(`clicked index on the daily graph was: ${index}`);
    setDailyGraphClickedIndex(index);
    if (
      data[weeklyGraphClickedIndex]["daily_queries"][index]["hourly_queries"] !=
        null &&
      data[weeklyGraphClickedIndex]["daily_queries"][index]["hourly_queries"]
        .length > 0
    ) {
      setStateOfGraph("hourly");
    }
  }
  function handleBackButtonClick() {
    let previousStateOfGraph = jump_mapping[stateOfGraph];
    if (previousStateOfGraph == null) return;
    setStateOfGraph(previousStateOfGraph);
  }
  const handleDatePicked = (newDateSelected) => {
    console.log(newDateSelected);
    setDateSelected(newDateSelected);
  };

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
          height: 1 / 5, // 80%
          backgroundColor: "primary.light",
          padding: "1%",
        }}
      >
        {/* add 3 buttons, one for back and 2 for left and right navigation */}
        {/* have 2 buttons, date picker spawns when stateOfGraph == weekly, else a back button will spawn*/}
        {stateOfGraph !== "weekly" && (
          <Button variant="contained" onClick={handleBackButtonClick}>
            Back
          </Button>
        )}
        {stateOfGraph === "weekly" && (
          <DatePicker
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            handleChange={handleDatePicked}
          ></DatePicker>
        )}
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
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
              interval={6}
              handleClickPassedFromParent={handleDailyGraphClickedIndex}
            />
          )}
          {stateOfGraph === "hourly" && (
            <HourlyBubbleGraph
              data_to_plot={group_data_by_hour(
                data[weeklyGraphClickedIndex]["daily_queries"][
                  dailyGraphClickedIndex
                ]["hourly_queries"]
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
