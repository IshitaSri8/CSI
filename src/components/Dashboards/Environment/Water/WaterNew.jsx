import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import civil_lines from "./GeoJson_Zone/1_Ayodhya_Civil_line_Tiny_tots.json";
import shahadatganj from "./GeoJson_Zone/5_Ayodhya_Shahadat_Ganj.json";
import ranopali from "./GeoJson_Zone/2_Ayodhya_Ranopali.json";
import bank_colony from "./GeoJson_Zone/3_Ayodhya_Bank_colony.json";
import airport from "./GeoJson_Zone/4_Ayodhya_near_Airport.json";
import all_locations from "./GeoJson_Zone/Zone_Boundary_Merge.json";
import ADA_Boundary from "./ADA_Boundary.json";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";

const getColor = (WQI) => {
  if (WQI >= 91 && WQI <= 100) return "#399918";
  if (WQI >= 71 && WQI <= 90) return "#A0D683";
  if (WQI >= 51 && WQI <= 70) return "#FEFF9F";
  if (WQI >= 26 && WQI <= 50) return "#E8B86D";
  return "#FF7777"; // Poor (0-25)
};

const Legend = () => {
  return (
    <div className="legend flex align-items-start justify-content-between flex-row gap-4">
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#FF7777" />
        </svg>{" "}
        Poor (0-25)
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#E8B86D" />
        </svg>{" "}
        Fair (26-50)
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#FEFF9F" />
        </svg>{" "}
        Average (51-70)
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#A0D683" />
        </svg>{" "}
        Good (71-90)
      </div>
      <div>
        <svg width="20" height="20">
          <rect width="20" height="20" fill="#72BF78" />
        </svg>{" "}
        Excellent (91-100)
      </div>
    </div>
  );
};

