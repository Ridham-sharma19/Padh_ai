"use client"
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, Crown, Plus } from "lucide-react"
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress"

export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='min-h-screen shadow-md bg-yellow-500 flex flex-col gap-2 px-4  border-r-2 border-r-black'>
      <div className='p-4'>
        <img src="img.png" alt="" />
      </div>
      <div className='flex flex-col gap-4 mt-12'>
         <Button className='text-lg'>Upload PDF<Plus /></Button>
         <Button className='text-lg'>Workspace<BriefcaseBusiness /></Button>
      <Button className='text-lg'>Pro<Crown  /></Button>
      </div>
      <div className='mt-20'>
          <Progress value={33} />
          <p className='text-center mt-2 text-base'>2 out of 5</p>
          <p className='text-center text-sm text-slate-600'>upgrade to upload more</p>
      </div>
     
      
      
    </div>
    
    
  );
}