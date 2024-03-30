'use client'
import Image from 'next/image'
import DownloadButton from '../comp/downloadbutton';
import { Suspense, useEffect, useState } from 'react';
import Loading from './loading';

export default function Imageread() {
  const [imageUrl, setImageUrl] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/download')
      .then((response) => response.json())
      .then(result => {
        console.log(result)
        if (result)
          setImageUrl(result)
      })

  }, [])

  // const response = await fetch('http://localhost:3000/api/download')
  // const imageUrl = await response.json()
  // console.log(imageUrl)


  // 서버에서 이미지의 URL을 가져옵니다.

  return (
    <>
      <div>
        {imageUrl.length > 0 ? (
          imageUrl.map((url) => (
            <div key={url}>
              <Image src={url} alt="Supabase에서 로드한 이미지" width={300} height={300} />
              <DownloadButton url={url} />
            </div>
          ))
        ) : (
          '로딩중입니다.'
        )}
      </div>
    </>
  )
}


