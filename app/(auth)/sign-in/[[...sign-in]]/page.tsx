import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      
      <div className="hidden md:flex items-center justify-center w-full h-full relative">
        <Image
          src="/signingin.webp"
          alt="Sign In Visual"
          layout='fill'
          objectFit="cover"
          className="absolute"
        />
      </div>
      
     
      <div className="flex items-center justify-center">
        <div className="z-10 px-6">
          <SignIn redirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}