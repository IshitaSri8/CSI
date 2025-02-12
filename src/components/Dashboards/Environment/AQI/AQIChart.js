import React, { useState, useEffect } from "react";
import "./AqiReport.css";
import DailyTrend from "./DailyTrend";
import WeekTrend from "./WeekTrend";
import HourlyTrend from "./HourlyTrend";

const AQIChart = ({
  enviroDate,
  envirotime,
  enviroDay,
  enviroAQI,
  startDate,
}) => {
  const [selectedDate, setSelectedDate] = useState("2024-01-01");
  const [chartData, setChartData] = useState([]);
  const [dailyAverage, setDailyAverage] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [fifteenDaysData, setFifteenDaysData] = useState(null);
  const [dayAverages, setDayAverages] = useState(null);
  const [weekendAverages, setWeekendAverages] = useState([]);
  const [weekdayAverages, setWeekdayAverages] = useState([]);
  const [overallWeekendAverage, setOverallWeekendAverage] = useState(0);
  const [overallWeekdayAverage, setOverallWeekdayAverage] = useState(0);
  const [hourlyAverages, setHourlyAverages] = useState({}); // Initialize array of 24 elements with 0
  const [averageDaytimeAqi, setAverageDaytimeAqi] = useState(0);
  const [averageNighttimeAqi, setAverageNighttimeAqi] = useState(0);

  const calculateDailyAverages = () => {
    if (!enviroDate || !enviroAQI) {
      return null;
    }
    const dailyAveragesData = {};

    enviroDate.forEach((date, index) => {
      const aqi = enviroAQI[index];
      if (!dailyAveragesData[date]) {
        dailyAveragesData[date] = [];
      }
      dailyAveragesData[date].push(aqi);
    });

    const dailyAverages = {};
    for (const date in dailyAveragesData) {
      const dailyAQI = dailyAveragesData[date];
      const sum = dailyAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / dailyAQI.length;
      dailyAverages[date] = Math.round(average);
    }
    return dailyAverages;
  };

  const getDailyData = () => {
    if (!enviroDate || !enviroAQI || !envirotime) {
      return [];
    }

    const selectedDateData = enviroDate.reduce((acc, date, index) => {
      const time = envirotime[index];
      const aqi = enviroAQI[index];
      if (date === selectedDate) {
        acc.push({ time, aqi });
      }
      return acc;
    }, []);

    // Remove duplicates and sort by time
    const uniqueData = Array.from(
      new Set(selectedDateData.map((item) => item.time))
    ).map((time) => {
      return selectedDateData.find((item) => item.time === time);
    });

    return uniqueData.sort((a, b) => a.time.localeCompare(b.time));
  };

  const getFifteenDaysData = () => {
    if (!enviroDate || !enviroAQI || !envirotime) {
      return [];
    }

    // Calculate date 15 days ago
    const fifteenDaysAgo = new Date(selectedDate);

    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // Filter data for the last 15 days
    const filteredData = enviroDate.reduce((acc, date, index) => {
      const dateObj = new Date(date);
      const selectedDateVal = new Date(selectedDate);
      if (dateObj >= fifteenDaysAgo && dateObj <= selectedDateVal) {
        acc.push({
          date,
          time: envirotime[index],
          aqi: enviroAQI[index],
        });
      }
      return acc;
    }, []);

    // Remove duplicates and sort by date and time
    const uniqueData = Array.from(
      new Map(
        filteredData.map((item) => [`${item.date}_${item.time}`, item])
      ).values()
    );
    uniqueData.sort(
      (a, b) =>
        new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
    );
    return uniqueData;
  };

  // Function to calculate average AQI for each day of the week
  const calculateDayAverages = () => {
    if (!enviroDay || !enviroAQI) {
      return {};
    }

    const dayAqiData = {};

    enviroDay.forEach((day, index) => {
      const aqi = enviroAQI[index];
      if (!dayAqiData[day]) {
        dayAqiData[day] = [];
      }
      dayAqiData[day].push(aqi);
    });

    const dayAverages = {};
    for (const day in dayAqiData) {
      const dayAQI = dayAqiData[day];
      const sum = dayAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / dayAQI.length;
      dayAverages[day] = Math.round(average);
    }
    return dayAverages;
  };

  // Function to calculate average AQI for each hour
  const calculateHourlyAverages = () => {
    if (!envirotime || !enviroAQI) {
      return {};
    }

    // Initialize an array to store the sums and counts for each hour
    const hourlyAveragesData = {};

    envirotime.forEach((time, index) => {
      const aqi = enviroAQI[index];
      if (!hourlyAveragesData[time]) {
        hourlyAveragesData[time] = [];
      }
      hourlyAveragesData[time].push(aqi);
    });

    const hourlyAverages = {};
    for (const time in hourlyAveragesData) {
      const hourlyAQI = hourlyAveragesData[time];
      const sum = hourlyAQI.reduce((acc, aqi) => acc + aqi, 0);
      const average = sum / hourlyAQI.length;
      hourlyAverages[time] = Math.round(average);
    }
    return hourlyAverages;
  };

  useEffect(() => {
    fetchYearlyData();
    setDailyAverage(calculateDailyAverages());
    setDailyData(getDailyData());
    setFifteenDaysData(getFifteenDaysData());

    const averages = calculateDayAverages();
    setDayAverages(averages);

    // Extract weekend averages (0 and 6)
    const weekend = [averages[0] || 0, averages[6] || 0];
    setWeekendAverages(weekend);

    // Calculate overall weekend average
    const weekendSum = weekend.reduce((acc, val) => acc + val, 0);
    const weekendCount = weekend.length;
    const weekendAvg = weekendCount > 0 ? weekendSum / weekendCount : 0;
    setOverallWeekendAverage(Math.round(weekendAvg));

    // Extract weekday averages (1 to 5)
    const weekday = [
      averages[1] || 0,
      averages[2] || 0,
      averages[3] || 0,
      averages[4] || 0,
      averages[5] || 0,
    ];
    setWeekdayAverages(weekday);

    // Calculate overall weekday average
    const weekdaySum = weekday.reduce((acc, val) => acc + val, 0);
    const weekdayCount = weekday.length;
    const weekdayAvg = weekdayCount > 0 ? weekdaySum / weekdayCount : 0;
    setOverallWeekdayAverage(Math.round(weekdayAvg));

    const hourlyAveragesCalc = calculateHourlyAverages();
    setHourlyAverages(hourlyAveragesCalc);

    // Calculate average daytime AQI (6:00:00 to 17:00:00)
    let daytimeSum = 0;
    let daytimeCount = 0;
    const dayTimeArrayCalc = [];
    for (let hour = 6; hour <= 17; hour++) {
      const time = `${hour < 10 ? "0" : ""}${hour}:00:00`;
      if (hourlyAveragesCalc[time] !== undefined) {
        dayTimeArrayCalc.push({ time, aqi: hourlyAveragesCalc[time] });
        daytimeSum += hourlyAveragesCalc[time];
        daytimeCount++;
      }
    }
    const averageDaytime = daytimeCount > 0 ? daytimeSum / daytimeCount : 0;
    setAverageDaytimeAqi(Math.round(averageDaytime));

    // Calculate average nighttime AQI (18:00:00-23:00:00 and 00:00:00 - 5:00:00)
    let nighttimeSum = 0;
    let nighttimeCount = 0;
    const nightTimeArrayCalc = [];

    for (let hour = 18; hour <= 23; hour++) {
      const time = `${hour < 10 ? "0" : ""}${hour}:00:00`;
      if (hourlyAveragesCalc[time] !== undefined) {
        nightTimeArrayCalc.push({ time, aqi: hourlyAveragesCalc[time] });
        nighttimeSum += hourlyAveragesCalc[time];

        nighttimeCount++;
      }
    }
    for (let hour = 0; hour <= 5; hour++) {
      const time = `${hour < 10 ? "0" : ""}${hour}:00:00`;
      if (hourlyAveragesCalc[time] !== undefined) {
        nightTimeArrayCalc.push({ time, aqi: hourlyAveragesCalc[time] });
        nighttimeSum += hourlyAveragesCalc[time];
        nighttimeCount++;
      }
    }
    const averageNighttime =
      nighttimeCount > 0 ? nighttimeSum / nighttimeCount : 0;

    setAverageNighttimeAqi(Math.round(averageNighttime));
  }, [selectedDate, enviroDate, enviroAQI, enviroDay]);

  const fetchYearlyData = () => {
    const yearlyData = {};
    if (enviroDate.length > 0) {
      enviroDate.forEach((date, index) => {
        const year = date.split("-")[0];
        const month = date.split("-")[1];

        if (!yearlyData[year]) {
          yearlyData[year] = {};
        }

        if (!yearlyData[year][month]) {
          yearlyData[year][month] = [];
        }

        yearlyData[year][month].push(enviroAQI[index]);
      });
    }

    const newChartData = Object.keys(yearlyData).map((year) => ({
      year,
      months: Object.keys(yearlyData[year]).map((month) => {
        const monthKey = month;
        const monthlyData = yearlyData[year][monthKey];
        const average =
          monthlyData.reduce((acc, aqi) => acc + aqi, 0) / monthlyData.length;
        return {
          month: `${month < 10 ? "0" : ""}${month}`,
          average: parseFloat(average.toFixed(2)),
        };
      }),
    }));

    setChartData(newChartData);
  };

  return (
    chartData.length > 0 && (
      <>
        <DailyTrend
          selectedDate={selectedDate}
          dailyAverage={dailyAverage}
          dailyData={dailyData}
          setSelectedDate={setSelectedDate}
          fifteenDaysData={fifteenDaysData}
          startDate={startDate}
        />
        <WeekTrend
          overallWeekendAverage={overallWeekendAverage}
          overallWeekdayAverage={overallWeekdayAverage}
          weekendAverages={weekendAverages}
          weekdayAverages={weekdayAverages}
        />
        <HourlyTrend
          averageDaytimeAqi={averageDaytimeAqi}
          averageNighttimeAqi={averageNighttimeAqi}
          hourlyAverages={hourlyAverages}
        />
      </>
    )
  );
};

export default AQIChart;
