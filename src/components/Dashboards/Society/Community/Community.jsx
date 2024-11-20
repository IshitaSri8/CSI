import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tooltip } from "primereact/tooltip";
import React, { useState } from "react";
import {
  BarChart,
  GroupedBarChart,
  GroupedColumnChart,
} from "Layout/GraphVisuals";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CommunityReportPrint from "./CommunityReportPrint";

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
      data: [88, 88, 29, 4, 4, 4, 1],
    },
    {
      name: "Target",
      data: [220, 220, 73, 11, 11, 11, 2],
    },
  ];

  // Series data for existing and target values
  const tseries = [
    [88, 88, 29, 4, 4, 4, 1], // Existing values
    [220, 220, 73, 11, 11, 11, 2], // Target values
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
            //className="bg-white text-cyan-800 border-1 border-cyan-800"
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
      {/* First Row */}
      <div className="flex align-items-center justify-content-center gap-2 flex-row w-full">
        <div className="flex flex-column bg-white border-round align-items-center p-3 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            NGOs/Forums
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">215</p>
          </div>
          <i className="pi pi-info-circle text-theme w-full text-right ngo text-sm"></i>
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
          </Tooltip>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-3 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-4">
            Annual Public Awareness Meetings/Workshops
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">26</p>
          </div>
        </div>
        <div className="flex flex-column bg-white border-round align-items-center p-3 w-full">
          <p className="text-primary1 font-semibold text-lg p-0 m-0 mb-2">
            Feedback Survey Channels
          </p>
          <div className="flex flex-column border-circle sec-theme align-items-center justify-content-center w-8rem h-8rem">
            <p className="text-4xl font-semibold m-0 text-secondary2">58</p>
          </div>
          <i className="pi pi-info-circle text-theme w-full text-right feedback text-sm"></i>
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
          </Tooltip>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex align-items-center justify-content-center gap-2 w-full">
        <div
          className="flex bg-white border-round align-items-center p-4 w-full"
          style={{ flex: "25%" }}
        >
          <BarChart
            title="Number of NGOs/Forums Over Years"
            categories={categories}
            series={forums}
            height={250}
            dataPointWidth={20}
          />
        </div>

        <div
          className="flex bg-white border-round align-items-center p-4 w-full"
          style={{ flex: "75%" }}
        >
          <GroupedColumnChart
            title="Socio-Cultural Facilities"
            labels={facilitiesCategories}
            dataSeries={facilitiesData}
            height={250}
            dataPointWidth={30}
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

export default Community;
