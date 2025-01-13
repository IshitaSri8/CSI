import React from "react";
import { Knob } from "primereact/knob";
import WaterRecommendations from "./WaterRecommendations";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState } from "react";
import { Divider } from "primereact/divider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { ProgressBar } from "primereact/progressbar";
import { useEffect } from "react";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import workshop from "assets/workshop.svg";
import L from "leaflet"; // Import Leaflet for custom icons
import markerIcon from "./location.svg";
import Upload from "../../../DashboardUtility/Popups/Upload";
import civil_lines from "assets/GeoJson_Zone/1_Ayodhya_Civil_line_Tiny_tots.json";
import shahadatganj from "assets/GeoJson_Zone/5_Ayodhya_Shahadat_Ganj.json";
import ranopali from "assets/GeoJson_Zone/2_Ayodhya_Ranopali.json";
import bank_colony from "assets/GeoJson_Zone/3_Ayodhya_Bank_colony.json";
import airport from "assets/GeoJson_Zone/4_Ayodhya_near_Airport.json";
import all_locations from "assets/GeoJson_Zone/Zone_Boundary_Merge.json";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Tooltip,
} from "react-leaflet";
import { Card } from "primereact/card";
import ADA from "./ADA_Boundary.json";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import { InputText } from "primereact/inputtext";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";

