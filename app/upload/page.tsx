'use client'
import { useState } from "react";
import Link from "next/link";
import { blob } from "stream/consumers";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile)
  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      console.log(file)

      // 파일을 읽기 위해 FileReader 객체 생성
      // const reader = new FileReader();

      // // 파일을 읽는 이벤트 핸들러 정의
      // reader.onload = function (event) {
      //   // 파일 데이터를 읽어서 변수에 저장
      //   const fileData = event.target.result;
      //   const blob = fileData.blob()

      //   console.log(blob)

        // 파일 데이터와 파일 정보를 FormData에 추가
        // formData.append("fileData", fileData); // 파일 데이터 추가
        // console.log(reader.readyState)
        setSelectedFile(file);
        // };
        
        // reader.readAsArrayBuffer(fileData.value)
        // 파일을 텍스트나 URL로 읽도록 요청
      } catch (error) {
        console.error("Error selecting file:", error);
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
      } else {
        console.error("No file selected");
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
