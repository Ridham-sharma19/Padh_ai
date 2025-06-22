"use client";
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, Crown, Plus } from "lucide-react";
import React from 'react'; // Removed useState as it's no longer needed for sidebar state
import { Progress } from "@/components/ui/progress";
import UploadPdf from './UploadPdf'; // Assuming UploadPdf is correctly structured now

export default function SideBar() {
  

  return (
   
    <div className='min-h-screen shadow-md bg-yellow-500 flex flex-col gap-2 px-4 border-r-2 border-r-black'>
      <div className='p-4'>
        <img src="/img.png" alt="Logo"  /> 
      </div>
      <div className='flex flex-col gap-4 mt-12'>
      
        <UploadPdf>
        
          <Button className='text-lg w-full flex items-center gap-2'>Upload PDF<Plus /></Button>
        </UploadPdf>

        
        <Button className='text-lg w-full flex items-center gap-2'>Workspace<BriefcaseBusiness /></Button>
        <Button className='text-lg w-full flex items-center gap-2'>Pro<Crown /></Button>
      </div>
      <div className='mt-20'>
        <Progress value={33} />
        <p className='text-center mt-2 text-base'>2 out of 5</p>
        <p className='text-center text-sm text-slate-600'>upgrade to upload more</p>
      </div>
    </div>
  );
}