const WaterNew = () => {
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [uploadDialog, setUploadDialog] = useState(false);
  const [modifyDialog, setModifyDialog] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-csi.arahas.com/data/water"
        );
        const locations = [
          ...new Set(response.data.data.map((item) => item.Divisions)),
        ];
        console.log(locations);
        setUniqueLocations(locations);
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("No file chosen. Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);

      const response = await axios.post(
        "https://api-csi.arahas.com/upload/water",
        formData
      );

      if (response.status === 200) {
        alert("File uploaded successfully!");
        setUploadDialog(false);
      } else {
        alert(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response) {
        alert(`Upload failed: ${error.response.data.error}`);
      } else {
        alert("An unexpected error occurred during file upload.");
      }
    }
  };

  const handleUploadDialog = () => {
    setUploadDialog(true);
  };
  const handleModify = () => {
    setModifyDialog(true);
  };
  const handleEdit = () => {
    const itemToEdit = data.find(
      (item) =>
        item.Divisions === selectedDivision &&
        item.Year === selectedYear &&
        item.Month === selectedMonth
    );
    if (itemToEdit) {
      setSelectedData(itemToEdit);

      setEditDialog(true);
    } else {
      alert("No data found for the selected filters.");
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8009/data/water/${selectedData._id}`,
        selectedData,
        { headers: { "Content-Type": "application/json" } } // Specify content type if necessary
      );

      if (response.data.success) {
        setModifyDialog(false);
        setEditDialog(false);
        alert("Data updated successfully");
        setData((prevData) =>
          prevData.map((item) =>
            item._id === response.data.data._id ? response.data.data : item
          )
        );
      }
    } catch (error) {
      console.error("Error saving data:", error); // Log error for debugging
      alert(
        error.response
          ? error.response.data.error
          : "An unexpected error occurred"
      );
    }
  };
  const divisions = [...new Set(data.map((item) => item.Divisions))];
  const years = [...new Set(data.map((item) => item.Year))];
  const months = [...new Set(data.map((item) => item.Month))];
  return (
    <div className="w-full flex flex-row gap-4">
      <Card className="w-full p-4">
        <h1>Water Quality Index</h1>
        <div className="flex align-items-center justify-content-center flex-column gap-4 w-full">
          <div className="flex align-items-center justify-content-end gap-2 w-full">
            <Dropdown
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.value)}
              options={[
                { label: "All Locations", value: "all" },
                ...uniqueLocations.map((loc) => ({ label: loc, value: loc })),
              ]}
              placeholder="Select Location"
              className="w-full md:w-14rem"
            />

            <Button label="Upload" onClick={handleUploadDialog} />
            <Button label="Modify Data" onClick={handleModify}></Button>
          </div>
          <Dialog
            header="Upload File"
            visible={uploadDialog}
            style={{ width: "50vw" }}
            onHide={() => setUploadDialog(false)}
          >
            <FileUpload
              name="file"
              auto
              customUpload
              cancelLabel="Clear file"
              accept=".xlsx, .xls"
              uploadHandler={(event) => {
                setFile(event.files[0]);
              }}
              emptyTemplate={<p>Please upload the excel file</p>}
            />
            <Button onClick={handleUpload} label="Upload File"></Button>
          </Dialog>
        </div>
        <MapContainer
          center={[26.8, 82.2]}
          zoom={11}
          style={{ height: "30rem", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <GeoJSON data={ADA_Boundary} /> */}
          <GeoJSON data={civil_lines} />
        </MapContainer>
        <Legend />

        <Dialog
          header="Modify Data"
          visible={modifyDialog}
          style={{ width: "55rem" }}
          onHide={() => setModifyDialog(false)}
        >
          <div className="flex align-items-center justify-content-start gap-2 flex-row">
            <Dropdown
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.value)}
              options={divisions.map((div) => ({ label: div, value: div }))}
              placeholder="Select Division"
              className="w-full md:w-14rem"
            />
            <Dropdown
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.value)}
              options={years.map((year) => ({ label: year, value: year }))}
              placeholder="Select Year"
              className="w-full md:w-14rem"
            />
            {/*  */}
            <Dropdown
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.value)}
              options={months.map((month) => ({ label: month, value: month }))}
              placeholder="Select Month"
              className="w-full md:w-14rem"
            />
            <Button label="Edit Data" onClick={handleEdit} />
            {/**/}
          </div>
        </Dialog>
        <Dialog
          header={<h2 style={{ margin: 0, textAlign: "center" }}>Edit Data</h2>}
          visible={editDialog}
          style={{ width: "80rem" }}
          onHide={() => setEditDialog(false)}
        >
          <div className="flex align-items-center justify-content-around flex-row gap-2">
            <h1 className="text-base m-0 p-0">Zone: {selectedDivision}</h1>
            <h1 className="text-base m-0 p-0">Year: {selectedYear}</h1>
            <h1 className="text-base m-0 p-0">Month: {selectedMonth}</h1>
          </div>

          <div style={{ padding: "20px" }}>
            {/* Table 1: Water Supply Data */}
            <h3>Water Supply Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Population",
                  "Current_Supply_MLD",
                  "Required_Supply_MLD",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                        type={field === "Population" ? "number" : "text"}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 2: Infrastructure Data */}
            <h3>Infrastructure Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Canals",
                  "Tanks",
                  "Ponds",
                  "Handpumps",
                  "Borewell",
                  "Individual_Taps",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 3: Household Data */}
            <h3>Household Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Total_Households",
                  "No_of_Households_with_Connections",
                  "No_of_Households_with_Meters",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 4: Water Reuse and Drainage Data */}
            <h3>Water Reuse and Drainage Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Total_Reused_Water",
                  "No_of_Tapped_Drains",
                  "No_of_Untapped_Drains",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 5: Rainwater Harvesting Data */}
            <h3>Rainwater Harvesting Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Sites_with_Rainwater_Harvesting_System",
                  "Total_Volume_Harvested",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 6: Maintenance and Awareness Programs */}
            <h3>Maintenance and Awareness Programs</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Awareness_Campaigns_Programs",
                  "Pipeline_Length",
                  "Maintenance_Status",
                  "Percentage_of_water_lost_due_to_leaks",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      {/* Use number type where applicable */}
                      {field === "Percentage_of_water_lost_due_to_leaks" ? (
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field]}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${field.toLowerCase()}`}
                          type="number"
                        />
                      ) : (
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field]}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table 7: Water Quality Testing */}
            <h3>Water Quality Testing Data</h3>
            <table className="p-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Number_of_Testing_Stations",
                  "Number_of_Sample_Tested_in_Laboratories",
                  "Number_of_Samples_found_contaminated_in_laboratories",
                  "Temperature",
                  "BOD",
                  "TSS",
                  "DO",
                  "Conductivity",
                  "WQI",
                ].map((field, index) => (
                  <tr key={index}>
                    <td>{field}</td>
                    <td>
                      <InputText
                        id={field.toLowerCase()}
                        value={selectedData?.[field]}
                        onChange={(e) =>
                          setSelectedData({
                            ...selectedData,
                            [field]: e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                        type="number"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              label="Save"
              onClick={handleSave}
              style={{ marginTop: "20px" }}
            />
          </div>
        </Dialog>
      </Card>
    </div>
  );
};

export default WaterNew;
