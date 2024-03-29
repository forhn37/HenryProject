import Image from 'next/image'
import Link from 'next/link';
import getImageUrl from '@/app/utils/getimageurl';
import DownloadButton from '../comp/downloadbutton';

export default async function Imageread() {

  const response = await fetch('http://localhost:3000/api/download')
  const imageUrl = await response.json()
  console.log(imageUrl)


  // 서버에서 이미지의 URL을 가져옵니다.

  return (
    <>
      <div>
        {imageUrl.map((url) => {
          return (
            <div key={url}>
              <Image  src={url} alt="Supabase에서 로드한 이미지" width={300} height={300} />
              <DownloadButton url={url} />
            </div>
          )
        })}
      </div>
    </>
  )
}


