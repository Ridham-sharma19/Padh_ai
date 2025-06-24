"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Navbar from '../_component/Header';
import PdfViewer from '../_component/PdfViewer';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function WorkSpace() {
    const {fileId}=useParams();
    const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
      fileId:fileId as string
    })

    useEffect(()=>{
      
      
    },[fileInfo])

 
    
  return (
   <div>
    <div>
       <Navbar></Navbar></div>
   
    <div className='grid grid-cols-2 gap-4'>
      <div className='grid-sp'>
        text-editor

      </div>
      <div>
        <PdfViewer fileUrl={fileInfo?.[0]?.fileUrl ?? ''}></PdfViewer>

      </div>
    </div>
   </div>
  )
}
