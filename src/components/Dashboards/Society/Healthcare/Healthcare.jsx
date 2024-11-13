import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import HealthcareReportPrint from "./HealthcareReportPrint";
import {
  StackedBarChart,
  GroupedColumnChart,
  BarChart,
  PieChart,
  GroupedBarChart,
  Doughnut,
  DonutChart,
} from "Layout/GraphVisuals";
import { Divider } from "primereact/divider";
import { PatientsRegisteredChart } from "./PatientsRegisteredChart";
import { SuicideCasesChart } from "./SuicideCasesChart";
import { Panel } from "primereact/panel";
import LandRecommendations from "components/Dashboards/Environment/Land/LandRecommendations";
import healthcare from "assets/healthcare.svg";
import insurance from "assets/Health insurance.svg";
import { ProgressBar } from "primereact/progressbar";

const Healthcare = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const hospitalData = [51, 129];
  const laboratoriesData = [133, 47];
  const Labels = ["Government", "Private"];

  const bedsTarget = 20;
  const bedsCurrent = 5;

  const ratioTarget = 12;
  const ratioCurrent = 18;

  const years = ["2020", "2021", "2022", "2023", "2024"];
  const doctorsData = [4000, 6300, 7000, 7600, 9000];
  const chronicData = [
    [10, 3, 6, 1, 0],
    [28, 1, 2, 39, 0],
    [7, 5, 23, 14, 0],
    [22, 2, 29, 25, 0],
    [26, 3, 19, 226, 0],
  ];
  const chronicDiseases = ["Malaria", "J.E.", "A.E.S", "Dengue", "Chikengunia"];
  // const chronicDataWithDiseases = [
  //   {
  //     name: "Malaria",
  //     data: [10, 28, 7, 22, 26], // Yearly data for Malaria
  //   },
  //   {
  //     name: "J.E.",
  //     data: [3, 1, 5, 2, 3], // Yearly data for J.E.
  //   },
  //   {
  //     name: "A.E.S",
  //     data: [6, 2, 23, 29, 19], // Yearly data for A.E.S.
  //   },
  //   {
  //     name: "Dengue",
  //     data: [1, 39, 14, 25, 226], // Yearly data for Dengue
  //   },
  //   {
  //     name: "Chikengunia",
  //     data: [0, 0, 0, 0, 0], // Yearly data for Chikengunia
  //   },
  // ];

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

  // const ageGroup = ["0-18", "19-35", "36-60", "61+"];
  const suicideData = [270, 328, 232, 150, 450];

  const mentalPatientsLabels = [
    "Addiction",
    "Depression",
    "Anxiety",
    "Schizophrenia",
  ];
  const mentalPatientsData = [270, 328, 232, 150];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Healthcare
          </h1>

          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="mb-4 bg-theme text-white"
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
            <HealthcareReportPrint />
          </Dialog>
        </div>
      )}
      <div className="flex gap-3">
        <div className="flex flex-column gap-3" style={{ flex: "75%" }}>
          <div className="flex w-full gap-3">
            <div className="flex bg-white border-round" style={{ flex: "65%" }}>
              <img src={healthcare} alt="Healthcare" />
              <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  12345
                </p>
                <p className="text p-0 m-0 mt-1 text-lg font-medium">Doctors</p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  1234
                </p>
                <p className="text p-0 m-0 mt-1 text-lg font-medium">Nurses</p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2 align-items-center justify-content-center">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  123
                </p>
                <p className="text p-0 m-0 mt-1 text-xs font-medium">
                  {" "}
                  Other Medical Staff
                </p>
              </div>
            </div>

            <div
              className="flex justify-content-between align-items-center bg-white border-round p-3"
              style={{ flex: "35%" }}
            >
              <div className="flex flex-column w-full p-2 align-items-center">
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                  1589
                </p>
                <p className="text p-0 m-0 mt-1 text-sm font-medium">
                  Healthcare Institutes
                </p>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column w-full p-2 align-items-center">
                <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                  2178
                </p>
                <p className="text p-0 m-0 mt-1 text-sm font-medium">
                  Laboratories
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-3">
            {/* Registered Patients */}
            <div
              className="flex flex-column justify-content-center align-items-center bg-white border-round p-2 gap-3"
              style={{ flex: "15%" }}
            >
              <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                1234
              </p>
              <p className="text p-0 m-0 text-lg font-medium text-center">
                Registered Patients
              </p>
            </div>
            {/* Patient Doctor Ratio */}
            <div
              className="flex flex-column bg-white border-round p-3 justify-content-center"
              style={{ flex: "30%" }}
            >
              <p className="text p-0 m-0 text-lg font-medium">
                Patient Doctor Ratio
              </p>
              <div className="flex my-3">
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {ratioCurrent}
                  </p>
                  <p className="text p-0 m-0 mt-1 font-medium">Available</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {ratioTarget}
                  </p>
                  <p className="text p-0 m-0 mt-1 font-medium">Target</p>
                </div>
              </div>
              <ProgressBar
                value={((ratioCurrent - ratioTarget) / ratioCurrent) * 100}
                style={{ height: "0.75rem" }} // Adjust the height
                className="w-full" // Full width of its container
                color="#E62225"
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
              style={{ flex: "25%" }}
            >
              <div className="flex flex-column">
                <p className="text p-0 m-0 mb-1 font-medium text-lg">
                  People Having Health Insurance
                </p>
                <div className="flex align-items-center justify-content-between">
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                    1234
                  </p>
                  <img src={insurance} alt="insurance" className="h-8rem" />
                </div>
              </div>
            </div>
            {/* No. of Beds Available */}
            <div
              className="flex flex-column bg-white border-round p-3 justify-content-center"
              style={{ flex: "40%" }}
            >
              <p className="text p-0 m-0 text-lg font-medium">Hospital Beds</p>
              <div className="flex my-3">
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                    {bedsCurrent}
                  </p>
                  <p className="text p-0 m-0 mt-1 font-medium">Available</p>
                </div>
                <Divider layout="vertical" />
                <div className="flex flex-column w-full p-2 align-items-center">
                  <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                    {bedsTarget}
                  </p>
                  <p className="text p-0 m-0 mt-1 font-medium">Target</p>
                </div>
              </div>
              <ProgressBar
                value={((bedsTarget - bedsCurrent) / bedsTarget) * 100}
                style={{ height: "0.75rem" }} // Adjust the height
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
        <div className="flex bg-white border-round p-4" style={{ flex: "25%" }}>
          <GroupedColumnChart
            title="Healthcare Institutes Analysis"
            labels={Labels}
            dataSeries={institutionsAnalysisData}
            dataPointWidth={25}
            height={260}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* PatientsRegisteredChart */}
        <div className="flex bg-white border-round p-4" style={{ flex: "50%" }}>
          <PatientsRegisteredChart categories={years} series={doctorsData} />
        </div>

        {/* <div className="flex flex-column gap-3" style={{ flex: "14%" }}>
          <div className="flex flex-column bg-white border-round p-4 gap-2">
            <p className="text p-0 m-0 text-sm font-medium text-lg">
              Total New Borns
            </p>
            <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
              1234
            </p>
          </div>
          <div className="flex flex-column bg-white border-round p-4 gap-2">
            <p className="text p-0 m-0 text-sm font-medium text-lg">
              Rehab Centers
            </p>
            <p className="text-4xl font-semibold m-0 text-secondary2 p-3 text-center">
              12
            </p>
          </div>
        </div> */}

        {/* Vaccination Facilities */}
        <div className="flex bg-white border-round p-4" style={{ flex: "18%" }}>
          <PieChart
            categories={vaccinationLabels}
            series={vaccinationData}
            height={200}
            title="Vaccination Facilities"
            vertical="bottom"
            horizontal="center"
          />
        </div>

        {/* "Mortality Rate" */}
        <div
          className="flex flex-column bg-white border-round p-4"
          style={{ flex: "35%" }}
        >
          <GroupedBarChart
            title="Mortality Rate"
            labels={years}
            dataSeries={mortalityData}
            dataPointWidth={8}
            height={200}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* Chronic Diseases*/}
        <div className="flex bg-white border-round p-4" style={{ flex: "51%" }}>
          {/* <GroupedColumnChart
            title="Prevailing Chronic Diseases"
            labels={years}
            dataSeries={chronicDataWithDiseases}
            dataPointWidth={10}
            height={200}
          /> */}
          <StackedBarChart
            title="Chronic Disease Distribution"
            categories={chronicDiseases}
            series={chronicData}
            labels={years}
            height={200}
          />
          {/* <ChronicDiseaseDistributionByYear/> */}
        </div>

        {/* SuicideCasesChart */}
        <div className="flex bg-white border-round p-4" style={{ flex: "32%" }}>
          <SuicideCasesChart categories={years} series={suicideData} />
        </div>

        {/* Patients of Mental Illness */}
        <div className="flex bg-white border-round p-4" style={{ flex: "22%" }}>
          <Doughnut
            title="Patients of Mental Illness"
            labels={mentalPatientsLabels}
            series={mentalPatientsData}
            height={200}
            showNo={true}
          />
        </div>
      </div>

      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *Data updated till 2020. These numbers are subject to variation.
      </p>

      {show && (
        <Panel
          //  header="View Recommendations"
          toggleable
          onToggle={handleToggleRecommendations} // Optional: if you want to perform an action on toggleheaderTemplate={(options) => {
          headerTemplate={(options) => {
            const toggleIcon = options.collapsed
              ? "pi pi-chevron-right" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-down"; // Arrow pointing down when expanded

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
          {recommendationsVisible && <LandRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Healthcare;
