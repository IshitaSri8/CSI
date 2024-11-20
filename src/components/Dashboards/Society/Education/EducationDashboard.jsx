import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview"; 
import { Doughnut, LineChart, GroupedColumnChart } from "Layout/GraphVisuals";
import { primaryData } from "./PrimaryData";
import { secondaryData } from "./SecondaryData";
import { higherEducationData } from "./HigherEducationData";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import EducationReportPrint from "./EducationReportPrint";
import { ProgressBar } from "primereact/progressbar";
import LandRecommendations from "components/Dashboards/Environment/Land/LandRecommendations";
import { Panel } from "primereact/panel";

const EducationDashboard = ({ show }) => {
  const [selectedLevel, setSelectedLevel] = useState(0); // Use index for selected level (0 = Primary, 1 = Secondary, 2 = Higher)
  const educationDataMap = {
    Primary: primaryData,
    Secondary: secondaryData,
    Higher: higherEducationData,
  };
  const levels = [
    "Primary Education",
    "Secondary Education",
    "Higher Education",
  ];
  const educationData = Object.values(educationDataMap)[selectedLevel];
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const years = ["2021", "2022", "2023", "2024"];

  return (
    <div className="flex flex-column">
      {show && (
        <div className="flex align-items-center justify-content-end w-full">
          {/* <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">Education</h1> */}

          <Button
            label="Generate Report"
            icon="pi pi-file"
            onClick={() => setReportVisible(true)}
            className="bg-theme text-white mr-3"
            style={{ marginBottom: -60 }}
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
      )}

      {/* Tab Panel for selecting education level */}
      <TabView
        activeIndex={selectedLevel}
        onTabChange={(e) => setSelectedLevel(e.index)}
      >
        {levels.map((level, index) => (
          <TabPanel header={level} key={index}>
            {/* <h1 className="text-3xl text-theme font-medium text-center mt-0 p-0 mb-2">
              {level} Level Education
            </h1> */}
            <div className="flex flex-column gap-3">
              {/* First row with parameter cards */}
              <div className="flex gap-3 justify-content-center align-items-stretch">
                <div
                  className="flex flex-column justify-content-center align-items-center bg-white border-round gap-3"
                  style={{ flex: "25%" }}
                >
                  <Doughnut
                    title="Total students enrolled"
                    labels={educationData.genderLabels}
                    series={educationData.genderData}
                    height={150}
                    fontColor={"black"}
                    showNo={true}
                  />
                </div>
                <div
                  className="flex flex-column justify-content-center align-items-center bg-white border-round p-3"
                  style={{ flex: "10%" }}
                >
                  <p className="text p-0 m-0 mb-1 font-medium text-lg">
                    Gender Parity Index
                  </p>
                  <p className="text-3xl font-semibold m-0 text-secondary2 p-0 text-center">
                    {educationData.parityIndex}
                  </p>
                </div>
                <div
                  className="flex flex-column bg-white border-round p-3"
                  style={{ flex: "25%" }}
                >
                  <Doughnut
                    title="No. of Institutions"
                    labels={educationData.institutionsLabels}
                    series={educationData.institutionsData}
                    height={150}
                    fontColor={"black"}
                    showNo={true}
                  />
                </div>

                <div
                  className="flex flex-column bg-white border-round p-3 justify-content-between"
                  style={{ flex: "40%" }}
                >
                  <p className="text p-0 m-0 text-lg font-medium">
                    Teacher vs Student Ratio
                  </p>
                  <div className="flex my-3">
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-2xl font-semibold m-0 text-secondary2 p-0">
                        {educationData.teacherStudentRatioTarget}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Target</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-2xl font-semibold m-0 text-primary2 p-0">
                        {educationData.teacherStudentRatioCurrent}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Current</p>
                    </div>
                  </div>
                  <ProgressBar
                    value={(
                      ((educationData.teacherStudentRatioTargetValue -
                        educationData.teacherStudentRatioCurrentValue) /
                        educationData.teacherStudentRatioTargetValue) *
                      100
                    ).toFixed(2)}
                    style={{ height: "0.75rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color="#FFAD0D"
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="text-tertiary3 p-0 m-0 font-semibold">
                    Gap:{" "}
                    <span className="text-primary1">
                      {" "}
                      {(
                        ((educationData.teacherStudentRatioTargetValue -
                          educationData.teacherStudentRatioCurrentValue) /
                          educationData.teacherStudentRatioTargetValue) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
              </div>

              {/* Second row with corresponding charts */}
              <div className="flex gap-3">
                <div
                  className="flex flex-column bg-white border-round p-4"
                  style={{ flex: "60%" }}
                >
                  <GroupedColumnChart
                    title="Institution Gap Analysis"
                    labels={educationData.institutionsAnalysisLabels}
                    dataSeries={educationData.institutionsAnalysisData}
                    dataPointWidth={50}
                    height={150}
                  />
                </div>

                <div
                  className="flex flex-column bg-white border-round p-4"
                  style={{ flex: "40%" }}
                >
                  <LineChart
                    title="No. of Students per Teacher"
                    categories={educationData.years}
                    data={educationData.teacherStudentRatioTrend}
                    fontColor={"black"}
                  />
                </div>
              </div>

              <div className="flex w-full gap-3">
                {/* Adjusted Net Enrollment Rate */}
                <div
                  className="flex flex-column bg-white border-round p-3 justify-content-between"
                  style={{ flex: "10%" }}
                >
                  <p className="text p-0 m-0 text-lg font-medium">
                    Adjusted Net Enrollment Rate
                  </p>
                  <div className="flex my-3">
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                        {educationData.enrollmentTarget}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Target</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-xl font-semibold m-0 text-primary2 p-0">
                        {educationData.enrollmentCurrent}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Current</p>
                    </div>
                  </div>
                  <ProgressBar
                    value={(
                      educationData.enrollmentTarget -
                      educationData.enrollmentCurrent
                    ).toFixed(2)}
                    style={{ height: "0.75rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color="#FFAD0D"
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="text-tertiary3 p-0 m-0 font-semibold">
                    Gap:{" "}
                    <span className="text-primary1">
                      {" "}
                      {(
                        educationData.enrollmentTarget -
                        educationData.enrollmentCurrent
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
                <div
                  className="flex flex-column bg-white border-round p-3"
                  style={{ flex: "40%" }}
                >
                  <GroupedColumnChart
                    title="Enrollment Rate Trend"
                    labels={educationData.years}
                    dataSeries={educationData.enrollmentTrendData}
                    years={years}
                    dataPointWidth={30}
                    height={150}
                  />
                </div>
                {/* Dropout Rate */}
                <div
                  className="flex flex-column bg-white border-round p-3 justify-content-between"
                  style={{ flex: "10%" }}
                >
                  <p className="text p-0 m-0 text-lg font-medium">
                    Dropout Rate
                  </p>
                  <div className="flex my-3">
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-xl font-semibold m-0 text-secondary2 p-0">
                        {educationData.dropoutRatioTargetValue}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Target</p>
                    </div>
                    <Divider layout="vertical" />
                    <div className="flex flex-column w-full p-2 align-items-center">
                      <p className="text-xl font-semibold m-0 text-primary2 p-0">
                        {educationData.dropoutRatioCurrentValue}
                      </p>
                      <p className="text p-0 m-0 mt-1 font-medium">Current</p>
                    </div>
                  </div>
                  <ProgressBar
                    value={(
                      ((educationData.dropoutRatioCurrentValue -
                        educationData.dropoutRatioTargetValue) /
                        educationData.dropoutRatioTargetValue) *
                      100
                    ).toFixed(2)}
                    style={{ height: "0.75rem" }} // Adjust the height
                    className="w-full" // Full width of its container
                    color="#FFAD0D"
                    displayValueTemplate={() => null} // Hide the displayed value
                  />
                  <p className="text-tertiary3 p-0 m-0 font-semibold">
                    Gap:{" "}
                    <span className="text-primary1">
                      {(
                        ((educationData.dropoutRatioCurrentValue -
                          educationData.dropoutRatioTargetValue) /
                          educationData.dropoutRatioTargetValue) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>
                <div
                  className="flex flex-column bg-white border-round p-3"
                  style={{ flex: "40%" }}
                >
                  <GroupedColumnChart
                    title="Dropout Rate Trend"
                    labels={educationData.years}
                    dataSeries={educationData.dropoutTrendData}
                    years={years}
                    dataPointWidth={30}
                    height={150}
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
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
};

export default EducationDashboard;
