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

const LiveAQI = ({ show }) => {
  const overlayRef = useRef(null);

  const [timeArrayData, setTimeArrayData] = useState([]);
  const [dateArrayData, setDateArrayData] = useState([]);
  const [dayArrayData, setDayArrayData] = useState([]);
  const [pm25ArrayData, setPM25ArrayData] = useState([]);
  const [pm10ArrayData, setPM10ArrayData] = useState([]);
  const [SO2ArrayData, setSO2ArrayData] = useState([]);
  const [NO2ArrayData, setNO2ArrayData] = useState([]);
  const [AQIArrayData, setAQIArrayData] = useState([]);

  const [dataTableData, setDataTableData] = useState([]);

  const [aqiIDs, setAQIIDs] = useState();
  const [aqiStatus, setAqiStatus] = useState();
  const [aqiValue, setAqiValue] = useState(null);

  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const minDate = new Date("2023-12-22"); // December 22, 2023

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
      setLoading(true);
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
      //   console.log("🚀 ~ getAQI ~ api_response:", api_response);
      const dateArray = [];
      const timeArray = [];
      const dayArray = [];
      const so2Array = [];
      const no2Array = [];
      const pm25Array = [];
      const pm10Array = [];
      const aqiArrayAPI = [];
      let aqiValueSet = false; // Flag to ensure we only set AQI once

      api_response.forEach((item) => {
        const newDate = new Date(item.time * 1000);
        const day = newDate.getDay();
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
          aqiValueSet = true; // Set the flag to true
        }
        aqiArrayAPI.push(item.parameter_values.aqi.value);
        dateArray.push(date);
        timeArray.push(time);
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

      setLoading(false);
      return 0;
    } catch (error) {
      console.error("Error fetching AQI data:", error);
      setLoading(false);
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
      if (aqiIDs) {
        const promises = aqiIDs.map((aqiID) =>
          getAQI(aqiID.thingID, aqiID.from_time, aqiID.upto_time)
        );
        // Wait for all promises to resolve
        await Promise.all(promises);
      }
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
        color: "#086d43",
        textColor: "white",
        image: good,
        bg_color: colors.good,
      };
    } else if (aqi > 50 && aqi <= 100) {
      return {
        status: "SATISFACTORY",
        color: "#669138",
        textColor: "black",
        image: moderate,
        bg_color: colors.moderate,
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATELY POLLUTED",
        color: "#b27909",
        textColor: "black",
        image: poor,
        bg_color: colors.yellow,
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        color: "#C7253E",
        textColor: "white",
        image: unhealthy,
        bg_color: colors.warning,
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        color: "#b81b1d",
        textColor: "white",
        image: severe,
        bg_color: colors.poor,
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        color: "#600e0f",
        textColor: "white",
        image: hazardous,
        bg_color: colors.veryPoor,
      };
    }
  };

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };

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
      {show && (
        <div className="flex align-items-center justify-content-between gap-3">
          <div className="flex align-items-center justify-content-between w-full">
            {/* Title & Score */}
            <div
              style={{
                position: "relative",
                width: "340px",
                height: "43px",
                overflow: "hidden", // Hide overflow if needed
              }}
            >
              <div
                className="flex align-items-center justify-content-between p-2"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundColor: scoreColor,
                  clipPath:
                    "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                }}
              >
                <h1
                  className="m-0 p-0 text-white text-2xl font-semibold"
                  style={{ zIndex: 1500 }}
                >
                  Live Air Quality Index
                </h1>
                <AqiScoreCalculator
                  onAQIScoreCalculated={handleScoreCalculated}
                />
                {score !== null && (
                  <p
                    className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                    style={{ zIndex: 1500 }}
                  >
                    {score}
                  </p>
                )}
              </div>
            </div>
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
            backgroundColor: aqiStatus?.bg_color,
            border: `1px solid ${aqiStatus?.color}`,
          }}
        >
          <div className="flex flex-column align-items-center justify-content-between">
            <div className="flex align-items-center gap-8">
              <div className="flex flex-column align-items-center gap-2">
                <div className="flex align-items-center gap-2">
                  {/* <i
                    className="pi pi-spinner pi-spin"
                    style={{ fontSize: "1rem" }}
                  /> */}
                  <Radio size={18} className="danger-text" />
                  <p className="card-title text-primary1 m-0 p-0">Live AQI</p>
                </div>
                <h1 className="text-4xl font-semibold p-0 m-0 text-primary1">
                  {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
                </h1>
              </div>
              <div className="flex flex-column align-items-center gap-2">
                <p className="card-title text-primary1 m-0 p-0">
                  Air Quality is
                </p>
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
            {/* <p>{currentDate.toLocaleDateString()}</p> */}
            <div className="flex gap-2">
              <p className="card-text">Last updated:</p>
              <p>{selectedLocationId}</p>
              <p>{dateLive}</p>
              <p>{timeLive}</p>
            </div>
          </div>

          <img
            src={aqiStatus?.image}
            alt={aqiStatus?.text}
            className="h-14rem"
          />
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
        <div className="flex bg-white border-round w-full"></div>
      </div>

      <AQIChart
        enviroDate={dateArrayData}
        envirotime={timeArrayData}
        enviroAQI={AQIArrayData}
        startDate={selectedValues.liveStartDate}
        enviroDay={dayArrayData}
        pm25ArrayData={pm25ArrayData}
        pm10ArrayData={pm10ArrayData}
        NO2ArrayData={NO2ArrayData}
        SO2ArrayData={SO2ArrayData}
      />
    </div>
  );
};

export default LiveAQI;
