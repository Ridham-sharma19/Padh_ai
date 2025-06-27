
import React from 'react';

import { UserButton } from '@clerk/nextjs';



export default function Header() {
 
  return (
    <nav className='flex justify-center   w-full py-4'> 
      <div className='bg-yellow-500 shadow-md py-2 px-4 flex items-center justify-between rounded-md max-w-lg border-2 border-black w-full'>
      
        <div className="flex items-center">
         
          <span className="text-black text-lg font-semibold">let&apos;s get started </span>
        </div>

        
        <div className=' '>
         <UserButton></UserButton>
        </div>
      </div>
    </nav>
  );
}
