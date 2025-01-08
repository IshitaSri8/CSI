import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import React, { useState } from "react";

const Upload = ({ visible, onHide }) => {
  const [file, setFile] = useState(null);

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
        onHide(); // Close dialog after successful upload
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

  return (
    <Dialog
      header="Upload File"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
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
  );
};

export default Upload;
