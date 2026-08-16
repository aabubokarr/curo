import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#009BA9] via-[#008A96] to-[#007A85] px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 tracking-tight">
              Ready to elevate your care?
            </h2>
            <p className="text-lg text-white/80 mb-10 leading-relaxed">
              Join hundreds of healthcare providers who trust Curo to streamline
              operations and deliver better patient experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <RouterLink
                to="/login"
                className="inline-flex items-center justify-center h-12 sm:h-14 px-8 text-base sm:text-lg font-medium rounded-xl bg-white text-[#007A85] hover:bg-white/90 shadow-xl transition-all duration-300 w-full sm:w-auto min-w-[200px]"
              >
                Start Free Trial
              </RouterLink>
              <a
                href="#contact"
                className="inline-flex items-center justify-center h-12 sm:h-14 px-8 text-base sm:text-lg font-medium rounded-xl border-2 border-white/60 text-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
