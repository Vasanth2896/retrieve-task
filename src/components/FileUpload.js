import React from "react";
import { Button } from "react-bootstrap";
import "../styles/fileUpload.css";
import * as XLSX from "xlsx";

const FileUpload = (props) => {
  const { setFileData,setColumnHeaders } = props;
  const hiddenFileInput = React.useRef(null);

  const handleDataImport = () => {
    hiddenFileInput.current.click();
  };

  const transformJson = (sheetData) => {
    const sheetHeaders = sheetData[0];
    setColumnHeaders(sheetHeaders)
    const transformedData = [...sheetData].slice(1).map((data) => {
      const orderItem = {};
      for (let iterate = 0; iterate < sheetHeaders.length; iterate++) {
        orderItem[sheetHeaders[iterate]] = data[iterate];
      }
      return orderItem;
    });
    return transformedData;
  };

  const handleChange = (event) => {
    const uploadedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e.target.result;
      let readData = XLSX.read(data, { type: "binary" });
      const sheet = readData.SheetNames[0];
      const currentSheet = readData.Sheets[sheet];
      const dataParse = XLSX.utils.sheet_to_json(currentSheet, { header: 1 });
      const trasnformedData = transformJson(dataParse);
      setFileData(trasnformedData);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  // need to check whether File upload should be allowed again

  return (
    <>
      <div className="fileUploadContainer">
        <p style={{ fontSize: 18, marginBottom: "unset" }}>
          Please upload a spreadsheet file
        </p>
        <Button className="fileUploadBtn" onClick={handleDataImport}>
          Upload
        </Button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
    </>
  );
};

export default FileUpload;
