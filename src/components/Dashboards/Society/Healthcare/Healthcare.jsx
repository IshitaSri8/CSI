import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import {
  GroupedColumnChart,
  GroupedBarChart,
  ModifiedLineChart,
  PieChartColumn,
  LineChart,
} from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import { PatientsRegisteredChart } from "./PatientsRegisteredChart";
import { SuicideCasesChart } from "./SuicideCasesChart";
import healthcare from "assets/healthcare.svg";
import insurance from "assets/insurance.svg";
import rehab from "assets/rehab.svg";
import { ProgressBar } from "primereact/progressbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import HealthcareRecommendations from "./HealthcareRecommendations";
import ReportPrint from "components/DashboardUtility/ReportPrint";
import RecommendationPanel from "components/DashboardUtility/RecommendationPanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { useUser } from "components/context/UserContext";
import { useEffect } from "react";
import { useRef } from "react";
import axios from "axios";
import score from "score";
import { getScoreColor } from "components/DashboardUtility/scoreColor";
import { Menu } from "primereact/menu";
import Upload from "components/DashboardUtility/Popups/Upload";

const Healthcare = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadDialogVisible, setUploadDialogVisible] = useState(false);
  const [serverDown, setServerDown] = useState(false);
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [allData, setAllData] = useState([]);
  const { username } = useUser();
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
          "https://api-csi.arahas.com/data/healthcare"
        );
        const responseData = response.data.data;
        setAllData(responseData);
        const years = responseData.map((data) => data.Year);
        const latestYear = Math.max(...years); // Get the maximum year

        // Find the row for the latest year
        const latestYearData = responseData.find(
          (data) => data.Year === latestYear
        );
        setLatestData(latestYearData);
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
  // const hospitalData = [51, 129];
  // const laboratoriesData = [133, 47];
  const Labels = ["Government", "Private"];

  const bedsTarget = 20;
  const bedsCurrent = 5;

  const ratioTarget = 20;
  const ratioCurrent = 45;

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const doctorsData = [4000, 6300, 7000, 7600, 9000];

  const [activeIndex, setActiveIndex] = useState(0); // State for active tab

  const chronicData = [
    [10, 3, 6, 1, 0],
    [28, 1, 2, 39, 0],
    [7, 5, 23, 14, 0],
    [22, 2, 29, 25, 0],
    [26, 3, 19, 226, 0],
    [28, 1, 2, 39, 0],
    [7, 5, 23, 14, 0],
    [22, 2, 29, 25, 0],
    [26, 3, 19, 226, 0],
  ];
  const chronicDiseases = [
    "Malaria",
    "J.E.",
    "A.E.S",
    "Dengue",
    "Chikengunia",
    "TB",
    "Heart Disease",
    "Diabetes",
    "Respiratory Illness",
  ];

  // Map the data into a format suitable for the DataTable
  const tableData = chronicDiseases.map((disease, index) => {
    const rowData = { disease }; // Add the disease name
    years.forEach((year, yearIndex) => {
      rowData[year] = chronicData[index][yearIndex]; // Add values for each year
    });
    return rowData;
  });

  const [expandedRow, setExpandedRow] = useState(null); // State to track which row is expanded

  const handleToggle = (rowData) => {
    setExpandedRow(expandedRow === rowData ? null : rowData);
  };

  const institutionsAnalysisData = [
    { name: "Target by 2031", data: [250, 300] },
    { name: "Current", data: [146, 198] },
  ];

  const mortalityData = [
    { name: "Infants", data: [10, 20, 30, 25, 32] },
    { name: "Pregnant Ladies", data: [45, 38, 25, 47, 55] },
  ];

  const vaccinationData = [150, 80, 60];
  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];

  const suicideData = [270, 328, 232, 150, 450];

  const renderRecommendations = () => {
    return <HealthcareRecommendations />;
  };

  const renderDashboard = () => {
    return <Healthcare show={false} />;
  };

  const bgColor = getScoreColor(score.HEALTHCARE);

  return loading ? (
    <div className="flex h-screen align-items-center justify-content-center flex-column">
      <ProgressSpinner />
      <p className="font-medium text-lg">Please Wait, Fetching Data...</p>
    </div>
  ) : (
    <div className="flex gap-3 flex-column p-3">
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
                Healthcare
              </h1>
              <p
                className="m-0 p-2 text-primary1 text-xl font-bold border-circle bg-white mr-7"
                style={{ zIndex: 1500 }}
              >
                {score.HEALTHCARE}
              </p>
            </div>
          </div>
          <div className="flex align-items-center justify-content-end gap-2">
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
                  parameter={"healthcare"}
                />
                {/* <HealthcareModify
                      healthData={data}
                      healthSetData={setData}
                      isOpen={modifyDialogVisible}
                      onClose={handleCloseModifyDialog}
                    /> */}
              </>
            )}
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
              <ReportPrint
                renderDashboard={renderDashboard}
                renderRecommendations={renderRecommendations}
                parameter={"healthcare"}
                heading={"Healthcare"}
              />
            </Dialog>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <div className="flex flex-column gap-3" style={{ flex: "55%" }}>
          <div className="flex w-full gap-3">
            <div
              className="flex bg-white border-round justify-content-between align-items-start"
              style={{ flex: "70%" }}
            >
              <img src={healthcare} alt="Healthcare" />
              <div className="flex py-6 w-full">
                <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {latestData.Doctors}
                  </p>
                  <p className="p-0 m-0 card-text text-sm">Doctors</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {latestData.Nurses}
                  </p>
                  <p className="p-0 m-0 card-text text-sm">Nurses</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {latestData.Medical_Staff}
                  </p>
                  <p className="p-0 m-0 card-text text-sm">Medical Staff</p>
                </div>
              </div>
            </div>

            <div
              className="flex justify-content-between align-items-center bg-white border-round py-6"
              style={{ flex: "30%" }}
            >
              <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                  344
                </p>
                <p className="p-0 m-0 card-text text-sm">
                  Healthcare Institutes
                </p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full align-items-center justify-content-center gap-1">
                <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                  78
                </p>
                <p className="p-0 m-0 card-text text-sm">Laboratories</p>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            {/* Patient Doctor Ratio */}
            <div
              className="flex flex-column border-round p-3 justify-content-center sec-theme"
              style={{ flex: "35%" }}
            >
              <p className="card-title p-0 m-0">Patient Doctor Ratio</p>
              <div className="flex my-2">
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {ratioCurrent}
                  </p>
                  <p className="p-0 m-0 card-text">Available</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {ratioTarget}
                  </p>
                  <p className="p-0 m-0 card-text">Target</p>
                </div>
              </div>
              <ProgressBar
                value={((ratioCurrent - ratioTarget) / ratioCurrent) * 100}
                style={{ height: "0.5rem" }} // Adjust the height
                className="w-full" // Full width of its container
                color="#FFAD0D"
                displayValueTemplate={() => null} // Hide the displayed value
              />
              <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                Gap:{" "}
                <span className="text-primary1">
                  {(
                    ((ratioCurrent - ratioTarget) / ratioCurrent) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
            </div>
            {/* People Having Health Insurance */}
            <div
              className="flex justify-content-center align-items-center bg-white border-round p-3"
              style={{ flex: "30%" }}
            >
              <div className="flex flex-column">
                <p className="card-title p-0 m-0 ">Health Insurance Coverage</p>
                <div className="flex align-items-center justify-content-around">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0 text-center">
                    12500
                  </p>
                  <img src={insurance} alt="insurance" className="h-6rem" />
                </div>
              </div>
            </div>
            {/* No. of Beds Available */}
            <div
              className="flex flex-column border-round p-3 justify-content-center sec-theme"
              style={{ flex: "35%" }}
            >
              <p className="card-title p-0 m-0">Hospital Beds</p>
              <div className="flex my-2">
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {bedsCurrent}
                  </p>
                  <p className="p-0 m-0 card-text">Available</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center gap-1">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {bedsTarget}
                  </p>
                  <p className="p-0 m-0 card-text">Target</p>
                </div>
              </div>
              <ProgressBar
                value={((bedsTarget - bedsCurrent) / bedsTarget) * 100}
                style={{ height: "0.5rem" }} // Adjust the height
                className="w-full" // Full width of its container
                color="#E62225"
                displayValueTemplate={() => null} // Hide the displayed value
              />
              <p className="text-tertiary3 p-0 m-0 mt-1 font-semibold">
                Gap:{" "}
                <span className="text-primary1">
                  {" "}
                  {((bedsTarget - bedsCurrent) / bedsTarget) * 100}%
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* Healthcare Institutes Analysis */}
        <div className="flex bg-white border-round p-3" style={{ flex: "20%" }}>
          <GroupedColumnChart
            title="Healthcare Institutes Analysis"
            labels={Labels}
            dataSeries={institutionsAnalysisData}
            dataPointWidth={25}
            height={250}
            fontSize={10}
          />
        </div>
        {/* Insights */}
        <div
          className="flex flex-column bg-white border-round p-3 gap-3 h-23rem overflow-y-auto"
          style={{ flex: "25%" }}
        >
          <p className="card-title p-0 m-0">Insights</p>
          <div className="flex flex-column align-items-start justify-content-start gap-2"></div>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* PatientsRegisteredChart */}
        <div className="flex bg-white border-round p-3" style={{ flex: "30%" }}>
          <PatientsRegisteredChart categories={years} series={doctorsData} />
        </div>

        {/* Vaccination Facilities */}
        <div className="flex bg-white border-round p-3" style={{ flex: "20%" }}>
          <PieChartColumn
            categories={vaccinationLabels}
            series={vaccinationData}
            height={200}
            title="Vaccination Facilities"
            fontSize={8}
          />
        </div>
        {/* Chronic Diseases*/}
        <div
          className="flex bg-white border-round-xl p-3 flex-column"
          style={{ flex: "45%" }}
        >
          {/* Header Row */}
          <div className="flex justify-content-between align-items-center mb-2">
            {/* Constant Title on the Left */}
            <p className="card-title p-0 m-0">Chronic Disease Distribution</p>

            {/* Icons for Tab Switching on the Right */}
            <div className="flex gap-1">
              <i
                className={`pi pi-chart-line cursor-pointer text-xl p-2 ${
                  activeIndex === 0
                    ? "text-prime font-medium"
                    : "text-tertiary3"
                }`}
                title="Line Chart"
                style={{
                  // fontSize: "1.125rem",
                  // padding: 2,
                  backgroundColor:
                    activeIndex === 0 ? "#e9f3f5" : "transparent",
                  borderBottom:
                    activeIndex === 0 ? "2px solid #166c7d" : "none",
                }}
                onClick={() => setActiveIndex(0)} // Switch to Line Chart tab
              ></i>
              <i
                className={`pi pi-table cursor-pointer  text-xl p-2 ${
                  activeIndex === 1 ? "text-prime" : "text-tertiary3"
                }`}
                title="Data Table"
                style={{
                  backgroundColor:
                    activeIndex === 1 ? "#e9f3f5" : "transparent",
                  borderBottom:
                    activeIndex === 1 ? "2px solid #166c7d" : "none",
                }}
                onClick={() => setActiveIndex(1)} // Switch to Data Table tab
              ></i>
            </div>
          </div>

          {activeIndex === 0 && (
            <ModifiedLineChart
              // title="Chronic Disease Distribution"
              categories={chronicDiseases}
              series={chronicData}
              labels={years}
              height={165}
            />
          )}

          {activeIndex === 1 && (
            <DataTable
              value={tableData}
              className="p-datatable-sm"
              // stripedRows
              responsiveLayout="scroll"
              rowStyle={{ backgroundColor: "#f3f5f5" }}
              style={{
                width: "100%",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Column
                body={(rowData) => (
                  <div className="flex align-items-center gap-2">
                    <span>{rowData.disease}</span>
                    <span
                      onClick={() => handleToggle(rowData)}
                      style={{ cursor: "pointer" }}
                    >
                      {expandedRow === rowData ? (
                        <i
                          className="pi pi-arrow-circle-down"
                          style={{ fontSize: "1rem" }}
                        ></i>
                      ) : (
                        <i
                          className="pi pi-arrow-circle-right"
                          style={{ fontSize: "1rem" }}
                        ></i>
                      )}
                    </span>
                  </div>
                )}
                // field="disease"
                header="Disease"
                className="text-sm font-semibold text-primary1"
                headerStyle={{
                  fontWeight: 500,
                  backgroundColor: "#166c7d",
                  color: "white",
                }}
              ></Column>
              {years.map((year) => (
                <Column
                  key={year}
                  field={year}
                  header={year}
                  className="font-medium text-primary1"
                  headerStyle={{
                    fontWeight: 500,
                    backgroundColor: "#166c7d",
                    color: "white",
                    textAlign: "center",
                  }}
                ></Column>
              ))}

              {/* Render Line Chart for Expanded Row */}
              {expandedRow && (
                <tr>
                  <td colSpan={years.length + 1} style={{ padding: "20px" }}>
                    <LineChart
                      title={`${expandedRow.chronicDiseases} Trend`}
                      data={[expandedRow.chronicData]} // Replace with actual data for the disease
                      categories={years}
                      height={165}
                    />
                  </td>
                </tr>
              )}
            </DataTable>
          )}
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* "Mortality Rate" */}
        <div
          className="flex flex-column bg-white border-round p-3"
          style={{ flex: "51%" }}
        >
          <GroupedBarChart
            title="Mortality Rate"
            labels={years}
            dataSeries={mortalityData}
            dataPointWidth={8}
            height={200}
          />
        </div>

        {/* SuicideCasesChart */}
        <div
          className="flex bg-white border-round-xl p-3"
          style={{ flex: "32%" }}
        >
          <SuicideCasesChart categories={years} series={suicideData} />
        </div>

        <div className="flex flex-column" style={{ flex: "22%" }}>
          {/* Rehab Centers */}
          <div className="flex flex-column bg-white p-3 border-round-top-xl">
            <p className="card-title p-0 m-0">Rehab Centers</p>
            <div className="flex align-items-center justify-content-around">
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                2
              </p>
              <img src={rehab} alt="rehab" />
            </div>
          </div>
          <div className="flex flex-column sec-theme p-3 border-round-bottom-xl">
            <p className="p-0 m-0 text font-medium">Rehab Center 1</p>
            <p className="p-0 m-0 text-tertiary3 font-medium mb-3">
              Capacity: <span className="text-primary1 font-semibold">200</span>
            </p>
            <p className="p-0 m-0 text font-medium">Rehab Center 2</p>
            <p className="p-0 m-0 text-tertiary3 font-medium">
              Capacity: <span className="text-primary1 font-semibold">200</span>
            </p>
          </div>
        </div>

        {/* Patients of Mental Illness */}
        {/* <div className="flex bg-white border-round p-3" style={{ flex: "22%" }}>
          <Doughnut
            title="Patients of Mental Illness"
            labels={mentalPatientsLabels}
            series={mentalPatientsData}
            height={200}
            showNo={true}
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

export default Healthcare;
