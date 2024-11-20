import React, { useState } from "react";
import { Doughnut, GroupedColumnChart } from "Layout/GraphVisuals";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import EmploymentReportPrint from "./EmploymentReportPrint";
import DisasterRecommendations from "components/Dashboards/Administration/Disaster Management/DisasterRecommendations";
import { Panel } from "primereact/panel";

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
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Employment Opportunity
          </h1>

          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="bg-theme text-white"
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
          <p className="text-lg font-medium text-center p-0 m-0 text">
            Total population Employed
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            123
          </p>
          <Divider />
          <p className="text-lg font-medium text-center p-0 m-0 text">
            Percentage of Female Employment
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            12%
          </p>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-4 w-full">
          <p className="text-lg font-medium text-center p-0 m-0 text">
            Percentage of Unemployed Population
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            123%
          </p>
          <Divider />
          <p className="text-lg font-medium text-center p-0 m-0 text">
            Percentage of Unemployed Youth
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            23%
          </p>
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
            <p className="text-lg font-medium text text-center">
              Average Salary
            </p>
            <div className="flex align-items-center justify-content-between">
              <div className="flex flex-column align-items-center">
                <p className="text-xl m-0 p-0 text-secondary2 font-semibold">
                  15000
                </p>
                <h1 className="font-semibold text">City</h1>
              </div>
              <Divider layout="vertical" />
              <div className="flex flex-column align-items-center">
                <p className="text-xl m-0 p-0 text-secondary2 font-semibold">
                  18000
                </p>
                <h1 className="font-semibold text">National</h1>
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
          <p className="text-lg font-medium text-center p-0 m-0 text">
            No. of Skill Programs
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            1234
          </p>
          <Divider />
          <p className="text-lg font-medium text-center p-0 m-0 text">
            No. of People Enrolled
          </p>
          <p className="text-2xl font-semibold text-center text-secondary2">
            123
          </p>
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
          {recommendationsVisible && <DisasterRecommendations />}
        </Panel>
      )}
      
    </div>
  );
};

export default Employment;
