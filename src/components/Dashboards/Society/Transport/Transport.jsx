import React, { useState } from "react";
import { ColumnChart, Doughnut, LineChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { Panel } from "primereact/panel";
import bus from "assets/bus.svg";
import TransportRecommendations from "./TransportRecommendations";
import AccidentMap from "./AccidentMap";
import BusRoutes from "./BusRoutes";
import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";
import axios from "axios";
import Upload from "../../../DashboardUtility/Popups/Upload";

import civil_lines from "assets/GeoJson_Zone/1_Ayodhya_Civil_line_Tiny_tots.json";
import shahadatganj from "assets/GeoJson_Zone/5_Ayodhya_Shahadat_Ganj.json";
import ranopali from "assets/GeoJson_Zone/2_Ayodhya_Ranopali.json";
import bank_colony from "assets/GeoJson_Zone/3_Ayodhya_Bank_colony.json";
import airport from "assets/GeoJson_Zone/4_Ayodhya_near_Airport.json";
import all_locations from "assets/GeoJson_Zone/Zone_Boundary_Merge.json";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";

const Transport = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  const vehicleLables = ["Electric", "Hybrid", "Petrol", "Diesel"];
  const vehicleData = [110, 75, 53, 60];

  const maintenance = 73;
  const years = [2021, 2022, 2023, 2024];

  const evTrend = [40, 45, 60, 36];
  const labels = ["Q1", "Q2", "Q3", "Q4"];

  const buses = [80, 90, 178, 148]; // Buses in maintenance QUARTERWISE

  const [filterVisible, setFilterVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedZone, setSelectedZone] = useState("Civil Lines");
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [geoData, setGeoData] = useState(civil_lines);

  const zones = [...new Set(data.map((item) => item.Divisions))];
  const year = [...new Set(data.map((item) => item.Year))];
  const months = [...new Set(data.map((item) => item.Month))];

  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);

  useEffect(() => {
    handleApply();
  }, []);

  const handleApply = async () => {
    try {
      // setLoading(true);
      setFilterVisible(false);
      const response = await axios.get(
        "https://api-csi.arahas.com/data/transport"
      );

      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const resetFilters = () => {
    setSelectedZone(null);
    setSelectedYear(null);
    setSelectedMonth(null);
  };

  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };

  const handleZoneChange = (e) => {
    setSelectedZone(e.value);
    setGeoData(divisionsWithLocations[e.value] || all_locations);
  };
  const divisionsWithLocations = {
    "All Zones": all_locations,
    "Civil Lines": civil_lines,
    Shahadatganj: shahadatganj,
    Ranopali: ranopali,
    "Bank Colony": bank_colony,
    "Airport Area": airport,
  };

  const renderRecommendations = () => {
    return <TransportRecommendations />;
  };

  const renderDashboard = () => {
    return <Transport show={false} />;
  };

  return (
    <div className="gap-3 p-4 flex flex-column">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Public Transport
          </h1>

          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              tooltip="Filters"
              tooltipOptions={{
                position: "bottom",
              }}
              icon="pi pi-filter"
              onClick={() => setFilterVisible(!filterVisible)}
              className="bg-white text-secondary2"
              raised
            />
            {filterVisible && (
              <div
                className="absolute bg-white border-round-2xl shadow-lg p-3 w-20rem mt-2"
                style={{
                  zIndex: 1000, // Ensures the filter appears above other components
                  position: "absolute", // Required for z-index to work
                  transform: "translateY(60%) translateX(-200%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex flex-column gap-3">
                  <div className="flex flex-column align-items-center justify-content-center gap-2 ">
                    <Dropdown
                      value={selectedZone}
                      onChange={handleZoneChange}
                      options={[
                        { label: "All Zones", value: "All Zones" }, // Use null or a specific value to indicate 'All Zones'
                        ...zones.map((div) => ({ label: div, value: div })),
                      ]}
                      placeholder="Select Zones"
                      className="w-full"
                    />
                    <Dropdown
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.value)}
                      options={year.map((year) => ({
                        label: year,
                        value: year,
                      }))}
                      placeholder="Select Year"
                      className="w-full"
                    />
                    <Dropdown
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.value)}
                      options={months.map((month) => ({
                        label: month,
                        value: month,
                      }))}
                      placeholder="Select Month"
                      className="w-full"
                    />

                    {/* <Button label="Modify Data" onClick={handleModify}></Button> */}
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
                      onClick={handleApply}
                      raised
                    />
                  </div>
                </div>
              </div>
            )}

            <Button
              tooltip="Upload File"
              onClick={showUploadDialog}
              raised
              icon="pi pi-file-arrow-up"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"transport"}
            />
            <Button
              tooltip="Modify Data"
              // onClick={handleModify}
              raised
              icon="pi pi-file-edit"
              tooltipOptions={{
                position: "bottom",
              }}
            />
            <Button
              tooltip="Generate Report"
              icon="pi pi-file"
              tooltipOptions={{
                position: "bottom",
              }}
              onClick={() => setReportVisible(true)}
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
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"transport"}
                heading={"Public Transport"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <div
          className="flex flex-column align-items-center justify-content-between bg-white border-round p-3"
          style={{ flex: "25%" }}
        >
          {/* Total Buses in Operation*/}
          <div className="flex justify-content-between align-items-center gap-4">
            <div className="flex flex-column gap-2">
              <p className="card-title p-0 m-0">Buses in Operation</p>
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                298
              </p>
            </div>
            <img src={bus} alt="bus" className="w-8rem" />
          </div>
          <Divider />
          {/* Public & Semi Public */}
          <div className="flex justify-content-between align-items-center w-full">
            <div className="flex flex-column w-full align-items-center gap-1">
              <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                220
              </p>
              <p className="p-0 m-0 card-text">Public</p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column w-full align-items-center gap-1">
              <p className="text-xl font-semibold m-0 text-primary2 p-0">78</p>
              <p className="p-0 m-0 card-text">Semi Public</p>
            </div>
          </div>
          {/* Types of Vehicles */}
          <div className="flex flex-column sec-theme border-round-xl align-items-start p-3 pr-4 w-full">
            <p className="card-title p-0 m-0">Types of Buses</p>
            <Doughnut
              // title="Types of Vehicles"
              labels={vehicleLables}
              series={vehicleData}
              height={100}
              colorArray={["#FFDD82", "#F7A47A", "#98C6CF", "#1F8297"]}
            />
          </div>
        </div>

        <div className="flex gap-3 flex-column" style={{ flex: "35%" }}>
          <div className="flex gap-3">
            {/*  Disable Friendly Buses*/}
            <div
              className="flex flex-column bg-white border-round p-3 gap-2"
              style={{ flex: "40%" }}
            >
              <p className="card-title p-0 m-0">
                Disable-Friendly Buses
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
              <p className="text-3xl font-semibold m-0 p-0 text-secondary2 text-center">
                56
              </p>
            </div>
            {/* Buses older Than */}
            <div
              className="flex flex-column bg-white border-round p-3 gap-2"
              style={{ flex: "60%" }}
            >
              <p className="card-title p-0 m-0">Buses older Than</p>
              <div className="flex  justify-content-between align-items-center">
                <div className="flex flex-column w-full align-items-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                    25
                  </p>
                  <p className="p-0 m-0 card-text">7 Years</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full align-items-center gap-1">
                  <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                    18
                  </p>
                  <p className="p-0 m-0 card-text">5 Years</p>
                </div>
              </div>
              <p className="card-text text-xs p-0 m-0 text-right">
                *Standard values
              </p>
            </div>
          </div>
          {/* Buses going for maintenance */}
          <div className="flex flex-column bg-white border-round p-3 gap-2">
            <div className="flex justify-content-between">
              <p className="card-title p-0 m-0">
                Buses going for Maintenance Quarterly
              </p>
              <p className="text-sm text-tertiary3 font-medium p-0 m-0">2024</p>
            </div>
            {/* <p className="card-title p-0 m-0">Buses going for Maintenance</p> */}
            <ColumnChart
              // title="Buses going for maintenance"
              categories={labels}
              series={buses}
              height={150}
              dataPointWidth={40}
            />
          </div>
        </div>
        {/* Bus Routes and Traffic analysis */}
        <BusRoutes />
      </div>

      <div className="flex gap-3">
        <div className="flex gap-3 flex-column" style={{ flex: "18%" }}>
          {/* Availability of Bus */}
          <div className="flex flex-column bg-white border-round w-full p-3 gap-2">
            <p className="card-title p-0 m-0">
              Avg. Availability of Bus
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-3xl font-semibold m-0 p-1 text-secondary2 text-center">
              125 <span className="text-tertiary3 font-medium">/Day</span>
            </p>
          </div>
          {/* Average Passenger Count */}
          <div className="flex flex-column bg-white border-round p-3 gap-2 w-full">
            <p className="card-title p-0 m-0">
              Avg. Passenger Count
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-3xl font-semibold m-0 p-1 text-secondary2 text-center">
              487 <span className="text-tertiary3 font-medium">/Day</span>
            </p>
          </div>
        </div>

        {/* EV Trend */}
        <div
          className="flex flex-column bg-white border-round p-3 gap-2"
          style={{ flex: "38%" }}
        >
          <div className="flex justify-content-between">
            <p className="card-title p-0 m-0">
              Quarterly EV Bus Deployment Trend
            </p>
            <p className="text-sm text-tertiary3 font-medium p-0 m-0">2024</p>
          </div>
          <LineChart
            //   title="EV Trend"
            categories={labels}
            data={evTrend}
            fontColor={"#4C4C4C"}
            height={125}
          />
        </div>

        <div className="flex flex-column gap-2" style={{ flex: "12%" }}>
          {/*  Charging Stations*/}
          <div className="flex flex-column bg-white border-round w-full p-2 gap-2">
            <p className="card-text p-0 m-0">
              Charging Stations
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-xl font-semibold m-0 p-0 text-secondary2 text-center">
              12
            </p>
          </div>
          {/* Petrol Pumps*/}
          <div className="flex flex-column bg-white border-round w-full p-2 gap-2">
            <p className="card-text p-0 m-0">
              Petrol Pumps
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-xl font-semibold m-0 p-0 text-secondary2 text-center">
              27
            </p>
          </div>
          {/* Accidents*/}
          <div className="flex flex-column bg-white border-round w-full p-2 gap-2">
            <p className="card-text p-0 m-0">
              Accidents
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-xl font-semibold m-0 p-0 text-secondary2 text-center">
              27
            </p>
          </div>
        </div>

        <div className="flex" style={{ flex: "32%" }}>
          <AccidentMap />
        </div>
      </div>

      {/* <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p> */}
      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default Transport;
