import UploadImages from '@/components/admin/UploadImages'
import React from 'react'

const page = ({params}) => {
    let id = params.id
    // console.log(id)
  return (
    <div>
      <UploadImages id={id}/>
    </div>
  )
}

export default page
