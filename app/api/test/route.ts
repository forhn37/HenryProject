import supabase from "@/app/utils/supabaseClient";

export async function POST(request:Request) {
  const data = await request.json()

  const { data: insertData, error } = await supabase
  .from('table') // 'posts'는 여러분의 테이블 이름입니다.
  .insert([
    { title: data.title, body: data.body }
  ]);

// 에러 처리
if (error) {
  return new Response(JSON.stringify({ error: error.message }), {
    status: 400,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
  // 요청 본문을 텍스트로 비동기적으로 읽기
  // const bodyText = await request.text();

  // // 텍스트를 JSON으로 파싱
  // const data = JSON.parse(bodyText);
  console.log(data);

  // userId 사용 로직...

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
