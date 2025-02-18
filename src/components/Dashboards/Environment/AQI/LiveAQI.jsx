import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useRef, useState } from "react";
import AqiScoreCalculator from "./AqiScoreCalculator";
import { getScoreColor } from "components/DashboardUtility/scoreColor";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import AQIRecommendations from "./AQIRecommendations";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import unhealthy from "assets/dashboard/unhealthy-aqi-level.svg";
import severe from "assets/dashboard/severe-aqi-level.svg";
import good from "assets/dashboard/good-aqi-level.svg";
import moderate from "assets/dashboard/moderate-aqi-level.svg";
import poor from "assets/dashboard/poor-aqi-level.svg";
import hazardous from "assets/dashboard/hazardous-aqi-level.svg";
import colors from "components/DashboardUtility/Constants/colorConstants";
import { Tag } from "primereact/tag";
import AQIChart from "./AQIChart";
import { Radio } from "lucide-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import airQualityImage from "assets/aqi/air_quality.svg";
import { GaugeChart } from "Layout/GraphVisuals";
import { Knob } from "primereact/knob";
import { Tooltip } from "primereact/tooltip";

const LiveAQI = ({ show }) => {
  const overlayRef = useRef(null);

  const [timeArrayData, setTimeArrayData] = useState([]);
  const [dateArrayData, setDateArrayData] = useState([]);
  const [dayArrayData, setDayArrayData] = useState([]);
  const [weekArrayData, setWeekArrayData] = useState([]);
  const [pm25ArrayData, setPM25ArrayData] = useState([]);
  const [pm10ArrayData, setPM10ArrayData] = useState([]);
  const [SO2ArrayData, setSO2ArrayData] = useState([]);
  const [NO2ArrayData, setNO2ArrayData] = useState([]);
  const [AQIArrayData, setAQIArrayData] = useState([]);

  const [dataTableData, setDataTableData] = useState([]);

  const [aqiIDs, setAQIIDs] = useState();
  const [aqiStatus, setAqiStatus] = useState();
  const [aqiValue, setAqiValue] = useState(null);
  const [yesterdayAQI, setYesterdayAQI] = useState();
  const [currentPM25, setCurrentPM25] = useState();
  const [currentPM10, setCurrentPM10] = useState();
  const [currentNO2, setCurrentNO2] = useState();
  const [currentSO2, setCurrentSO2] = useState();

  const [maxAqiValue, setMaxAqiValue] = useState();
  const [maxAqiTime, setMaxAqiTime] = useState();
  const [minAqiValue, setMinAqiValue] = useState();
  const [minAqiTime, setMinAqiTime] = useState();

  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState();
  const [locations, setLocations] = useState([]);

  const currentDate = new Date();
  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  const [selectedValues, setSelectedValues] = useState({
    location: "Ayodhya - Civil line,Tiny tots school",
    liveStartDate: new Date(thirtyDaysAgo),
    liveEndDate: new Date(currentDate),
  });
  const [tempValues, setTempValues] = useState({
    location: "Ayodhya - Civil line,Tiny tots school",
    liveStartDate: new Date(thirtyDaysAgo),
    liveEndDate: new Date(currentDate),
  });

  const [score, setScore] = useState(null);
  const [scoreColor, setScoreColor] = useState("#000");

  const liveHour = currentDate.setMinutes(0, 0, 0);
  const [dateLive, timeLive] = convertDateString(liveHour);

  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  const [yesterdayDate, yesterdayTime] = convertDateString(yesterday);

  const minDate = new Date("2023-12-22"); // December 22, 2023

  const pollutantData = [
    { name: "PM2.5", value: currentPM25, unit: "µg/m³" },
    { name: "PM10", value: currentPM10, unit: "µg/m³" },
    { name: "NO2", value: currentNO2, unit: "ppb" },
    { name: "SO2", value: currentSO2, unit: "ppb" },
  ];

  let highestPollutant = null;
  let highestValue = -Infinity;

  const renderRecommendations = () => {
    return (
      <AQIRecommendations
      //   aqi={aqiValue} pm25={pm25Value} pm10={pm10Value}
      />
    );
  };

  const renderDashboard = () => {
    return <LiveAQI show={false} />;
  };

  function convertDateString(date) {
    const formattedDate = new Date(date).toLocaleDateString("en-CA");
    const formattedTime = new Date(date).toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });

    return [formattedDate, formattedTime];
  }

  const getAQI = async (locationID, from_time, upto_time) => {
    try {
      const response = await axios.post(
        "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/data",
        {
          data_type: "aggregate",
          aggregation_period: 3600,
          parameters: ["pm10", "pm2.5", "no2", "so2", "aqi"],
          parameter_attributes: ["value", "avg", "max", "min"],
          things: [locationID],
          from_time: from_time,
          upto_time: upto_time,
        },
        {
          headers: {
            "Access-Id": "WYDAeaT0kA7kKVyg",
            "Access-Key":
              "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
          },
        }
      );
      const api_response = response.data.data;
      const dateArray = [];
      const timeArray = [];
      const dayArray = [];
      const weekArray = [];
      const so2Array = [];
      const no2Array = [];
      const pm25Array = [];
      const pm10Array = [];
      const aqiArrayAPI = [];
      let maxAqi = -Infinity;
      let minAqi = Infinity;
      let maxAqiTime = "";
      let minAqiTime = "";
      let aqiValueSet = false; // Flag to ensure we only set AQI once
      if (api_response) {
        api_response.forEach((item) => {
          const newDate = new Date(item.time * 1000);
          const day = newDate.getDay();
          const week = getWeek(newDate);
          const [date, time] = convertDateString(newDate);
          if (
            !aqiValueSet &&
            item.thing_id === getThingID(selectedValues.location) &&
            date === dateLive &&
            time === timeLive
          ) {
            setSelectedLocationId(item.thing_id);
            setAqiValue(item.parameter_values.aqi.value);
            setAqiStatus(getAqiStatus(item.parameter_values.aqi.value));
            setCurrentPM10(item.parameter_values.pm10.avg);
            setCurrentPM25(item.parameter_values["pm2.5"].avg);
            setCurrentNO2(item.parameter_values.no2.avg);
            setCurrentSO2(item.parameter_values.so2.avg);
            aqiValueSet = true; // Set the flag to true
          }
          if (
            item.thing_id === getThingID(selectedValues.location) &&
            date === dateLive
          ) {
            const aqi = item.parameter_values.aqi.value;
            if (aqi >= maxAqi) {
              maxAqi = aqi;
              maxAqiTime = time;
            }
            if (aqi <= minAqi) {
              minAqi = aqi;
              minAqiTime = time;
            }
          }
          if (
            item.thing_id === getThingID(selectedValues.location) &&
            date === yesterdayDate &&
            time === timeLive
          ) {
            setYesterdayAQI(item.parameter_values.aqi.value);
          }
          setMaxAqiValue(maxAqi);
          setMaxAqiTime(maxAqiTime);
          setMinAqiValue(minAqi);
          setMinAqiTime(minAqiTime);

          aqiArrayAPI.push(item.parameter_values.aqi.value);
          dateArray.push(date);
          timeArray.push(time);
          weekArray.push(week);
          dayArray.push(day);
          so2Array.push(item.parameter_values.so2.avg);
          no2Array.push(item.parameter_values.no2.avg);
          pm25Array.push(item.parameter_values["pm2.5"].avg);
          pm10Array.push(item.parameter_values.pm10.avg);
        });
        setAQIArrayData(aqiArrayAPI);
        setDateArrayData(dateArray);
        setTimeArrayData(timeArray);
        setDayArrayData(dayArray);
        setWeekArrayData(weekArray);
        setSO2ArrayData(so2Array);
        setNO2ArrayData(no2Array);
        setPM10ArrayData(pm10Array);
        setPM25ArrayData(pm25Array);

        const filteredDataWithDeviation = api_response
          .filter((item) => item.parameter_values.aqi.value > 400)
          .map((item) => {
            // Create Date object from timestamp
            const newDate = new Date(item.time * 1000);

            // Get the day of the week
            // const day = newDate.getDay();

            // Get formatted date and time strings
            const [date, time] = convertDateString(newDate);

            return {
              date: date, // Use the formatted date
              time: time, // Use the formatted time
              aqi: item.parameter_values.aqi.value,
              deviationPercentage:
                (((item.parameter_values.aqi.value - 400) / 400) * 100).toFixed(
                  2
                ) + "%",
            };
          });

        const uniqueDataTableData = Array.from(
          new Set(filteredDataWithDeviation.map(JSON.stringify))
        ).map(JSON.parse);
        setDataTableData(uniqueDataTableData);
      }
      return 0;
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      return 0;
    }
  };

  const resetFilters = () => {
    setSelectedValues({
      location: "Ayodhya - Civil line,Tiny tots school",
      liveStartDate: new Date(thirtyDaysAgo),
      liveEndDate: new Date(currentDate),
    });
    setTempValues({
      location: "Ayodhya - Civil line,Tiny tots school",
      liveStartDate: new Date(thirtyDaysAgo),
      liveEndDate: new Date(currentDate),
    });
  };

  const handleApply = () => {
    setSelectedValues({
      location: tempValues.location,
      liveStartDate: tempValues.liveStartDate,
      liveEndDate: tempValues.liveEndDate,
    });
    overlayRef.current.hide();
  };

  const getThingID = (selectedLocation) => {
    if (selectedLocation === "Ayodhya - Civil line,Tiny tots school") {
      return 12218;
    }
    if (selectedLocation === "Ayodhya - Shahadat Ganj") {
      return 12220;
    }
    if (selectedLocation === "Ayodhya-Bank colony near Railway station") {
      return 12414;
    }
    if (selectedLocation === "Ayodhya-near Airport") {
      return 12415;
    }
    if (selectedLocation === "Ayodhya-Ranopali near Sugriv Kila ayodhya") {
      return 12416;
    }
  };

  useEffect(() => {
    const fetchAQIData = async () => {
      setLoading(true);
      if (aqiIDs) {
        const promises = aqiIDs.map((aqiID) => {
          return aqiID.thingID === getThingID(selectedValues.location)
            ? getAQI(aqiID.thingID, aqiID.from_time, aqiID.upto_time)
            : null;
        });
        // Wait for all promises to resolve
        await Promise.all(promises.filter((promise) => !promise));
      }
      setLoading(false);
    };

    fetchAQIData();
  }, [aqiIDs]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app.aurassure.com/-/api/iot-platform/v1.1.0/clients/10565/applications/16/things/list",
          {
            headers: {
              "Access-Id": "WYDAeaT0kA7kKVyg",
              "Access-Key":
                "H0RkamVKJ2jiGda9tx2i20kykwCGkRhn2P3bXwDgxP8dAKxLp1CM65DYKg0oYCV2",
            },
          }
        );

        if (response.status === 200) {
          // Convert startDate and endDate to Unix timestamps
          const start = new Date(selectedValues.liveStartDate);
          const end = new Date(selectedValues.liveEndDate);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 59);

          const fromTime = Math.floor(start.getTime() / 1000);
          const uptoTime = Math.floor(end.getTime() / 1000);
          //   const [location_name, location_id] = getThingID(selectedLocation);
          let thingsID = [];
          let uniqueLocations = new Set();
          response.data?.things?.forEach((thing) => {
            thingsID.push({
              thingID: thing.id,
              name: thing.name,
              from_time: fromTime,
              upto_time: uptoTime,
            });
            uniqueLocations.add(thing.name); // Add the location name to the Set
          });
          const locationOptions = Array.from(uniqueLocations).map(
            (location) => ({
              label: location,
              value: location,
            })
          );
          setLocations(locationOptions);
          setAQIIDs(thingsID);
        }
      } catch (error) {
        console.error("Error fetching Aurrasure Data:", error);
      } finally {
      }
    };

    fetchData();
  }, [
    selectedValues.location,
    selectedValues.liveStartDate,
    selectedValues.liveEndDate,
  ]);

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 50) {
      return {
        status: "GOOD",
        // color: "#086d43",
        textColor: "white",
        image: good,
        color: colors.good,
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        status: "SATISFACTORY",
        // color: "#669138",
        textColor: "black",
        image: moderate,
        color: colors.moderate,
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATELY POLLUTED",
        // color: "#b27909",
        textColor: "black",
        image: poor,
        color: colors.yellow,
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        // color: "#C7253E",
        textColor: "white",
        image: unhealthy,
        color: colors.warning,
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        // color: "#b81b1d",
        textColor: "white",
        image: severe,
        color: colors.poor,
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        // color: "#600e0f",
        textColor: "white",
        image: hazardous,
        color: colors.veryPoor,
      };
    }
  };
  const getWeek = (date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };

  // Iterate through each pollutant object in the array
  for (const pollutant of pollutantData) {
    // Check if the current pollutant's value is greater than the highestValue found so far
    if (pollutant.value > highestValue) {
      highestValue = pollutant.value; // Update highestValue
      highestPollutant = pollutant.name; // Update highestPollutant with the name of the current pollutant
    }
  }

  const handleScoreCalculated = (calculatedScore) => {
    setScore(calculatedScore);
    const color = getScoreColor(calculatedScore);
    setScoreColor(color);
  };

  return loading ? (
    <div className="flex align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex flex-column gap-3 w-full p-4">
      <div
        className="flex align-items-center justify-content-between w-full bg-white border-round p-2"
        style={{
          backgroundImage: `url(${airQualityImage})`,
          backgroundSize: "cover", // or 'contain' based on your preference
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      >
        <div
          className="flex align-items-center justify-content-start flex-column w-full"
          style={{
            flex: "85%",
          }}
        >
          <h1 className="m-0 p-0 text-secondary text-5xl font-semibold text-left  w-full ">
            Air Quality Dashboard
          </h1>
        </div>
        <div
          className="flex flex-row align-items-center justify-content-between w-full "
          style={{ flex: "15%" }}
        >
          <div className="flex flex-column align-items-center border-3 p-2 border-round border-solid border-red-500 bg-white">
            <p className="card-text text-sm">Score</p>
            <Knob value={20} valueColor="red" rangeColor="#BAD8DF" size={40} />
            <div className="flex align-items-center justify-content-start w-full">
              <p className="card-text text-xs">
                November, 2024 - January, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div className="flex align-items-center justify-content-end gap-3">
          {/* Selected  location & Date */}
          <div className="flex align-items-start flex-column gap-1">
            {/* location */}
            <div className="flex align-items-center gap-1">
              <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
              <p className="m-0 p-0 text-primary1 font-medium text-sm">
                {selectedValues.location || "Select a location"}
              </p>
            </div>
            <Divider className="m-0 p-0" />
            {/* Date Range */}
            <div className="flex align-items-center justify-content-start gap-1">
              <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
              <p className="m-0 p-0 text-primary1 font-medium text-sm">
                {selectedValues.liveStartDate
                  ? selectedValues.liveStartDate.toLocaleDateString()
                  : "Start Date"}{" "}
                -{" "}
                {selectedValues.liveEndDate
                  ? selectedValues.liveEndDate.toLocaleDateString()
                  : "End Date"}
              </p>
            </div>
          </div>

          <div className="flex align-ites-center justify-content-end gap-2">
            <Button
              tooltip="Filters"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-filter"
              onClick={(e) => overlayRef.current.toggle(e)}
              className="bg-white text-secondary2"
              raised
            />
            <OverlayPanel
              ref={overlayRef}
              style={{ width: "20rem" }}
              className="p-overlay-panel"
            >
              <div className="flex flex-column gap-3">
                <div className="flex flex-column">
                  <label htmlFor="location" className="font-semibold text">
                    Location
                  </label>
                  <Dropdown
                    value={tempValues.location}
                    options={locations}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) =>
                      setTempValues({ ...tempValues, location: e.target.value })
                    }
                    placeholder="Select Location"
                  />
                </div>
                <div className="p-field text-sm flex flex-column">
                  <label htmlFor="dateRange" className="font-semibold text">
                    Select Date Range
                  </label>
                  <Calendar
                    id="dateRange"
                    value={[tempValues.liveStartDate, tempValues.liveEndDate]} // Pass selected date range as an array
                    onChange={(e) => {
                      const [newStartDate, newEndDate] = e.value; // Destructure range
                      setTempValues({
                        ...tempValues,
                        liveStartDate: newStartDate,
                        liveEndDate: newEndDate,
                      });
                    }}
                    selectionMode="range"
                    showIcon
                    dateFormat="dd-mm-yy"
                    placeholder="Select date range"
                    showButtonBar
                    hideOnRangeSelection
                    minDate={minDate}
                    maxDate={currentDate}
                  />
                </div>
                <div className="flex justify-content-between">
                  <Button
                    className="bg-white text-secondary2"
                    label="Reset"
                    // icon="pi pi-search"
                    onClick={resetFilters}
                    raised
                  />
                  <Button
                    className="bg-primary1"
                    label="Apply"
                    // icon="pi pi-search"
                    onClick={handleApply}
                    raised
                  />
                </div>
              </div>
            </OverlayPanel>
            <Button
              tooltip="Generate Report"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              // className="bg-white text-cyan-800 border-1 border-cyan-800"
              className="bg-primary1 text-white"
              raised
            />
            <Dialog
              visible={ReportVisible}
              style={{ width: "100rem" }}
              onHide={() => {
                if (!ReportVisible) return;
                setReportVisible(false);
              }}
            >
              {/* <AQIReportPrint
          show={false}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        /> */}
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"aqi"}
                heading={"Air Quality Index"}
              />
            </Dialog>
          </div>
        </div>
      )}
      <div className="flex flex-wrap md:flex-nowrap w-full gap-3">
        <div
          className="flex border-round-xl p-2 justify-content-between bg-white w-full"
          style={{
            // backgroundColor: aqiStatus?.bg_color,
            border: `1px solid ${aqiStatus?.color}`,
          }}
        >
          <div className="flex flex-column gap-4">
            <div className="flex flex-column w-full align-items-start gap-2">
              <div className="flex gap-2">
                {/* <i
                    className="pi pi-spinner pi-spin"
                    style={{ fontSize: "1rem" }}
                  /> */}
                <Radio size={18} className="danger-text" />
                <p className="card-title text-primary1 m-0 p-0">
                  Air Quality Index
                </p>
              </div>
              <div className="flex flex-column align-items-start justify-content-center w-full">
                <h1 className="text-5xl font-semibold p-0 m-0 text-primary1 text-center">
                  {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
                </h1>
                <Tag
                  className="border-round-3xl"
                  style={{ backgroundColor: aqiStatus?.color, color: "white" }}
                >
                  <span className="text-xs">
                    {aqiStatus?.status || "No Status"}{" "}
                  </span>
                </Tag>
              </div>
            </div>
            {pollutantData && (
              <div className="flex gap-2">
                {pollutantData.map((pollutant) => (
                  <div className="flex flex-column shadow-1 border-round p-2">
                    <p
                      className={`font-semibold p-0 m-0 ${
                        highestPollutant === pollutant.name
                          ? "success-text"
                          : "text-primary1"
                      }`}
                    >
                      {/* Check if pollutant.value is defined and a number */}
                      {typeof pollutant.value === "number"
                        ? pollutant.value.toFixed(2)
                        : "N/A"}
                      {/* {pollutant.value.toFixed(2)} */}
                    </p>
                    <p
                      key={pollutant.name}
                      className={`p-0 m-0 text-xs ${
                        highestPollutant === pollutant.name
                          ? "success-text font-semibold"
                          : "card-text font-medium"
                      }`}
                    >
                      {pollutant.name} ({pollutant.unit})
                    </p>
                  </div>
                ))}
              </div>
            )}
            {/* <p>{currentDate.toLocaleDateString()}</p> */}
            <div className="flex gap-2 w-full align-items-start">
              {(((aqiValue - yesterdayAQI) / yesterdayAQI) * 100).toFixed(2) >
                0 && (
                <>
                  <i className="pi pi-arrow-up" style={{ color: "green" }}></i>
                  <p className="card-text p-0 m-0">
                    <span style={{ color: "green" }}>
                      {" "}
                      {(
                        ((aqiValue - yesterdayAQI) / yesterdayAQI) *
                        100
                      ).toFixed(2)}
                      %
                    </span>{" "}
                    from yesterday's AQI at this time.
                  </p>
                </>
              )}
              {(((aqiValue - yesterdayAQI) / yesterdayAQI) * 100).toFixed(2) <
                0 && (
                <>
                  <i className="pi pi-arrow-down" style={{ color: "red" }}></i>
                  <p className="card-text p-0 m-0">
                    <span style={{ color: "red" }}>
                      {" "}
                      {(
                        ((aqiValue - yesterdayAQI) / yesterdayAQI) *
                        100
                      ).toFixed(2)}
                      %
                    </span>{" "}
                    from yesterday's AQI at this time.
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2 w-full align-items-start">
              <p className="card-text p-0 m-0">Last updated:</p>
              <p className="p-0 m-0">{selectedLocationId}</p>
              <p className="p-0 m-0">{dateLive}</p>
              <p className="p-0 m-0">{timeLive}</p>
            </div>
          </div>
          <img
            src={aqiStatus?.image}
            alt={aqiStatus?.text}
            className="h-14rem"
          />
        </div>
        <div className="flex w-full gap-3">
          <div
            className="flex w-full flex-column gap-3"
            style={{ flex: "60%" }}
          >
            <div className="flex bg-white border-round p-2  flex-column">
              <div className="flex align-items-center justify-content-between w-full gap-2">
                {minAqiValue && (
                  <p
                    className="text-white font-semibold  p-2 border-round m-0 text-xl"
                    style={{
                      backgroundColor: `${getAqiStatus(minAqiValue).color} `,
                    }}
                  >
                    {minAqiValue}
                  </p>
                )}

                <p className="card-text text-lg m-0"> Today's Minimum</p>
                <i className="pi pi-info-circle minimum"></i>
                <Tooltip
                  target=".minimum"
                  position="right"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex">
                    <li>at {minAqiTime}</li>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex bg-white border-round p-2  flex-column">
              <div className="flex align-items-center justify-content-between w-full gap-2">
                {maxAqiValue && (
                  <p
                    className="text-white font-semibold  p-2 border-round m-0 text-xl"
                    style={{
                      backgroundColor: `${getAqiStatus(maxAqiValue).color} `,
                    }}
                  >
                    {maxAqiValue}
                  </p>
                )}

                <p className="card-text text-lg m-0"> Today's Maximum</p>
                <i className="pi pi-info-circle maximum"></i>
                <Tooltip
                  target=".maximum"
                  position="right"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex">
                    <li>at {maxAqiTime}</li>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <div
            className="bg-white border-round flex w-full p-4 flex-column"
            style={{ flex: "40%" }}
          >
            <p>
              AQI Score(based on previous 3 months):{" "}
              <span className="text-primary1 font-semibold p-2 text-xl">
                xxx
              </span>
            </p>
            <p>
              Predicted Upcoming AQI Score:{" "}
              <span className="text-primary1 font-semibold p-2 text-xl">
                xxx
              </span>
            </p>
          </div>
        </div>
        <div className="flex bg-white border-round w-full">
          <DataTable
            value={dataTableData}
            rowClassName={rowClassName}
            className="custom-row"
            scrollable
            scrollHeight="15rem"
            style={{
              width: "100%",
              borderRadius: "15px",
              overflow: "hidden",
              // scrollbarWidth: "none",
              padding: 2,
            }}
            emptyMessage="No Outlier Days Found."
          >
            <Column
              field="aqi"
              header="AQI"
              className="font-semibold text-left text-lg"
              headerStyle={{
                fontSize: "0.6rem",
                backgroundColor: "#166c7d",
                color: "white",
                padding: 3,
              }}
            ></Column>
            <Column
              field="date"
              header="Date"
              className="text-left"
              headerStyle={{
                fontSize: "0.2rem",
                backgroundColor: "#166c7d",
                color: "white",
                padding: 3,
              }}
            ></Column>
            <Column
              field="time"
              header="Time"
              className="text-left"
              headerStyle={{
                fontSize: "0.6rem",
                backgroundColor: "#166c7d",
                color: "white",
                padding: 3,
              }}
            />

            <Column
              field="deviationPercentage"
              header="Outlier %"
              className="text-lg font-semibold text-left"
              style={{ width: "20%" }}
              headerStyle={{
                fontSize: "0.6rem",
                backgroundColor: "#166c7d",
                color: "white",
                padding: 3,
              }}
            ></Column>
          </DataTable>
        </div>
      </div>

      <AQIChart
        enviroDate={dateArrayData}
        envirotime={timeArrayData}
        enviroAQI={AQIArrayData}
        startDate={selectedValues.liveStartDate}
        enviroDay={dayArrayData}
        enviroWeek={weekArrayData}
        pm25ArrayData={pm25ArrayData}
        pm10ArrayData={pm10ArrayData}
        NO2ArrayData={NO2ArrayData}
        SO2ArrayData={SO2ArrayData}
      />
    </div>
  );
};

export default LiveAQI;
