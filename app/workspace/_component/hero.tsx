"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface HeroProps {
  authButton: ReactNode;
}

export default function Hero({ authButton }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white selection:bg-yellow-400 selection:text-black">
      
   
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
     
      <div className="absolute top-10 -left-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-yellow-300/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
        <div>
      
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <span className="px-5 py-2 rounded-full border-2 border-black bg-yellow-400 text-black text-xs font-bold uppercase tracking-widest inline-block mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Introducing PDH-AI 
            </span>
          </motion.div>

       
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-6xl sm:text-8xl font-black tracking-tighter text-black mb-6 leading-[1.1]"
          >
            Master your content <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500">
              in seconds.
            </span>
          </motion.h1>

       
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="text-black/70 text-lg sm:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Upload your PDFs and let our AI distill complex documents into
            concise, high-retention revision notes.
          </motion.p>

        
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {authButton}
          </motion.div>
        </div>
      </div>

  
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        className="relative mt-20 w-full max-w-5xl group z-10"
      >
  
        <div className="absolute -inset-2 bg-yellow-400 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
        
     
        <div className="relative bg-black rounded-[2rem] p-2 border-4 border-black shadow-2xl">
          <video
            className="rounded-[1.5rem] w-full border border-white/10"
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </motion.div>

  
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-20 mb-10 text-sm text-black/50 font-medium z-10"
      >
        Built with precision by{" "}
        <a
          href="https://github.com/Ridham-sharma19"
          className="text-black hover:text-yellow-500 transition-colors font-bold border-b-2 border-yellow-400"
        >
          Ridham Sharma
        </a>
      </motion.footer>
    </section>
  );
}