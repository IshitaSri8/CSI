import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../Dash.css";
import good from "assets/dashboard/good.png";
import moderate from "assets/dashboard/moderate.png";
import poor from "assets/dashboard/poor.png";
import very_poor from "assets/dashboard/very_poor.png";
import severe from "assets/dashboard/severe.png";
import PollutantChart from "./PollutantChart";
import { Button } from "primereact/button";
import TableSkeleton from "../../skeletons/TableSkeleton";
import AQIChart from "./AQIChart";
import AqiMap from "./AqiMap";
import { Dialog } from "primereact/dialog";
import AQIRecommendations from "./AQIRecommendations";
import { Tag } from "primereact/tag";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import { ProgressSpinner } from "primereact/progressspinner";
import Upload from "components/DashboardUtility/Popups/Upload";
import { Divider } from "primereact/divider";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";

const AqiDashboard = ({
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
    pSelectedEndDate ?? new Date("2025-01-15")
  );
  const [selectedLocation, setSelectedLocation] = useState(
    pSelectedLocation ?? "Ayodhya - Civil line,Tiny tots"
  );
  const [aqiValue, setAqiValue] = useState(null);
  const [pm25Value, setPM25value] = useState(null);
  const [pm10Value, setPM10value] = useState(null);
  const [aqiStatus, setAqiStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });

  const overlayRef = useRef(null);

  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirolocation, setEnviroLocation] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviropm25, setEnviroPM25] = useState([]);
  const [enviropm10, setEnviroPM10] = useState([]);
  const [enviroso2, setEnviroSO2] = useState([]);
  const [enviroAQI, setEnviroAQI] = useState([]);
  const [enviroNO2, setEnviroNO2] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);

  const [aqiStats, setAqiStats] = useState("");

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
      overlayRef.current.hide();
      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const filteredData = response.data.data;
      console.log(filteredData);

      const formattedDate = [];
      const formattedTime = [];
      const pm25 = [];
      const pm10 = [];
      const so2 = [];
      const AQI = [];
      const NO2 = [];
      const co2 = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.date_time).toLocaleDateString("en-CA", {
          timeZone: "Asia/Kolkata",
        });
        formattedDate.push(dateObj);

        const timeObj = new Date(item.date_time).toLocaleTimeString("en-IN", {
          hour12: false,
        });
        formattedTime.push(timeObj);

        console.log(dateObj, timeObj);

        pm25.push(item.pm25);
        pm10.push(item.pm10);
        so2.push(item.so2);
        AQI.push(item.AQI);
        NO2.push(item.NO2);
        co2.push(item.co2);
      });

      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroPM25(pm25);
      setEnviroPM10(pm10);
      setEnviroSO2(so2);
      setEnviroAQI(AQI);
      setEnviroNO2(NO2);
      setEnviroco2(co2);

      if (filteredData.length > 0) {
        const averageAqi = (
          filteredData.reduce((sum, item) => sum + item.AQI, 0) /
          filteredData.length
        ).toFixed(2);
        const averagepm25 = (
          filteredData.reduce((sum, item) => sum + item.pm25, 0) /
          filteredData.length
        ).toFixed(2);
        const averagepm10 = (
          filteredData.reduce((sum, item) => sum + item.pm10, 0) /
          filteredData.length
        ).toFixed(2);
        setPM25value(averagepm25);
        setPM10value(averagepm10);
        setAqiValue(averageAqi);

        if (onDataChange) {
          onDataChange({
            aqiValue: averageAqi,
            pm25Value: averagepm25,
            pm10Value: averagepm10,
          });
        }
        setAqiStatus(getAqiStatus(averageAqi));
      } else {
        setAqiValue(null);
        setAqiStatus({ status: "", color: "", textColor: "", image: null });
      }

      const calculateAqiStats = (filteredData) => {
        if (filteredData.length === 0) return {};

        const aqiValues = filteredData.map((item) => item.AQI);
        const pm25Values = filteredData.map((item) => item.pm25);
        const pm10Values = filteredData.map((item) => item.pm10);
        const dateTimeValues = filteredData.map(
          (item) => new Date(item.date_time)
        );

        const maxAqi = Math.max(...aqiValues);
        const minAqi = Math.min(...aqiValues);

        const maxAqiIndex = aqiValues.indexOf(maxAqi);
        const minAqiIndex = aqiValues.indexOf(minAqi);

        return {
          max: {
            value: maxAqi,
            dateTime: dateTimeValues[maxAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[maxAqiIndex],
            pm10: pm10Values[maxAqiIndex],
          },
          min: {
            value: minAqi,
            dateTime: dateTimeValues[minAqiIndex].toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            }),
            pm25: pm25Values[minAqiIndex],
            pm10: pm10Values[minAqiIndex],
          },
        };
      };
      console.log(calculateAqiStats(filteredData));
      setAqiStats(calculateAqiStats(filteredData));

      const filteredDataWithDeviation = filteredData
        .filter((item) => item.AQI > 400)
        .map((item) => ({
          date: formatDate(new Date(item.date_time)),
          time: formatTimeToHHMMSS(new Date(item.date_time)),
          aqi: item.AQI,
          deviationPercentage:
            (((item.AQI - 400) / 400) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);
      setDataTableData(uniqueDataTableData);
      console.log(uniqueDataTableData);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedLocation(null);
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    if (!show && pSelectedLocation) {
      setSelectedLocation(pSelectedLocation);
    }
  }, [show, pSelectedLocation]);

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
    return new Date(date).toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });
  };

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 100) {
      return {
        status: "GOOD",
        color: "rgba(12, 157, 97, 1)",
        textColor: "white",
        image: good,
        bg_color: "rgba(12, 157, 97, 0.15)",
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "MODERATE",
        color: "#FABC3F",
        textColor: "black",
        image: moderate,
        bg_color: "#FFF4B5",
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "POOR",
        color: "#FF7D29",
        textColor: "black",
        image: poor,
        bg_color: "#FFBF78",
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "VERY POOR",
        color: "#C7253E",
        textColor: "white",
        image: very_poor,
        bg_color: "#FF8A8A",
      };
    } else if (aqi > 400) {
      return {
        status: "SEVERE",
        color: "#624E88",
        textColor: "white",
        image: severe,
        bg_color: "#E5D9F2",
      };
    }
  };
  console.log(startDate, endDate);

  const { status: aqiStatusText, image: aqiImage } = aqiStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };

  const renderRecommendations = () => {
    return (
      <AQIRecommendations aqi={aqiValue} pm25={pm25Value} pm10={pm10Value} />
    );
  };

  const renderDashboard = () => {
    return <AqiDashboard show={false} />;
  };

  const score = 85;

  const getScoreColor = (score) => {
    if (score >= 81 && score <= 100) {
      return "#0C9D61"; // Green for good
    } else if (score >= 41 && score <= 80) {
      return "#FFAD0D"; // Yellow for moderate
    } else if (score >= 0 && score <= 40) {
      return "#E62225"; // Red for poor
    }
  };

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
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
                  backgroundColor: getScoreColor(score), // Replace with your desired color
                  clipPath:
                    "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
                }}
              >
                <h1
                  className="m-0 p-0 text-white text-2xl font-semibold"
                  style={{ zIndex: 1500 }}
                >
                  Air Quality Index
                </h1>
                <p
                  className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                  style={{ zIndex: 1500 }}
                >
                  {score}
                </p>
              </div>
            </div>
            {/* Selected  location & Date */}
            <div className="flex align-items-start flex-column gap-1">
              {/* location */}
              <div className="flex align-items-center gap-1">
                <i className="pi pi-map-marker text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {selectedLocation || "Select a location"}
                </p>
              </div>
              <Divider className="m-0 p-0" />
              {/* Date Range */}
              <div className="flex align-items-center justify-content-start gap-1">
                <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                <p className="m-0 p-0 text-primary1 font-medium text-sm">
                  {startDate ? startDate.toLocaleDateString() : "Start Date"} -{" "}
                  {endDate ? endDate.toLocaleDateString() : "End Date"}
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
                    value={selectedLocation}
                    options={locations}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => setSelectedLocation(e.value)}
                    placeholder="Select Location"
                  />
                </div>
                <div className="p-field text-sm flex flex-column">
                  <label htmlFor="dateRange" className="font-semibold text">
                    Select Date Range
                  </label>
                  <Calendar
                    id="dateRange"
                    value={[startDate, endDate]} // Pass selected date range as an array
                    onChange={(e) => {
                      const [newStartDate, newEndDate] = e.value; // Destructure range
                      setStartDate(newStartDate);
                      setEndDate(newEndDate);
                    }}
                    selectionMode="range"
                    showIcon
                    dateFormat="dd-mm-yy"
                    placeholder="Select date range"
                    showButtonBar
                    hideOnRangeSelection
                  />
                </div>
                <div className="flex justify-content-between">
                  <Button
                    className="bg-white text-moderate border-none"
                    label="Reset"
                    // icon="pi pi-search"
                    onClick={resetFilters}
                    raised
                  />
                  <Button
                    className="bg-primary1"
                    label="Apply"
                    // icon="pi pi-search"
                    onClick={handleSearch}
                    raised
                  />
                </div>
              </div>
            </OverlayPanel>
            <Button
              icon="pi pi-plus"
              className="bg-white text-secondary2"
              onClick={showUploadDialog}
              raised
              tooltip="Upload Data"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"aqi"}
            />
            <Button
              tooltip="Generate Report"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              // className="bg-white text-cyan-800 border-1 border-cyan-800"
              className=" bg-primary1 text-white"
              raised
            />
          </div>
        </div>
      )}

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

      <div className="flex flex-wrap md:flex-nowrap align-items-end w-full gap-4">
        {selectedLocation && (
          <div
            className="flex border-round-xl p-2"
            style={{
              backgroundColor: aqiStatus.bg_color,
              border: `1px solid ${aqiStatus.color}`,
              flex: "20%",
            }}
          >
            <div className="flex flex-column align-items-center justify-content-between">
              <h1 className="card-title m-0 p-0">Air Quality Index</h1>
              <h1
                className="text-3xl font-medium p-0 m-0"
                style={{ color: aqiStatus.color }}
              >
                {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
              </h1>
              <Tag
                className="border-round-3xl"
                style={{ backgroundColor: aqiStatus.color, color: "white" }}
              >
                <span className="text-xs">
                  {aqiStatus.status || "No Status"}{" "}
                </span>
              </Tag>
            </div>
            {/* <h1
                  className={`border-round-2xl py-2 px-3 text-xs text-white text-left`}
                  style={{ backgroundColor: aqiStatus.color }}
                >
                  {aqiStatus.status || "No Status"}
                </h1> */}

            {aqiImage && (
              <img src={aqiImage} alt={aqiStatusText} className="h-14rem" />
            )}
          </div>
        )}
        <div style={{ flex: "30%" }}>
          {loading ? (
            <div className="w-full">
              <TableSkeleton />
            </div>
          ) : (
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
          )}
        </div>

        <div className="flex bg-white border-round-2xl" style={{ flex: "25%" }}>
          <AqiMap averageAQI={aqiValue} selectedLocation={selectedLocation} />
        </div>

        {/* Insights */}
        {aqiStats && (
          <div
            className="flex flex-column p-3 border-round bg-white gap-2 overflow-y-auto h-15rem"
            style={{ flex: "25%" }}
          >
            <p className="card-title p-0 m-0">Insights</p>
            <div className="flex flex-column align-items-start justify-content-start gap-2">
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                A total of{" "}
                <span className="m-0 p-0 font-semibold text-sm text-red-500">
                  {dataTableData.length}
                </span>{" "}
                outlier readings have been recorded, indicating that the AQI
                exceeds the safe limit of 400.
              </li>
            </div>

            <div className="flex flex-column align-items-start justify-content-start gap-2">
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                During the selected period, the highest recorded AQI was{" "}
                <span className="m-0 p-0 font-semibold text-sm text-red-500">
                  {aqiStats.max.value}
                </span>{" "}
                on{" "}
                <span className="m-0 p-0 font-semibold text-sm ">
                  {aqiStats.max.dateTime}
                </span>{" "}
                . This spike in AQI was primarily driven by elevated levels of
                PM2.5, which measured{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {aqiStats.max.pm25}
                </span>{" "}
                µg/m³, and PM10 at{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {aqiStats.max.pm10}
                </span>{" "}
                µg/m³. These high concentrations of particulate matter
                significantly contributed to the poor air quality observed.
              </li>
            </div>
            <div className="flex flex-column align-items-start justify-content-start gap-2">
              <li className="p-0 m-0 text-primary1 font-medium text-sm">
                Conversely, the lowest AQI recorded was{" "}
                <span className="m-0 p-0 font-semibold text-sm text-green-500">
                  {aqiStats.min.value}
                </span>{" "}
                on{" "}
                <span className="m-0 p-0 font-semibold text-sm ">
                  {aqiStats.min.dateTime}
                </span>{" "}
                . During this time, both PM2.5 and PM10 levels were notably
                lower, with PM2.5 at{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {aqiStats.min.pm25}
                </span>{" "}
                µg/m³ and PM10 at{" "}
                <span className="m-0 p-0 font-semibold text-sm">
                  {aqiStats.min.pm10}
                </span>{" "}
                µg/m³. The reduced presence of these pollutants resulted in a
                significant improvement in air quality.
              </li>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 w-full bg-white border-round p-4">
        {" "}
        <AQIChart
          envirolocation={envirolocation}
          enviroDate={envirodate}
          envirotime={envirotime}
          enviroPM25={enviropm25}
          enviroPM10={enviropm10}
          enviroSO2={enviropm25}
          enviroNO2={enviroNO2}
          enviroco2={enviroco2}
          enviroAQI={enviroAQI}
          selectedLocation={selectedLocation}
          startDate={startDate}
        />
      </div>

      <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirolocation={envirolocation}
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviropm25}
            selectedLocation={selectedLocation}
            pollutantName="PM2.5"
            baseChartColor="#F7A47A"
            drilldownChartColor="#FFC107"
            height={200}
            safeLimit={60}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirolocation={envirolocation}
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviropm10}
            selectedLocation={selectedLocation}
            pollutantName="PM10"
            baseChartColor="#47B881"
            drilldownChartColor="#80CBC4"
            height={200}
            safeLimit={100}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirolocation={envirolocation}
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviroNO2}
            selectedLocation={selectedLocation}
            pollutantName="NO2"
            baseChartColor="#FFDD82"
            drilldownChartColor="#E57373"
            height={200}
            safeLimit={80}
          />
        </div>
        <div className="flex gap-3 w-full bg-white border-round p-4">
          <PollutantChart
            envirolocation={envirolocation}
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviroso2}
            selectedLocation={selectedLocation}
            pollutantName="SO2"
            baseChartColor="#C68FE6"
            drilldownChartColor="#FFF176"
            height={200}
            safeLimit={80}
          />
        </div>
      </div>

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default AqiDashboard;
