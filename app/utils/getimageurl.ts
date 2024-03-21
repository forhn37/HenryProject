// getImageUrl.js 또는 유사한 파일 내
import supabase from "./supabaseClient"

export default async function getImageUrl(fileName) {
  const { data, error } = supabase
    .storage
    .from('images') // 'images'는 버켓 이름입니다.
    .getPublicUrl(fileName)

  if (error) {
    console.error('이미지 URL을 가져오는 중 오류 발생:', error.message)
    return null
  }
  console.log(data.publicUrl)
  return data.publicUrl
}
