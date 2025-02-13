import React, { useState, useEffect } from "react";
import "./AqiReport.css";
import DailyTrend from "./DailyTrend";
import WeekTrend from "./WeekTrend";
import HourlyTrend from "./HourlyTrend";
import { TabPanel, TabView } from "primereact/tabview";
import PollutantChart from "./PollutantChart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const AQIChart = ({
  enviroDate,
  envirotime,
  enviroDay,
  enviroAQI,
  startDate,
  pm25ArrayData,
  pm10ArrayData,
  NO2ArrayData,
  SO2ArrayData,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTable, setActiveTable] = useState(0);
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
  // State to store peak hour frequencies
  const [daytimePeakHourFrequencies, setDaytimePeakHourFrequencies] = useState(
    []
  );
  const [nighttimePeakHourFrequencies, setNighttimePeakHourFrequencies] =
    useState([]);

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

  const calculatePeakHours = () => {
    if (!enviroDate || !envirotime || !enviroAQI) {
      return;
    }

    const daytimePeakHours = {};
    const nighttimePeakHours = {};

    // 1. Group data by date
    const groupedData = {};

    enviroDate.forEach((date, index) => {
      const time = envirotime[index];
      const aqi = enviroAQI[index];

      if (!groupedData[date]) {
        groupedData[date] = [];
      }

      groupedData[date].push({ time: time, aqi: parseFloat(aqi) }); // Ensure AQI is a number
    });

    // 2. Calculate peak hours for each date
    Object.entries(groupedData).forEach(([date, data]) => {
      // Separate daytime and nighttime data for the current date
      const daytimeData = data.filter((item) => {
        const hour = parseInt(item.time.split(":")[0]);
        return hour >= 6 && hour <= 17;
      });

      const nighttimeData = data.filter((item) => {
        const hour = parseInt(item.time.split(":")[0]);
        return hour < 6 || hour >= 18;
      });

      const findPeakHours = (timeData) => {
        if (timeData.length === 0) return null;

        // Find the maximum AQI value
        let maxAQI = Math.max(...timeData.map((item) => item.aqi));

        // Get all hours with the maximum AQI
        let peakHours = timeData
          .filter((item) => item.aqi === maxAQI)
          .map((item) => item.time); // Extract ONLY time

        return peakHours;
      };

      const daytimePeak = findPeakHours(daytimeData);
      const nighttimePeak = findPeakHours(nighttimeData);

      // 3. Aggregate frequencies
      if (daytimePeak) {
        daytimePeak.forEach((time) => {
          if (!daytimePeakHours[time]) {
            daytimePeakHours[time] = 0;
          }
          daytimePeakHours[time]++;
        });
      }
      if (nighttimePeak) {
        nighttimePeak.forEach((time) => {
          if (!nighttimePeakHours[time]) {
            nighttimePeakHours[time] = 0;
          }
          nighttimePeakHours[time]++;
        });
      }
    });

    // Convert peak hour frequencies to the format expected by DataTable and sort by frequency
    const daytimeFrequenciesArray = Object.entries(daytimePeakHours)
      .map(([time, frequency]) => ({ time, frequency }))
      .sort((a, b) => b.frequency - a.frequency); // Sort in descending order

    const nighttimeFrequenciesArray = Object.entries(nighttimePeakHours)
      .map(([time, frequency]) => ({ time, frequency }))
      .sort((a, b) => b.frequency - a.frequency); // Sort in descending order

    setDaytimePeakHourFrequencies(daytimeFrequenciesArray);
    setNighttimePeakHourFrequencies(nighttimeFrequenciesArray);
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
    calculatePeakHours();
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

  const findMaxFrequency = (data) => {
    if (!data || data.length === 0) return null;
    let max = data[0].frequency; // Initialize to the first frequency
    for (let i = 1; i < data.length; i++) {
      if (data[i].frequency > max) {
        max = data[i].frequency;
      }
    }
    return max;
  };

  const daytimeMaxFrequency = findMaxFrequency(daytimePeakHourFrequencies);
  const nighttimeMaxFrequency = findMaxFrequency(nighttimePeakHourFrequencies);

  const rowClassNameDay = (data) => {
    if (daytimeMaxFrequency === null) return ""; // No highlighting if no data
    return data.frequency === daytimeMaxFrequency ? "red-row" : "";
  };
  const rowClassNamenight = (data) => {
    if (nighttimeMaxFrequency === null) return ""; // No highlighting if no data
    return data.frequency === nighttimeMaxFrequency ? "red-row" : "";
  };

  return (
    chartData.length > 0 && (
      <div className="flex flex-column gap-3 w-full">
        <div className="flex gap-3 w-full">
          <DailyTrend
            selectedDate={selectedDate}
            dailyAverage={dailyAverage}
            dailyData={dailyData}
            setSelectedDate={setSelectedDate}
            fifteenDaysData={fifteenDaysData}
            startDate={startDate}
          />
          <div
            className="flex flex-column bg-white border-round p-4"
            style={{ flex: "40%" }}
          >
            <p className="card-title p-0 m-0">Peak Hours</p>
            <TabView
              activeIndex={activeTable}
              onTabChange={(e) => setActiveTable(e.index)}
            >
              <TabPanel header="Day">
                {/* Daytime Peak Hours Table */}

                <DataTable
                  value={daytimePeakHourFrequencies}
                  className="overflow-y-auto h-12rem p-0 text-center "
                  headerStyle={{ textAlign: "center" }}
                  rowClassName={rowClassNameDay}
                >
                  <Column
                    field="time"
                    header="Time"
                    headerStyle={{
                      fontSize: "0.6rem",
                      backgroundColor: "#166c7d",
                      color: "white",
                      padding: 1,
                    }}
                  ></Column>
                  <Column
                    field="frequency"
                    header="Frequency"
                    headerStyle={{
                      fontSize: "0.6rem",
                      backgroundColor: "#166c7d",
                      color: "white",
                      padding: 3,
                    }}
                  ></Column>
                </DataTable>
              </TabPanel>
              <TabPanel header="Night">
                {/* Nighttime Peak Hours Table */}

                <DataTable
                  value={nighttimePeakHourFrequencies}
                  className="overflow-y-auto h-12rem text-center"
                  rowClassName={rowClassNamenight}
                >
                  <Column
                    field="time"
                    header="Time"
                    headerStyle={{
                      fontSize: "0.6rem",
                      backgroundColor: "#166c7d",
                      color: "white",
                      padding: 1,
                    }}
                  ></Column>
                  <Column
                    field="frequency"
                    header="Frequency"
                    headerStyle={{
                      fontSize: "0.6rem",
                      backgroundColor: "#166c7d",
                      color: "white",
                      padding: 1,
                    }}
                  ></Column>
                </DataTable>
              </TabPanel>
            </TabView>
            <div className="flex insights p-2">
              <p className="card-title p-0 m-0 text-white">Insights</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full">
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
          <div className="w-full flex flex-column bg-white border-round p-4">
            <p className="card-title p-0 m-0">Pollutants Trend</p>
            <TabView
              activeIndex={activeTab}
              onTabChange={(e) => setActiveTab(e.index)}
            >
              <TabPanel header="PM2.5">
                <PollutantChart
                  envirodate={enviroDate}
                  envirotime={envirotime}
                  pollutantData={pm25ArrayData}
                  pollutantName="PM2.5"
                  baseChartColor="#F7A47A"
                  drilldownChartColor="#FFC107"
                  safeLimit={60}
                />
              </TabPanel>
              <TabPanel header="PM10">
                <PollutantChart
                  envirodate={enviroDate}
                  envirotime={envirotime}
                  pollutantData={pm10ArrayData}
                  pollutantName="PM10"
                  baseChartColor="#47B881"
                  drilldownChartColor="#80CBC4"
                  safeLimit={100}
                />
              </TabPanel>
              <TabPanel header="No2">
                <PollutantChart
                  envirodate={enviroDate}
                  envirotime={envirotime}
                  pollutantData={NO2ArrayData}
                  pollutantName="NO2"
                  baseChartColor="#FFDD82"
                  drilldownChartColor="#E57373"
                  safeLimit={80}
                />
              </TabPanel>
              <TabPanel header="So2">
                <PollutantChart
                  envirodate={enviroDate}
                  envirotime={envirotime}
                  pollutantData={SO2ArrayData}
                  pollutantName="SO2"
                  baseChartColor="#C68FE6"
                  drilldownChartColor="#FFF176"
                  safeLimit={80}
                />
              </TabPanel>
            </TabView>
            <div className="flex insights p-2">
              <p className="card-title p-0 m-0 text-white">Insights</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AQIChart;
