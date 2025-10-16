import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="py-10 bg-[#0a0a0a] text-white flex flex-col items-center gap-3 mt-[100px]">
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "linear", duration: 0.4, delay: 0 }}
        className="cursor-pointer poppins font-bold w-[60px] h-[60px] bg-[#FAF9F6] text-black flex items-center justify-center rounded-xl text-[24px]"
      >
        H
      </motion.div>
      <motion.p
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "linear", duration: 0.4, delay: 0.1 }}
        className="poppins text-[12px] md:text-[18px]"
      >
        Copyright © {year} Curo. All rights reserved.
      </motion.p>
    </div>
  );
};
