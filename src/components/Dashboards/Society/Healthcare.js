import React from "react";
import { Card } from "primereact/card";
import InfoIcon from "@mui/icons-material/Info";
import { Panel } from "primereact/panel";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Color palette for charts
const colors = [
  "#26575D",
  "#1F8297",
  "#4D7479",
  "#4C9BAC",
  "#98C6CF",
  "#F7A47A",
  "#47B881",
  "#FFDD82",
  "#F64C4C",
  //   "#557C56",
  //   "#90D26D",
  //   "#6A9C89",
  //   "#B5C18E",
  //   "#41B3A2",
  //   "#BDE8CA",
  //   "#C4DAD2",
  //   "#9CDBA6",
  //   "#95D2B3",
  //   "#729762",
];

// Doughnut Chart Component
const DoughnutChart = ({ title, labels, series, height }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 10,
      fontFamily: "DM Sans",
      fontWeight: "800",
    },
    data: [
      {
        type: "doughnut",
        startAngle: 20,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: false,
        color: colors,
        indexLabel: "{label} (#percent%)",
        indexLabelFontSize: 8,
        indexLabelFontFamily: "DM Sans",
        indexLabelFontWeight: 700,
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colors[index % colors.length],
        })),
      },
    ],
    legend: {
      fontSize: 7,
      horizontalAlign: "center",
      verticalAlign: "bottom",
    },
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

// Bar Chart Component
export const BarChart = ({
  title,
  titleOptions = {},
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
  labelFontSize = 8,
  indexLabelFontFamily = "DM Sans",
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 10,
          fontFamily: titleOptions.fontFamily || "DM Sans",
          fontWeight: titleOptions.fontWeight || "bold",
          color: titleOptions.color || "#333",
          horizontalAlign: titleOptions.align || "center",
          padding: titleOptions.padding || { bottom: 10 },
        },
        axisX: {
          gridThickness: 0,
          labelFontSize: labelFontSize,
        },
        axisY: {
          gridThickness: 0,
          labelFontSize: labelFontSize,
          indexLabelFontFamily: "DM Sans",
        },
        data: [
          {
            type: "column",
            showInLegend: false,
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              indexLabel: `{y}`,
              indexLabelFontSize: 10,
              indexLabelPlacement: "outside",
              color: colors[index % colors.length],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

// Main Healthcare Component
const Healthcare = () => {
  // Data for the charts
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
  const doctorsData = [
    { year: 2019, patients: 5000 },
    { year: 2020, patients: 5300 },
    { year: 2021, patients: 5600 },
    { year: 2022, patients: 5800 },
    { year: 2023, patients: 6000 },
  ];

  const vaccinationData = [150, 80, 60]; // Example data
  const vaccinationLabels = [
    "Newborn Baby Immunization",
    "Flu Vaccinations",
    "Cervical Cancer Screenings",
  ];
  return (
    <div className="flex flex-column gap-3 p-5">
      <Panel>
        <div className="flex align-items-center justify-content-center w-full gap-3">
          <Card className="w-full ">
            <div className="flex align-items-center justify-content-center flex-column gap-4 text-center w-full">
              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                800
              </h1>
              <h1 className=" m-0 p-0 text-xs text-center">
                Number of Registered Doctors (Certified)
              </h1>

              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                1987
              </h1>
              <h1 className=" m-0 p-0 text-xs text-center">
                Number of Registered Health Workers
              </h1>

              <h1 className="text-theme text-xl font-bold text-center p-0 m-0">
                200
              </h1>
              <h1 className=" m-0 p-0 text-xs text-center">
                Number of Doctor's Clinics
              </h1>
            </div>
          </Card>
          <Card className="w-full ">
            <div className="flex align-items-start justify-content-between  text-center w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-center w-full">
                <h1 className=" m-0 p-0 text-xs">Healthcare Institutions</h1>
                <div className="flex align-items-start justify-content-start gap-1 text-center w-full">
                  <DoughnutChart
                    title=""
                    labels={hospitalLabels}
                    series={hospitalData}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </Card>
          <Card className="w-full ">
            <div className="flex align-items-start justify-content-between  text-center w-full">
              <div className="flex align-items-start justify-content-start flex-column gap-3 text-center w-full">
                <h1 className=" m-0 p-0 text-xs">
                  Non-Government Institutions
                </h1>
                <div className="flex align-items-start justify-content-start gap-1 text-center w-full">
                  <DoughnutChart
                    title=""
                    labels={["Nursing Homes", "Private Hospitals"]}
                    series={[60, 69]}
                    height={150}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Panel>

      <Panel>
        <div className="flex align-items-center justify-content-center gap-3 w-full">
          <Card className="w-full">
            <BarChart
              title="Registered Patients per Year"
              categories={doctorsData.map((data) => data.year)}
              series={doctorsData.map((data) => data.patients)}
              height={200}
              width="100%"
              xtitle="Year"
              ytitle="No. of Patients"
            />
          </Card>
          {/* Chronic Diseases Doughnut Chart */}
          <Card className="w-full">
            <DoughnutChart
              title="Chronic Disease Distribution"
              labels={chronicDiseaseLabels}
              series={chronicDiseaseData}
              height={200}
            />
          </Card>
          <Card className="w-full">
            <DoughnutChart
              title="Mortality Rate"
              labels={mortalityInfantPregnantLabels}
              series={mortalityInfantPregnantData}
              height={200}
            />
          </Card>
        </div>
      </Panel>
      <Panel>
        <div className="flex align-items-center justify-content-center gap-3 w-full">
          <Card className="w-full">
            <DoughnutChart
              title="Health Insurance Per Capita"
              labels={healthInsuranceLabels}
              series={healthInsuranceData}
              height={200}
            />
          </Card>
          <Card className="w-full">
            <BarChart
              title="Vaccination Facilities"
              categories={vaccinationLabels}
              series={vaccinationData}
              height={200}
              width="100%"
              xtitle="Vaccination Type"
              ytitle="Number of Vaccinations"
            />
          </Card>

          <Card className="w-full">
            <BarChart
              title="Number of Registered NABL Accredited Diagnostic Centres"
              categories={diagnosticCentersCategories}
              series={diagnosticCentersData}
              height={200}
              width="100%"
              xtitle="Diagnostic Centre Type"
              ytitle="Number of Centres"
            />
          </Card>
        </div>
      </Panel>
    </div>
  );
};

export default Healthcare;
