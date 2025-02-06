import React from "react";
import {
  StackedBarChart,
  PieChartColumn,
  DonutChart,
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
import { Divider } from "primereact/divider";
import { ProgressBar } from "primereact/progressbar";

const WasteDashboard = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState([]);
  const [totalWasteCollected, setTotalWasteCollected] = useState([]);
  const [tempZone, setTempZone] = useState("All Zones");
  const [tempYear, setTempYear] = useState(2024);
  const [tempMonth, setTempMonth] = useState(1);
  const [selectedValues, setSelectedValues] = useState({
    zone: "All Zones",
    year: 2024,
    month: 1,
  });
  const [modifyDialogVisible, setModifyDialogVisible] = useState(false);
  const [displayValues, setDisplayValues] = useState("");
  const [sector_wise_Generation, setsector_wise_Generation] = useState({
    sectorLabels: [],
    sectorSeries: [],
  });
  const [collectionGraphData, setCollectionGraphData] = useState({
    collectionLabels: [],
    collectionSeries: [],
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
  const calculateAverage = (filteredData) => {
    if (filteredData.length === 0)
      return {
        Average_Waste_Per_Capita: 0,
        Average_Percent_of_waste_processed: 0,
        Avg_capacity_of_plants: 0,
      };

    const totalValues = filteredData.reduce((acc, curr) => {
      return {
        Waste_generated_per_capita_per_day:
          (acc.Waste_generated_per_capita_per_day || 0) +
          curr.Waste_generated_per_capita_per_day,
        Percent_of_waste_processed:
          (acc.Percent_of_waste_processed || 0) +
          curr.Percent_of_waste_processed,
        Avg_capacity_of_plants:
          (acc.Avg_capacity_of_plants || 0) + curr.Avg_capacity_of_plants,
      };
    }, {});

    return {
      Average_Waste_Per_Capita:
        totalValues.Waste_generated_per_capita_per_day / filteredData.length,
      Average_Percent_of_waste_processed:
        totalValues.Percent_of_waste_processed / filteredData.length,
      Avg_capacity_of_plants:
        totalValues.Avg_capacity_of_plants / filteredData.length,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api-csi.arahas.com/data/waste"
        );
        const responseData = response.data.data;
        setData(responseData);
        const filteredData =
          selectedValues.zone === "All Zones"
            ? responseData.filter(
                (item) =>
                  item.Year === selectedValues.year &&
                  item.Month === selectedValues.month
              )
            : responseData.filter(
                (item) =>
                  item.Zone === selectedValues.zone &&
                  item.Year === selectedValues.year &&
                  item.Month === selectedValues.month
              );
        console.log(filteredData);
        const totalValues = filteredData.reduce((acc, curr) => {
          return {
            ...acc,
            Total_Waste_Generated:
              (acc.Total_Waste_Generated || 0) + curr.Total_Waste_Generated,
            Waste_generated_per_capita_per_day:
              (acc.Waste_generated_per_capita_per_day || 0) +
              curr.Waste_generated_per_capita_per_day,
            Residential: (acc.Residential || 0) + curr.Residential,
            Commercial: (acc.Commercial || 0) + curr.Commercial,
            Institutional: (acc.Institutional || 0) + curr.Institutional,
            Others: (acc.Others || 0) + curr.Others,
            Door_to_door: (acc.Door_to_door || 0) + curr.Door_to_door,
            Community_Bins: (acc.Community_Bins || 0) + curr.Community_Bins,
            Other_waste_collected:
              (acc.Other_waste_collected || 0) + curr.Other_waste_collected,

            No_of_processing_plants:
              (acc.No_of_processing_plants || 0) + curr.No_of_processing_plants,
            No_of_Transport_or_Vehicles:
              (acc.No_of_Transport_or_Vehicles || 0) +
              curr.No_of_Transport_or_Vehicles,
            Avg_Capacity_of_Transport:
              (acc.Avg_Capacity_of_Transport || 0) +
              curr.Avg_Capacity_of_Transport,
            Avg_no_of_staff_members:
              (acc.Avg_no_of_staff_members || 0) + curr.Avg_no_of_staff_members,
            Awareness_Campaigns:
              (acc.Awareness_Campaigns || 0) + curr.Awareness_Campaignss,
          };
        }, {});
        const total_collected_waste =
          totalValues.Door_to_door +
          totalValues.Community_Bins +
          totalValues.Other_waste_collected;
        setTotalWasteCollected(total_collected_waste);
        // Prepare labels and series for SectorWise Donut Chart
        const sectorLabels = [
          "Residential",
          "Commercial",
          "Institutional",
          "Others",
        ];
        const sectorSeries = [
          totalValues.Residential || 0,
          totalValues.Commercial || 0,
          totalValues.Institutional || 0,
          totalValues.Others || 0,
        ];
        setsector_wise_Generation({ sectorLabels, sectorSeries });
        // Prepare labels and series for Waste Collection stacked Column chart
        const collectionLabels = ["Door to Door", "Community Bins", "Others"];
        const collectionSeries = [
          totalValues.Door_to_door || 0,
          totalValues.Community_Bins || 0,
          totalValues.Other_waste_collected || 0,
        ];
        setCollectionGraphData({ collectionLabels, collectionSeries });
        console.log(collectionLabels);
        console.log(collectionSeries);
        const averageValues = calculateAverage(filteredData);
        const displayValues =
          selectedValues.zone === "All Zones"
            ? { ...totalValues, ...averageValues }
            : { ...filteredData[0], ...averageValues };

        setDisplayValues(displayValues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setServerDown(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedValues]);

  const wasteCompositionData = [55.3, 33.7, 178.5, 82.75];
  const wasteCompositionLabels = [
    "Green Waste",
    "Debris & Silt",
    "Biodegradable",
    "Recyclable",
  ];

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
        {/* Generation */}
        <div
          className="flex flex-column border-round bg-white p-4"
          style={{ flex: "30%" }}
        >
          <p className="card-title p-0 m-0">
            Waste Generation
            {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
          </p>
          {/* Waste Generated VS Predicted Waste Generated*/}
          <div className="flex align-items-center justify-content-between w-full p-4 gap-4">
            <div className="flex flex-column gap-2">
              <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                {displayValues.Total_Waste_Generated}{" "}
                <span className="text-lg">TPD</span>
              </p>
              <p className="card-text text-sm p-0 m-0">
                Current Waste Generation
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column gap-2">
              <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                {((0.6 * 1194206) / 1000).toFixed(2)}{" "}
                <span className="text-lg">TPD</span>
              </p>
              <p className="card-text text-sm p-0 m-0">
                Predicted Waste Generation by 2031
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
            </div>
          </div>
          {/* Waste Per Capita */}
          <div className="flex align-items-center justify-content-between w-full p-4 gap-4 ">
            <div className="flex flex-column gap-2">
              <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                {displayValues.Average_Waste_Per_Capita}{" "}
                <span className="text-lg">kg/day</span>
              </p>
              <p className="card-text text-sm p-0 m-0">
                Waste Generation Per Capita
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column gap-2">
              <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                0.6 <span className="text-lg">kg/day</span>
              </p>
              <p className="card-text text-sm p-0 m-0">
                Target Waste Generation Per Capita
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
            </div>
          </div>
          <div className="flex flex-column gap-2 p-4">
            <p className="card-title p-0 m-0 text-center">
              Sector Wise Generation
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            {sector_wise_Generation.sectorLabels.length > 0 &&
            sector_wise_Generation.sectorSeries.length > 0 ? (
              <DonutChart
                title=""
                labels={sector_wise_Generation.sectorLabels}
                series={sector_wise_Generation.sectorSeries}
                height={80}
                fontColor="#000"
                colorArray={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
                vertical="center"
                horizontal="right"
              />
            ) : (
              <p>No data available for the chart.</p>
            )}
          </div>
        </div>
        {/* Collection & Processing & Transport */}
        <div className="flex flex-column gap-3" style={{ flex: "40%" }}>
          {/* Collection */}
          <div className="flex flex-column border-round bg-white p-4">
            <p className="card-title p-0 m-0">
              Waste Collection
              {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
            </p>
            <div className="flex justify-content-around align-items-center">
              {/*Collected and Uncollected Waste*/}
              <div className="flex flex-column align-items-start justify-content-between p-4 gap-4">
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2">
                    {totalWasteCollected} <span className="text-lg">TPD</span>
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Collected Waste
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>

                <div className="flex flex-column gap-2">
                  <ProgressBar
                    value={(
                      ((displayValues.Total_Waste_Generated -
                        totalWasteCollected) /
                        displayValues.Total_Waste_Generated) *
                      100
                    ).toFixed(2)}
                    color="#FFAD0D"
                    style={{ height: "0.5rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="card-text p-0 m-0">
                    Uncollected Waste:{" "}
                    <span className="text-primary1 font-semibold">
                      {" "}
                      {(
                        ((displayValues.Total_Waste_Generated -
                          totalWasteCollected) /
                          displayValues.Total_Waste_Generated) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
              </div>
              <Divider layout="vertical" />
              {/* Collection Methods */}
              <div className="flex flex-column align-items-center gap-4 p-4">
                <p className="card-title p-0 m-0 text-center">
                  Collection by Method
                  {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                </p>
                {collectionGraphData.collectionLabels.length > 0 &&
                collectionGraphData.collectionSeries.length > 0 ? (
                  <DonutChart
                    title=""
                    labels={collectionGraphData.collectionLabels}
                    series={collectionGraphData.collectionSeries}
                    height={100}
                    fontColor="#000"
                    colorArray={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]}
                    vertical="center"
                    horizontal="right"
                  />
                ) : (
                  <p>No data available for the chart.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {/* Processing */}
            <div className="flex flex-column border-round bg-white p-4">
              <p className="card-title p-0 m-0">
                Waste Processing
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
              {/*Collected and Uncollected Waste*/}
              <div className="flex align-items-center justify-content-between w-full p-4 gap-4">
                <div className="flex flex-column w-full gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.Average_Percent_of_waste_processed}
                    <span className="text-lg">%</span>
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Processed Waste
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.No_of_processing_plants}
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Processing Plants
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.Avg_capacity_of_plants}
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Average Capacity of Plants
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
              </div>
            </div>
            {/* Transport & Staffs */}
            <div className="flex flex-column border-round bg-white p-4">
              <p className="card-title p-0 m-0">
                Transport & Staffs
                {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
              </p>
              {/*Collected and Uncollected Waste*/}
              <div className="flex align-items-center justify-content-between w-full p-4 gap-4">
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.Average_Percent_of_waste_processed}
                    <span className="text-lg">%</span>
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Transport Vehicals
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.No_of_processing_plants}
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Processing Plants
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column gap-2">
                  <p className="text-2xl font-semibold m-0 p-0 text-secondary2 ">
                    {displayValues.Avg_capacity_of_plants}
                  </p>
                  <p className="card-text text-sm p-0 m-0">
                    Average Capacity of Plants
                    {/* <span className="text-sm text-tertiary3 font-medium">/Day</span> */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div
          className="flex flex-column bg-white border-round p-3 gap-3 h-26rem overflow-y-auto"
          style={{ flex: "30%" }}
        >
          <p className="card-title p-0 m-0">Insights</p>
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
