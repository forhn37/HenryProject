'use client'
import React, { useState, useEffect } from 'react'
import getImageUrl from '../utils/getimageurl'
import Image from 'next/image'

function MyImageComponent() {
  const [imageUrl, setImageUrl] = useState('')
  

  useEffect(() => {
    async function fetchImageUrl() {
      const url = await getImageUrl('filename.png')
      console.log(url) // 여기서 'filename.jpg'는 파일 이름입니다.
      setImageUrl(url)
    }

    fetchImageUrl()
  }, [])
  console.log(imageUrl)
  return (
    <div>
      {imageUrl ? <Image src={imageUrl} alt="Supabase에서 로드한 이미지" width={300} height={300}/> : <p>이미지 로딩 중...</p>}
    </div>
  )
}

export default MyImageComponent
