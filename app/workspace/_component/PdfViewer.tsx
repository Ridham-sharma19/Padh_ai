import React from 'react'

export default function PdfViewer({fileUrl}:{fileUrl:string}) {
  
  
  return (
    <div>
    <iframe
  src={fileUrl + '#toolbar=0'}
  height='90vh'
  width='100%'
  className='h-[90vh] border-none' 
></iframe>
    </div>
  )
}
