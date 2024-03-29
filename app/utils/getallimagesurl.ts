import supabase from "./supabaseClient";

export default async function getAllImageUrls() {
  try {
    // 이미지 버킷 내의 모든 파일 목록을 가져옵니다.
    const { data: files, error } = await supabase.storage.from("images").list();

    if (error) {
      console.error("이미지 목록을 가져오는 중 오류 발생:", error.message);
      return null;
    }

    // 모든 파일의 URL을 저장할 배열을 초기화합니다.
    const imageUrls = [];

    // 각 파일에 대해 공개 URL을 가져와서 배열에 추가합니다.
    for (const file of files) {
      const { data: urlData, error: urlError } = await supabase.storage
        .from("images")
        .getPublicUrl(file.name);

      if (urlError) {
        console.error("이미지 URL을 가져오는 중 오류 발생:", urlError.message);
        continue; // 에러가 발생한 경우 해당 파일은 건너뜁니다.
      }

      imageUrls.push(urlData.publicUrl);
    }

    return imageUrls;
  } catch (error) {
    console.error("이미지 URL을 가져오는 중 오류 발생:", error.message);
    return null;
  }
}
