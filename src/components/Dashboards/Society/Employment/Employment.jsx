import React, { useState } from "react";
import { Card } from "primereact/card";
import { Doughnut, GroupedColumnChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import EmploymentReportPrint from "./EmploymentReportPrint";

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
  const employmentData = [150, 270, 550, 100];

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
          <h1 className="m-0 p-0 text-primary1 text-xl text-medium">
            Employment Opportunity
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
            <EmploymentReportPrint />
          </Dialog>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <i className="pi pi-info-circle text-theme w-full text-right employment text-sm"></i>
          <Tooltip target=".employment" position="right">
            <div className="w-13rem">
              <Doughnut
                labels={employmentLables}
                series={employmentData}
                height={150}
                fontColor={"black"}
              />
            </div>
          </Tooltip>
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            Total population Employed
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">123</p>
          <Divider />
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            Percentage of Female Employment
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">12%</p>
        </div>
           <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            Percentage of Unemployed Population
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">123%</p>
          <Divider />
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            Percentage of Unemployed Youth
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">23%</p>
        </div>

           <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <Doughnut
            title="Total no. of Industries"
            labels={industriesLables}
            series={industriesData}
            height={200}
            fontColor={"black"}
            showNo={true}
          />
        </div>
           <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <div className="flex flex-column align-items-center justify-content-center">
            <p className="text-lg font-semibold text-center">Average Salary</p>
            <div className="flex align-items-center justify-content-around">
              <div className="flex flex-column align-items-center">
                <p className="text-xl m-0 p-0">15000</p>
                <h1>City</h1>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column align-items-center">
                <p className="text-xl m-0 p-0">18000</p>
                <h1>National</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div
          className="flex flex-column bg-white border-round align-items-center p-4 w-full"
          style={{ flex: "30%" }}
        >
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            No. of Skill Programs
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">1234</p>
          <Divider />
          <p className="text-lg font-semibold text-center p-0 m-0 text-primary1">
            No. of People Enrolled
          </p>
          <p className="text-2xl font-bold text-center text-secondary2">123</p>
        </div>
        <div
          className="flex bg-white border-round align-items-center p-4 w-full"
          style={{ flex: "70%" }}
        >
          <GroupedColumnChart
            title="Job Trend"
            labels={years}
            dataSeries={jobTrendLabels}
            dataPointWidth={50}
            height={200}
          />
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

export default Employment;
