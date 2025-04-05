import React, { useState } from "react";
import Papa from "papaparse";
import { FormGroup, Form, Label, Input } from "./RefData.styles";
import {
  UploadContainer,
  UploadHeading,
  UploadStatus,
  Button
} from "./RefData.styles";
import { uploadCategoryCsv } from "../../../services/RefDataService";

const BulkUploadCategories = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [status, setStatus] = useState("");
  const [readyToUpload, setReadyToUpload] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setPreviewData([]);
    setStatus("");
    setReadyToUpload(false);

    if (uploadedFile && uploadedFile.type === "text/csv") {
      Papa.parse(uploadedFile, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          setPreviewData(results.data);
          setReadyToUpload(true);
        },
        error: function () {
          setStatus("❌ Failed to parse CSV");
        }
      });
    } else {
      setStatus("Please upload a valid CSV file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus("Please select a CSV file.");

    try {
      setStatus("Uploading...");
      await uploadCategoryCsv(file);
      setStatus("✅ Upload successful!");
      setFile(null);
      setPreviewData([]);
      setReadyToUpload(false);
    } catch (err) {
      setStatus("❌ Upload failed. Please check the file format.");
    }
  };

  return (
    <UploadContainer>
      <UploadHeading>Bulk Upload Categories</UploadHeading>
      <Form onSubmit={handleUpload}>
        <FormGroup>
          <Label htmlFor="file">Select CSV File</Label>
          <Input type="file" accept=".csv" onChange={handleFileChange} />
        </FormGroup>

        {previewData.length > 0 && (
          <>
            <h5 style={{ marginTop: "1rem" }}>Preview</h5>
            <div style={{ overflowX: "auto", maxHeight: "300px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th
                        key={key}
                        style={{
                          borderBottom: "1px solid #ccc",
                          padding: "8px",
                          textAlign: "left",
                          backgroundColor: "#f5f5f5"
                        }}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} style={{ padding: "6px", borderBottom: "1px solid #eee" }}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <Button
          type="submit"
          $variant="primary"
          $fitContent
          disabled={!readyToUpload}
          style={{ marginTop: "1rem" }}
        >
          Upload
        </Button>

        {status && <UploadStatus success={status.startsWith("✅")}>{status}</UploadStatus>}
      </Form>
    </UploadContainer>
  );
};

export default BulkUploadCategories;
