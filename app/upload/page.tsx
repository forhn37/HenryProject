'use client'
import { useState } from "react";
import React from "react";

export default function Upload() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      try {
        const file = event.target.files[0];
        setSelectedFile(file)
      } catch (error) {
        console.error("Error selecting file:", error);
      }
    }
  };


  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("Failed to upload file");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <label htmlFor="uploadimage">Select file</label>
      <input
        type="file"
        name="uploadimage"
        id="uploadimage"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </>
  );
}
