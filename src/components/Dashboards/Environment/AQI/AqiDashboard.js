import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../Dash.css";
import good from "assets/dashboard/good.png";
import moderate from "assets/dashboard/moderate.png";
import poor from "assets/dashboard/poor.png";
import very_poor from "assets/dashboard/very_poor.png";
import severe from "assets/dashboard/severe.png";
import PollutantChart from "./PollutantChart";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import TableSkeleton from "../../skeletons/TableSkeleton";
import AQIChart from "./AQIChart";
import AqiMap from "./AqiMap";
import { Dialog } from "primereact/dialog";
import AQIRecommendations from "./AQIRecommendations";
import AQIReportPrint from "./AQIReportPrint";

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
    pSelectedEndDate ?? new Date("2024-08-13")
  );
  const [aqiData, setAqiData] = useState([]);
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
  const [filterVisible, setFilterVisible] = useState(false);
  const [RecommendationVisible, setRecommendationsVisible] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);
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

      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const filteredData = response.data.data;
      console.log(filteredData);

      const time = [];
      const formattedDate = [];
      const formattedTime = [];
      const pm25 = [];
      const pm10 = [];
      const so2 = [];
      const AQI = [];
      const NO2 = [];
      const co2 = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.time).toLocaleDateString("en-CA");

        formattedDate.push(dateObj);

        const timeObj = new Date(item.time).toLocaleTimeString(
          {},
          { hourCycle: "h24" }
        );
        formattedTime.push(timeObj);

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

      const filteredDataWithDeviation = filteredData
        .filter((item) => item.AQI > 400)
        .map((item) => ({
          date: formatDate(new Date(item.time)),
          time: formatTimeToHHMMSS(new Date(item.time)),
          aqi: item.AQI,
          deviationPercentage:
            (((item.AQI - 400) / 400) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);

      setDataTableData(uniqueDataTableData);
    } catch (error) {
    } finally {
      setLoading(false);
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
  //     subCategory={"Aqi"}
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

  const getAqiStatus = (aqi) => {
    if (aqi > 0 && aqi <= 100) {
      return {
        status: "Good",
        color: "green",
        textColor: "white",
        image: good,
        bg_color: "#BDE8CA",
      };
    } else if (aqi > 100 && aqi <= 200) {
      return {
        status: "Moderate",
        color: "#FABC3F",
        textColor: "black",
        image: moderate,
        bg_color: "#FFF4B5",
      };
    } else if (aqi > 200 && aqi <= 300) {
      return {
        status: "Poor",
        color: "#FF7D29",
        textColor: "black",
        image: poor,
        bg_color: "#FFBF78",
      };
    } else if (aqi > 300 && aqi <= 400) {
      return {
        status: "Very Poor",
        color: "#C7253E",
        textColor: "white",
        image: very_poor,
        bg_color: "#FF8A8A",
      };
    } else if (aqi > 400) {
      return {
        status: "Severe",
        color: "#624E88",
        textColor: "white",
        image: severe,
        bg_color: "#E5D9F2",
      };
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };
  console.log(startDate, endDate);

  const {
    status: aqiStatusText,
    color,
    textColor,
    image: aqiImage,
  } = aqiStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };
  const categories = ["0-17", "18-65", "65+"];
  const series = [
    { female: 25, male: 30 }, // 0-17
    { female: 55, male: 60 }, // 18-65
    { female: 35, male: 40 }, // 65+
  ];
  const NO2impactlabels = [
    "Breathing Problems",
    "Cardiovascular Issues",
    "CNS Impact",
    "Liver/Spleen/Blood Impact",
  ];
  const NO2Impactseries = [1090, 815, 345, 245];

  return (
    <div className="flex flex-column gap-3 w-full p-4">
      {/* {show && ( */}
      {show && (
        <div className="flex align-items-center justify-content-between">
          <h1 className="m-0 p-0 text-2xl text-cyan-800">AQI Dashboard</h1>
          <div className="flex align-ites-center justify-content-end flex-row gap-1">
            <Button
              label="Filters"
              icon="pi pi-filter"
              onClick={() => setFilterVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            />
            <Button
              label="Recommendations"
              icon="pi pi-align-center"
              onClick={() => setRecommendationsVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            />
            <Button
              label="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-white text-cyan-800 border-1 border-cyan-800"
            />
          </div>
        </div>
      )}

      <Dialog
        header="Filter By"
        visible={filterVisible}
        style={{ width: "50vw" }}
        onHide={() => {
          if (!filterVisible) return;
          setFilterVisible(false);
        }}
      >
        <div className="flex flex-column align-items-end w-full gap-3 flex-row">
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
      {/* )} */}
      <Dialog
        header="Recommendations"
        visible={RecommendationVisible}
        style={{ width: "70rem" }}
        onHide={() => {
          if (!RecommendationVisible) return;
          setRecommendationsVisible(false);
        }}
      >
        <AQIRecommendations aqi={aqiValue} pm25={pm25Value} pm10={pm10Value} />
      </Dialog>
      <Dialog
        visible={ReportVisible}
        style={{ width: "100rem" }}
        onHide={() => {
          if (!ReportVisible) return;
          setReportVisible(false);
        }}
      >
        <AQIReportPrint
          show={false}
          selectedLocation={selectedLocation}
          startDate={startDate}
          endDate={endDate}
        />
      </Dialog>
      <div className="flex flex-row flex-wrap md:flex-nowrap align-items-end w-full gap-3 mt-2">
        {selectedLocation && (
          <Card
            title="Air Quality Index"
            className="w-full"
            style={{ backgroundColor: aqiStatus.bg_color }}
          >
            <div className="flex align-items-center justify-content-around flex-row w-full">
              <div className="flex align-items-center justify-content-between flex-column gap-4 w-full">
                <h1 className="text-5xl font-medium p-0 m-0">
                  {aqiValue !== null ? `${aqiValue}` : "No Data Found."}
                </h1>

                <h1
                  className={`border-round-xs p-1 text-xs px-5 text-white text-base`}
                  style={{ backgroundColor: aqiStatus.color }}
                >
                  {aqiStatus.status || "No Status"}
                </h1>
              </div>
              <div className="w-full flex justify-content-center align-items-center">
                {aqiImage && (
                  <img
                    src={aqiImage}
                    alt={aqiStatusText}
                    style={{ width: "6rem", height: "10rem" }}
                  />
                )}
              </div>
            </div>
          </Card>
        )}

        <Card className="w-full">
          {loading ? (
            <div className="w-full">
              <TableSkeleton />
            </div>
          ) : (
            <DataTable
              value={dataTableData}
              rowClassName={rowClassName}
              scrollable
              scrollHeight="12rem"
              style={{
                textAlign: "center",
              }}
              emptyMessage="No Outliear Days Found."
            >
              <Column
                field="aqi"
                header="AQI"
                className="text-sm font-semibold"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              ></Column>
              <Column
                field="date"
                header="Date"
                className="text-xs"
                headerStyle={{
                  fontSize: "0.2rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              ></Column>
              <Column
                field="time"
                header="Time"
                className="text-xs"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              />

              <Column
                field="deviationPercentage"
                header="Outlier %"
                className="text-sm font-semibold"
                headerStyle={{
                  fontSize: "0.6rem",
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              ></Column>
            </DataTable>
          )}
        </Card>

        <Card className="w-full">
          {/* <AqiReport
              selectedLocation={selectedLocation}
              startDate={startDate}
              endDate={endDate}
              averageAQI={aqiValue}
            /> */}
          <AqiMap averageAQI={aqiValue} selectedLocation={selectedLocation} />
        </Card>
      </div>

      <Card className="w-full">
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
      </Card>

      <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
        <Card className="w-full">
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
        </Card>
        <Card className="w-full">
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
        </Card>
      </div>

      <div className="flex align-items-center justify-content-center flex-wrap md:flex-nowrap w-full gap-3">
        <Card className="w-full">
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
        </Card>
        <Card className="w-full">
          <PollutantChart
            envirolocation={envirolocation}
            envirodate={envirodate}
            envirotime={envirotime}
            pollutantData={enviroso2}
            selectedLocation={selectedLocation}
            pollutantName="SO2"
            baseChartColor="#F64C4C"
            drilldownChartColor="#FFF176"
            height={200}
            safeLimit={80}
          />
        </Card>
      </div>

      {/* {show && (
            <>
              <div className="flex align-items-center justify-content-start flex-row flex-wrap md:flex-nowrap mt-2">
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
    </div>
  );
};

export default AqiDashboard;
