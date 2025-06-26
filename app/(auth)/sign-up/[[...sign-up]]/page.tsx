import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="hidden md:flex items-center justify-center  w-full h-full relative">
        <Image
          src="/signingin.webp"
          alt="Sign In Visual"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="z-10 px-6">
          <SignUp
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
            afterSignUpUrl="/dashboard"
            appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                card: "shadow-md rounded-xl border border-gray-200",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
