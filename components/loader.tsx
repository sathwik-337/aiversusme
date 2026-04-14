"use client";

import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_60%)] pointer-events-none" />

      <div className="relative">
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-b-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        />

        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-l-2 border-r-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        />

        {/* Center Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white text-black p-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <FaRobot size={32} />
          </div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-center"
      >
        <h2 className="text-xl font-bold tracking-[0.3em] uppercase text-white mb-2">
          AI <span className="text-blue-400">VS</span> ME
        </h2>
        
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
            />
          ))}
        </div>
      </motion.div>

      {/* Futuristic Scan Line (Optional, for extra cool factor) */}
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm pointer-events-none"
      />
    </div>
  );
}
