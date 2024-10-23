import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import axios from "axios";
// import ReportPrint from "./ReportPrint"; // Import the ReportPrint component
import Lottie from "lottie-react";
import report_ani from "../../../../assets/animations/Report_ani.json";
import TempReportPrint from "./TempReportPrint";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

// Utility functions
const GenerateTempReport = () => {
  const defaultStartDate = new Date(2024, 0, 1); // 19-01-2024
  const defaultEndDate = new Date(2024, 7, 13); // 29-04-2024

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const [visible, setVisible] = useState(false);

  // Fetch unique locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/data/locations`
        );
        // Extract unique locations

        if (locationsResponse.data) {
          const locationOptions = locationsResponse.data.data.map((data) => ({
            label: data,
            value: data,
          }));

          console.log("Options", locationOptions);

          setLocations(locationOptions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const allFieldsSelected = selectedLocation && startDate && endDate;
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };

  const toggleReportModal = () => {
    setVisible(!visible);
  };

  return (
    <div className="p-fluid align-items-center flex justify-content-center flex-column">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />

      <div className="flex flex-column align-items-center w-full gap-3">
        <div className="flex align-items-center justify-content-between w-full gap-3">
          <div className="flex flex-column w-full">
            <label htmlFor="location" className="font-semibold">
              Location
            </label>
            <Dropdown
              value={selectedLocation}
              options={locations}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => setSelectedLocation(e.value)}
              placeholder="Select Location"
            />
          </div>
          <div className="w-full">
            <div className="p-field text-sm flex flex-column">
              <label htmlFor="start-date" className="font-semibold">
                Start Date
              </label>
              <Calendar
                id="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                showIcon
                dateFormat="dd-mm-yy"
                placeholder="Select a start date"
                minDate={new Date("2024-01-01")} // Set the minimum selectable date
                maxDate={endDate} // Ensure the start date does not go beyond the end date
              />
            </div>
          </div>
          <div className="w-full">
            <div className="p-field text-sm flex flex-column">
              <label htmlFor="end-date" className="font-semibold">
                End Date{" "}
              </label>
              <Calendar
                id="end-date"
                value={endDate}
                onChange={handleEndDateChange}
                showIcon
                dateFormat="dd-mm-yy"
                placeholder="Select an end date"
                minDate={startDate} // Ensure the end date does not go before the start date
                maxDate={new Date("2024-08-13")} // Set the maximum selectable date
              />
            </div>
          </div>
        </div>
        {allFieldsSelected && (
          <Button
            label="Generate Report"
            icon="pi pi-file-pdf"
            className="w-max bg-cyan-800"
            onClick={toggleReportModal}
          />
        )}
        {!allFieldsSelected && (
          <Button
            disabled
            label="Generate Report"
            icon="pi pi-file-pdf"
            className="w-max bg-cyan-700"
          />
        )}
      </div>

      {/* Render ReportPrint Component only if all fields are selected */}

      <TempReportPrint
        visible={visible}
        toggleModalVisibility={toggleReportModal}
        show={true}
        selectedLocation={selectedLocation}
        startDate={startDate}
        endDate={endDate}
      />

      {!allFieldsSelected && (
        <div className="flex justify-content-center">
          {/* <ReportPrint show={false} /> */}
        </div>
      )}
    </div>
  );
};

export default GenerateTempReport;
