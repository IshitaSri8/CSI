import React from "react";
import { Card } from "primereact/card";
import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import HealthcareReportPrint from "./HealthcareReportPrint";
import { Doughnut, ColumnChart } from "Layout/GraphVisuals";

const Healthcare = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const hospitalData = [51, 129]; // Example data
  const hospitalLabels = ["Government", "Non-Government"];

  const mortalityAgeData = [20, 15, 10, 5]; // Example data
  const mortalityAgeLabels = [
    "0-5 years",
    "6-18 years",
    "19-60 years",
    "60+ years",
  ];

  const healthInsuranceData = [48, 52]; // Example data
  const healthInsuranceLabels = [
    "With Health Insurance",
    "Without Health Insurance",
  ];
  const diagnosticCentersCategories = [
    "Pathology",
    "Radiology",
    "Advanced Disease Diagnostics",
  ];
  const diagnosticCentersData = [120, 85, 45]; // Example data

  const mortalityInfantPregnantData = [65, 35]; // Example data
  const mortalityInfantPregnantLabels = ["Infants", "Pregnant Ladies"];

  const chronicDiseaseData = [40, 30, 20, 10]; // Example data
  const chronicDiseaseLabels = [
    "Cardiovascular",
    "Respiratory",
    "Diabetes",
    "Cancer",
  ];
  const doctorsLabels = [2019, 2020, 2021, 2022, 2023];
  const doctorsData = [5000, 5300, 5600, 5800, 6000];

  const vaccinationData = [150, 80, 60]; // Example data
  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];
  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-2xl text">Healthcare</h1>

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
      <div className="flex align-items-center justify-content-center w-full gap-3">
        <div className="flex flex-column w-full gap-2">
          <Card className="w-full ">
            <div className="flex flex-column align-items-center justify-content-center ">
              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                800
              </h1>
              <h1 className="m-0 p-0 text-xs text-center">
                Number of Registered Doctors (Certified)
              </h1>
            </div>
          </Card>
          <Card className="w-full ">
            <div className="flex flex-column align-items-center justify-content-center ">
              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                1987
              </h1>
              <h1 className=" m-0 p-0 text-xs text-center">
                Number of Registered Health Workers
              </h1>
            </div>
          </Card>
          <Card className="w-full ">
            <div className="flex flex-column align-items-center justify-content-center ">
              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                200
              </h1>
              <h1 className=" m-0 p-0 text-xs text-center">
                Number of Doctor's Clinics
              </h1>
            </div>
          </Card>
        </div>
        <Card className="w-full ">
          <Doughnut
            title="Healthcare Institutions"
            labels={hospitalLabels}
            series={hospitalData}
            height={200}
          />
        </Card>
        <Card className="w-full ">
          <Doughnut
            title="Non-Government Institutions"
            labels={["Nursing Homes", "Private Hospitals"]}
            series={[60, 69]}
            height={200}
          />
        </Card>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <Card className="w-full">
          <ColumnChart
            title="Registered Patients per Year"
            categories={doctorsLabels}
            series={doctorsData}
            height={200}
            // xtitle="Year"
            // ytitle="No. of Patients"
          />
        </Card>
        {/* Chronic Diseases Doughnut Chart */}
        <Card className="w-full">
          <Doughnut
            title="Chronic Disease Distribution"
            labels={chronicDiseaseLabels}
            series={chronicDiseaseData}
            height={200}
          />
        </Card>
        <Card className="w-full">
          <Doughnut
            title="Mortality Rate"
            labels={mortalityInfantPregnantLabels}
            series={mortalityInfantPregnantData}
            height={200}
          />
        </Card>
      </div>

      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <Card className="w-full">
          <Doughnut
            title="Health Insurance Per Capita"
            labels={healthInsuranceLabels}
            series={healthInsuranceData}
            height={200}
          />
        </Card>
        <Card className="w-full">
          <ColumnChart
            title="Vaccination Facilities"
            categories={vaccinationLabels}
            series={vaccinationData}
            height={200}
            width="100%"
            // xtitle="Vaccination Type"
            // ytitle="Number of Vaccinations"
          />
        </Card>

        <Card className="w-full">
          <ColumnChart
            title="Number of Registered NABL Accredited Diagnostic Centres"
            categories={diagnosticCentersCategories}
            series={diagnosticCentersData}
            height={200}
            width="100%"
            // xtitle="Diagnostic Centre Type"
            // ytitle="Number of Centres"
          />
        </Card>
      </div>
      <div className="flex justify-content-end">
      <Button
        label={recommendationsVisible ? "Close Recommendations" : "Get Recommendations"}
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
