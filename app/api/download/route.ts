import getAllImageUrls from "@/app/utils/getallimagesurl";
// getAllImageUrls 함수를 가져옵니다.

export async function GET() {
  try {
    const imageurllist = await getAllImageUrls();
    
    // Content-Disposition 헤더를 추가하여 파일 다운로드를 처리
    const headers = {
      "Content-Type": "application/json",
      "Content-Disposition": "attachment;"
    };

    return new Response(JSON.stringify(imageurllist), {
      status: 200,
      headers: headers
    });
  } catch (error) {
    // 오류 처리
    return new Response(JSON.stringify({ error: "Failed to get image URLs" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
