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
  const { user, isLoaded, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkUser();
    }
  }, [isLoaded, isSignedIn]);

  const checkUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress || !user?.fullName) {
      console.warn(
        "User data incomplete for creation, skipping create user mutation."
      );
      return;
    }

    try {
      const result = await createUser({
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
      });
      console.log("User creation/check result:", result);
    } catch (error) {
      console.error("Error creating/checking user in Convex:", error);
    }
  };

  const AuthButton = () => {
    if (!isLoaded) {
      return (
        <div className="w-28 h-12 rounded-md bg-yellow-300 animate-pulse flex items-center justify-center">
          <span className="text-sm text-gray-700">Loading...</span>
        </div>
      );
    }

    if (user && isSignedIn) {
      return (
        <Link href="/dashboard">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-full text-sm sm:text-base font-medium shadow-lg transition-all duration-300 backdrop-blur-md">
            Go to Dashboard
          </Button>
        </Link>
      );
    }

    return (
      <Link href="/sign-up">
        <Button className="bg-black hover:bg-gray-800 text-yellow-100 px-8 py-3 rounded-full text-sm sm:text-base font-medium shadow-lg transition-all duration-300 backdrop-blur-md">
          Get Started
        </Button>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-400 flex flex-col items-center pt-16 pb-20 sm:pt-24 sm:pb-32">
      <nav className="flex justify-center w-full py-4 absolute top-0 left-0 z-20 px-4 sm:px-6">
        <div className="bg-yellow-500 shadow-md py-2 px-4 flex items-center justify-between rounded-md max-w-lg border-2 border-black w-full">
          <div className="flex items-center">
            <span className="text-black text-lg sm:text-xl font-semibold">
              PDH-AI
            </span>
          </div>
          <div className="flex gap-2">
            <Link href="https://www.linkedin.com/in/ridham-sharma-504560312/">
              <Button className="bg-black hover:bg-gray-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base">
                Contact
              </Button>
            </Link>
            {isLoaded && user && <UserButton afterSignOutUrl="/" />}
          </div>
        </div>
      </nav>

      <div className=" text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} 
        >
          Make short notes with AI
        </motion.h1>

        <motion.h2
          className="text-slate-400 text-base sm:text-lg md:text-xl mt-2"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} 
        >
          just upload your pdf and kick start your revision
        </motion.h2>

        <motion.div
          className="flex items-center justify-center mt-4"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} 
        >
          <AuthButton />
        </motion.div>
      </div>

      <motion.video
        className="mt-12 rounded-4xl border-2 border-amber-200"
        width="640"
        height="360"
         src="/video.mp4"
        controls
         autoPlay
         muted
        loop
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }} 
      >
        Your browser does not support the video tag.
      </motion.video>
      <h3 className="mt-16">
        Made by:-
        <a
          href="https://github.com/Ridham-sharma19"
          target="_blank"
          rel="noopener noreferrer"
        >
           Ridham Sharma
        </a>
        with 💖
      </h3>
    </div>
  );
}
