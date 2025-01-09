// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { Dropdown } from "primereact/dropdown";
// import React from "react";
// import ReportPrint from "./ReportPrint";
// import { useState } from "react";

// const Header = ({ show, renderRecommendations }) => {
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [ReportVisible, setReportVisible] = useState(false);
//   const [selectedZone, setSelectedZone] = useState("Civil Lines");
//   const [selectedYear, setSelectedYear] = useState(2024);
//   const [selectedMonth, setSelectedMonth] = useState(1);

//   const handleZoneChange = (e) => {
//     setSelectedZone(e.value);
//     setGeoData(divisionsWithLocations[e.value] || all_locations);
//   };
//   return (
//     <div>
//       {show && (
//         <div className="flex align-items-center justify-content-between w-full">
//           <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
//             Water Management
//           </h1>

//           <div className="flex align-items-center justify-content-end gap-2">
//             <Button
//               tooltip="Filters"
//               tooltipOptions={{
//                 position: "bottom",
//               }}
//               icon="pi pi-filter"
//               onClick={() => setFilterVisible(!filterVisible)}
//               className="bg-white text-secondary2"
//               raised
//             />
//             {filterVisible && (
//               <div
//                 className="absolute bg-white border-round-2xl shadow-lg p-3 w-20rem mt-2"
//                 style={{
//                   zIndex: 1000, // Ensures the filter appears above other components
//                   position: "absolute", // Required for z-index to work
//                   transform: "translateY(60%) translateX(-20%)",
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <div className="flex flex-column gap-3">
//                   <div className="flex flex-column align-items-center justify-content-center gap-2 ">
//                     <Dropdown
//                       value={selectedZone}
//                       onChange={handleZoneChange}
//                       options={[
//                         { label: "All Zones", value: "All Zones" }, // Use null or a specific value to indicate 'All Zones'
//                         ...zones.map((div) => ({ label: div, value: div })),
//                       ]}
//                       placeholder="Select Zones"
//                       className="w-full"
//                     />
//                     <Dropdown
//                       value={selectedYear}
//                       onChange={(e) => setSelectedYear(e.value)}
//                       options={years.map((year) => ({
//                         label: year,
//                         value: year,
//                       }))}
//                       placeholder="Select Year"
//                       className="w-full"
//                     />
//                     <Dropdown
//                       value={selectedMonth}
//                       onChange={(e) => setSelectedMonth(e.value)}
//                       options={months.map((month) => ({
//                         label: month,
//                         value: month,
//                       }))}
//                       placeholder="Select Month"
//                       className="w-full"
//                     />
//                   </div>
//                   <div className="flex justify-content-between">
//                     <Button
//                       className="bg-white text-moderate border-none"
//                       label="Reset"
//                       // icon="pi pi-search"
//                       // onClick={resetFilters}
//                       raised
//                     />
//                     <Button
//                       className="bg-primary1"
//                       label="Apply"
//                       // icon="pi pi-search"
//                       // onClick={handleApply}
//                       raised
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <Button
//               tooltip="Upload File"
//               onClick={showUploadDialog}
//               raised
//               icon="pi pi-file-arrow-up"
//               tooltipOptions={{
//                 position: "bottom",
//               }}
//             />
//             <Upload
//               visible={uploadDialogVisible}
//               onHide={hideUploadDialog}
//               parameter={"water"}
//             />
//             <Button
//               tooltip="Modify Data"
//               // onClick={handleModify}
//               raised
//               icon="pi pi-file-edit"
//               tooltipOptions={{
//                 position: "bottom",
//               }}
//             />
//             <Button
//               tooltip="Generate Report"
//               icon="pi pi-file"
//               onClick={() => setReportVisible(true)}
//               className="bg-primary1 text-white"
//               tooltipOptions={{
//                 position: "bottom",
//               }}
//               raised
//             />
//             <Dialog
//               visible={ReportVisible}
//               style={{ width: "100rem" }}
//               onHide={() => {
//                 if (!ReportVisible) return;
//                 setReportVisible(false);
//               }}
//             >
//               <ReportPrint
//                 renderDashboard={renderDashboard}
//                 renderRecommendations={renderRecommendations}
//                 parameter={"water"}
//                 heading={"Water Management"}
//               />
//             </Dialog>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;
