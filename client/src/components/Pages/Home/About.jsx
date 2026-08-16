import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Hospital Management",
    description: "End-to-end control of beds, staff, inventory, and daily operations from a single command center.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    span: "lg:col-span-2 lg:row-span-2",
    accent: true,
  },
  {
    title: "Analytics & Reports",
    description: "Real-time dashboards and exportable reports for smarter clinical decisions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    span: "",
    accent: false,
  },
  {
    title: "Secure & Private",
    description: "HIPAA-ready encryption and role-based access keep patient data protected.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    span: "",
    accent: false,
  },
  {
    title: "Fast & Efficient",
    description: "Automated workflows that cut paperwork and accelerate patient throughput.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    span: "",
    accent: false,
  },
  {
    title: "Multi-User Roles",
    description: "Tailored experiences for admins, doctors, nurses, and patients.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    span: "lg:col-span-2",
    accent: false,
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#009BA9] uppercase tracking-widest mb-4">
            Why Curo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#20211A] mb-5 tracking-tight">
            Built for modern healthcare teams
          </h2>
          <p className="text-lg text-[#4A4A4A] leading-relaxed">
            Everything you need to run a world-class facility — designed with
            clarity, speed, and patient outcomes at the center.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 ${feature.span} ${
                feature.accent
                  ? "bg-gradient-to-br from-[#009BA9] to-[#007A85] text-white shadow-xl shadow-[#009BA9]/20"
                  : "bg-white border border-[#E0E0E0]/60 hover:border-[#009BA9]/25 hover:shadow-xl hover:shadow-[#009BA9]/5"
              }`}
            >
              {feature.accent && (
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              )}

              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 ${
                  feature.accent
                    ? "bg-white/15 text-white"
                    : "bg-[#009BA9]/8 text-[#009BA9] group-hover:bg-[#009BA9] group-hover:text-white"
                } transition-all duration-300`}
              >
                {feature.icon}
              </div>

              <h3
                className={`text-xl font-bold mb-3 ${
                  feature.accent ? "text-white" : "text-[#20211A]"
                }`}
              >
                {feature.title}
              </h3>

              <p
                className={`leading-relaxed ${
                  feature.accent ? "text-white/80" : "text-[#6B6B6B]"
                } ${feature.accent ? "text-base sm:text-lg max-w-sm" : "text-sm sm:text-base"}`}
              >
                {feature.description}
              </p>

              {feature.accent && (
                <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-4">
                  {[
                    { label: "Modules", value: "12+" },
                    { label: "Integrations", value: "30+" },
                    { label: "Languages", value: "8" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <div className="text-xs text-white/60">{item.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