const WaterDashboard = ({ show }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [geoData, setGeoData] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [zoneWQIValues, setZoneWQIValues] = useState({});
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  // New state variables for temporary filter selection
  const [tempZone, setTempZone] = useState("All Zones");
  const [tempYear, setTempYear] = useState(2024);
  const [tempMonth, setTempMonth] = useState(1);
  const [editDialog, setEditDialog] = useState(false);
  const [modifyDialog, setModifyDialog] = useState(false);
  const handleModify = () => {
    setModifyDialog(true);
  };
  const handleEdit = () => {
    const itemToEdit = data.find(
      (item) =>
        item.Divisions === selectedZone &&
        item.Year === selectedYear &&
        item.Month === selectedMonth
    );
    if (itemToEdit) {
      setSelectedData(itemToEdit);

      setEditDialog(true);
    } else {
      alert("No data found for the selected filters.");
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://api-csi.arahas.com/data/water/${selectedData._id}`,
        selectedData,
        { headers: { "Content-Type": "application/json" } } // Specify content type if necessary
      );

      if (response.data.success) {
        setModifyDialog(false);
        setEditDialog(false);
        alert("Data updated successfully");
        setData((prevData) =>
          prevData.map((item) =>
            item._id === response.data.data._id ? response.data.data : item
          )
        );
      }
    } catch (error) {
      console.error("Error saving data:", error); // Log error for debugging
      alert(
        error.response
          ? error.response.data.error
          : "An unexpected error occurred"
      );
    }
  };
  useEffect(() => {
    setFilterVisible(false);
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
  // Function to apply filters
  const handleApply = () => {
    setSelectedZone(tempZone);
    setSelectedYear(tempYear);
    setSelectedMonth(tempMonth);
    setFilterVisible(false); // Close filter dialog after applying
    // Fetch data based on new selections if necessary
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
    fetchData(); // Uncomment if you want to refetch data
  };
  const customIcon = L.icon({
    iconUrl: markerIcon, // Path to your custom marker image
    iconSize: [20, 30], // Size of the icon
    iconAnchor: [18, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  });

  // Function to reset filters
  const resetFilters = () => {
    setTempZone("All Zones");
    setTempYear(2024);
    setTempMonth(1);
    // Optionally reset selected values too
    setSelectedZone("All Zones");
    setSelectedYear(2024);
    setSelectedMonth(1);
  };
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
    if (WQI >= 0 && WQI <= 25) return "#FF7777";
    else return "black"; // Poor (0-25)
  };

  const Legend = () => {
    return (
      <div className="legend flex align-items-start justify-content-around ">
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
  }, [selectedZone]);

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
      Households_Bill_Payment:
        (acc.Households_Bill_Payment || 0) + curr.Households_Bill_Payment,
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
      ? "0C9D61"
      : "#E62225";

  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };
  const handleZoneChange = (e) => {
    setTempZone(e.value);

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

  const waterTreatment = {
    reusedPercent: 83.04,
    totalSTPs: 1,
    capacity: { current: 12, required: 109.95 },
  };

  const renderRecommendations = () => {
    return <WaterRecommendations />;
  };

  const renderDashboard = () => {
    return <WaterDashboard show={false} />;
  };

  return (
    <div className="w-full p-3 flex gap-3 flex-column">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Water Management
          </h1>

          <div className="flex align-items-center justify-content-end gap-2">
            <Button icon="pi pi-plus" onClick={showUploadDialog} raised />
            <Upload
              visible={uploadDialogVisible}
              onHide={hideUploadDialog}
              parameter={"water"}
            />
            <Button icon="pi pi-file-edit" onClick={handleModify} raised />
            <Dialog
              header="Modify Data"
              visible={modifyDialog}
              style={{ width: "55rem" }}
              onHide={() => setModifyDialog(false)}
            >
              <div className="flex align-items-center justify-content-start gap-2 flex-row">
                <Dropdown
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.value)}
                  options={[
                    // Use null or a specific value to indicate 'All Zones'
                    ...zones.map((div) => ({ label: div, value: div })),
                  ]}
                  placeholder="Select Division"
                  className="w-full md:w-14rem"
                />
                <Dropdown
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.value)}
                  options={years.map((year) => ({ label: year, value: year }))}
                  placeholder="Select Year"
                  className="w-full md:w-14rem"
                />
                {/*  */}
                <Dropdown
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.value)}
                  options={months.map((month) => ({
                    label: month,
                    value: month,
                  }))}
                  placeholder="Select Month"
                  className="w-full md:w-14rem"
                />
                <Button label="Edit Data" onClick={handleEdit} />
                {/**/}
              </div>
            </Dialog>
            <Dialog
              header={
                <h2 style={{ margin: 0, textAlign: "center" }}>Edit Data</h2>
              }
              visible={editDialog}
              style={{ width: "80rem" }}
              onHide={() => setEditDialog(false)}
            >
              <div className="flex align-items-center justify-content-around flex-row gap-2">
                <h1 className="text-base m-0 p-0">Zone: {selectedZone}</h1>
                <h1 className="text-base m-0 p-0">Year: {selectedYear}</h1>
                <h1 className="text-base m-0 p-0">Month: {selectedMonth}</h1>
              </div>

              <div style={{ padding: "20px" }}>
                {/* Table 1: Water Supply Data */}
                <h3>Water Supply Data</h3>
                <table className="p-table">
                  <tbody>
                    {["Population", "Current_Supply_MLD"].map(
                      (field, index) => (
                        <tr key={index}>
                          <td>{field}</td>
                          <td>
                            <InputText
                              id={field.toLowerCase()}
                              value={selectedData?.[field]}
                              onChange={(e) =>
                                setSelectedData({
                                  ...selectedData,
                                  [field]: e.target.value,
                                })
                              }
                              placeholder={`Enter ${field.toLowerCase()}`}
                              type={field === "Population" ? "number" : "text"}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {/* Table 2: Infrastructure Data */}
                <h3>Infrastructure Data</h3>
                <table className="p-table">
                  <tbody>
                    {["Canals", "Tanks", "Ponds", "Handpumps"].map(
                      (field, index) => (
                        <tr key={index}>
                          <td>{field}</td>
                          <td>
                            <InputText
                              id={field.toLowerCase()}
                              value={selectedData?.[field]}
                              onChange={(e) =>
                                setSelectedData({
                                  ...selectedData,
                                  [field]: e.target.value,
                                })
                              }
                              placeholder={`Enter ${field.toLowerCase()}`}
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>

                {/* Table 3: Household Data */}
                <h3>Household Data</h3>
                <table className="p-table">
                  <tbody>
                    {[
                      "Total_Households",
                      "No_of_Households_with_Connections",
                      "No_of_Households_with_Meters",
                      "Households_Bill_Payment",
                    ].map((field, index) => (
                      <tr key={index}>
                        <td>{field}</td>
                        <td>
                          <InputText
                            id={field.toLowerCase()}
                            value={selectedData?.[field]}
                            onChange={(e) =>
                              setSelectedData({
                                ...selectedData,
                                [field]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${field.toLowerCase()}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table 4: Water Reuse and Drainage Data */}
                {/* <h3>Water Reuse and Drainage Data</h3>
                <table className="p-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Total_Reused_Water",
                      "No_of_Tapped_Drains",
                      "No_of_Untapped_Drains",
                    ].map((field, index) => (
                      <tr key={index}>
                        <td>{field}</td>
                        <td>
                          <InputText
                            id={field.toLowerCase()}
                            value={selectedData?.[field]}
                            onChange={(e) =>
                              setSelectedData({
                                ...selectedData,
                                [field]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${field.toLowerCase()}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}

                {/* Table 5: Rainwater Harvesting Data */}
                <h3>Rainwater Harvesting Data</h3>
                <table className="p-table">
                  <tbody>
                    {[
                      "Sites_with_Rainwater_Harvesting_System",
                      "Total_Volume_Harvested",
                    ].map((field, index) => (
                      <tr key={index}>
                        <td>{field}</td>
                        <td>
                          <InputText
                            id={field.toLowerCase()}
                            value={selectedData?.[field]}
                            onChange={(e) =>
                              setSelectedData({
                                ...selectedData,
                                [field]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${field.toLowerCase()}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table 6: Maintenance and Awareness Programs */}
                <h3>Awareness Programs</h3>
                <table className="p-table">
                  <tbody>
                    {[
                      "Awareness_Campaigns_Programs",
                      // "Pipeline_Length",
                      // "Maintenance_Status",
                      // "Percentage_of_water_lost_due_to_leaks",
                    ].map((field, index) => (
                      <tr key={index}>
                        <td>{field}</td>
                        <td>
                          {/* Use number type where applicable */}
                          {field === "Percentage_of_water_lost_due_to_leaks" ? (
                            <InputText
                              id={field.toLowerCase()}
                              value={selectedData?.[field]}
                              onChange={(e) =>
                                setSelectedData({
                                  ...selectedData,
                                  [field]: e.target.value,
                                })
                              }
                              placeholder={`Enter ${field.toLowerCase()}`}
                              type="number"
                            />
                          ) : (
                            <InputText
                              id={field.toLowerCase()}
                              value={selectedData?.[field]}
                              onChange={(e) =>
                                setSelectedData({
                                  ...selectedData,
                                  [field]: e.target.value,
                                })
                              }
                              placeholder={`Enter ${field.toLowerCase()}`}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table 7: Water Quality Testing */}
                <h3>Water Quality Testing Data</h3>
                <table className="p-table">
                  <tbody>
                    {[
                      "Number_of_Testing_Stations",
                      "Number_of_Sample_Tested_in_Laboratories",
                      "Number_of_Samples_found_contaminated_in_laboratories",
                      "Temperature",
                      "BOD",
                      "TSS",
                      "DO",
                      "Conductivity",
                      "WQI",
                    ].map((field, index) => (
                      <tr key={index}>
                        <td>{field}</td>
                        <td>
                          <InputText
                            id={field.toLowerCase()}
                            value={selectedData?.[field]}
                            onChange={(e) =>
                              setSelectedData({
                                ...selectedData,
                                [field]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${field.toLowerCase()}`}
                            type="number"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  label="Save"
                  onClick={handleSave}
                  style={{ marginTop: "20px" }}
                />
              </div>
            </Dialog>
            <Button
              label="Filters"
              icon="pi pi-filter"
              onClick={() => setFilterVisible(!filterVisible)}
              className="bg-white text-secondary2"
              raised
            />
            {filterVisible && (
              <div
                className="absolute bg-white border-round-2xl shadow-lg p-3 w-30 mt-2 "
                style={{
                  zIndex: 1000, // Ensures the filter appears above other components
                  position: "absolute", // Required for z-index to work
                  transform: "translateY(60%) translateX(-60%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex flex-column gap-3">
                  <div className="flex flex-column align-items-center justify-content-center gap-2 ">
                    <Dropdown
                      value={tempZone}
                      onChange={handleZoneChange}
                      options={[
                        { label: "All Zones", value: "All Zones" }, // Use null or a specific value to indicate 'All Zones'
                        ...zones.map((div) => ({ label: div, value: div })),
                      ]}
                      placeholder="Select Zones"
                      className="w-full"
                    />
                    <Dropdown
                      value={tempYear}
                      onChange={(e) => setTempYear(e.value)}
                      options={years.map((year) => ({
                        label: year,
                        value: year,
                      }))}
                      placeholder="Select Year"
                      className="w-full"
                    />
                    <Dropdown
                      value={tempMonth}
                      onChange={(e) => setTempMonth(e.value)}
                      options={months.map((month) => ({
                        label: month,
                        value: month,
                      }))}
                      placeholder="Select Month"
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-content-between">
                    <Button
                      className="bg-white text-moderate border-none"
                      label="Reset"
                      icon="pi pi-undo"
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
              tooltip="Generate Report"
              icon="pi pi-file"
              onClick={() => setReportVisible(true)}
              className="bg-primary1 text-white"
              tooltipOptions={{
                position: "bottom",
              }}
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
                parameter={"water"}
                heading={"Water Management"}
              />
            </Dialog>
          </div>
        </div>
      )}
      {displayValues && (
        <div className="flex  align-items-center justify-content-between gap-3 flex-row w-full">
          <div
            className="flex flex-column align-items-center justify-content-between gap-3 w-full"
            style={{ flex: "65%" }}
          >
            <div className="w-full flex gap-3">
              {/* Water Supply */}
              <div
                className="flex flex-column gap-3 p-3 border-round bg-white"
                style={{ flex: "45%" }}
              >
                <p className="card-title p-0 m-0">Water Supply</p>

                <div className="flex my-2">
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      {displayValues.Current_Supply_MLD}
                      <span className="text-lg"> MLD</span>
                    </p>
                    <p className="p-0 m-0  card-text text-sm">
                      Current Water Supply
                    </p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                      {((displayValues.Population * 135) / 1000000).toFixed(2)}{" "}
                      <span className="text-lg">MLD</span>
                    </p>
                    <p className="p-0 m-0 card-text text-sm">
                      Required Water Supply
                    </p>
                  </div>
                  {selectedZone === "All Zones" && (
                    <>
                      <Divider layout="vertical" />
                      <div className="flex flex-column w-full p-2 align-items-center gap-1">
                        <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                          {((1194206 * 135) / 1000000).toFixed(2)}{" "}
                          <span className="text-lg">MLD</span>
                        </p>
                        <p className="p-0 m-0 card-text text-sm">
                          Predicted Demand by 2031
                        </p>
                      </div>
                    </>
                  )}
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
                  Current Deficit:{" "}
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

              <div className="flex flex-column gap-3">
                {/* Sources of Water Supply */}
                <div className="flex flex-column justify-content-start bg-white border-round p-3 gap-3 w-full">
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
                <div className="flex sec-theme gap-2 p-3 flex-column border-round align-items-center justify-content-center w-full">
                  <ProgressBar
                    value={(
                      (displayValues.No_of_Households_with_Connections /
                        displayValues.Total_Households) *
                      100
                    ).toFixed(2)}
                    style={{ height: "0.75rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color={color}
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="text-tertiary3 p-0 m-0 font-semibold text-align-left w-full">
                    Households with Water Connections:{" "}
                    <span className="text-primary1">
                      {(
                        (displayValues.No_of_Households_with_Connections /
                          displayValues.Total_Households) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex gap-3">
              {/* Water Usage Management */}
              <div className="flex flex-column bg-white border-round p-4 gap-3 w-full">
                <p className="card-title p-0 m-0 text-left">
                  Water Usage Management
                </p>
                <div className="flex gap-3">
                  <div className="flex flex-column sec-theme border-round p-3 gap-2 align-items-center w-full">
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
                  <div className="flex flex-column sec-theme border-round p-3 gap-2 align-items-center w-full">
                    <div className="flex w-8rem custom-circular-progress">
                      <CircularProgressbar
                        value={(
                          100 -
                          (displayValues.Households_Bill_Payment /
                            displayValues.No_of_Households_with_Meters) *
                            100
                        ).toFixed(2)}
                        text={`${(
                          100 -
                          (displayValues.Households_Bill_Payment /
                            displayValues.No_of_Households_with_Meters) *
                            100
                        ).toFixed(2)}%`}
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
                      Due Payment Rate
                      {/* Total Bill Generated being Paid */}
                    </p>
                    <p className="text-center p-0 m-0 card-text text-xs">
                      Target: 15%
                    </p>
                  </div>
                </div>
              </div>
              {/* Water Treatment */}
              <div className="flex flex-column bg-white border-round p-4 gap-3 w-full">
                <p className="card-title p-0 m-0">Water Treatment</p>
                <div className="flex align-items-start justify-content-around">
                  <div className="flex flex-column align-items-center">
                    <Knob
                      value={waterTreatment.reusedPercent}
                      valueTemplate={"{value}%"}
                      readOnly
                      size={130}
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
                className="flex flex-column bg-white border-round p-3 gap-3"
                style={{ flex: "25%" }}
              >
                <p className="card-title p-0 m-0">Water Preservation</p>
                <div className="flex flex-row align-items-center justify-content-center">
                  <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-2">
                    <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                      {displayValues.Total_Volume_Harvested}
                      <span className="text-2xl p-0 m-0"> m&sup3;</span>
                    </p>
                    <p className="p-0 m-0 card-text text-center w-full">
                      Total Volume Harvested
                    </p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full p-2 align-items-center justify-content-center gap-2">
                    <p className="text-4xl font-semibold m-0 text-primary2 p-0 text-center w-full">
                      {displayValues.Sites_with_Rainwater_Harvesting_System}
                    </p>
                    <p className="p-0 m-0 card-text text-center w-full">
                      Sites with Rainwater Harvesting System
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="flex flex-column bg-white border-round p-3 gap-3"
                style={{ flex: "25%" }}
              >
                <p className="card-title p-0 m-0">
                  Awarness Campaigns/Programs
                </p>
                <div className="flex w-full align-items-center justify-content-around gap-1">
                  <p className="text-4xl font-semibold m-0 text-secondary2 p-0">
                    {displayValues.Awarness_Campaigns_Programs}
                  </p>
                  <img src={workshop} alt="workshop" className="w-10rem" />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex flex-column align-items-center justify-content-between gap-3 w-full"
            style={{ flex: "35%" }}
          >
            <div className="flex flex-column bg-white border-round p-3 gap-3 w-full">
              <p className="card-title p-0 m-0">Water Quality Index</p>
              <MapContainer
                center={[26.8, 82.2]}
                zoom={10}
                style={{ height: "30rem", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {selectedZone === "All Zones" &&
                  Object.keys(zoneWQIValues).map((zone) => (
                    <>
                      <h1>Zone:{zone}</h1>
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
                    </>
                  ))}

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
                <Marker position={[26.779664, 82.224486]} icon={customIcon}>
                  <Tooltip>
                    <span>
                      Ramghat Sewage Treatment Plant
                      <br />
                      Capacity: 12 MLD
                    </span>
                  </Tooltip>
                </Marker>
              </MapContainer>

              <Legend />
            </div>
            <div className="flex flex-column bg-white border-round p-3 gap-3 w-full">
              <div className="flex flex-column gap-2">
                <p className="card-title p-0 m-0">Insights</p>
                <div className="flex flex-column align-items-start justify-content-start gap-2">
                  {selectedZone === "All Zones" && (
                    <div className="flex gap-2 align-items-start">
                      <i
                        className="pi pi-circle-fill text-primary2"
                        style={{ fontSize: "0.45rem", marginTop: "0.3rem" }}
                      ></i>
                      <h1 className="p-0 m-0 text-primary2 font-medium">
                        By 2031, the projected demand of{" "}
                        <span className="m-0 p-0 font-semibold">
                          {" "}
                          {((1194206 * 135) / 1000000).toFixed(2)} MLD
                        </span>{" "}
                        exceeds the current supply capacity of{" "}
                        <span className="m-0 p-0 font-semibold">
                          {displayValues.Current_Supply_MLD} MLD
                        </span>{" "}
                        by{" "}
                        <span className="m-0 p-0 font-semibold text-red-500">
                          {((1194206 * 135) / 1000000).toFixed(2) -
                            displayValues.Current_Supply_MLD}{" "}
                          MLD
                        </span>
                        . This indicates a critical need to expand water supply
                        infrastructure.
                      </h1>
                    </div>
                  )}
                  <div className="flex gap-2 align-items-start">
                    <i
                      className="pi pi-circle-fill text-primary2"
                      style={{ fontSize: "0.45rem", marginTop: "0.3rem" }}
                    ></i>
                    <h1 className="p-0 m-0 text-primary2 font-medium">
                      There is already a deficit of{" "}
                      <span className="p-0 m-0 text-red-500 font-semibold">
                        {(
                          (displayValues.Population * 135) / 1000000 -
                          displayValues.Current_Supply_MLD
                        ).toFixed(2)}{" "}
                        MLD
                      </span>{" "}
                      in water supply, which will worsen with population growth.
                    </h1>
                  </div>
                  {selectedZone === "All Zones" && (
                    <>
                      <div className="flex gap-2 align-items-start">
                        <i
                          className="pi pi-circle-fill text-primary2"
                          style={{ fontSize: "0.45rem", marginTop: "0.3rem" }}
                        ></i>
                        <h1 className="p-0 m-0 text-primary2 font-medium">
                          Without proper infrastructure upgrades, per capita
                          water availability will drop to{" "}
                          <span className="m-0 p-0 font-semibold text-red-500">
                            {(
                              (displayValues.Current_Supply_MLD * 1000000) /
                              1194206
                            ).toFixed(2)}{" "}
                            L/day/person
                          </span>
                          , well below the recommended{" "}
                          <span className="m-0 p-0 font-semibold">
                            135 L/day/person
                          </span>
                          , leading to severe water stress.
                        </h1>
                      </div>
                      <div className="flex gap-2 align-items-start">
                        <i
                          className="pi pi-circle-fill text-primary2"
                          style={{ fontSize: "0.45rem", marginTop: "0.3rem" }}
                        ></i>
                        <div className="flex flex-column gap-1">
                          <h1 className="p-0 m-0 text-primary2 font-medium">
                            The existing treatment plant is severely under
                            capacity, with only{" "}
                            <span className="m-0 p-0 font-semibold">
                              {(
                                ((12 * 0.9) /
                                  (displayValues.Current_Supply_MLD * 0.8)) *
                                100
                              ).toFixed(2)}
                              %
                            </span>{" "}
                            of wastewater treated. This indicates an urgent need
                            to enhance sewerage infrastructure to prevent
                            environmental hazards.
                          </h1>
                          <p className="p-0 m-0 text-primary2 font-medium text-sm">
                            (Assuming water input to STP is 80% and STP
                            efficiency of 90%.)
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 align-items-start">
                        <i
                          className="pi pi-circle-fill text-primary2"
                          style={{ fontSize: "0.45rem", marginTop: "0.3rem" }}
                        ></i>
                        <h1 className="p-0 m-0 text-primary2 font-medium">
                          By 2031, the required sewerage treatment capacity will
                          increase to{" "}
                          <span className="m-0 p-0 font-semibold text-red-500">
                            {" "}
                            {(((1194206 * 135) / 1000000) * 0.8).toFixed(2)} MLD
                          </span>
                          , far exceeding the current capacity of{" "}
                          <span className="m-0 p-0 font-semibold">12 MLD</span>.
                          An approximate{" "}
                          <span className="m-0 p-0 font-semibold text-red-500">
                            {(
                              (((1194206 * 135) / 1000000) * 0.8).toFixed(2) /
                              12
                            ).toFixed(0)}{" "}
                            times
                          </span>{" "}
                          increase in treatment capacity will be necessary.
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      <RecommendationPanel
        show={true}
        renderRecommendations={renderRecommendations}
      />
    </div>
  );
};

export default WaterDashboard;
