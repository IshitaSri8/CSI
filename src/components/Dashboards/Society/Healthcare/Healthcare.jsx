import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import HealthcareReportPrint from "./HealthcareReportPrint";
import {
  Doughnut,
  ColumnChart,
  StackedBarChart,
  StackedColumnChart,
  GroupedColumnChart,
  BarChart,
} from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import { PatientsRegisteredChart } from "./PatientsRegisteredChart";

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
  // const chronicData = [
  //   [10, 3, 6, 1, 0],
  //   [28, 1, 2, 39, 0],
  //   [7, 5, 23, 14, 0],
  //   [22, 2, 29, 25, 0],
  //   [26, 3, 19, 226, 0]
  // ];
  // const chronicDiseases= ["Malaria", "J.E.", "A.E.S", "Dengue", "Chikengunia"]
  const chronicDataWithDiseases = [
    {
      name: "Malaria",
      data: [10, 28, 7, 22, 26], // Yearly data for Malaria
    },
    {
      name: "J.E.",
      data: [3, 1, 5, 2, 3], // Yearly data for J.E.
    },
    {
      name: "A.E.S",
      data: [6, 2, 23, 29, 19], // Yearly data for A.E.S.
    },
    {
      name: "Dengue",
      data: [1, 39, 14, 25, 226], // Yearly data for Dengue
    },
    {
      name: "Chikengunia",
      data: [0, 0, 0, 0, 0], // Yearly data for Chikengunia
    },
  ];

  const institutionsAnalysisData = [
    { name: "Target", data: [250, 300] },
    { name: "Existing", data: [146, 198] },
  ];

  const mortalityData = [65, 35]; // Example data
  const mortalityLabels = ["Infants", "Pregnant Ladies"];

  const vaccinationData = [150, 80, 60]; // Example data
  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];

  const ageGroup = ["0-18", "19-35", "36-60", "61+"];
  const suicideData= [270, 328, 232, 150];

  const mentalPatientsLabels = ["Addiction", "Depression", "Anxiety", "Schizophrenia"];
  const mentalPatientsData = [270, 328, 232, 150];

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
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
      <div className="flex w-full gap-3">
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            No. of Doctors
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">12345</p>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            No. of Nurses
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">1234</p>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            No. of other medical staff
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">123</p>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            Total Healthcare Institutes
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">531</p>
          </div>
          <i className="pi pi-info-circle text-theme w-full text-right hospital text-sm"></i>
          <Tooltip target=".hospital" position="left">
            <div className="w-10rem">
              <Doughnut
                labels={Labels}
                series={hospitalData}
                height={100}
                fontColor={"black"}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            Total Laboratories
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">42</p>
          </div>
          <i className="pi pi-info-circle text-theme w-full text-right laboratories text-sm"></i>
          <Tooltip target=".laboratories" position="left">
            <div className="w-10rem">
              <Doughnut
                labels={Labels}
                series={laboratoriesData}
                height={100}
                fontColor={"black"}
              />
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <div className="flex flex-column gap-3 w-full">
          <div className="flex bg-white border-round p-3 flex-column ">
            <p className="text-lg font-semibold text-center">No. of Beds Available</p>
            <div className="flex align-items-center justify-content-around">
              <div className="flex flex-column">
                <p className="text-primary1 m-0 p-0 font-medium">
                  Target:{bedsTarget}
                </p>
                <p className="text-primary1 m-0 p-0 font-medium">
                  Current:{bedsCurrent}
                </p>
              </div>
              <Divider
                layout="vertical"
                style={{
                  height: "100px",
                  backgroundColor: "#007bff",
                  width: "5px",
                }}
              />
              <div className="flex flex-column align-items-center">
                <p className=" m-0 p-0 font-medium">
                  {((bedsTarget - bedsCurrent) / bedsTarget) * 100}%
                </p>
                <p className="text-primary1 font-semibold text-sm p-0 m-0">
                  Gap Percentage
                </p>
              </div>
            </div>
          </div>
          <div className="flex bg-white border-round p-3 flex-column ">
            <p className="text-lg font-semibold text-center">
              Patient Doctor Ratio
            </p>
            <div className="flex align-items-center justify-content-around">
              <div className="flex flex-column">
                <p className="text-primary1 m-0 p-0 font-medium">
                  Target:{ratioTarget}
                </p>
                <p className="text-primary1 m-0 p-0 font-medium">
                  Current:{ratioCurrent}
                </p>
              </div>
              <Divider
                layout="vertical"
                style={{
                  height: "100px",
                  backgroundColor: "#007bff",
                  width: "5px",
                }}
              />
              <div className="flex flex-column align-items-center">
                <p className=" m-0 p-0 font-medium">
                  {((ratioTarget - ratioCurrent) / ratioTarget) * 100}%
                </p>
                <p className="text-primary1 text-sm font-semibold p-0 m-0">
                  Gap Percentage
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-white border-round p-4 w-full">
          <ColumnChart
            title="Total Vaccination acilities= 5678"
            categories={vaccinationLabels}
            series={vaccinationData}
            height={200}
            // xtitle="Vaccination Type"
            // ytitle="Number of Vaccinations"
          />
        </div>
        <div className="flex bg-white border-round p-4 w-full">
          <GroupedColumnChart
            title="Healthcare Institutes Analysis"
            labels={Labels}
            dataSeries={institutionsAnalysisData}
            dataPointWidth={40}
            height={200}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* Chronic Diseases*/}
        <div className="flex bg-white border-round p-4 w-full">
          <GroupedColumnChart
            title="Prevailing Chronic Diseases"
            labels={years}
            dataSeries={chronicDataWithDiseases}
            dataPointWidth={10}
            height={200}
          />
          {/* <StackedBarChart
            title="Chronic Disease Distribution"
            categories={chronicDiseases}
            series={chronicData}
            labels={years}
            height={400}
          /> */}
        </div>

        <div className="flex bg-white border-round p-4 w-full">
          <PatientsRegisteredChart categories={years} series={doctorsData} />
        </div>
        <div className="flex bg-white border-round p-4 w-full">
          <BarChart
            title="Mortality Rate (Total number of New Borns=2700)"
            categories={mortalityLabels}
            series={mortalityData}
            height={200}
          />
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* Chronic Diseases*/}
        <div className="flex bg-white border-round p-4 w-full">
          <BarChart
            title="Suicide Cases Analysis"
            categories={ageGroup}
            series={suicideData}
            height={200}
          />
        </div>

        <div className="flex bg-white border-round p-4 w-full">
          <ColumnChart
            title="Patients of Mental Illness"
            categories={mentalPatientsLabels}
            series={mentalPatientsData}
            height={200}
          />
        </div>
        <div className="flex flex-column bg-white border-round p-4 w-full align-items-center gap-6">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            No. of Rehab Centers
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">15</p>
          </div>
          <i className="pi pi-info-circle text-theme w-full text-right rehab text-sm"></i>
          <Tooltip target=".rehab" position="left">
            <div className="flex align-items-start justify-content-start gap-2 p-2 flex-column">
              <h1 className="m-0 p-0 text-lg text-cyan-800">
                List of Rehab Centers
              </h1>
              <ul>
                <li>Center: 1</li>
                <li>Center: 2</li>
                <li>Center: 3</li>
                <li>Center: 4</li>
              </ul>
            </div>
          </Tooltip>
        </div>
      </div>

      <div className="flex justify-content-end">
        <Button
          label={
            recommendationsVisible
              ? "Close Recommendations"
              : "View Recommendations"
          }
          icon={recommendationsVisible ? "pi pi-times" : "pi pi-check-square"}
          onClick={handleToggleRecommendations}
          className="bg-theme text-white"
          raised
        />
      </div>

      {/* {recommendationsVisible && (
        <DisasterRecommdations />
      )} */}
    </div>
  );
};

export default Healthcare;
