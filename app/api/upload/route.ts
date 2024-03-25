import supabase from "@/app/utils/supabaseClient";
import { NextRequest } from "next/server";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
export async function POST(request: NextRequest) {
  try {
    const formData = request.body
    console.log(formData)
    formData.
  
    // const uploadedFile = formData.get("fileData");


    const UploadedFilename = formData.get("file").name
    console.log(UploadedFilename)// 파일 데이터를 가져옴
    // const uploadedFileName = uploadedFile.name; // 파일의 이름을 가져옴
    // console.log("Uploaded File:", uploadedFile);

    const response = new Response();

    // Supabase의 'images' 버킷에 파일 업로드
    const { data, error } = await supabase.storage
      .from("images")
      .upload(UploadedFilename, uploadedFile);

    if (error) {
      console.error("Error uploading file:", error.message);
      return response.status(500).json({ error: "Failed to upload file" });
    }

    console.log("File uploaded successfully:", data);
    return response.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return response.status(500).json({ error: "Failed to upload file" });
  }
}
