'use client'

import { useRouter } from "next/navigation";


export default function DownloadButton(props) {
  const router = useRouter()

  const downloadProcess = () => {
    //supabase내의 downloading 방법에 의하면 download 쿼리스트링을 붙이기만해도 가능하기에 router방식으로 구현해도 가능할듯하다. !
    // router.push(`${props.url}?download=${filename}`)
    const filename = props.url.split('/').pop()?.toLowerCase();
    const link = document.createElement('a');
    const url = props.url
    link.setAttribute('href', `${url}?download=${filename}`);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // 링크를 body에 추가
    link.click(); // 클릭 이벤트 발생
    document.body.removeChild(link); // 링크를 body에서 제거
  };

  return (
    <>
      <input type='button' value='다운로드' onClick={downloadProcess} />
    </>
  );
}
