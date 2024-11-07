import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Dash.css";
import sunny from "assets/dashboard/Temperature- Below 40.svg";
import warm from "assets/dashboard/Temperature- Above 40.svg";
import { Button } from "primereact/button";
import TableSkeleton from "../../skeletons/TableSkeleton";
import TempMap from "./TempMap";
import Temperature from "./Temperature";
import { Tag } from "primereact/tag";
import { Dialog } from "primereact/dialog";
import TempRecommendations from "./TempRecommendations";
import TempReportPrint from "./TempReportPrint";
import { Panel } from "primereact/panel";

// Define the helper functions here
const formatDate = (date) => date.toISOString().split("T")[0]; // Format date to 'YYYY-MM-DD'
const formatTimeToHHMMSS = (time) =>
  time.toISOString().split("T")[1].split(".")[0]; // Format time to 'HH:MM:SS'

const TempDashboard = ({
  onDataChange,
  show,
  pSelectedLocation,
  pSelectedStartDate,
  pSelectedEndDate,
}) => {
  const [startDate, setStartDate] = useState(
    pSelectedStartDate ?? new Date("2024-01-01")
  );
  const [endDate, setEndDate] = useState(
    pSelectedEndDate ?? new Date("2024-08-13")
  );
  const [selectedLocation, setSelectedLocation] = useState(
    pSelectedLocation ?? "Ayodhya - Civil line,Tiny tots"
  );
  const [tempValue, setTempValue] = useState(null);
  const [humidityValue, setHumidityvalue] = useState(null);
  const [tempStatus, setTempStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });
  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [temperature, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const [filterVisible, setFilterVisible] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);

  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible((prev) => !prev);
  };

  const handleLocationChange = (e) => {
    if (show) {
      setSelectedLocation(e.value.code);
      setLoading(true); // Start loading when location changes
    }
  };
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        "https://api-csi.arahas.com/upload/environment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/data/locations`
        );
        if (locationsResponse.data) {
          const locationOptions = locationsResponse.data.data.map((data) => ({
            label: data,
            value: data,
          }));
          setLocations(locationOptions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (selectedLocation) {
      handleSearch();
    }
  }, []);

  useEffect(() => {
    handleSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pSelectedLocation, pSelectedEndDate, pSelectedStartDate]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setFilterVisible(false);
      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const filteredData = response.data.data;
      // console.log(filteredData);

      const formattedDate = [];
      const formattedTime = [];
      const co2 = [];
      const temperature = [];
      const humidity = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.time).toLocaleDateString("en-CA");

        formattedDate.push(dateObj);

        const timeObj = new Date(item.time).toLocaleTimeString(
          {},
          { hourCycle: "h24" }
        );
        formattedTime.push(timeObj);
        co2.push(item.co2);
        temperature.push(item.temp);
        humidity.push(item.humidity);
      });
      // console.log(temperature);
      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroco2(co2);
      setTemp(temperature);
      setHumidity(humidity);

      if (filteredData.length > 0) {
        const averageTemp = (
          filteredData.reduce((sum, item) => sum + item.temp, 0) /
          filteredData.length
        ).toFixed(2);
        const averageHumidity = (
          filteredData.reduce((sum, item) => sum + item.humidity, 0) /
          filteredData.length
        ).toFixed(2);

        setTempValue(averageTemp);
        setHumidityvalue(averageHumidity);

        if (onDataChange) {
          onDataChange({
            tempValue: averageTemp,
            humidityValue: averageHumidity,
          });
        }
        setTempStatus(getTempStatus(averageTemp));
      } else {
        setTempValue(null);
        setTempStatus({ status: "", color: "", textColor: "", image: null });
      }
      // console.log(filteredData);
      const filteredDataWithDeviation = filteredData
        .filter((item) => item.temp > 40)
        .map((item) => ({
          date: formatDate(new Date(item.time)),
          time: formatTimeToHHMMSS(new Date(item.time)),
          temp: item.temp + ` °C`,
          deviationPercentage: (((item.temp - 40) / 40) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      console.log(uniqueDataTableData);
      setDataTableData(uniqueDataTableData);
    } catch (error) {
    } finally {
      setLoading(false);
      setFilterVisible(false);
    }
  };

  useEffect(() => {
    if (!show && pSelectedLocation) {
      setSelectedLocation(pSelectedLocation);
    }
  }, [show, pSelectedLocation]);

  // {showPopup && (
  //   <FileUploadPopup
  //     onClose={() => setShowPopup(false)}
  //     onUpload={handleUpload}
  //     department={"environment"}
  //     action={selectedAction}
  //     subCategory={"temp"}
  //   />
  // )}

  useEffect(() => {
    if (!show && pSelectedStartDate) {
      setStartDate(pSelectedStartDate);
    }
  }, [show, pSelectedStartDate]);

  useEffect(() => {
    if (!show && pSelectedEndDate) {
      setEndDate(pSelectedEndDate);
    }
  }, [show, pSelectedEndDate]);

  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString).toLocaleTimeString();
    return dateObj;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const getTempStatus = (temp) => {
    if (temp > 0 && temp <= 40) {
      return {
        status: "MODERATE",
        color: "#E78F81",
        textColor: "black",
        image: sunny,
        bg_color: "#F8EDE3",
      };
    } else if (temp > 40) {
      return {
        status: "VERY HOT",
        color: "rgba(230, 34, 37, 1)",
        textColor: "white",
        image: warm,
        bg_color: "#EBC49F",
      };
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };
  // console.log(startDate, endDate);

  const {
    status: tempStatusText,
    color,
    textColor,
    image: tempImage,
  } = tempStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 2 ? "red-row" : "";
  };
  return (
    <div className="flex flex-column gap-3 w-full p-4">
      {show && (
        <div className="flex align-items-center justify-content-between">
         <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Temperature
          </h1>
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="Filters"
              icon="pi pi-filter"
              onClick={() => setFilterVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            />
            {/* <Button
              label="Recommendations"
              icon="pi pi-align-center"
              onClick={() => setRecommendationsVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            /> */}
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className=" bg-theme text-white"
              raised
            />
          </div>
        </div>
      )}
      <Dialog
        header=""
        visible={filterVisible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!filterVisible) return;
          setFilterVisible(false);
        }}
      >
        <div className="flex flex-column align-items-end w-full gap-3">
          <div className="flex align-items-center justify-content-between w-full gap-3">
            <div className="flex flex-column">
              <label htmlFor="location" className="font-semibold">
                Location
              </label>
              <Dropdown
                value={selectedLocation}
                options={locations}
                optionLabel="label"
                optionValue="value"
                onChange={(e) => setSelectedLocation(e.value)}
                placeholder="Select Location"
              />
            </div>
            <div className="w-full">
              <div className="p-field text-sm flex flex-column">
                <label htmlFor="start-date" className="font-semibold">
                  Start Date
                </label>
                <Calendar
                  id="start-date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  showIcon
                  dateFormat="dd-mm-yy"
                  placeholder="Select a start date"
                  minDate={new Date("2024-01-01")} // Set the minimum selectable date
                  maxDate={endDate} // Ensure the start date does not go beyond the end date
                />
              </div>
            </div>
            <div className="w-full">
              <div className="p-field text-sm flex flex-column">
                <label htmlFor="end-date" className="font-semibold">
                  End Date{" "}
                </label>
                <Calendar
                  id="end-date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  showIcon
                  dateFormat="dd-mm-yy"
                  placeholder="Select an end date"
                  minDate={startDate} // Ensure the end date does not go before the start date
                  maxDate={new Date("2024-08-13")} // Set the maximum selectable date
                />
              </div>
            </div>
          </div>
          <Button
            className="bg-cyan-800"
            label="Apply"
            icon="pi pi-search"
            onClick={handleSearch}
          />
        </div>
      </Dialog>
      {/* <Dialog
        header="Recommendations"
        visible={RecommendationVisible}
        style={{ width: "70rem" }}
        onHide={() => {
          if (!RecommendationVisible) return;
          setRecommendationsVisible(false);
        }}
      >
        <TempRecommendations temperature={tempValue} humidity={humidityValue} />
      </Dialog> */}
      <Dialog
        visible={ReportVisible}
        style={{ width: "100rem" }}
        onHide={() => {
          if (!ReportVisible) return;
          setReportVisible(false);
        }}
      >
        <TempReportPrint
          show={true}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        />
      </Dialog>

      <div className="flex flex-wrap md:flex-nowrap align-items-center w-full gap-4">
        {selectedLocation && (
          <div
            className="border-round-xl p-2 w-full"
            style={{
              backgroundColor: tempStatus.bg_color,
              border: `1px solid ${tempStatus.color}`,
            }}
          >
            <h1 className="font-semibold text text-xl m-0 p-0">Temperature</h1>
            <div className="flex align-items-center justify-content-around">
              <h1
                className="text-4xl font-medium p-0 m-0"
                style={{ color: tempStatus.color }}
              >
                {tempValue !== null ? `${tempValue} °C` : "No Data Found."}
              </h1>

              {tempImage && (
                <img
                  src={tempImage}
                  alt={tempStatusText}
                  style={{ width: "10rem" }}
                />
              )}
              {/* <h1
                          className={`border-round-xs p-1 text-xs text-white w-6rem`}
                          style={{ backgroundColor: tempStatus.color }}
                        >
                          {tempStatus.status || "No Status"}
                        </h1> */}
            </div>
            <Tag
              className="border-round-3xl"
              style={{ backgroundColor: tempStatus.color, color: "white" }}
            >
              <span className="text-xs">
                {tempStatus.status || "No Status"}{" "}
              </span>
            </Tag>
          </div>
        )}
        <div className="w-full">
          {loading ? (
            <div className="w-full">
              <TableSkeleton />
            </div>
          ) : (
            <DataTable
              value={dataTableData}
              rowClassName={rowClassName}
              scrollable
              scrollHeight="16rem"
              style={{
                width: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                // scrollbarWidth: "none",
                padding: 2,
              }}
              emptyMessage="No Outliear Days Found."
            >
              <Column
                field="date"
                header="Date"
                className="text-sm font-semibold text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="time"
                header="Time"
                className="text-xs text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              />
              <Column
                field="temp"
                header="Temperature > 40°C"
                className="text-xs text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
              <Column
                field="deviationPercentage"
                header="Outlier %"
                className="text-sm font-semibold text-left"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                  padding: 3,
                }}
              ></Column>
            </DataTable>
          )}
        </div>
        <div className="w-full border-round-2xl">
          {/* <tempReport
              selectedLocation={selectedLocation}
              startDate={startDate}
              endDate={endDate}
              averagetemp={tempValue}
            /> */}
          <TempMap
            averageTemp={tempValue}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-between w-full">
        <Temperature
          enviroDate={envirodate}
          envirotime={envirotime}
          temperature={temperature}
          humidity={humidity}
          enviroco2={enviroco2}
          startDate={startDate}
        />
      </div>

      {/* <div className="w-100 flex align-items-center justify-content-center gap-1">
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm25}
                  selectedLocation={selectedLocation}
                  pollutantName="PM2.5"
                  baseChartColor="#FF5722"
                  drilldownChartColor="#FFC107"
                  height={200}
                  width={220}
                  safeLimit={60}
                />
              </Card>
              <Card className="h-15rem w-17rem ">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm10}
                  selectedLocation={selectedLocation}
                  pollutantName="PM10"
                  baseChartColor="#4DB6AC"
                  drilldownChartColor="#80CBC4"
                  height={200}
                  width={220}
                  safeLimit={100}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroNO2}
                  selectedLocation={selectedLocation}
                  pollutantName="NO2"
                  baseChartColor="#F44336"
                  drilldownChartColor="#E57373"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroso2}
                  selectedLocation={selectedLocation}
                  pollutantName="SO2"
                  baseChartColor="#FFEB3B"
                  drilldownChartColor="#FFF176"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
            </div> */}

      {/* {show && (
            <>
              <div className="flex align-items-center justify-content-start mt-2">
                <Card className="h-15rem w-6">
                  <CustomBarChart
                    title="Human Loss by Age Group and Gender"
                    categories={categories}
                    series={series}
                    height={200}
                    width={500}
                    xtitle="Age Group"
                    ytitle="Number of Losses"
                  />
                </Card>
                <Card className="h-15rem w-6 ml-1 ">
                  <DonutChart
                    title={"Health Impact of NO2"}
                    labels={NO2impactlabels}
                    series={NO2Impactseries}
                    height={200}
                    width={300}
                  />
                </Card>
              </div>
            </>
          )} */}

      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon =  recommendationsVisible
              ? "pi pi-chevron-down"
              : "pi pi-chevron-up";

            return (
              <div className="flex justify-content-between align-items-center px-4 bg-white border-round">
                <p className="text-primary1 font-semibold text-xl">
                  View Recommendations
                </p>
                <button
                  className={`p-link ${toggleIcon}`}
                  onClick={options.onTogglerClick}
                  style={{
                    background: "none",
                    // border: "none",
                    cursor: "pointer",
                    color: "#001F23",
                  }}
                />
              </div>
            );
          }}
        >
          {recommendationsVisible && (
            <TempRecommendations
              temperature={tempValue}
              humidity={humidityValue}
            />
          )}
        </Panel>
      )}
    </div>
  );
};

export default TempDashboard;
