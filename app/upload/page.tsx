'use client'
import { useState } from "react"; // 이미지 파일을 선택했을때 담을 수 있는 상태관리를 위해 사용
import React from "react"; // React 타입스크립트를 적용하기 위해 불러와야해!

export default function Upload() { // 컴포넌트의 명은 직관적으로 설정(업로드하는 컴포넌트입니당!)

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 상태관리 및 타입스크립트 제네릭방식으로 useState값을 File혹은 null일지 설정
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 타입스크립트가 좀 지랄맞다. 내가봤을때 외워야할듯, React의 타입을 불러와서 내가 타입을 안정해도 되는 좋은 기능이야 암기하자!!
    if (event.target.files && event.target.files.length > 0) {
      // 알아야할 것!!! 저 이벤트핸들러가 달린 저 input태그를 클릭하면 event객체가 생기는데 그것을 통해 세부조정을 하기위해 event객체를 쓰는거야!!! 그렇다면 event객체의 target은 이벤트가 발생한 태그일꺼야 그리고 type이 file인 놈만 files가 생겨 이놈이 특이한게 fileList가 생겨!! 그래서 event.target.files로 다가가는거야! 이놈의 키는 숫자형 키란다 배열아니다! 객체다. 명심하자 의심가면 일단 console.log 찍어보는구야!!
      // 짧은 서킷 평가(short-circuit evaluation)라고 해서 앞에꺼나 false면 뒤에꺼 신경도 안쓰는 방식이야 알아두면 좋을 듯 !!
      // 여기서 !! 내가 파일을 실수로 선택안할 수도 있잖아 그럴때의 오류를 잡아내기 위해 try/catch를 쓰는 거야 got it?
      const file = event.target.files[0];

      // 파일의 확장자를 추출하여 소문자로 변환하는 과정이야 . 설명하자면 파일의 네임을 가져와서 .(dot)을 기준으로 불리해서 배열을 만들고 거기서 맨마지막놈을 꺼내와. 그리고 그놈이 혹시 대문자일지 모릉게 그것을 소문자처리해서 extension이라는 변수에 넣는거여. 오키?
      const extension = file.name.split('.').pop()?.toLowerCase();

      // 이미지를 넣을 수 있는 확장자를 골라놔 !!!
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      // 이것도 짧은 서킷평가를 통해 확장자가 없을수도 있응게 요렇게 설정!! 
      if (extension && allowedExtensions.includes(extension)) {

        // 이벤트 타깃의 files의 첫번째놈을 선택하구 file이라는 변수에 일단 담아!
        setSelectedFile(file)
        // 상태업데이트 함수를 setter함수라고 한데! 그놈을 이용해서 상태를 업데이트하자!!! 
      } else {
        // 허용되지 않은 파일 유형일 경우 오류 메시지를 출력!!!
        // console.error('') 요고는 console 메시지를 빨간박스로 출력한다는거 몰랏지? ㅋㅋ
        console.error("Only image files (jpg, jpeg, png, gif) are allowed.")

        alert("Only image files (jpg, jpeg, png, gif) are allowed.");
      }
    }
  };


  const handleSubmit = async () => {
    // handleSubmit로 이벤트핸들러의 이름을 명확하게!! 해놓고 통신!은 비동기인거 알지 비동기 함수로 설정해놓자!!
    try {
      // try/catch를 통하여 try내에 예외가 생길 수 있는 코드를 작성하고 catch밑에는 에러 발생시 생길 수 있는 코드를 작성해놓자!!! 오키? 
      if (selectedFile) {
        // 상태데이터로 되어있는 selectedFile이 true라면? 이라는 조건!!
        const formData = new FormData();
        // new FormData()를 통해 FormData 객체를 만들고 초기화시키자!! 깔끔하게!
        formData.append("file", selectedFile);
        // 이제 데이터 넣어야지? 앞에는 키! 뒤에는 값!!!

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        // 이제는 통신을 해야지~ 요즘의 대세는 fetch api, fetch api를 통하여 원하는 라우트의 경로를 설정하고 method는 body에 담겨야하니 POST, body에는 formData를 넣어 전송!!!!
        // 아 글구 await를 통해서 다 보낼때까지 기다료야지!! 응답이 올때까지 기다료야지!!
        if (response.ok) {
          // 자 이제 확인하자 response.ok이면 정상이야 알아본 바로는 200~299까지의 응답만 true란다.!!
          console.log("File uploaded successfully");
        } else {
          console.error("Failed to upload file");
        }
      }
    } catch (error) {
      // 이제 try에서 혹시나 생긴에러는 catch에서 잡고 error객체를 통해 자세한 정보를 알수 있다 끝!!!
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <label htmlFor="uploadimage">Select file</label>
      {/* 라벨을 통하여 file을 이뿌게 꾸며보자 htmlFor의 값과 input의 name의 값이 동일한 것은 기본!!! */}
      <input
        type="file"
        name="uploadimage"
        id="uploadimage"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* input의 type은 당연히 파일을 선택해야하기 때문에 file, name은 label과 매칭, id는 name과 같이 하는게 국룰! style은 안보이게해야 label로 퉁침, onChange를 통해 변화를 감지하는 이벤트 핸들러를 등록해서 변화되면 handleFileChange가 실행되게  */}
      <input type="submit" value="Submit" onClick={handleSubmit} />
      {/* 제출하려면 타입은 submit, 표시되는 것은 Submit라고 해놔야 알지, onClick을 통해 클릭시 handleSubmit라는 이벤트핸들러가 실행되게 얍! */}
    </>
  );
}
