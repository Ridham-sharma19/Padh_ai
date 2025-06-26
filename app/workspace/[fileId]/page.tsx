"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Navbar from '../_component/Header';
import PdfViewer from '../_component/PdfViewer';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { TextEditor } from '../_component/TextEditor';


export default function WorkSpace() {
    const {fileId} = useParams();

    
    const normalizedFileId = Array.isArray(fileId) ? fileId[0] : fileId;

  
    const fileInfo = normalizedFileId ? useQuery(api.fileStorage.GetFileRecord, { fileId: normalizedFileId }) : null;

  return (
   <div>
    <div>
       <Navbar fileName={fileInfo?.[0]?.fileName ?? "Untitled File"}></Navbar></div>
   
    <div className='grid grid-cols-2 gap-4'>
      <div className='px-4'>
        <TextEditor></TextEditor>
        

      </div>
      <div>
        <PdfViewer fileUrl={fileInfo?.[0]?.fileUrl ?? ''}></PdfViewer>

      </div>
    </div>
   </div>
  )
}
