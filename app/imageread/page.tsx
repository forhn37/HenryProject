'use client'
import Image from 'next/image'
import DownloadButton from '../comp/downloadbutton';
import { useEffect, useState } from 'react';

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


