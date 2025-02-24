import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "../AQI/AqiReport.css";
import { Button } from "primereact/button";
import { commonChartOptions } from "Layout/chartOptions";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PollutantChart = ({
  envirodate,
  envirotime,
  pollutantData,
  pollutantName,
  baseChartColor = "lightblue", // Default base chart color
  drilldownChartColor = "lightgreen", // Default drilldown chart color
  safeLimit, // Safe limit value
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDrilldown, setIsDrilldown] = useState(false);
  const [chartOptions, setChartOptions] = useState({});

  const calculateDailyAverages = () => {
    if (!envirodate || !pollutantData) return null;

    const dailyAveragesData = {};

    envirodate.forEach((date, index) => {
      const pollutantValue = pollutantData[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(pollutantValue);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyPollutantValues = dailyAveragesData[date];
      const sum = dailyPollutantValues.reduce((acc, value) => acc + value, 0);
      const average = sum / dailyPollutantValues.length;
      dailyAverages[date] = parseFloat(average.toFixed(2));
    }
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!envirodate || !pollutantData || !selectedDate) return null;

    const selectedDateData = envirodate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const pollutantValue = pollutantData[index];
      if (date === selectedDate) {
        acc.push({ time, value: pollutantValue });
      }
      return acc;
    }, []);

    return selectedDateData;
  };

  const handleDrilldown = (e) => {
    const date = e.dataPoint.label;
    setSelectedDate(date);
    setIsDrilldown(true);
  };

  const handleBackButtonClick = () => {
    setIsDrilldown(false);
    setSelectedDate(null);
  };

  const prepareChartOptions = () => {
    if (!isDrilldown) {
      const dailyAverage = calculateDailyAverages();

      return {
        animationEnabled: true,
        theme: "light2",
        title: {
          // text: `${pollutantName} Trend`,
          ...commonChartOptions.title,
        },
        axisX: {
          ...commonChartOptions.axisX,
        },
        axisY: {
          includeZero: false,
          ...commonChartOptions.axisY,
          stripLines: [
            {
              value: safeLimit,
              label: `Safe Limit (${safeLimit})`,
              color: "rgb(93, 92, 97)",
              lineDashType: "dash",
              labelFontSize: 8,
              thickness: 1,
            },
          ],
        },
        backgroundColor: "transparent",
        data: [
          {
            type: "area",
            color: baseChartColor,
            dataPoints: Object.entries(dailyAverage || {}).map(
              ([date, value]) => ({
                label: date,
                y: value,
                click: handleDrilldown,
                toolTipContent: `<table>
                                  <tr><th>Date</th><td>${date}</td></tr>
                                  <tr><th>Average ${pollutantName}</th><td>${value.toFixed(
                  2
                )}</td></tr>
                                </table>`,
              })
            ),
          },
        ],
      };
    } else {
      const dailyData = getDailyData();

      return {
        animationEnabled: true,
        theme: "light2",
        title: {
          text: `${pollutantName} Levels on ${selectedDate}`,
          ...commonChartOptions.title,
        },
        axisX: {
          ...commonChartOptions.axisX,
        },
        axisY: {
          includeZero: false,
          ...commonChartOptions.axisY,
          stripLines: [
            {
              value: safeLimit,
              label: `Safe Limit (${safeLimit})`,
              color: "rgb(93, 92, 92)",
              labelFontSize: 8,
              lineDashType: "dash",
              thickness: 2,
            },
          ],
        },
        backgoundColor: "transparent",
        data: [
          {
            type: "area",
            color: drilldownChartColor,
            dataPoints:
              dailyData?.map(({ time, value }) => ({
                label: time,
                y: parseFloat(value),
                toolTipContent: `<table>
                                  <tr><th>Time</th><td>${time}</td></tr>
                                  <tr><th>${pollutantName}</th><td>${value.toFixed(
                  2
                )}</td></tr>
                                </table>`,
              })) || [],
          },
        ],
      };
    }
  };

  useEffect(() => {
    setChartOptions(prepareChartOptions());
  }, [isDrilldown, selectedDate, envirodate, pollutantData]);

  return (
    <div className="flex flex-column w-full">
      {isDrilldown && (
        <Button
          onClick={handleBackButtonClick}
          icon="pi pi-arrow-left"
          className="bg-primary1  text-white text-xs"
          raised
        />
      )}
      <CanvasJSChart
        options={chartOptions}
        containerProps={{ height: 180, width: "100%" }}
      />
    </div>
  );
};

export default PollutantChart;
