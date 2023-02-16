import React, { useState, useEffect } from "react";
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
import { Container } from "@mui/material";
import { Paper } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

const ScatterGenerator = (data, text_label, clickHandler) => {
  return (
    <ResponsiveContainer width="90%" height="30%">
      <ScatterChart
        // width={600}
        // height={120}
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
            if (e == null || e.minute == null) return;
            console.log(parseInt(e.minute));
            clickHandler(parseInt(e.minute));
            // handleClickPassedFromParent(e.minute);
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default function HourlyBubbleGraph({
  data_to_plot,
  x_axis_param,
  y_axis_param,
  title_text,
}) {
  //Hooks

  let [minuteToDisplay, setMinuteToDisplay] = useState(-1);
  let [dataToDisplay, setDataToDisplay] = useState([]);

  //effects
  // useEffect(() => {
  //   console.log(minuteToDisplay);
  //   if (minuteToDisplay >= 0)
  //     setDataToDisplay(data_to_plot[minuteToDisplay]["data"]);
  //   else setDataToDisplay([]);
  // });

  //handlers
  function getMinuteToDisplay(minute) {
    if (minute == null) return;
    if (minute == minuteToDisplay) {
      setMinuteToDisplay(-1);
      return;
    }
    setMinuteToDisplay(minute);

    if (minute >= 0) setDataToDisplay(data_to_plot[minute]["data"]);
    else setDataToDisplay([]);
  }

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

  const mylist = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  return (
    <>
      <h3>{title_text}</h3>
      <Container
        style={{
          outline: "1px blue solid",
          display: "flex",
          height: "100%",
        }}
      >
        <div style={{ width: "70%", height: 400 }}>
          {ScatterGenerator(first_part, "00:00-19:59", getMinuteToDisplay)}
          {ScatterGenerator(second_part, "20:00-39:59", getMinuteToDisplay)}
          {ScatterGenerator(third_part, "40:00-59:59", getMinuteToDisplay)}
        </div>

        {/* The scrollable list  */}
        {minuteToDisplay != -1 && (
          <Paper
            elevation={3}
            style={{
              width: "30%",
              backgroundColor: "#42a5f5",
              // maxHeight: "100%",
              // overflow: "auto",
              // outline: "1px green solid",
            }}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "#42a5f5",
                position: "relative",
                overflow: "auto",
                maxHeight: 400,
                "& ul": { padding: 0 },
              }}
              // subheader={<li />}
            >
              {dataToDisplay.map((element, index) => {
                return (
                  <>
                    <Accordion
                      key={index}
                      sx={{ backgroundColor: "#1976d2", color: "white" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={index}
                      >
                        <Typography>
                          Accordion #{element.intents[0]} --- {index}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <p>{element.exact_time}</p>
                          <p>{element.intents[0]}</p>
                          <p>{element.entities.join(", ")}</p>
                          <p>{element.actual_message}</p>
                          <p>{element.response_message}</p>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
}

/*
<ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary={element} />
                    </ListItemButton>
                  </ListItem> */
