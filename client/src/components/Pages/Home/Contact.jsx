import React from "react";
import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <div id="contact" className="mt-[100px] w-[340px] md:w-[700px] m-auto">
      <motion.h1
        initial={{ y: 15, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "linear", duration: 0.4, delay: 0 }}
        className="text-center poppins font-bold text-[40px] md:text-[50px]"
      >
        Contact Us
      </motion.h1>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full"
          >
            <label htmlFor="first_name" className="poppins">
              First Name
            </label>
            <input
              className="h-[48px] px-3 focus:outline-none border-[1px] border-[#c4c4c4] rounded-lg"
              name="first_name"

              type="text"
              placeholder="Enter your first name"
              required
            />
          </motion.div>
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full"
          >
            <label htmlFor="last_name" className="poppins">
              Last Name
            </label>
            <input
              className="h-[48px] px-3 focus:outline-none border-[1px] border-[#c4c4c4] rounded-lg"
              name="last_name"

              type="text"
              placeholder="Enter your last name"
              required
            />
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.4, delay: 0.3 }}
            className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full"
          >
            <label htmlFor="email" className="poppins">
              Email
            </label>
            <input
              className="h-[48px] px-3 focus:outline-none border-[1px] border-[#c4c4c4] rounded-lg"
              name="email"

              type="email"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "linear", duration: 0.4, delay: 0.4 }}
            className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full"
          >
            <label htmlFor="phone" className="poppins">
              Phone No
            </label>
            <input
              className="h-[48px] px-3 focus:outline-none border-[1px] border-[#c4c4c4] rounded-lg"
              name="phone"

              type="number"
              placeholder="Enter your phone no"
              required
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "linear", duration: 0.4, delay: 0.5 }}
          className="flex flex-col gap-1 text-[#009BA9] text-[16px] w-full"
        >
          <label htmlFor="message" className="poppins">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Enter your message"
            required
            cols="10"
            rows="5"
            className="p-3 focus:outline-none border-[1px] border-[#c4c4c4] rounded-lg"
          ></textarea>
        </motion.div>
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "linear", duration: 0.4, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          <input
            type="checkbox"
            name="check"
            required
            className="cursor-pointer accent-[#009BA9]"
          />
          <label htmlFor="check" className="poppins text-[16px]">
            I agree with the Terms and Conditions
          </label>
        </motion.div>
        <motion.button
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "linear", duration: 0.4, delay: 0.7 }}
          type="submit"
          className="w-full h-[48px] cursor-pointer bg-[#298E9E] flex items-center justify-center text-white poppins font-medium rounded-lg"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};
