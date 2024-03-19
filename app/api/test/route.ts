export async function POST(request:Request) {
  const data = await request.json()
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
