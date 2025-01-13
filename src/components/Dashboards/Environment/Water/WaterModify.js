// import axios from "axios";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import React, { useState } from "react";

// const WaterModify = ({
//   selectedZone,
//   selectedYear,
//   selectedMonth,
//   data,
//   // setData,
//   selectedData,
//   setSelectedData,
// }) => {
//   const [editDialog, setEditDialog] = useState(false);
//   const [modifyDialog, setModifyDialog] = useState(false);

//   const handleModify = () => {
//     setModifyDialog(true);
//   };
//   const handleEdit = () => {
//     const itemToEdit = data.find(
//       (item) =>
//         item.Divisions === selectedZone &&
//         item.Year === selectedYear &&
//         item.Month === selectedMonth
//     );
//     if (itemToEdit) {
//       setSelectedData(itemToEdit);

//       setEditDialog(true);
//     } else {
//       alert("No data found for the selected filters.");
//     }
//   };
//   const handleSave = async () => {
//     try {
//       const response = await axios.put(
//         `https://api-csi.arahas.com/data/water/${selectedData._id}`,
//         selectedData,
//         { headers: { "Content-Type": "application/json" } } // Specify content type if necessary
//       );

//       if (response.data.success) {
//         setModifyDialog(false);
//         setEditDialog(false);
//         alert("Data updated successfully");
//         setData((prevData) =>
//           prevData.map((item) =>
//             item._id === response.data.data._id ? response.data.data : item
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error saving data:", error); // Log error for debugging
//       alert(
//         error.response
//           ? error.response.data.error
//           : "An unexpected error occurred"
//       );
//     }
//   };
//   return (
//     <div>
//       {" "}

//     </div>
//   );
// };

// export default WaterModify;
