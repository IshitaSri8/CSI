import React, { useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Doughnut, LineChart, GroupedColumnChart } from "Layout/GraphVisuals";
import { primaryData } from "./PrimaryData";
import { secondaryData } from "./SecondaryData";
import { higherEducationData } from "./HigherEducationData";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import EducationReportPrint from "./EducationReportPrint";

const EducationDashboard = ({ show }) => {
  const [selectedLevel, setSelectedLevel] = useState("Primary");
  const educationDataMap = {
    Primary: primaryData,
    Secondary: secondaryData,
    Higher: higherEducationData,
  };
  const educationData = educationDataMap[selectedLevel];
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };
  const years = ["2021", "2022", "2023", "2024"];

  const levels = ["Primary", "Secondary", "Higher"];

  return (
    <div className="p-4 flex flex-column gap-3">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Education
          </h1>
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
              <EducationReportPrint />
            </Dialog>
          </div>
        </div>
      )}
      <h1 className="text-3xl text-theme font-medium text-center mt-0 p-0 mb-2">
        {selectedLevel} Level Education
      </h1>

      {/* First row with parameter cards */}
      <div className="flex gap-2 justify-content-center align-items-stretch">
        <Card className="w-full flex flex-column align-items-center justify-content-center">
          <p className="text-lg font-semibold text-center">
            Total students enrolled
          </p>
          <p className="text-2xl font-bold text-center">
            {educationData.enrollment}
          </p>
        </Card>
        <Card className="w-full">
          <i className="pi pi-info-circle text-theme w-full text-right institutions text-sm"></i>
          <Tooltip target=".institutions" position="right">
            <div className="w-10rem">
              <Doughnut
                labels={educationData.institutionsLabels}
                series={educationData.institutionsData}
                height={100}
                fontColor={"black"}
              />
            </div>
          </Tooltip>
          <p className="text-lg font-semibold text-center">
            No. of Institutions
          </p>
          <p className="text-2xl font-bold text-center">
            {educationData.institutions}
          </p>
        </Card>

        <Card className="w-full">
          <p className="text-lg font-medium text-center mb-4">
            Teacher vs Student Ratio
          </p>
          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.teacherStudentRatioTarget}
              </p>
              <h1>Target</h1>
            </div>
            <Divider
              layout="vertical"
              style={{
                height: "100px",
                backgroundColor: "#007bff",
                width: "2px",
              }}
            />
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.teacherStudentRatioCurrent}
              </p>
              <h1>Current</h1>
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
              <p className="text-xl m-0 p-0">
                {(
                  ((educationData.teacherStudentRatioTargetValue -
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
      <div className="flex gap-2 mb-2">
        <Card className="w-full">
          <Doughnut
            title={`Gender Parity Index - ${educationData.parityIndex}`}
            labels={educationData.genderLabels}
            series={educationData.genderData}
            height={200}
            fontColor={"black"}
          />
        </Card>
        <Card className="w-full">
          <GroupedColumnChart
            title="Institution Gap Analysis"
            labels={educationData.institutionsAnalysisLabels}
            dataSeries={educationData.institutionsAnalysisData}
            dataPointWidth={40}
            height={200}
          />
        </Card>

        <Card className="w-full">
          <LineChart
            title="No. of Students per Teacher"
            categories={educationData.years}
            data={educationData.teacherStudentRatioTrend}
            fontColor={"black"}
          />
        </Card>
      </div>
      <div className="flex w-full gap-2">
        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">
            Adjusted Net Enrollment Rate
          </p>

          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.enrollmentTarget}
              </p>
              <h1>Target</h1>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.enrollmentCurrent}
              </p>
              <h1>Current</h1>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {(
                  educationData.enrollmentTarget -
                  educationData.enrollmentCurrent
                ).toFixed(2)}{" "}
                %
              </p>
              <h1>Gap Percentage</h1>
            </div>
          </div>
        </Card>

        <Card className="w-full">
          <p className="text-xl font-medium text-center mb-4">Dropout Rate</p>

          <div className="flex align-items-center justify-content-around">
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.dropoutRatioTargetValue}
              </p>
              <h1>Target</h1>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {educationData.dropoutRatioCurrentValue}
              </p>
              <h1>Current</h1>
            </div>
            <Divider layout="vertical" />
            <div className="flex flex-column align-items-center">
              <p className="text-xl m-0 p-0">
                {" "}
                {(
                  ((educationData.dropoutRatioCurrentValue -
                    educationData.dropoutRatioTargetValue) /
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
          <GroupedColumnChart
            title="Enrollment Rate Trend"
            labels={educationData.years}
            dataSeries={educationData.enrollmentTrendData}
            years={years}
            dataPointWidth={40}
            height={200}
          />
        </Card>
        <Card className="w-full">
          <GroupedColumnChart
            title="Dropout Rate Trend"
            labels={educationData.years}
            dataSeries={educationData.dropoutTrendData}
            years={years}
            dataPointWidth={40}
            height={200}
          />
        </Card>
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

export default EducationDashboard;
