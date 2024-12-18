import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import TempHeatMap from "./TempHeatMap";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TemperatureHumidityTrend = ({
  selectedDate,
  dailyAverageTemp,
  dailyAveragehumidity,
  dailyDataTemp,
  dailyDatahumidity,
  setSelectedDate,
  fifteenDaysData,
  startDate,
  dailyAverageFeelsLike,
  dailyDataFeelsLike,
}) => {
  const [chartData, setChartData] = useState({});
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [drilldownChartData, setDrilldownChartData] = useState([]);
  console.log(dailyDataFeelsLike);
  useEffect(() => {
    const tempDataPoints = Object.entries(dailyAverageTemp).map(
      ([date, value]) => ({
        label: date,
        x: new Date(date),
        y: parseFloat(value),
      })
    );

    const feelsLikeDataPoints = Object.entries(dailyAverageFeelsLike).map(
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
          showInLegend: true,
        },
        {
          name: "Feels Like Temperature",
          type: "line",
          dataPoints: feelsLikeDataPoints,
          color: "#69ABB9",
          showInLegend: true,
        },
      ],
    };

    setChartData(newChartData);
  }, [dailyAverageTemp, dailyAveragehumidity]);

  useEffect(() => {
    const selectedDateTempData = dailyDataTemp.map(({ time, temp }) => ({
      label: time,
      y: parseFloat(temp),
    }));

    const selectedDateHumidityData = dailyDatahumidity.map(
      ({ time, humid }) => ({
        label: time,
        y: parseFloat(humid),
      })
    );
    const selectedDateFeelsLikeData = dailyDataFeelsLike.map(
      ({ time, feelsLike }) => ({
        label: time,
        y: parseFloat(feelsLike),
      })
    );
    setDrilldownChartData([
      {
        color: "#FFD18E",
        name: `Temperature on ${selectedDate}`,
        type: "line",
        dataPoints: selectedDateTempData,
      },
      {
        color: "#2A9D8F",
        name: `Humidity on ${selectedDate}`,
        type: "line",
        dataPoints: selectedDateHumidityData,
      },
      {
        color: "#E76F51",
        name: `Feels Like Temperature on ${selectedDate}`,
        type: "line",
        dataPoints: selectedDateFeelsLikeData,
      },
    ]);
  }, [selectedDate, dailyDataTemp, dailyDatahumidity]);

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
      text: "Temperature and Feels Like Temperature Trend",
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#737474",
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
      //   stripLines: [
      //     {
      //       value: 40,
      //       thickness: 1,
      //       color: "rgb(93, 92, 92)",
      //       lineDashType: "dash",
      //       label: "Safe limits (40)",
      //     },
      //   ],
    },
    data: chartData["BaseChart"],
    toolTip: {
      contentFormatter: function (e) {
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

        const selectedHumidityDataForDate = dailyDatahumidity
          .map(({ time, humid }) => ({
            label: time,
            y: parseFloat(humid),
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

        const selectedFeelsLikeDataForDate = dailyDataFeelsLike
          .map(({ time, feelsLikeC }) => {
            // Check if feelsLike is a valid number
            const feelsLikeValue = isNaN(parseFloat(feelsLikeC))
              ? null
              : parseFloat(feelsLikeC);

            // Log invalid entries
            if (feelsLikeValue === null) {
              console.warn(
                `Invalid feelsLike value '${feelsLikeC}' for time '${time}'`
              );
            }

            return {
              label: time,
              y: feelsLikeValue.toFixed(2),
            };
          })
          .filter((dataPoint) => dataPoint.y !== null) // Filter out invalid data
          .sort((a, b) => {
            const timeA =
              parseInt(a.label.split(":")[0]) * 60 +
              parseInt(a.label.split(":")[1]);
            const timeB =
              parseInt(b.label.split(":")[0]) * 60 +
              parseInt(b.label.split(":")[1]);
            return timeA - timeB;
          });

        console.log(selectedFeelsLikeDataForDate);

        console.log(selectedFeelsLikeDataForDate);

        const humidityMap = selectedHumidityDataForDate.reduce((map, data) => {
          map[data.label] = data.y;
          return map;
        }, {});

        const feelsLikeMap = selectedFeelsLikeDataForDate.reduce(
          (map, data) => {
            map[data.label] = data.y;
            return map;
          },
          {}
        );
        console.log(feelsLikeMap);

        let content = `<div style="font-size: 1vw; font-weight: 500; text-align: center; padding: 0.5vw;">`;
        content += `${selectedDate}<br/>`;
        content += `Average Temperature: ${dailyAverageTemp[selectedDate]}<br/>`;
        content += `Average Humidity: ${dailyAveragehumidity[selectedDate]}<br/>`;
        content += "</div>";

        content +=
          "<div style='display: inline-block; margin-left: 1vw; padding: 0.5vw;'>";
        content += "<table style='font-size: 0.6vw; color: black;'>";
        content +=
          "<tr><th>Time</th><th>Temp</th><th>Humidity</th><th>Feels Like Temp</th></tr>";

        selectedTempDataForDate
          .slice(0, Math.ceil(selectedTempDataForDate.length / 2))
          .forEach((entry) => {
            const colorClass = getColorClass(entry.y);
            const humidityValue = humidityMap[entry.label] ?? "N/A";
            console.log(feelsLikeMap[entry.label]);
            const feelsLikeValue = feelsLikeMap[entry.label] ?? "N/A";
            content += `<tr><td class="${colorClass}">${entry.label}</td><td class="${colorClass}">${entry.y}</td><td class="${colorClass}">${humidityValue}</td><td class="${colorClass}">${feelsLikeValue}</td></tr>`;
          });

        content += "</table>";
        content += "</div>";

        content +=
          "<div style='display: inline-block; margin-left: 2vw; margin-right: 1vw; padding: 0.5vw;'>";
        content += "<table style='font-size: 0.6vw;'>";
        content +=
          "<tr><th>Time</th><th>Temp</th><th>Humidity</th><th>Feels Like Temp</th></tr>";

        selectedTempDataForDate
          .slice(Math.ceil(selectedTempDataForDate.length / 2))
          .forEach((entry) => {
            const colorClass = getColorClass(entry.y);
            const humidityValue = humidityMap[entry.label] ?? "N/A";
            const feelsLikeValue = feelsLikeMap[entry.label] ?? "N/A";
            content += `<tr><td class="${colorClass}">${entry.label}</td><td class="${colorClass}">${entry.y}</td><td class="${colorClass}">${humidityValue}</td><td class="${colorClass}">${feelsLikeValue}</td></tr>`;
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
      text: `Temperature and Humidity Trend for ${selectedDate}`,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontColor: "#737474",
      horizontalAlign: "left",
      padding: { bottom: 10 },
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
      //   stripLines: [
      //     {
      //       value: 40,
      //       thickness: 1,
      //       color: "rgb(93, 92, 92)",
      //       lineDashType: "dash",
      //       label: "Safe limits (40)",
      //     },
      //   ],
    },
    data: drilldownChartData,
    toolTip: {
      contentFormatter: function (e) {
        let content = "";
        content += `Time : ${e.entries[0].dataPoint.label} </br>`;
        content += `Temperature :
          ${e.entries[0].dataPoint.y} </br>`;

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

export default TemperatureHumidityTrend;
