import { NextRequest, NextResponse } from "next/server";
import supabase from "@/app/utils/supabaseClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      throw new Error("No file uploaded.");
    }
  
    const UploadedFilename = file.name;
    
    // Supabase의 'images' 버킷에 파일 업로드
    const { data, error } = await supabase.storage.from("images").upload(UploadedFilename, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      return new NextResponse(JSON.stringify({ error: "Failed to upload file" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("File uploaded successfully:", data);
    return new NextResponse(JSON.stringify({ message: "File uploaded successfully", data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    return new NextResponse(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
