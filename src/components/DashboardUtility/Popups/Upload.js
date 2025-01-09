import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import React, { useState } from "react";

const Upload = ({ visible, onHide, parameter }) => {
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
        // "https://api-csi.arahas.com/upload/water",
        `http://localhost:8009/upload/${parameter}`,
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
      <div className="w-full flex align-items-center justify-content-center gap-4 flex-column">
        <FileUpload
          name="file"
          auto
          customUpload
          accept=".xlsx, .xls"
          uploadHandler={(event) => {
            setFile(event.files[0]);
          }}
          emptyTemplate={<p>Please upload the excel file</p>}
          className="w-full"
        />
        <Button
          onClick={handleUpload}
          label="Upload File"
          className="bg-cyan-800"
        ></Button>
      </div>
    </Dialog>
  );
};

export default Upload;
