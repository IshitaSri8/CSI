import React from "react";
import { Knob } from "primereact/knob";
import WaterReportPrint from "./WaterReportPrint";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import WaterRecommendations from "./WaterRecommendations";
import { Divider } from "primereact/divider";
import { Panel } from "primereact/panel";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ProgressBar } from "primereact/progressbar";
import { PieChartRow } from "Layout/GraphVisuals";
import { useEffect } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import Upload from "./Popups/Upload";
import civil_lines from "./GeoJson_Zone/1_Ayodhya_Civil_line_Tiny_tots.json";
import shahadatganj from "./GeoJson_Zone/5_Ayodhya_Shahadat_Ganj.json";
import ranopali from "./GeoJson_Zone/2_Ayodhya_Ranopali.json";
import bank_colony from "./GeoJson_Zone/3_Ayodhya_Bank_colony.json";
import airport from "./GeoJson_Zone/4_Ayodhya_near_Airport.json";
import all_locations from "./GeoJson_Zone/Zone_Boundary_Merge.json";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Card } from "primereact/card";
import drains from "../../../../extra/assets/Drainage_2024.json";
import ADA from "./ADA_Boundary.json";
const WaterDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);
  const waterSupplyData = [58, 40, 2];
  const waterSupplyLabels = ["Groundwater", "Individual Taps", "Bore Well"];
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState("");
  const [selectedZone, setSelectedZone] = useState("Civil Lines");
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [geoData, setGeoData] = useState(civil_lines);
  const [selectedData, setSelectedData] = useState(null);
  const [zoneWQIValues, setZoneWQIValues] = useState({});
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-csi.arahas.com/data/water"
        );

        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function style(value) {
    return {
      fillColor: getColor(value),
      weight: 2,
      opacity: 1,
      color: "black",
      fillOpacity: 0.7,
    };
  }
  const getColor = (WQI) => {
    if (WQI >= 91 && WQI <= 100) return "#399918";
    if (WQI >= 71 && WQI <= 90) return "#A0D683";
    if (WQI >= 51 && WQI <= 70) return "#FEFF9F";
    if (WQI >= 26 && WQI <= 50) return "#E8B86D";
    else return "#FF7777"; // Poor (0-25)
  };

  const Legend = () => {
    return (
      <div className="legend flex align-items-start justify-content-around flex-row ">
        <div className="gap-2">
          <svg width="20" height="20">
            <rect width="20" height="20" fill="#FF7777" />
          </svg>{" "}
          <h1 className="m-0 p-0 text-sm font-semi-bold">Poor</h1>
        </div>
        <div className="gap-2">
          <svg width="20" height="20">
            <rect width="20" height="20" fill="#E8B86D" />
          </svg>{" "}
          <h1 className="m-0 p-0 text-xs">Fair</h1>
        </div>
        <div className="gap-2">
          <svg width="20" height="20">
            <rect width="20" height="20" fill="#FEFF9F" />
          </svg>{" "}
          <h1 className="m-0 p-0 text-xs">Average</h1>
        </div>
        <div className="gap-2">
          <svg width="20" height="20">
            <rect width="20" height="20" fill="#A0D683" />
          </svg>{" "}
          <h1 className="m-0 p-0 text-xs">Good</h1>
        </div>
        <div className="gap-2">
          <svg width="20" height="20">
            <rect width="20" height="20" fill="#72BF78" />
          </svg>{" "}
          <h1 className="m-0 p-0 text-xs"> Excellent </h1>
        </div>
      </div>
    );
  };

  // Filter data based on selected zone, year, and month
  const filteredData =
    selectedZone === "All Zones"
      ? data.filter(
          (item) => item.Year === selectedYear && item.Month === selectedMonth
        )
      : data.filter(
          (item) =>
            item.Divisions === selectedZone &&
            item.Year === selectedYear &&
            item.Month === selectedMonth
        );

  useEffect(() => {
    if (selectedZone === "All Zones") {
      const wqiValues = {};
      filteredData.forEach((item) => {
        wqiValues[item.Divisions] = item; // Store entire item for tooltip access
      });
      setZoneWQIValues(wqiValues);
    } else {
      setZoneWQIValues({});
    }
  }, [selectedZone, filteredData]);

  // Calculate total values if all zones are selected
  const totalValues = filteredData.reduce((acc, curr) => {
    return {
      ...acc,
      Current_Supply_MLD:
        (acc.Current_Supply_MLD || 0) + curr.Current_Supply_MLD,
      Required_Supply_MLD:
        (acc.Required_Supply_MLD || 0) + curr.Required_Supply_MLD,
      Population: (acc.Population || 0) + curr.Population,
      Awarness_Campaigns_Programs:
        (acc.Awarness_Campaigns_Programs || 0) +
        curr.Awarness_Campaigns_Programs,
      Borewell: (acc.Borewell || 0) + curr.Borewell,
      Canals: (acc.Canals || 0) + curr.Canals,
      Handpumps: (acc.Handpumps || 0) + curr.Handpumps,
      No_of_Households_with_Connections:
        (acc.No_of_Households_with_Connections || 0) +
        curr.No_of_Households_with_Connections,

      Total_Households: (acc.Total_Households || 0) + curr.Total_Households,

      Tanks: (acc.Tanks || 0) + curr.Tanks,
      Ponds: (acc.Ponds || 0) + curr.Ponds,
      No_of_Households_with_Meters:
        (acc.No_of_Households_with_Meters || 0) +
        curr.No_of_Households_with_Meters,

      Sites_with_Rainwater_Harvesting_System:
        (acc.Sites_with_Rainwater_Harvesting_System || 0) +
        curr.Sites_with_Rainwater_Harvesting_System,
      Total_Volume_Harvested:
        (acc.Total_Volume_Harvested || 0) + curr.Total_Volume_Harvested,
    };
  }, {});

  // Determine which values to display
  const displayValues =
    selectedZone === "All Zones" ? totalValues : filteredData[0];

  const zones = [...new Set(data.map((item) => item.Divisions))];
  const years = [...new Set(data.map((item) => item.Year))];
  const months = [...new Set(data.map((item) => item.Month))];

  // Determine color based on calculated value
  const color =
    displayValues &&
    (
      ((((displayValues.Population * 135) / 1000000).toFixed(2) -
        displayValues.Current_Supply_MLD) /
        ((displayValues.Population * 135) / 1000000).toFixed(2)) *
      100
    ).toFixed(2) < 0
      ? "green"
      : "red";

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

  const waterUsage = { meteredConnections: 69.8, billPaymentRate: 37.8 };
  const waterTreatment = {
    reusedPercent: 83.04,
    totalSTPs: 1,
    capacity: { current: 12, required: 109.95 },
  };

  const handleToggleRecommendations = () => {
    setRecommendationsVisible((prev) => !prev);
  };
  return (
    <div className="w-full p-4 flex gap-3 flex-column">
      {show && (
        <div className="flex align-items-center justify-content-center w-full">
          <div className="w-full">
            <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
              Water Management
            </h1>
          </div>

          <div className="flex align-items-center justify-content-center flex-row gap-2 w-full">
            <div className="flex align-items-center justify-content-center gap-2 ">
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
                options={years.map((year) => ({ label: year, value: year }))}
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
            <div className="flex align-items-center justify-content-center gap-2">
              <Button label="Upload File" onClick={showUploadDialog} />
              <Upload visible={uploadDialogVisible} onHide={hideUploadDialog} />
              <Button
                label="Generate Report"
                icon="pi pi-file"
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
                <WaterReportPrint show={false} />
              </Dialog>
            </div>
          </div>
        </div>
      )}
      {displayValues && (
        <div className="flex  align-items-center justify-content-between gap-3 flex-row w-full">
          <div className="flex flex-column align-items-center justify-content-between gap-3 w-full">
            <div className="w-full flex gap-3">
              {/* Water Supply */}

              <div
                className="flex flex-column gap-3 p-4 border-round bg-white"
                style={{ flex: "45%" }}
              >
                <p className="card-title p-0 m-0">Water Supply</p>

                <div className="flex my-2">
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                      {displayValues.Current_Supply_MLD}
                      <span className="text-lg"> MLD</span>
                    </p>
                    <p className="p-0 m-0  card-text">Current Water Supply</p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                      {((displayValues.Population * 135) / 1000000).toFixed(2)}{" "}
                      <span className="text-lg">MLD</span>
                    </p>
                    <p className="p-0 m-0 card-text">Required Water Supply</p>
                  </div>
                </div>

                <ProgressBar
                  value={
                    ((((displayValues.Population * 135) / 1000000).toFixed(2) -
                      displayValues.Current_Supply_MLD) /
                      ((displayValues.Population * 135) / 1000000).toFixed(2)) *
                    100
                  }
                  style={{ height: "0.75rem" }} // Adjust the height
                  className="w-full" // Full width of its container
                  color={color}
                  displayValueTemplate={() => null} // Hide the displayed value
                />
                <p className="text-tertiary3 p-0 m-0 font-semibold">
                  Deficit:{" "}
                  <span className="text-primary1">
                    {" "}
                    {(
                      ((((displayValues.Population * 135) / 1000000).toFixed(
                        2
                      ) -
                        displayValues.Current_Supply_MLD) /
                        ((displayValues.Population * 135) / 1000000).toFixed(
                          2
                        )) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </p>
              </div>

              {/* Sources of Water Supply */}
              <div
                className="flex flex-column justify-content-start bg-white border-round p-4 gap-3 w-full"
                style={{ flex: "30%" }}
              >
                <div className="flex flex-column w-full gap-3">
                  <p className="card-title p-0 m-0">Water Supply Sources</p>
                  <div className="flex">
                    <div className="flex w-full px-2 flex-column">
                      <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                        {displayValues.Handpumps}
                      </p>
                      <p className="p-0 m-0 card-text">Handpumps</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex w-full px-2 flex-column">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        {displayValues.Tanks}
                      </p>
                      <p className="p-0 m-0 card-text">Tanks</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex w-full px-2 flex-column">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        {displayValues.Ponds}
                      </p>
                      <p className="p-0 m-0 card-text">Ponds</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex w-full px-2 flex-column">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        1
                      </p>
                      <p className="p-0 m-0 card-text">Rivers</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex w-full px-2 flex-column">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        {displayValues.Canals}
                      </p>
                      <p className="p-0 m-0 card-text">Canals</p>
                    </div>
                  </div>
                </div>
                {/* Households with Water Supply */}
                <div className="flex sec-theme gap-2 p-4 flex-column border-round align-items-center justify-content-center w-full">
                  <ProgressBar
                    value={(
                      (displayValues.No_of_Households_with_Connections /
                        displayValues.Total_Households) *
                      100
                    ).toFixed(2)}
                    style={{ height: "1rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color="#166c7d"
                    //  displayValueTemplate={() => null} // Hide the displayed value
                  />
                  {/* <GaugeChart
            // title="Water Connections"
            gaugeValue={79.58}
            maxValue={100}
            height={100}
          /> */}
                  <p className="p-0 m-0 card-text">
                    Households with Water Connections
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3">
              {/* Water Usage Management */}
              <div
                className="flex flex-column bg-white border-round p-4 gap-3"
                style={{ flex: "40%" }}
              >
                <p className="card-title p-0 m-0 text-left">
                  Water Usage Management
                </p>
                <div className="flex gap-3">
                  <div className="flex flex-column sec-theme border-round p-4 gap-2 align-items-center w-full">
                    <div className="flex w-8rem custom-circular-progress">
                      <CircularProgressbar
                        value={
                          (displayValues.No_of_Households_with_Meters /
                            displayValues.No_of_Households_with_Connections) *
                          100
                        }
                        text={`${
                          (displayValues.No_of_Households_with_Meters /
                            displayValues.No_of_Households_with_Connections) *
                          100
                        }%`}
                        strokeWidth={8}
                        styles={buildStyles({
                          pathColor: "#166c7d",
                          textColor: "#001F23",
                          trailColor: "#E7EAEA",
                          textSize: "1.5rem",
                          pathTransition: "stroke-dashoffset 0.5s ease 0s",
                          transform: "rotate(2.25turn)",
                        })}
                      />
                    </div>
                    <p className="p-0 m-0 card-text text-center">
                      {/* Houses with Connections but no Water Meter */}
                      Houses with Metered Connections
                    </p>
                  </div>
                  <div className="flex flex-column sec-theme border-round p-4 gap-2 align-items-center w-full">
                    <div className="flex w-8rem custom-circular-progress">
                      <CircularProgressbar
                        value={waterUsage.billPaymentRate}
                        text={`${waterUsage.billPaymentRate}%`}
                        strokeWidth={8}
                        styles={buildStyles({
                          pathColor: "#E62225",
                          textColor: "#001F23",
                          trailColor: "#E7EAEA",
                          textSize: "1.5rem",
                          pathTransition: "stroke-dashoffset 0.5s ease 0s",
                          transform: "rotate(2.25turn)",
                        })}
                      />
                    </div>
                    <p className="text-center p-0 m-0 card-text">
                      Bill Payment Rate
                      {/* Total Bill Generated being Paid */}
                    </p>
                  </div>
                </div>
              </div>
              {/* Water Treatment */}
              <div
                className="flex flex-column bg-white border-round p-4 gap-3"
                style={{ flex: "35%" }}
              >
                <p className="card-title p-0 m-0">Water Treatment</p>
                <div className="flex align-items-start justify-content-around">
                  <div className="flex flex-column align-items-center">
                    <Knob
                      value={waterTreatment.reusedPercent}
                      valueTemplate={"{value}%"}
                      readOnly
                      size={120}
                      strokeWidth={6}
                      valueColor="#166c7d"
                      rangeColor="#E9F3F5"
                    />
                    <p className="p-0 card-text" style={{ marginTop: -10 }}>
                      Treated Reused Water
                    </p>
                  </div>
                  <div className="flex flex-column gap-2">
                    <div
                      className="flex flex-column w-full p-2 pr-4 sec-theme gap-2"
                      style={{
                        borderLeft: "3px solid #1F8297", // Adjust thickness and color
                        height: "50px", // Adjust height
                      }}
                    >
                      <p className="p-0 m-0 card-text">Total STPs</p>
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                        {waterTreatment.totalSTPs}
                      </p>
                    </div>
                    <div
                      className="flex flex-column w-full p-2 pr-4 sec-theme"
                      style={{
                        borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                        // height: "120px", // Adjust height
                      }}
                    >
                      <p className="mb-2 p-0 m-0 card-text">Capacity</p>
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                        {waterTreatment.capacity.current} <span>MLD</span>
                      </p>
                      <p className="text-sm text-center p-0 m-0 card-text">
                        Current
                      </p>
                      <Divider />
                      <p className="text-2xl font-semibold m-0 text-primary2 p-0 text-center">
                        {waterTreatment.capacity.required} <span>MLD</span>
                      </p>
                      <p className="text-sm text-center p-0 m-0 card-text">
                        Required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3">
              {/* Water Preservation */}
              <div
                className="flex flex-column bg-white border-round p-4 gap-3"
                style={{ flex: "25%" }}
              >
                <p className="card-title p-0 m-0">Water Preservation</p>
                <div className="flex flex-column align-items-center justify-content-center">
                  <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                      {displayValues.Total_Volume_Harvested}
                      <span className="text-xl"> m&sup3;</span>
                    </p>
                    <p className="p-0 m-0 card-text text-sm">
                      Total Volume Harvested
                    </p>
                  </div>
                  <Divider />
                  <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                    <p className="text-xl font-semibold m-0 text-primary2 p-0">
                      {displayValues.Sites_with_Rainwater_Harvesting_System}
                    </p>
                    <p className="p-0 m-0 card-text text-sm">
                      Sites with Rainwater Harvesting System
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-column bg-white border-round p-4 gap-3"
                style={{ flex: "25%" }}
              >
                <p className="card-title p-0 m-0">
                  Awarness Campaigns/Programs
                </p>
                <div className="flex flex-column align-items-center justify-content-center">
                  <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-1">
                    <p className="text-xl font-semibold m-0 text-secondary2 p-0 text-3xl">
                      {displayValues.Awarness_Campaigns_Programs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-column align-items-center justify-content-between gap-3 w-full">
            <Card className="w-full">
              <MapContainer
                center={[26.8, 82.2]}
                zoom={10}
                style={{ height: "20rem", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {selectedZone !== "All Zones" && (
                  <GeoJSON
                    key={selectedZone}
                    data={geoData}
                    style={style(displayValues.WQI)}
                    onEachFeature={(feature, layer) => {
                      layer.bindTooltip(`
                                <strong>Zone:</strong> ${
                                  displayValues.Divisions
                                }<br/>
                                <strong>Temperature:</strong> ${
                                  displayValues.Temperature
                                }°C<br/>
                                <strong>WQI:</strong> ${displayValues.WQI}<br/>
                                <strong>BOD:</strong> ${
                                  displayValues.BOD
                                } mg/L<br/>
                                <strong>DO:</strong> ${
                                  displayValues.DO
                                } mg/L<br/>
                                   <strong>TSS:</strong> ${
                                     displayValues.TSS
                                   } mg/L<br/>
                                <strong>Conductivity:</strong> ${
                                  displayValues.Conductivity
                                } µS<br/>
                             
                                
                                <strong>Samples Tested:</strong> ${
                                  displayValues.Number_of_Sample_Tested_in_Laboratories
                                }<br/>
                                <strong>Contaminated Samples:</strong> ${(
                                  (displayValues.Number_of_Samples_found_contaminated_in_laboratories /
                                    displayValues.Number_of_Sample_Tested_in_Laboratories) *
                                  100
                                ).toFixed(2)} %<br/>
                                <strong>Testing Stations:</strong> ${
                                  displayValues.Number_of_Testing_Stations
                                }
                            `);
                    }}
                  />
                )}
                {selectedZone === "All Zones" &&
                  Object.keys(zoneWQIValues).map((zone) => (
                    <GeoJSON
                      key={zone}
                      data={divisionsWithLocations[zone]}
                      style={style(zoneWQIValues[zone].WQI)}
                      onEachFeature={(feature, layer) => {
                        layer.bindTooltip(`
                                <strong>Zone:</strong> ${zone}<br/>
                                <strong>WQI:</strong> ${zoneWQIValues[zone].WQI}<br/>
                                  <strong>Temperature:</strong> ${zoneWQIValues[zone].Temperature}°C<br/>
                                <strong>BOD:</strong> ${zoneWQIValues[zone].BOD} mg/L<br/>
                                <strong>DO:</strong> ${zoneWQIValues[zone].DO} mg/L<br/>
                                <strong>TSS:</strong> ${zoneWQIValues[zone].TSS} mg/L<br/>
                                <strong>Conductivity:</strong> ${zoneWQIValues[zone].Conductivity} µS<br/>
                                
                              
                                <strong>Samples Tested:</strong> ${zoneWQIValues[zone].Number_of_Sample_Tested_in_Laboratories}<br/>
                                <strong>Contaminated Samples:</strong> ${zoneWQIValues[zone].Number_of_Samples_found_contaminated_in_laboratories}<br/>
                                <strong>Testing Stations:</strong> ${zoneWQIValues[zone].Number_of_Testing_Stations}
                            `);
                      }}
                    />
                  ))}
              </MapContainer>
              <Legend />
            </Card>
            <Card className="w-full">
              <div>
                <p className="card-title p-0 m-0">Insights</p>
                <ul>
                  <li>
                    The projected demand of 54 MLD exceeds the current supply
                    capacity of 39.55 MLD by ~14.45 MLD. This indicates a
                    critical need to expand water supply infrastructure.
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      )}
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      {show && (
        <Panel
          toggleable
          onToggle={handleToggleRecommendations}
          headerTemplate={(options) => {
            const toggleIcon = recommendationsVisible
              ? "pi pi-chevron-up"
              : "pi pi-chevron-down";
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
          {recommendationsVisible && <WaterRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default WaterDashboard;
