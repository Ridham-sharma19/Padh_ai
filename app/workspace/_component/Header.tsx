
import React from 'react';
import dynamic from 'next/dynamic';

const UserButton = dynamic(() => import('@clerk/nextjs').then(mod => mod.UserButton), { ssr: false });

export default function Navbar() {
 
  return (
    <nav className='flex justify-center   w-full py-4'> 
      <div className='bg-yellow-500 shadow-md py-2 px-4 flex items-center justify-between rounded-md max-w-lg border-2 border-black w-full'>
      
        <div className="flex items-center">
         
          <span className="text-black text-lg font-semibold">Let's Get Started </span>
        </div>

        
        <div className=' '>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
