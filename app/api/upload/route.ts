import { NextRequest, NextResponse } from "next/server"; //NextRequest, NextResponse를 추가하면서 request, response에 추가기능이 생겼음!! 일단 추가!!!
import supabase from "@/app/utils/supabaseClient"; // Supabase에 이미지를 넣기위해서는 supabase와 연동하는 작업이 필요하겠죠 그래서 supabase를 모듈형식으로 갖고오는데 일반적으로 supabase의 내 프로젝트의 url과 accesskey가 필요합니당!!!

export async function POST(request:NextRequest) {
  // route handler방식은 함수명이 http 메서드가 됩니다. GET, POST 이런식이요!! 그리고 request:NextRequest이 과정이 중요한데 request의 변수의 타입을 NextRequest의 클래스를 타입으로 설정했을때 컴파일 단계에서 request가 NextRequest의 인스턴스를 저장할 수 있다고 명시하며 런타임단계에서는 next.js 프레임워크 자체에서 request = new NextRequst()를 통해 할당하지 않아도 넥스트프레임워크 자체에서 요청처리함수의 매개변수에 자동으로 할당하게 되는거야! 꼭 알아두자!
  try {
    const formData = await request.formData();
    // 이제 try/catch는 자동으로 해야지? 그리고 이것도 중요한데 request.formData()를 통해 요청을 formData로 변환하는것이 중요해! 왜냐하면 데이터전송이 일어날때 데이터는 raw Data(원시데이터)이기 때문에 이것을 전환하는 과정이 필요해! 즉, 원하는 형식대로 바꾸는 작용 이게 formData야!! 그리고 원래대로라면 formData인 부분은 request.body이기 때문에 body를 직접 parsing하는 과정이 필요하다고 생각하는게 당연한거야! 하지만 !! next.js는 단순하게 request.formData()를 실행함으로써 request.body를 찾아서 formData()로 해석하는 과정도 줄여주는 거지!! 정말 친절하지만 너무생략되어있어서 헷갈릴만해!!!
    const file = formData.get('file');
    // 이제 formData의 메서드를 사용해서 file이라는 이름 통해서 값을 끄집어내야하는 것이 필요해! 그것이 활용할것이고 그것이 File객체야 그것을 storage에 집어넣어야해!!!
    
    if (!file || !(file instanceof File)) {
      // 이제는 또 예외를 생각해야할 부분이야 만약에 file이 null이거나 'file instanceof File'을 통하여 File클래스의 인스턴스 즉, File객체인지를 파악하고 맞으면 true, 아니면 false를 반환하는 거지! 
      throw new Error("No file uploaded.");
      // 에러를 던지자!!!!
    }
  
    const UploadedFilename = file.name;
    // 이제 스토리지 내의 파일의 이름을 지정하기 위해 file의 네임을 꺼내와야지!!! 항상 console.log를 통해 확인하고 꺼내오는 것이 중요해!!!
    
    // Supabase의 'images' 버킷에 파일 업로드
    const { data, error } = await supabase.storage.from("images").upload(UploadedFilename, file);
    // 이제는 await를 통하여 supabase.storage에 저장하는 코드가 첫번째는 경로겟지? 그리고 upload를 통해 파일이름과 파일데이터를 업로드하고 그 데이터를 확인하기 위해 data와 error를 구조분해 할당해서 따로 변수에 담는거야! 에러처리 혹은 데이터를 다루기위해!!
    if (error) {
      // 만약 에러가 true이면 어떻게 해야할까 console.error를 통해 클라이언트에게 에러메시지를 보내는 거지!!!
      console.error("Error uploading file:", error.message);
      // 이제 에러일때 응답을 보내는 것을 설정하고 new NextResponse를 통해 Response객체를 생성하서 반환하면 돼! 응답의 첫번째 매개변수는 body이며 본문을 json 문자열로 변환하고 두번째 매개변수는 init으로 나온다는 것은 헤더를 초기화한다는 뜻인가해놓고 response객체를 실행시켜서 반환하면돼! 그렇게 되면 어떻게 되겠어 http통신으로 통해 패킷단위로 body에 header가 붙은채로 전송되겠지 ? 그렇게 되면 받은 데이터를 순서대로 조립해서 rawData형태를 파싱해서 사용하면 됩니다. 아 그리고 response의 body가 readablestream이라는 것은 아직 파싱하기 전 상태라는 것을 알아두면돼! 예를 들어 console.log로 찍어봐서 그렇다면 파싱과정이 필요하다 생각하면됩니다!!!
      return new NextResponse(JSON.stringify({ error: "Failed to upload file" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // 이제 정상적인 응답에 대한 부분을 작성하는거고 위와 형식은 동일해 매개변수 첫번째는 body, 두번째 부분은 초기화된 헤더 설정이라고 보면 됩니다!!!
    return new NextResponse(JSON.stringify({ message: "File uploaded successfully", data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
      },
    });
  }
}
