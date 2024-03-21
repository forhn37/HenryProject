'use client'
import Link from "next/link";
export default function Home() {

  interface Content {
    title: string;
    body: string;
  }
  return (
    <>
      {/* <style jsx>{`
        input, textarea {
          border: 1px solid #ccc; // 입력 상자에 테두리 추가
          padding: 10px;
        }
        p {
          margin-bottom: 20px; // p 태그 사이의 간격을 조정
        }
      `}</style> */}

      <form onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const title = form.title.value; // 더 명확한 접근 방법
        const body = form.body.value;

        const options = {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ title, body })
        }

        fetch('/api/test', options)
          .then(res => console.log(res.json())) // 결과를 반환
          .then(result => console.log(result))
          .catch(error => console.error('Error:', error)); // 에러 처리 추가
      }}>

        <p>
          <input type="text" name='title' placeholder="text" />
        </p>
        <p>
          <textarea name='body' placeholder="body"></textarea>
        </p>
        <input type="submit" value='submit' />
      </form>
      <p>
        <Link href='/imagewhole'>
          <input type="button" value='go to imagewhole' />
        </Link>
      </p>
      <p>
        <Link href='/upload'>
          <input type="button" value='go to upload' />
        </Link>
      </p>
    </>
  );
}
