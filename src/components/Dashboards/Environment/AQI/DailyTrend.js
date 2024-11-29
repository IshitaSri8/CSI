import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import HeatMap from "../Temperature/HeatMap";
import { Button } from "primereact/button";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DailyTrend = ({
  selectedLocation,
  selectedDate,
  dailyAverage,
  dailyData,
  setSelectedDate,
  fifteenDaysData,
  startDate,
}) => {
  const [chartData, setChartData] = useState({});
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [drilldownChartData, setDrilldownChartData] = useState([]);
  // console.log(fifteenDaysData);
  console.log(new Date(startDate), new Date(selectedDate));

  useEffect(() => {
    const dataPoints = Object.entries(dailyAverage).map(([date, value]) => ({
      label: date,
      x: new Date(date.split("-").join("-")),
      y: parseFloat(value),
    }));
    dataPoints.sort((a, b) => a.x - b.x);
    const newChartData = {
      BaseChart: [
        {
          click: baseChartDrilldownHandler,
          cursor: "pointer",
          explodeOnClick: false,
          name: "BaseChart",
          type: "area",
          indexLabelFontColor: "red",
          dataPoints: dataPoints,
          color: "#1F8297",
        },
      ],
    };

    setChartData(newChartData);
  }, [selectedLocation, dailyAverage]);

  useEffect(() => {
    const selectedDateData = dailyData
      .map(({ time, aqi }) => ({
        label: time,
        y: parseFloat(aqi),
      }))
      .sort((a, b) => {
        const timeA =
          parseInt(a.label.split(":")[0]) * 60 +
          parseInt(a.label.split(":")[1]);
        const timeB =
          parseInt(b.label.split(":")[0]) * 60 +
          parseInt(b.label.split(":")[1]);
        return timeA - timeB;
      });
    setDrilldownChartData([
      {
        color: "#4C9BAC",
        name: selectedDate,
        type: "area",
        dataPoints: selectedDateData,
      },
    ]);
  }, [selectedDate, dailyData]);

  const baseChartDrilldownHandler = (e) => {
    setSelectedDate(e.dataPoint.label);
    setIsDrilldown(true);
  };

  const backButtonClickHandler = () => {
    setIsDrilldown(false);
    setShowTable(false);
  };
  const lastFifteenClickHandler = () => {
    setShowTable(true);
  };
  const backButtonClassName = isDrilldown ? "" : "invisible";

  const baseChartOptions = {
    animationEnabled: true,
    theme: "lightblue",
    height: 200,
    legend: {
      fontSize: 10,
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
    title: {
      text: "AQI Trend",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontColor: "#001F23",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      labelFontSize: 8,
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      lineThickness: 1,
      stripLines: [
        {
          value: 400,
          thickness: 1,
          color: "rgb(93, 92, 92)",
          lineDashType: "dash",
          label: "Safe limits (400)",
        },
      ],
    },
    data: chartData["BaseChart"],
    toolTip: {
      contentFormatter: function (e) {
        // Set the selectedDate to the hovered date
        setSelectedDate(e.entries[0].dataPoint.label);
        const selectedDataForDate = dailyData
          .map(({ time, aqi }) => ({
            label: time,
            y: parseFloat(aqi),
          }))
          .sort((a, b) => {
            const timeA =
              parseInt(a.label.split(":")[0]) * 60 +
              parseInt(a.label.split(":")[1]);
            const timeB =
              parseInt(b.label.split(":")[0]) * 60 +
              parseInt(b.label.split(":")[1]);
            return timeA - timeB;
          });

        const uniqueSelectedDateData = selectedDataForDate.filter(
          (entry, index, self) =>
            index ===
            self.findIndex((t) => t.label === entry.label && t.y === entry.y)
        );

        let content = "";

        // Display date and average AQI
        content += `<div style="font-size: 1vw; font-weight:600; text-align:center; padding:0.5vw">`;
        content += `Average AQI for ${selectedDate} is ${dailyAverage[selectedDate]}`;
        content += "</div>";

        // Create two tables and wrap them in divs with inline CSS
        content +=
          "<div style='display: inline-block;margin-left: 1vw;; padding:0.5vw'>";
        content += "<table style='font-size: 0.9vw; color: black'>";
        content +=
          "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;AQI&nbsp&nbsp&nbsp</th></tr>"; // Added &nbsp; for space

        // Iterate over unique selected data and add rows to the table
        uniqueSelectedDateData
          .slice(0, Math.ceil(uniqueSelectedDateData.length / 2))
          .forEach((entry) => {
            const colorClass = getColorClass(entry.y);
            content += `<tr><td class="${colorClass}">&nbsp&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td></tr>`;
          });

        content += "</table>";
        content += "</div>";

        content +=
          "<div style='display: inline-block; margin-left: 2vw;margin-right: 1vw;; padding:0.5vw'>";
        content += "<table style='font-size: 0.9vw;'>";
        content +=
          "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;AQI&nbsp&nbsp&nbsp</th></tr>"; // Added &nbsp; for space

        // Iterate over unique selected data and add rows to the table
        uniqueSelectedDateData
          .slice(Math.ceil(uniqueSelectedDateData.length / 2))
          .forEach((entry) => {
            const colorClass = getColorClass(entry.y);
            content += `<tr><td class="${colorClass}">&nbsp&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td></tr>`;
          });

        content += "</table>";
        content += "</div>";

        return content;
      },
    },
  };
  function getColorClass(aqi) {
    if (aqi >= 0 && aqi <= 50) {
      return "green-bg";
    } else if (aqi >= 51 && aqi <= 100) {
      return "yellow-bg";
    } else if (aqi >= 101 && aqi <= 200) {
      return "orange-bg";
    } else if (aqi >= 201 && aqi <= 300) {
      return "pink-bg";
    } else if (aqi >= 301 && aqi <= 400) {
      return "purple-bg";
    } else if (aqi >= 401) {
      return "red-bg";
    } else {
      return "";
    }
  }

  const drilldownChartOptions = {
    animationEnabled: true,
    title: {
      text: "AQI Level for" + selectedDate,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontColor: "#001F23",
      horizontalAlign: "left",
      padding: { bottom: 10 },
    },
    height: 170,
    theme: "light2",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "black",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      lineThickness: 1,
      stripLines: [
        {
          value: 300,
          thickness: 1,
          color: "rgb(93, 92, 92)",
          lineDashType: "dash",
          label: "Safe limits (400)",
        },
      ],
    },
    data: drilldownChartData,
    toolTip: {
      contentFormatter: function (e) {
        let content = "";
        content +=
          "AQI Level at " +
          e.entries[0].dataPoint.label +
          " is " +
          e.entries[0].dataPoint.y;
        return content;
      },
    },
  };

  return (
    <>
      <div className="btn-container">
        
        {fifteenDaysData.length > 0 && (
          <button
            className={backButtonClassName}
            onClick={lastFifteenClickHandler}
            style={{
              borderRadius: "10px",
              padding: "0.5vw",
              border: "none",
              fontSize: "0.8vw",
              backgroundColor: "#2eacd1",
              color: "white",
              cursor: "pointer",
              margin: "0.5vw",
              width: "10rem",
            }}
          >
            View Previous Days Trend
          </button>
        )}
        {/* <Button label="Back" className="bg-white text-cyan-800 border-round" /> */}
        <button
          className={backButtonClassName}
          onClick={backButtonClickHandler}
          style={{
            borderRadius: "10px",
            padding: "0.5vw",
            border: "none",
            fontSize: "0.8vw",
            backgroundColor: "#2eacd1",
            color: "white",
            cursor: "pointer",
            margin: "0.5vw ",
            width: "10rem",
          }}
        >
          &lt; Back
        </button>
      </div>
      <CanvasJSChart
        options={isDrilldown ? drilldownChartOptions : baseChartOptions}
        containerProps={{ width: "100%" }}
      />
      {showTable === true && fifteenDaysData.length > 0 && (
        <div className="main-graph">
          <div className="graph-big">
            <div className="graph">
              <div className="graph-container">
                <HeatMap data={fifteenDaysData} startDate={startDate} />
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default DailyTrend;
