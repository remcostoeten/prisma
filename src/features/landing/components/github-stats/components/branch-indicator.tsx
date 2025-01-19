'use client'

import { motion } from "framer-motion";

function BranchIndicator({ branch }: { branch: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <motion.div 
        className="relative"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
        <div className="absolute inset-0 w-2 h-2 bg-[#4CAF50] rounded-full"></div>
      </motion.div>
      <span className="text-[#4CAF50] text-sm tracking-wider uppercase">{branch} BRANCH</span>
    </div>
  );
}

export default BranchIndicator;
