import React, { useState } from "react";
import { Doughnut, GroupedColumnChart, PieChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import EmploymentReportPrint from "./EmploymentReportPrint";
import { Panel } from "primereact/panel";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import employment from "assets/employment.svg";
import salary from "assets/salary.svg";
import brain from "assets/brain.svg";
import EmploymentRecommendations from "./EmploymentRecommendations";
import increase from "assets/increase.png";

const Employment = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  const employmentLables = [
    "Self employed",
    "Government",
    "Private",
    "Informal",
  ];
  const employmentData = [150, 270, 350, 500];

  const industriesLables = [
    "Services",
    "Manufacturing",
    "Advertising",
    "Telecommunication",
  ];
  const industriesData = [12, 7, 15, 2];

  const jobTrendLabels = [
    { name: "Government", data: [10, 9, 8, 7] },
    { name: "Private", data: [7, 4, 9, 5] },
  ];
  const years = [2021, 2022, 2023, 2024];

  return (
    <div className="gap-3 p-4 flex flex-column">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Employment Opportunity
          </h1>

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
            <EmploymentReportPrint />
          </Dialog>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex gap-3 flex-column" style={{ flex: "37%" }}>
          {/* Total population Employed */}
          <div className="flex flex-column align-items-center bg-white border-round-xl p-3 w-full gap-3">
            <div className="flex justify-content-between align-items-center gap-8">
              <div className="flex flex-column gap-3 align-items-start">
              <p className="card-title p-0 m-0">
                  Total Population Employed
                </p>
                <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                  14500
                </p>
              </div>
              <img src={employment} alt="employment" className="w-10rem" />
            </div>

            {/* Types of Employment */}
            <div className="flex sec-theme border-round-xl align-items-center p-2 w-full">
              <Doughnut
                title="Types of Employment"
                labels={employmentLables}
                series={employmentData}
                height={160}
                colorArray={["#FFDD82", "#F7A47A", "#98C6CF", "#1F8297"]}
                horizontal={"right"}
                vertical={"center"}
                fontColor={"#6F7070"}
              />
            </div>
          </div>
          {/* Total no. of Industries */}
          <div className="flex bg-white border-round-xl p-2 w-full">
            <PieChart
              title="Total Industries"
              categories={industriesLables}
              series={industriesData}
              height={205}
              vertical="center"
              horizontal="right"
              fontSize={10}
            />
          </div>
        </div>

        <div className="flex gap-3 flex-column" style={{ flex: "63%" }}>
          <div className="flex gap-3 w-full ">
            {/* Employed Females */}
            <div className="flex flex-column bg-white border-round-xl p-4 gap-4 w-full">
            <p className="card-title p-0 m-0">
                Employed Females
              </p>
              <div className="flex align-content-center justify-content-center">
                <div className=" w-10rem custom-circular-progress ">
                  <CircularProgressbar
                    value={32}
                    text="32%"
                    strokeWidth={8}
                    styles={buildStyles({
                      pathColor: "#FFAD0D",
                      textColor: "#001F23",
                      trailColor: "#E7EAEA",
                      textSize: "1.5rem",
                      pathTransition: "stroke-dashoffset 0.5s ease 0s",
                      transform: "rotate(2.25turn)",
                    })}
                  />
                </div>
              </div>
              <div className="flex align-items-center justify-content-start">
                <img
                  src={increase}
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                />
                <p className="text-tertiary3 p-0 m-0 font-medium">
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
                </p>
              </div>
            </div>
            {/* Unemployment Rate */}
            <div className="flex flex-column bg-white border-round-xl p-4 gap-4 w-full">
            <p className="card-title p-0 m-0">
                Unemployed Population
              </p>
              <div className="flex align-content-center justify-content-center">
                <div className="w-10rem custom-circular-progress">
                  <CircularProgressbar
                    value={53}
                    text="53%"
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
              </div>
              <div className="flex align-items-center justify-content-start">
                <img
                  src={increase}
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                />
                <p className="text-tertiary3 font-medium p-0 m-0 ">
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
                </p>
              </div>
            </div>
            {/* Unemployed Youth */}
            <div className="flex flex-column bg-white border-round-xl p-4 gap-4 w-full">
            <p className="card-title p-0 m-0">
                Unemployed Youth
              </p>
              <div className="flex align-content-center justify-content-center">
                <div className="w-10rem custom-circular-progress">
                  <CircularProgressbar
                    value={65}
                    text="65%"
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
              </div>
              <div className="flex align-items-center justify-content-start">
                <img
                  src={increase}
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                  alt="increase"
                />
                <p className="text-tertiary3 p-0 m-0 font-medium">
                  <span style={{ color: "#0C9D61" }}>8.5%</span> Up from last
                  year.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3" style={{ flex: "40%" }}>
            {/* Job Trend Over the years */}
            <div className="flex bg-white border-round-xl p-2 w-full">
              <GroupedColumnChart
                title="Job Trend Over the Years"
                labels={years}
                dataSeries={jobTrendLabels}
                dataPointWidth={20}
                height={260}
                fontSize={10}
              />
            </div>
            <div className="flex flex-column gap-3" style={{ flex: "60%" }}>
              {/* Average Salary */}
              <div className="flex flex-column justify-content-center bg-white border-round-xl p-4 w-full gap-3">
              <p className="card-title p-0 m-0">
                  Average Salary
                </p>
                <div className="flex gap-3 align-items-center">
                  <img src={salary} alt="salary" className="w-12rem" />
                  <div className="flex justify-content-between">
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-3xl font-semibold m-0 text-secondary2 p-0">
                        25000
                      </p>
                      <p className="card-text p-0 m-0">
                        City
                      </p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center gap-1">
                      <p className="text-3xl font-semibold m-0 text-primary2 p-0">
                        17500
                      </p>
                      <p className="card-text p-0 m-0">
                        National
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skill Programs */}
              <div className="flex bg-white border-round-xl p-2 w-full align-items-center justify-content-around">
                <div className="flex">
                  <div className="flex flex-column w-full align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                      47
                    </p>
                    <p className="p-0 m-0 card-text">
                      Skill Programs
                    </p>
                  </div>
                  <Divider layout="vertical" />
                  <div className="flex flex-column w-full align-items-center gap-1">
                    <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                      3750
                    </p>
                    <p className="p-0 m-0 card-text">
                      PeopleEnrolled
                    </p>
                  </div>
                </div>
                <img src={brain} alt="brain" className="w-8rem" />
              </div>
            </div>
          </div>
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
              ? "pi pi-chevron-down" // Arrow pointing to the right when collapsed
              : "pi pi-chevron-right"; // Arrow pointing down when expanded

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
          {recommendationsVisible && <EmploymentRecommendations />}
        </Panel>
      )}
    </div>
  );
};

export default Employment;
