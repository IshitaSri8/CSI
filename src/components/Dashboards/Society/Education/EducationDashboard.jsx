import React, { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Doughnut, LineChart } from "Layout/GraphVisuals";
import { primaryData } from "./PrimaryData";
import { secondaryData } from "./SecondaryData";
import { higherEducationData } from "./HigherEducationData";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import StackedColumnChart from "./StackedColumnChart";

const EducationDashboard = () => {
  const [selectedLevel, setSelectedLevel] = useState("Primary");
  const educationDataMap = {
    Primary: primaryData,
    Secondary: secondaryData,
    "Higher Education": higherEducationData,
  };
  const educationData = educationDataMap[selectedLevel];
  const [ReportVisible, setReportVisible] = useState(false);
  const years = ["2021", "2022", "2023", "2024"];

  const levels = ["Primary", "Secondary", "Higher Education"];

  return (
    <div className="w-full p-5 flex flex-column gap-2">
      <div className="flex justify-content-between">
        <h1 className="text-2xl font-bold">Education</h1>
        {/* Dropdown for selecting education level */}
        <div className="flex gap-2">
          <Dropdown
            value={selectedLevel}
            options={levels}
            onChange={(e) => setSelectedLevel(e.value)}
            placeholder="Select Education Level"
            className="mb-4 bg-white border-1 border-cyan-800"
          />
          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="mb-4 bg-white text-theme border-1 border-cyan-800"
          />
        </div>
      </div>
      <h1 className="text-3xl text-theme font-semibold text-center m-0 p-0 mb-2">
        {selectedLevel}
      </h1>

      {/* First row with parameter cards */}
      <div className="flex gap-2 justify-content-between">
        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">
            Total students enrolled
          </p>
          <h1 className="text-xl m-0 p-0 text-center">
            {educationData.enrollment}
          </h1>
        </Card>
        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">
            No. of Institutions
          </p>
          <h1 className="text-xl m-0 p-0 text-center">
            {educationData.institutions}
          </h1>

          <i className="pi pi-info-circle text-theme w-full text-right institutions text-xs"></i>

          <Tooltip
            target=".institutions"
            position="right"
            style={{ backgroundColor: "white !important" }}
            tooltipOptions={{
              className: "hoverClass",
              showDelay: 500,
              hideDelay: 101300,
            }}
          >
            <div className="flex w-full">
              <Doughnut
                labels={educationData.institutionsLabels}
                series={educationData.institutionsData}
                height={100}
                fontColor={"black"}
              />
            </div>
          </Tooltip>
        </Card>

        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">
            Teacher vs Student Ratio
          </p>
          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.teacherStudentRatioTarget}
              </p>
              <h1>Target</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.teacherStudentRatioCurrent}
              </p>
              <h1>Current</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {(
                  ((educationData.teacherStudentRatioTargerValue -
                    educationData.teacherStudentRatioCurrentValue) /
                    educationData.teacherStudentRatioTargetValue) *
                  100
                ).toFixed(2)}
                %
              </p>
              <h1>Gap Percentage</h1>
            </div>
          </div>
        </Card>
      </div>

      {/* Second row with corresponding charts */}
      <div className="flex gap-2 mb-3">
        <Card className="w-full">
          <Doughnut
            title="Gender Parity Index- 0.8"
            labels={educationData.genderLabels}
            series={educationData.genderData}
            height={200}
            fontColor={"black"}
          />
        </Card>
        <Card className="w-full">
          <StackedColumnChart
            title="Institution Gap Analysis"
            labels={educationData.institutionsAnalysisLabels}
            dataSeries={educationData.institutionsAnalysisData}
            years={years}
          />
        </Card>

        <Card className="w-full">
          <LineChart
            title="Teacher vs Student Ratio"
            categories={educationData.years}
            data={educationData.teacherStudentRatioTrend}
            fontColor={"black"}
          />
        </Card>
      </div>
      <div className="flex w-full gap-2">
        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">
            Adjusted Net Enrollment Ratio
          </p>

          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.enrollmentRatioTarget}
              </p>
              <h1>Target</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.enrollmentRatioCurrent}
              </p>
              <h1>Current</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {(
                  ((educationData.enrollmentRatioTargetValue -
                    educationData.enrollmentRatioCurrentValue) /
                    educationData.enrollmentRatioTargetValue) *
                  100
                ).toFixed(2)}
                %
              </p>
              <h1>Gap Percentage</h1>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">Dropout Ratio</p>

          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.dropoutRatioTarget}
              </p>
              <h1>Target</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.dropoutRatioCurrent}
              </p>
              <h1>Current</h1>
            </div>
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {" "}
                {(
                  ((educationData.dropoutRatioTargetValue -
                    educationData.dropoutRatioCurrentValue) /
                    educationData.dropoutRatioTargetValue) *
                  100
                ).toFixed(2)}
                %
              </p>
              <h1>Gap Percentage</h1>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex w-full gap-2">
        <Card className="w-full">
          <StackedColumnChart
            title="Enrollment Ratio Trend"
            labels={educationData.years}
            dataSeries={educationData.enrollmentTrendData}
            years={years}
          />
        </Card>
        <Card className="w-full">
          <StackedColumnChart
            title="Dropout Ratio Trend"
            labels={educationData.years}
            dataSeries={educationData.dropoutTrendData}
            years={years}
          />
        </Card>
      </div>
    </div>
  );
};

export default EducationDashboard;
