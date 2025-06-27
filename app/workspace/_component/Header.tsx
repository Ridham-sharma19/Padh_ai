"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function Navbar({fileName}:{fileName?:string}) {
 
  return (
    <nav className='flex justify-center   w-full py-4'> 
      <div className='bg-yellow-500 shadow-md py-2 px-4 flex items-center justify-between rounded-md max-w-lg border-2 border-black w-full'>
      
        <div className="flex items-center">
         
          <span className="text-black text-lg font-semibold">Current Working File:-  {fileName} </span>
        </div>

        
        <div className='flex items-center justify-center gap-4'>
          <Link href='/dashboard'><Button>Dashboard</Button></Link>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
