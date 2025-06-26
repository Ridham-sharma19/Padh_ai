"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "../convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress || "",
        username: user?.fullName || "",
      });
      console.log(result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Auth Button component for conditional rendering
  const AuthButton = () => {
    if (!isLoaded) {
      return (
        <div className="w-8 h-8 rounded-md bg-blue-200 animate-pulse"></div>
      );
    }

    if (user) {
      return <UserButton afterSignOutUrl="/" />;
    }

    return (
      <Link href="/sign-in">
        <button className="bg-black hover:bg-slate-900 text-white px-4 py-2 rounded-md">
          Get Started
        </button>
      </Link>
    );
  };

  return (
    <div className="min-h-screen   bg-gradient-to-b from-yellow-50 to-amber-400  flex flex-col items-center pt-16 pb-20">
      {/* This nav is styled to match your original yellow nav, but placed within the new layout */}
      <nav className="flex justify-center w-full py-4 absolute top-0 left-0 z-20">
        <div className="bg-yellow-500 shadow-md py-2 px-4 flex items-center justify-between rounded-md max-w-lg border-2 border-black w-full">
          <div className="flex items-center">
            <span className="text-black text-lg font-semibold">PDH-AI</span>
          </div>
          <div className="flex gap-2">
            <Link href="https://www.linkedin.com/in/ridham-sharma-504560312/">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                Contact
              </button>
            </Link>
            
          </div>
        </div>
      </nav>

      <div className="mt-12 mb-2">
        <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}

              >
          <h1 className="text-black text-center font-bold text-6xl ">
            Make short notes with AI
          </h1>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}

        >
          <h2 className="text-slate-400 text-center text-xl">
            just uplaod your pdf and kick start your revision
          </h2>
          
        </motion.div>
        <motion.div
        className="flex items-center justify-center mt-4"
        initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}

        >
            <AuthButton/>
        </motion.div>
        
        
      </div>
      <video
        className="mt-12 rounded-4xl border-2 border-amber-200"
        src="video.mp4"
        width="640"
        height="360"
        autoPlay
        muted
        loop
        controls
      ></video>
    </div>
  );
}
