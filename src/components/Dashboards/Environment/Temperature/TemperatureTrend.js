import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import TempHeatMap from "./TempHeatMap";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TemperatureTrend = ({
  selectedDate,
  dailyAverageTemp,
  dailyAverageCo2,
  dailyDataTemp,
  dailyDataCo2,
  setSelectedDate,
  fifteenDaysData,
  startDate,
}) => {
  console.log(selectedDate);
  const [chartData, setChartData] = useState({
    BaseChart: [],
  });
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [drilldownChartData, setDrilldownChartData] = useState([]);

  useEffect(() => {
    const tempDataPoints = Object.entries(dailyAverageTemp).map(
      ([date, value]) => ({
        label: date,
        x: new Date(date),
        y: parseFloat(value),
      })
    );

    const co2DataPoints = Object.entries(dailyAverageCo2).map(
      ([date, value]) => ({
        label: date,
        x: new Date(date),
        y: parseFloat(value),
      })
    );

    const newChartData = {
      BaseChart: [
        {
          click: baseChartDrilldownHandler,
          cursor: "pointer",
          explodeOnClick: false,
          name: "Temperature",
          type: "area",
          dataPoints: tempDataPoints,
          color: "rgba(255, 245, 205,0.8)",
        },
        {
          name: "CO2",
          type: "line",
          dataPoints: co2DataPoints,
          color: "#E78F81",
        },
      ],
    };

    setChartData(newChartData);
  }, [dailyAverageTemp, dailyAverageCo2]);

  useEffect(() => {
    const selectedDateTempData = dailyDataTemp.map(({ time, temp }) => ({
      label: time,
      y: parseFloat(temp),
    }));

    const selectedDateCo2Data = dailyDataCo2.map(({ time, co2 }) => ({
      label: time,
      y: parseFloat(co2),
    }));

    setDrilldownChartData([
      {
        color: "#FFD18E",
        name: `Temperature on ${selectedDate}`,
        type: "line",
        dataPoints: selectedDateTempData,
      },
      {
        color: "#2A9D8F",
        name: `CO2 on ${selectedDate}`,
        type: "line",
        dataPoints: selectedDateCo2Data,
      },
    ]);
  }, [selectedDate, dailyDataTemp, dailyDataCo2]);

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
    height: 250,
    legend: {
      fontSize: 10,
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
    title: {
      text: "Temperature and CO2 Trend",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 20 },
    },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      labelFontSize: 8,
    },
    axisY2: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      labelFontFamily: "Montserrat",
      lineThickness: 1,
      title: "CO2",
      stripLines: [
        {
          value: 400,
          thickness: 1,
          color: "black",
          lineDashType: "dash",
          label: "Safe limits (400)",
        },
      ],
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
      title: "Temperature",
      labelFontFamily: "Montserrat",
    },

    data: (chartData["BaseChart"] || []).map((series) => ({
      ...series,
      axisYType: series.name === "Temperature" ? "primary" : "secondary",
      showInLegend: true,
    })),
    toolTip: {
      contentFormatter: function (e) {
        // Set the selectedDate to the hovered date
        setSelectedDate(e.entries[0].dataPoint.label);

        const selectedTempDataForDate = dailyDataTemp
          .map(({ time, temp }) => ({
            label: time,
            y: parseFloat(temp),
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

        const selectedCo2DataForDate = dailyDataCo2
          .map(({ time, co2 }) => ({
            label: time,
            y: parseFloat(co2),
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

        const uniqueSelectedTempData = selectedTempDataForDate.filter(
          (entry, index, self) =>
            index ===
            self.findIndex((t) => t.label === entry.label && t.y === entry.y)
        );

        let content = "";

        // Display date and average temp
        content += `<div style="font-size: 1vw; font-weight: 600; text-align: center; padding: 0.5vw;">`;
        content += `${selectedDate}<br/>`; // Line break after the date
        content += `Average Temperature : ${dailyAverageTemp[selectedDate]}</br>`; // Line break after temperature
        content += `Average CO2 : ${dailyAverageCo2[selectedDate]}`; // Line break after CO2
        content += "</div>";

        // Create the first table with inline CSS
        content +=
          "<div style='display: inline-block; margin-left: 1vw; padding: 0.5vw;'>";
        content += "<table style='font-size: 0.6vw; color: black;'>";
        content +=
          "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;Temp&nbsp&nbsp&nbsp</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;CO2&nbsp&nbsp&nbsp</th></tr>"; // Added CO2 column

        // Iterate over unique selected data and add rows to the table
        uniqueSelectedTempData
          .slice(0, Math.ceil(uniqueSelectedTempData.length / 2))
          .forEach((entry, index) => {
            const colorClass = getColorClass(entry.y);
            const co2Value = selectedCo2DataForDate[index]?.y || "N/A"; // Get corresponding CO2 value
            content += `<tr><td class="${colorClass}">&nbsp&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${co2Value}&nbsp&nbsp&nbsp</td></tr>`;
          });

        content += "</table>";
        content += "</div>";

        // Create the second table with inline CSS
        content +=
          "<div style='display: inline-block; margin-left: 2vw; margin-right: 1vw; padding: 0.5vw;'>";
        content += "<table style='font-size: 0.6vw;'>";
        content +=
          "<tr><th>&nbsp&nbsp&nbspTime&nbsp&nbsp&nbsp&nbsp&nbsp;</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;Temp&nbsp&nbsp&nbsp</th><th>&nbsp&nbsp&nbsp&nbsp&nbsp;CO2&nbsp&nbsp&nbsp</th></tr>"; // Added CO2 column

        // Iterate over unique selected data and add rows to the table
        uniqueSelectedTempData
          .slice(Math.ceil(uniqueSelectedTempData.length / 2))
          .forEach((entry, index) => {
            const colorClass = getColorClass(entry.y);
            const co2Value =
              selectedCo2DataForDate[
                index + Math.ceil(uniqueSelectedTempData.length / 2)
              ]?.y || "N/A"; // Get corresponding CO2 value
            content += `<tr><td class="${colorClass}">&nbsp&nbsp&nbsp${entry.label}&nbsp&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${entry.y}&nbsp&nbsp&nbsp</td><td class="${colorClass}">&nbsp&nbsp&nbsp&nbsp${co2Value}&nbsp&nbsp&nbsp</td></tr>`;
          });

        content += "</table>";
        content += "</div>";

        return content;
      },
    },
  };

  function getColorClass(temp) {
    if (temp >= 0 && temp <= 10) {
      return "shade-1";
    } else if (temp > 10 && temp <= 20) {
      return "shade-2";
    } else if (temp > 20 && temp <= 30) {
      return "shade-3";
    } else if (temp > 30 && temp <= 35) {
      return "shade-4";
    } else if (temp > 35 && temp <= 40) {
      return "shade-5";
    } else if (temp > 40) {
      return "shade-6";
    } else {
      return "";
    }
  }
  const drilldownChartOptions = {
    animationEnabled: true,
    title: {
      text: `Temperature and CO2 Levels for ${selectedDate}`,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 20 },
    },
    height: 200,
    theme: "light2",
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "black",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
      title: "Temperature",
    },
    axisY2: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "black",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
      title: "CO2",
    },
    data: drilldownChartData.map((series) => ({
      ...series,
      axisYType: series.name.includes("Temperature") ? "primary" : "secondary",
      showInLegend: true,
    })),
    toolTip: {
      contentFormatter: function (e) {
        let content = "";
        content +=
          "Temperature at " +
          e.entries[0].dataPoint.label +
          " is " +
          e.entries[0].dataPoint.y;
        return content;
      },
    },
  };

  return (
    <div>
      <div className="main-graph">
        <div className="btn-container">
          <button
            className={backButtonClassName}
            onClick={backButtonClickHandler}
            style={{
              borderRadius: "10px",
              padding: "0.5vw",
              border: "none",
              fontSize: "0.8vw",
              backgroundColor: "#FFD18E",
              color: "black",
              cursor: "pointer",
              margin: "0.5vw ",
              width: "10rem",
            }}
          >
            &lt; Back
          </button>
          {fifteenDaysData.length > 0 && (
            <button
              className={backButtonClassName}
              onClick={lastFifteenClickHandler}
              style={{
                borderRadius: "10px",
                padding: "0.5vw",
                border: "none",
                fontSize: "0.8vw",
                backgroundColor: "#FFD18E",
                color: "black",
                cursor: "pointer",
                margin: "0.5vw",
                width: "10rem",
              }}
            >
              View Previous Days Trend
            </button>
          )}
        </div>
        <CanvasJSChart
          options={isDrilldown ? drilldownChartOptions : baseChartOptions}
        />
      </div>
      {showTable === true && fifteenDaysData.length > 0 && (
        <div className="main-graph">
          <div className="graph-big">
            <div className="graph">
              <div className="graph-container">
                <TempHeatMap data={fifteenDaysData} startDate={startDate} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureTrend;
