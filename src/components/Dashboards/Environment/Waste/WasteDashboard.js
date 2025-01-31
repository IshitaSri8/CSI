import React from "react";
import {
  ColumnChart,
  StackedBarChart,
  PieChartColumn,
} from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import WasteRecommendations from "./WasteRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import score from "score";
import { useEffect } from "react";
import axios from "axios";
import { getScoreColor } from "components/DashboardUtility/scoreColor";
import { ProgressSpinner } from "primereact/progressspinner";
import { OverlayPanel } from "primereact/overlaypanel";
import { Dropdown } from "primereact/dropdown";
import { Menu } from "primereact/menu";
import Upload from "components/DashboardUtility/Popups/Upload";
import { useRef } from "react";
import { useUser } from "components/context/UserContext";

const WasteDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState([]);
  const [tempZone, setTempZone] = useState("All Zones");
  const [tempYear, setTempYear] = useState(2024);
  const [tempMonth, setTempMonth] = useState(1);
  const [selectedValues, setSelectedValues] = useState({
    zone: "All Zones",
    year: 2024,
    month: 1,
  });
  const { username } = useUser();
  const overlayRef = useRef(null); // Reference for OverlayPanel
  const menu = useRef(null); // Create a ref for the Menu component
  const showUploadDialog = () => {
    setUploadDialogVisible(true);
  };

  const hideUploadDialog = () => {
    setUploadDialogVisible(false);
  };
  const [modifyDialogVisible, setModifyDialogVisible] = useState(false);

  const handleModify = () => {
    setModifyDialogVisible(true); // Set state to true when button is clicked
  };

  const handleCloseModifyDialog = () => {
    setModifyDialogVisible(false);
  };
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-csi.arahas.com/data/waste"
        );
        const responseData = response.data.data;
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setServerDown(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const handleApply = () => {
    setSelectedValues({
      zone: tempZone,
      year: tempYear,
      month: tempMonth,
    });
    overlayRef.current.hide();
  };

  const solidWasteData = [190, 181, 180];
  const solidWasteLabels = ["SW-Generated", "SW-Collected", "SW-Processed"];

  const estimatedSWGData = [358.261, 119.42, 59.7, 59.7]; // Example data
  const estimatedSWGLabels = [
    "Residential",
    "Commercial",
    // "Street Sweepings",
    "Institutional",
    "Others",
  ];

  const wasteCompositionData = [55.3, 33.7, 178.5, 82.75];
  const wasteCompositionLabels = [
    "Green Waste",
    "Debris & Silt",
    "Biodegradable",
    "Recyclable",
  ];

  const sanitationLabels = [
    "Public Toilet",
    "Individual Toilet",
    "Open Defecation",
  ];
  const sanitationData = [7, 93, 0];

  const Zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"];
  const collection = [
    "Door-to-door Collection",
    "Community Bins",
    "Other Sources",
  ];
  const collectionData = [
    [39, 30, 38, 29, 30],
    [31, 24, 29, 22, 21],
    [2, 1, 2, 2, 3],
  ];
  // const collectionData = [
  //   { name: "Door-to-door Collection", data: [39, 30, 38, 29, 30] },
  //   { name: "Community Bins", data: [31, 24, 29, 22, 21] },
  //   { name: "Other Sources", data: [2, 1, 2, 2, 3] },
  // ];
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
  const zones = [...new Set(data.map((item) => item.Zone))];
  const years = [...new Set(data.map((item) => item.Year))];

  const renderRecommendations = () => {
    return <WasteRecommendations />;
  };

  const renderDashboard = () => {
    return <WasteDashboard show={false} />;
  };

  const bgColor = getScoreColor(score.WASTE);

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex flex-column gap-3 p-4">
      {show && (
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
                backgroundColor: bgColor, // Replace with your desired color
                clipPath:
                  "polygon(100% 0%, 87% 51%, 100% 100%, 0 100%, 0% 50%, 0 0)",
              }}
            >
              <h1
                className="m-0 p-0 text-white text-2xl font-semibold"
                style={{ zIndex: 1500 }}
              >
                Waste Management
              </h1>
              <p
                className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                style={{ zIndex: 1500 }}
              >
                {score.WASTE}
              </p>
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
                    onChange={(e) => setTempZone(e.value)}
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
                  parameter={"waste"}
                />
                {/* <WasteModify
                      waterData={data}
                      waterSetData={setData}
                      isOpen={modifyDialogVisible}
                      onClose={handleCloseModifyDialog}
                    /> */}
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
                parameter={"waste"}
                heading={"Waste Management"}
              />
            </Dialog>
          </div>
        </div>
      )}

      <div className="flex w-full gap-3">
        <div className="flex flex-column gap-2 w-full" style={{ flex: "18%" }}>
          {/* Waste Generated */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Waste Generated{" "}
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              355 <span className="text-xl">TPD</span>
            </p>
            {/* <Chip
            label="October 2024"
            style={{
              width: "fit-content",
              backgroundColor: "#e9f3f5",
              color: "#001F23",
            }}
          /> */}
          </div>
          {/* Waste Collected */}
          <div className="flex flex-column bg-white border-round w-full p-4 gap-4 ">
            <p className="card-title p-0 m-0">
              Waste Collected{" "}
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <p className="text-4xl font-semibold m-0 p-0 text-secondary2 text-center">
              303 <span className="text-xl">TPD</span>
            </p>
          </div>
        </div>
        {/* Solid Waste Management (in TPD) */}
        <div
          className="flex flex-column w-full bg-white border-round p-4"
          style={{ flex: "27%" }}
        >
          <p className="card-title p-0 m-0">Solid Waste Management (in TPD)</p>
          <ColumnChart
            categories={solidWasteLabels}
            series={solidWasteData}
            height={150}
            // title="Solid Waste Management (in TPD)"
            labelFontSize={6}
            // colors={colors.slice(0, 3)}
          />
        </div>
        {/* Estimated Solid Waste Generated */}
        <div
          className="flex flex-column w-full bg-white border-round p-4"
          style={{ flex: "37%" }}
        >
          {/* <CanvasJSChart
            options={estimatedSWGChart}
            containerProps={{ height: 100, width: "100%" }}
          /> */}
          <div className="flex justify-content-between">
            <p className="card-title p-0 m-0">
              Estimated Solid Waste Generated (in TPD)
            </p>
            <p className="text-sm text-tertiary3 font-medium p-0 m-0">
              by 2031
            </p>
          </div>
          <ColumnChart
            categories={estimatedSWGLabels}
            series={estimatedSWGData}
            height={150}
            // title="Estimated Solid Waste Generated (in TPD)"
            labelFontSize={8}
            // colors={colors.slice(0, 4)}
          />
        </div>
        {/* CT/PT */}
        <div
          className="flex flex-column bg-white border-round p-4 w-full justify-content-around"
          style={{ flex: "18%" }}
        >
          <p className="card-title p-0 m-0">CT/PT</p>
          <div className="flex flex-column gap-3">
            <div
              className="flex flex-column w-full p-2 sec-theme gap-1"
              style={{
                borderLeft: "3px solid #1F8297", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                500
              </p>
              <p className="p-0 m-0 card-text">Community Toilet</p>
            </div>
            <div
              className="flex flex-column w-full p-2 sec-theme gap-1"
              style={{
                borderLeft: "3px solid #98C6CF", // Adjust thickness and color
                height: "60px", // Adjust height
              }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                700
              </p>
              <p className="p-0 m-0 card-text">Public Toilet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        {/* Waste Composition */}
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "25%" }}
        >
          <p className="card-title p-0 m-0">Waste Composition (in TPD)</p>
          <PieChartColumn
            categories={wasteCompositionLabels}
            series={wasteCompositionData}
            height={150}
            // title="Waste Composition (in TPD)"
            vertical="bottom"
            horizontal="center"
            fontSize={10}
          />
        </div>
        <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "70%" }}
        >
          <p className="card-title p-0 m-0">Waste Collection (in TPD)</p>
          <StackedBarChart
            // title="Waste Collection (in TPD)"
            labels={Zones}
            categories={collection}
            series={collectionData}
            // dataSeries={collectionData}
            dataPointWidth={8}
            height={200}
          />
        </div>

        {/* <div
          className="flex flex-column gap-3 w-full bg-white border-round p-4"
          style={{ flex: "24%" }}
        >
          <PieChart
            categories={sanitationLabels}
            series={sanitationData}
            height={220}
            title="Sanitation Facility"
            vertical="bottom"
            horizontal="center"
            fontSize={10}
          />
        </div> */}
      </div>

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

export default WasteDashboard;
