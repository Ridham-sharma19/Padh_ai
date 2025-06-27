"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import Navbar from '../_component/Header';
import PdfViewer from '../_component/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { TextEditor } from '../_component/TextEditor';


export default function WorkSpace() {
    const {fileId} = useParams();

    
    const normalizedFileId = Array.isArray(fileId) ? fileId[0] : fileId;

    if (!normalizedFileId) {
      return null;
    }
  
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId: normalizedFileId });

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
