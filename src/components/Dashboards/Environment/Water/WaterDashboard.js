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
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import WaterModify from "./WaterModify";
import { ProgressSpinner } from "primereact/progressspinner";
import { useUser } from "components/context/UserContext";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import score from "score";
import DataNotFound from "pages/error pages/DataNotFound";

const WaterDashboard = ({ show }) => {
  const [loading, setLoading] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [ReportVisible, setReportVisible] = useState(false);
  const [data, setData] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    zone: "All Zones",
    year: 2024,
    month: 1,
  });
  const [geoData, setGeoData] = useState("");

  const [zoneWQIValues, setZoneWQIValues] = useState({});
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [tempZone, setTempZone] = useState("All Zones");
  const [tempYear, setTempYear] = useState(2024);
  const [tempMonth, setTempMonth] = useState(1);
  const [billColor, setBillColor] = useState();
  const [meteredConnectionColor, setMeteredConnectionColor] = useState();
  const [supplyColor, setSupplyColor] = useState();
  const [waterConnectionColor, setWaterConnectionColor] = useState();
  const [score, setScore] = useState("");
  const [displayValues, setDisplayValues] = useState("");

  const { username } = useUser();
  console.log("🚀 ~ WaterDashboard ~ username:", username);

  const handleApply = () => {
    setSelectedValues({
      zone: tempZone,
      year: tempYear,
      month: tempMonth,
    });
    overlayRef.current.hide();
  };
  const overlayRef = useRef(null); // Reference for OverlayPanel
  const menu = useRef(null); // Create a ref for the Menu component

  // Define menu items
  const items = [
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => showUploadDialog(), // Implement your upload logic here
    },
    {
      label: "Modify",
      icon: "pi pi-pencil",
      command: () => handleModify(), // Implement your modify logic here
    },
  ];
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
    setSelectedValues({
      zone: "All Zones",
      year: 2024,
      month: 1,
    });
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

  const colors = [
    "#E62225", // Poor
    "#F7A47A", // Fair
    "#FFAD0D", // Average
    "#A0D683", // Good
    "#0C9D61", // Excellent
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-csi.arahas.com/data/water"
        );
        const responseData = response.data.data;
        const filteredData_Year_Month = responseData.filter(
          (item) =>
            item.Year === selectedValues.year &&
            item.Month === selectedValues.month
        );
        console.log(filteredData_Year_Month);
        // Calculate total values if all zones are selected
        const totalValues_Year_Month = filteredData_Year_Month.reduce(
          (acc, curr) => {
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
              Total_Households:
                (acc.Total_Households || 0) + curr.Total_Households,
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
                (acc.Households_Bill_Payment || 0) +
                curr.Households_Bill_Payment,
              WQI: (acc.WQI || 0) + curr.WQI,
            };
          },
          {}
        );
        // Supply Score Calculation Start-----------------------------------------------------------
        const calculateScore = (percentage) => {
          if (percentage === 0) return 0;
          if (percentage > 0 && percentage < 25) return 20;
          if (percentage >= 25 && percentage < 50) return 40;
          if (percentage >= 50 && percentage < 75) return 60;
          if (percentage >= 75 && percentage < 95) return 80;
          return 100;
        };

        const waterConnectionPer = (
          (totalValues_Year_Month.No_of_Households_with_Connections /
            totalValues_Year_Month.Total_Households) *
          100
        ).toFixed(2);

        const waterSupplyPerCapitaPer =
          ((totalValues_Year_Month.Current_Supply_MLD * 1000000) /
            totalValues_Year_Month.Population /
            135) *
          100;
        const waterConnectionScore = calculateScore(waterConnectionPer);
        const waterSupplyPerCapitaScore = calculateScore(
          waterSupplyPerCapitaPer
        );
        const supplyScore =
          (waterConnectionScore + waterSupplyPerCapitaScore) / 2;
        // Supply Score Calculation End-----------------------------------------------------------------------------
        //  WQI Score Calculation Start----------------------------------------------
        const calculateScoreWQI = (wqi) => {
          if (wqi >= 0 && wqi < 25) return 0;
          if (wqi >= 25 && wqi < 50) return 25;
          if (wqi >= 50 && wqi < 75) return 50;
          if (wqi >= 70 && wqi < 90) return 75;
          return 100;
        };

        const avgWQI =
          totalValues_Year_Month.WQI / filteredData_Year_Month.length;

        const wqiScore = calculateScoreWQI(avgWQI);
        // WQI Score Calculation End----------------------------------------------------------------------
        // Water Usage Management Start------------------------------------------
        const perWaterMeters =
          (totalValues_Year_Month.No_of_Households_with_Meters /
            totalValues_Year_Month.No_of_Households_with_Connections) *
          100;
        const meterScore = calculateScore(perWaterMeters);
        const calculateScoreBillPayment = (rate) => {
          if (rate >= 0 && rate <= 15) return 100;
          if (rate > 15 && rate < 30) return 80;
          if (rate >= 30 && rate < 50) return 60;
          if (rate >= 50 && rate < 60) return 45;
          if (rate >= 60 && rate < 70) return 20;
          return 0;
        };
        const bill_payment =
          (totalValues_Year_Month.Households_Bill_Payment /
            totalValues_Year_Month.No_of_Households_with_Meters) *
          100;
        const billScore = calculateScoreBillPayment(bill_payment);
        const usageScore = (meterScore + billScore) / 2;
        //  Water Usage Management End-------------------------------------------
        setScore(supplyScore * 0.5 + wqiScore * 0.2 + usageScore * 0.3);
        const filteredData =
          selectedValues.zone === "All Zones"
            ? responseData.filter(
                (item) =>
                  item.Year === selectedValues.year &&
                  item.Month === selectedValues.month
              )
            : responseData.filter(
                (item) =>
                  item.Divisions === selectedValues.zone &&
                  item.Year === selectedValues.year &&
                  item.Month === selectedValues.month
              );

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
            Total_Households:
              (acc.Total_Households || 0) + curr.Total_Households,
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
          selectedValues.zone === "All Zones" ? totalValues : filteredData[0];

        // Determine color based on calculated value
        const waterConnectionColor =
          displayValues &&
          (
            (displayValues.No_of_Households_with_Connections /
              displayValues.Total_Households) *
            100
          ).toFixed(2) > 50
            ? "#0C9D61"
            : "#E62225";
        setWaterConnectionColor(waterConnectionColor);

        const supplyColor =
          displayValues &&
          (
            ((((displayValues.Population * 135) / 1000000).toFixed(2) -
              displayValues.Current_Supply_MLD) /
              ((displayValues.Population * 135) / 1000000).toFixed(2)) *
            100
          ).toFixed(2) < 10
            ? "#0C9D61"
            : "#E62225";
        setSupplyColor(supplyColor);

        const meteredConnectionColor =
          displayValues &&
          (displayValues.No_of_Households_with_Meters /
            displayValues.No_of_Households_with_Connections) *
            100 >
            50
            ? "#0C9D61"
            : "#E62225";
        setMeteredConnectionColor(meteredConnectionColor);

        const billColor =
          displayValues &&
          (
            100 -
            (displayValues.Households_Bill_Payment /
              displayValues.No_of_Households_with_Meters) *
              100
          ).toFixed(2) < 15
            ? "#166c7d"
            : "#E62225";
        setBillColor(billColor);

        setDisplayValues(displayValues);

        if (selectedValues.zone === "All Zones") {
          const wqiValues = {};
          filteredData.forEach((item) => {
            wqiValues[item.Divisions] = item; // Store entire item for tooltip access
          });
          setZoneWQIValues(wqiValues);
        } else {
          setZoneWQIValues({});
        }
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setServerDown(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedValues]);

  const zones = [...new Set(data.map((item) => item.Divisions))];
  const years = [...new Set(data.map((item) => item.Year))];

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
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [modifyDialogVisible, setModifyDialogVisible] = useState(false);

  const handleModify = () => {
    setModifyDialogVisible(true); // Set state to true when button is clicked
  };

  const handleCloseModifyDialog = () => {
    setModifyDialogVisible(false);
  };

  const getScoreColor = (scoreWATER) => {
    if (scoreWATER >= 90 && scoreWATER <= 100) {
      return "#00B050"; // dark green
    } else if (scoreWATER >= 80 && scoreWATER < 90) {
      return "#92D050"; // light green
    } else if (scoreWATER >= 60 && scoreWATER < 80) {
      return "#FFFF00"; // yellow
    } else if (scoreWATER >= 40 && scoreWATER < 60) {
      return "#FFC000"; // orange
    } else if (scoreWATER >= 20 && scoreWATER < 40) {
      return "#FF0000"; // Red
    } else if (scoreWATER >= 0 && scoreWATER < 20) {
      return "#C00000"; // Deep red
    }
  };

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="w-full p-3 flex gap-3 flex-column">
      {displayValues && (
        <>
          {show && (
            <div className="flex align-items-center justify-content-between w-full gap-3">
              <div className="flex align-items-center justify-content-between w-full ">
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
                      Water Management
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
                      {selectedValues.zone}
                    </p>
                  </div>
                  <Divider className="m-0 p-0" />
                  {/* Date Range */}
                  <div className="flex align-items-center justify-content-start gap-1">
                    <i className="pi pi-calendar text-primary1 font-medium text-sm"></i>
                    <p className="m-0 p-0 text-primary1 font-medium text-sm">
                      {monthNames[selectedValues.month - 1]},{" "}
                      {selectedValues.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex align-items-center justify-content-end gap-2">
                {/* Button to trigger the OverlayPanel */}
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
                        options={monthNames.map((name, index) => ({
                          label: name, // Display month name
                          value: index + 1, // Store month number (1-12)
                        }))}
                        placeholder="Select Month"
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-content-between">
                      <Button
                        className="bg-white text-secondary2"
                        label="Reset"
                        // icon="pi pi-undo"
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

                {username === "admin" && (
                  <>
                    <Button
                      icon="pi pi-ellipsis-v"
                      onClick={(e) => menu.current.toggle(e)}
                      className="bg-primary1"
                      raised
                    />
                    <Menu model={items} ref={menu} popup />
                    <Upload
                      visible={uploadDialogVisible}
                      onHide={hideUploadDialog}
                      parameter={"water"}
                    />
                    <WaterModify
                      waterData={data}
                      waterSetData={setData}
                      isOpen={modifyDialogVisible}
                      onClose={handleCloseModifyDialog}
                    />
                  </>
                )}
                <Button
                  icon="pi pi-file"
                  tooltip="Generate Report"
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
                    parameter={"water"}
                    heading={"Water Management"}
                  />
                </Dialog>
              </div>
            </div>
          )}
          <div className="flex align-items-center justify-content-between gap-3 flex-column w-full">
            {/* Row 1 */}
            <div className="flex gap-3 w-full align-items-center justify-content-center">
              <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
                <div className="flex flex-column gap-3">
                  {/* Sources of Water Supply */}
                  <div className="flex flex-column justify-content-start bg-white border-round p-3 gap-3 w-full">
                    <p className="card-title p-0 m-0">Sources</p>
                    <div className="flex">
                      <div className="flex w-full px-2 flex-column">
                        <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                          {displayValues.Handpumps}
                        </p>
                        <p className="p-0 m-0 card-text">Handpumps</p>
                      </div>
                      <Divider layout="vertical" />
                      <div className="flex w-full px-2 flex-column">
                        <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                          {displayValues.Tanks}
                        </p>
                        <p className="p-0 m-0 card-text">Tanks</p>
                      </div>
                      <Divider layout="vertical" />
                      <div className="flex w-full px-2 flex-column">
                        <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                          {displayValues.Ponds}
                        </p>
                        <p className="p-0 m-0 card-text">Ponds</p>
                      </div>
                      <Divider layout="vertical" />
                      <div className="flex w-full px-2 flex-column">
                        <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                          1
                        </p>
                        <p className="p-0 m-0 card-text">Rivers</p>
                      </div>
                      <Divider layout="vertical" />
                      <div className="flex w-full px-2 flex-column">
                        <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                          {displayValues.Canals}
                        </p>
                        <p className="p-0 m-0 card-text">Canals</p>
                      </div>
                    </div>
                  </div>
                  {/* Households with Water Supply */}
                  <div className="flex bg-white gap-2 p-3 flex-column border-round align-items-start justify-content-center w-full">
                    <ProgressBar
                      value={(
                        (displayValues.No_of_Households_with_Connections /
                          displayValues.Total_Households) *
                        100
                      ).toFixed(2)}
                      style={{ height: "0.75rem" }} // Adjust the height
                      className="w-full" // Full width of its container
                      color={waterConnectionColor}
                      displayValueTemplate={() => null} // Hide the displayed value
                    />
                    <p className="card-text p-0 m-0">
                      Households with Water Connections:{" "}
                      <span className="text-primary1 font-semibold">
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
                {/* Water Supply */}
                <div className="flex flex-column p-3 w-full border-round bg-white">
                  <p className="card-title p-0 m-0">Supply</p>
                  <div className="flex w-full my-2">
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                        {displayValues.Current_Supply_MLD}
                        <span className="text-lg"> MLD</span>
                      </p>
                      <p className="p-0 m-0 card-text text-sm">
                        Current Water Supply
                      </p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                        {((displayValues.Population * 135) / 1000000).toFixed(
                          2
                        )}{" "}
                        <span className="text-lg">MLD</span>
                      </p>
                      <p className="p-0 m-0 card-text text-sm">
                        Required Water Supply
                      </p>
                    </div>
                    {selectedValues.zone === "All Zones" && (
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
                  <div className="flex flex-column gap-2">
                    <ProgressBar
                      value={
                        ((((displayValues.Population * 135) / 1000000).toFixed(
                          2
                        ) -
                          displayValues.Current_Supply_MLD) /
                          ((displayValues.Population * 135) / 1000000).toFixed(
                            2
                          )) *
                        100
                      }
                      style={{ height: "0.75rem" }} // Adjust the height
                      className="w-full" // Full width of its container
                      color={supplyColor}
                      displayValueTemplate={() => null} // Hide the displayed value
                    />
                    <p className="card-text p-0 m-0">
                      Current Deficit:{" "}
                      <span className="text-primary1 font-semibold">
                        {" "}
                        {(
                          (((
                            (displayValues.Population * 135) /
                            1000000
                          ).toFixed(2) -
                            displayValues.Current_Supply_MLD) /
                            (
                              (displayValues.Population * 135) /
                              1000000
                            ).toFixed(2)) *
                          100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* WQI Map */}
              <div
                className="flex flex-column align-items-center justify-content-between gap-3"
                style={{ flex: "40%" }}
              >
                <div className="flex flex-column bg-white border-round p-3 w-full gap-3">
                  <p className="card-title p-0 m-0">Water Quality Index</p>
                  <MapContainer
                    center={[26.8, 82.2]}
                    zoom={10}
                    style={{ height: "20rem", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {selectedValues.zone === "All Zones" &&
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

                    {selectedValues.zone !== "All Zones" && (
                      <GeoJSON
                        key={selectedValues.zone}
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

                  <div className="flex justify-content-between">
                    {colors.map((color, index) => (
                      <div className="flex align-items-center " key={index}>
                        <div
                          className="mr-2 border-circle"
                          style={{
                            width: "0.6rem",
                            height: "0.6rem",
                            backgroundColor: color,
                            borderRadius: "50%", // Ensure it's circular
                          }}
                        ></div>
                        <p
                          className="m-0 p-0 font-medium text-primary1"
                          // style={{ color: color }}
                        >
                          {index === 0
                            ? "Poor"
                            : index === 1
                            ? "Fair"
                            : index === 2
                            ? "Average"
                            : index === 3
                            ? "Good"
                            : "Excellent"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>{" "}
              </div>
              {/* Insights */}
              <div
                className="flex flex-column bg-white border-round p-3 gap-3 h-26rem overflow-y-auto"
                style={{ flex: "30%" }}
              >
                <p className="card-title p-0 m-0">Insights</p>
                <div className="flex flex-column align-items-start justify-content-start gap-2">
                  {selectedValues.zone === "All Zones" && (
                    <li className="p-0 m-0 text-primary1 font-medium text-sm">
                      By 2031, the projected demand of{" "}
                      <span className="m-0 p-0 font-semibold text-sm">
                        {" "}
                        {((1194206 * 135) / 1000000).toFixed(2)} MLD
                      </span>{" "}
                      exceeds the current supply capacity of{" "}
                      <span className="m-0 p-0 font-semibold text-sm">
                        {displayValues.Current_Supply_MLD} MLD
                      </span>{" "}
                      by{" "}
                      <span className="m-0 p-0 font-semibold text-red-500 text-sm">
                        {((1194206 * 135) / 1000000).toFixed(2) -
                          displayValues.Current_Supply_MLD}{" "}
                        MLD
                      </span>
                      . This indicates a critical need to expand water supply
                      infrastructure.
                    </li>
                  )}
                  <div className="flex gap-2 align-items-start">
                    <li className="p-0 m-0 text-primary1 font-medium text-sm">
                      There is already a deficit of{" "}
                      <span className="p-0 m-0 text-red-500 font-semibold text-sm">
                        {(
                          (displayValues.Population * 135) / 1000000 -
                          displayValues.Current_Supply_MLD
                        ).toFixed(2)}{" "}
                        MLD
                      </span>{" "}
                      in water supply, which will worsen with population growth.
                    </li>
                  </div>
                  {selectedValues.zone === "All Zones" && (
                    <>
                      <li className="p-0 m-0 text-primary1 font-medium text-sm">
                        Without proper infrastructure upgrades, per capita water
                        availability will drop to{" "}
                        <span className="m-0 p-0 font-semibold text-red-500 text-sm">
                          {(
                            (displayValues.Current_Supply_MLD * 1000000) /
                            1194206
                          ).toFixed(2)}{" "}
                          L/day/person
                        </span>
                        , well below the recommended{" "}
                        <span className="m-0 p-0 font-semibold text-sm">
                          135 L/day/person
                        </span>
                        , leading to severe water stress.
                      </li>
                      <li className="p-0 m-0 text-primary1 font-medium text-sm">
                        The existing treatment plant is severely under capacity,
                        with only{" "}
                        <span className="m-0 p-0 font-semibold text-sm">
                          {(
                            ((12 * 0.9) /
                              (displayValues.Current_Supply_MLD * 0.8)) *
                            100
                          ).toFixed(2)}
                          %
                        </span>{" "}
                        of wastewater treated. This indicates an urgent need to
                        enhance sewerage infrastructure to prevent environmental
                        hazards.
                      </li>
                      <p className="p-0 m-0 text-primary1 font-medium text-sm">
                        (Assuming water input to STP is 80% and STP efficiency
                        of 90%.)
                      </p>
                      <li className="p-0 m-0 text-primary1 font-medium text-sm">
                        By 2031, the required sewerage treatment capacity will
                        increase to{" "}
                        <span className="m-0 p-0 font-semibold text-red-500 text-sm">
                          {" "}
                          {(((1194206 * 135) / 1000000) * 0.8).toFixed(2)} MLD
                        </span>
                        , far exceeding the current capacity of{" "}
                        <span className="m-0 p-0 font-semibold text-sm">
                          12 MLD
                        </span>
                        . An approximate{" "}
                        <span className="m-0 p-0 font-semibold text-red-500 text-sm">
                          {(
                            (((1194206 * 135) / 1000000) * 0.8).toFixed(2) / 12
                          ).toFixed(0)}{" "}
                          times
                        </span>{" "}
                        increase in treatment capacity will be necessary.
                      </li>
                    </>
                  )}
                  {(
                    100 -
                    (displayValues.Households_Bill_Payment /
                      displayValues.No_of_Households_with_Meters) *
                      100
                  ).toFixed(2) > 15 && (
                    <div className="flex gap-2 align-items-start">
                      <li className="p-0 m-0 text-primary1 font-medium text-sm">
                        The{" "}
                        <span className="p-0 m-0 text-red-500 font-semibold text-sm">
                          {`${(
                            100 -
                            (displayValues.Households_Bill_Payment /
                              displayValues.No_of_Households_with_Meters) *
                              100
                          ).toFixed(2)}%`}
                        </span>{" "}
                        due bill payment rate indicates inefficiency in billing
                        collection or challenge in payment processes, affecting
                        the financial sustainability of water management.
                      </li>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-3 w-full align-items-center justify-content-center">
              {/* Water Treatment */}
              <div
                className="flex flex-column bg-white border-round p-3 gap-3 w-full"
                style={{ flex: "30%" }}
              >
                <p className="card-title p-0 m-0">Treatment</p>
                <div className="flex align-items-start justify-content-around">
                  <div className="flex flex-column align-items-center">
                    <Knob
                      value={waterTreatment.reusedPercent}
                      valueTemplate={"{value}%"}
                      readOnly
                      size={140}
                      strokeWidth={6}
                      valueColor="#166c7d"
                      rangeColor="#E9F3F5"
                    />
                    <p className="p-0 card-text" style={{ marginTop: -10 }}>
                      Treated Reused Water
                    </p>
                  </div>
                  <div
                    className="flex flex-column gap-2"
                    style={{ marginTop: -20 }}
                  >
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
              {/* Water Usage Mangagement */}
              <div
                className="flex flex-column bg-white border-round p-3 gap-3 w-full"
                style={{ flex: "40%" }}
              >
                <p className="card-title p-0 m-0">Usage Management</p>
                <div className="flex gap-3">
                  <div className="flex flex-column sec-theme border-round p-2 gap-2 align-items-center w-full">
                    <div className="flex w-9rem custom-circular-progress">
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
                        strokeWidth={7}
                        styles={buildStyles({
                          pathColor: `${meteredConnectionColor}`,
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
                  <div className="flex flex-column sec-theme border-round p-2 gap-2 align-items-center w-full">
                    <div className="flex w-9rem custom-circular-progress">
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
                        strokeWidth={7}
                        styles={buildStyles({
                          pathColor: `${billColor}`,
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
              <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
                {/* Water Preservation */}
                <div className="flex flex-column bg-white border-round p-3 gap-2">
                  <p className="card-title p-0 m-0">Water Preservation</p>
                  <div className="flex align-items-start">
                    <div className="flex flex-column w-full align-items-center">
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                        {displayValues.Total_Volume_Harvested}
                        <span className="text-xl p-0 m-0"> m&sup3;</span>
                      </p>
                      <p className="p-0 m-0 card-text text-center">
                        Harvested Water
                      </p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full align-items-center">
                      <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                        {displayValues.Sites_with_Rainwater_Harvesting_System}
                      </p>
                      <p className="p-0 m-0 card-text text-center">
                        Rainwater Harvesting Sites
                      </p>
                    </div>
                  </div>
                </div>
                {/* Awareness Campign */}
                <div className="flex bg-white border-round p-3">
                  <div className="flex w-full flex-column gap-5">
                    <p className="card-title p-0 m-0 text-left">
                      Awarness Campaigns
                    </p>
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                      {displayValues.Awarness_Campaigns_Programs}
                    </p>
                  </div>
                  <img src={workshop} alt="workshop" className="w-7rem" />
                </div>
              </div>
            </div>
          </div>
          <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
            *Data updated till 2020. These numbers are subject to variation.
          </p>
          {show && (
            <RecommendationPanel
              renderRecommendations={renderRecommendations}
            />
          )}
        </>
      )}
      {serverDown && <DataNotFound />}
    </div>
  );
};

export default WaterDashboard;
