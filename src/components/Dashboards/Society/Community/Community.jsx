import React, { useState } from "react";
import { ColumnChart, GroupedBarChart } from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CommunityReportPrint from "./CommunityReportPrint";
import DisasterRecommendations from "components/Dashboards/Administration/Disaster Management/DisasterRecommendations";
import { Panel } from "primereact/panel";
import workshop from "assets/workshop.svg";
import ngo from "assets/ngo.svg";
import survey from "assets/Survey Illustration.svg";

const Community = ({ show }) => {
  const [ReportVisible, setReportVisible] = useState(false);
  const [recommendationsVisible, setRecommendationsVisible] = useState(false);

  const handleToggleRecommendations = () => {
    setRecommendationsVisible(!recommendationsVisible);
  };

  const facilitiesCategories = [
    "Anganwari-Housing Area/Cluster",
    "Community room",
    "Community hall and library",
    "Recreational club",
    "Music, dance and drama center",
    "Meditation and spiritual center",
    "Old-age home",
  ];

  const facilitiesData = [
    {
      name: "Existing",
      data: [48, 77, 29, 4, 12, 7, 1],
    },
    {
      name: "Target",
      data: [120, 150, 73, 10, 20, 15, 5],
    },
  ];

  const categories = ["2020", "2021", "2022", "2023", "2024"];
  const forums = [80, 90, 178, 148, 215]; // Funds allocated for each year (in crores)

  return (
    <div className="flex gap-3 flex-column p-4">
      {show && (
        <div className="flex align-items-center justify-content-between w-full">
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Community Engagement & Holisitic Well-Being
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
            <CommunityReportPrint />
          </Dialog>
        </div>
      )}
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <div className="flex flex-column gap-3" style={{ flex: "30%" }}>
          {/* NGOs/Forums */}
          <div className="flex bg-white border-round align-items-center justify-content-around w-full">
            <div className="flex flex-column p-4">
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                NGOs/Forums
              </p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-2 text-center">
                215
              </p>
            </div>
            <img src={ngo} alt="ngo" className="h-7rem" />
            {/* <i className="pi pi-info-circle text-theme w-full text-right ngo text-sm"></i>
            <Tooltip target=".ngo" position="right">
              <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
                <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
                  List of NGOs/Forums
                </h1>
                <ul>
                  <li>NGO1 (Work)</li>
                  <li>NGO2 (Work)</li>
                  <li>NGO3 (Work)</li>
                  <li>NGO4 (Work)</li>
                  <li>NGO5 (Work)</li>
                </ul>
              </div>
            </Tooltip> */}
          </div>

          {/* Feedback Survey Channels */}
          <div className="flex bg-white border-round align-items-center justify-content-around p-3 w-full">
            <div className="flex flex-column">
              <p className="text-primary1 font-semibold text-lg p-0 m-0">
                Feedback Survey Channels
              </p>
              <p className="text-4xl font-semibold m-0 text-secondary2 p-2 text-center">
                58
              </p>
            </div>
            <img src={survey} alt="survey" className="h-6rem" />
            {/* <i className="pi pi-info-circle text-theme w-full text-right feedback text-sm"></i>
            <Tooltip target=".feedback" position="bottom">
              <div className="flex align-items-start justify-content-start gap-4 p-2 w-full flex-column">
                <h1 className="m-0 p-0 text-lg text-cyan-800 text-center">
                  List of Feedback Survey Channels
                </h1>
                <ul>
                  <li>Healthcare: 16</li>
                  <li>Education: 26</li>
                  <li>Transport: 16</li>
                </ul>
              </div>
            </Tooltip> */}
          </div>
        </div>

        {/* Number of NGOs/Forums Over Years */}
        <div
          className="flex bg-white border-round align-items-center p-3"
          style={{ flex: "45%" }}
        >
          <ColumnChart
            title="NGOs/Forums Over the Years"
            categories={categories}
            series={forums}
            height={175}
            dataPointWidth={40}
          />
        </div>

        {/* Annual Public Awareness Meetings/Workshops */}
        <div
          className="flex flex-column bg-white border-round align-items-center p-3"
          style={{ flex: "20%" }}
        >
          <p className="text-primary1 font-semibold text-lg p-0 m-0">
            Annual Public Awareness Meetings & Workshops
          </p>
          <div className="flex justify-content-around">
            <img src={workshop} alt="workshop" />
            <p className="text-5xl font-semibold m-0 text-secondary2 p-6">26</p>
          </div>
        </div>
      </div>

      <div className="flex align-items-center justify-content-center gap-2 w-full">
        {/* Socio-Cultural Facilities */}
        <div className="flex bg-white border-round align-items-center p-4 w-full">
          <GroupedBarChart
            title="Socio-Cultural Facilities"
            labels={facilitiesCategories}
            dataSeries={facilitiesData}
            height={300}
            dataPointWidth={10}
          />
        </div>
      </div>

      {/* <div className="flex justify-content-end">
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
      </div> */}

      {/* {recommendationsVisible && (
        <DisasterRecommdations />
      )} */}

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

export default Community;
