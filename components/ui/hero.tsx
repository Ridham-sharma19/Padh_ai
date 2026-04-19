"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface HeroProps {
  authButton: ReactNode;
}

export default function Hero({ authButton }: HeroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-amber-900 flex flex-col items-center pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="text-center">
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
          {authButton}
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
        className="mt-16 text-slate-500"
      >
        Made by:-{" "}
        <a
          href="https://github.com/Ridham-sharma19"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-200 transition-colors"
        >
          Ridham with 💖
        </a>
      </motion.h3>
    </div>
  );
}