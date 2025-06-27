"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
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

    if (isLoaded && isSignedIn) {
      checkUser();
    }
  }, [isLoaded, isSignedIn, user, createUser]);

  const AuthButton = () => {
    if (!isLoaded) {
      return (
        <Button>
         Get Started
        </Button>
      );
    }

    if (user && isSignedIn) {
      return (
        <Link href="/dashboard">
          <Button >
            Go to Dashboard
          </Button>
        </Link>
      );
    }

    return (
      <Link href="/sign-up">
        <Button className="">
          Get Started
        </Button>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-400 flex flex-col items-center pt-16 pb-20 sm:pt-24 sm:pb-32">
      

      <div className=" text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }} 
        >
          Make short notes with PDH-AI
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
      <motion.h3
       initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }} 

       className="mt-16 text-slate-500">
        Made by:-
        <a
          href="https://github.com/Ridham-sharma19"
          target="_blank"
          rel="noopener noreferrer"
        >
           Ridham with 💖
        </a>
        
      </motion.h3>
    </div>
  );
}
