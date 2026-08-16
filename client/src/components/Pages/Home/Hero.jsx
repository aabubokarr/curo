import React from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../UI";
import { theme } from "../../../constants/theme";

const fadeUp = (delay = 0) => ({
  initial: { y: 28, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative h-[calc(100vh-3.5rem)] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#FAFAFA]" />
      <div className="absolute top-0 right-0 w-[70%] h-[70%] rounded-full bg-[#009BA9]/8 blur-[120px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-[#007A85]/6 blur-[100px] translate-y-1/4 -translate-x-1/4" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.colors.border.light} 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              {...fadeUp(0.1)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#009BA9]/20 shadow-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009BA9] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009BA9]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#007A85] tracking-wide">
                Healthcare management, reimagined
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.2)}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight mb-6"
            >
              <span className="text-[#20211A]">Care that moves</span>
              <br />
              <span className="bg-gradient-to-r from-[#009BA9] via-[#00B8C7] to-[#007A85] bg-clip-text text-transparent">
                at the speed of life
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.3)}
              className="text-base sm:text-lg text-[#4A4A4A] max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Curo unifies appointments, patient records, and clinical workflows
              in one elegant platform — so your team spends less time on admin
              and more time delivering exceptional care.
            </motion.p>

            <motion.div
              {...fadeUp(0.4)}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-12"
            >
              <RouterLink to="/login">
                <Button size="lg" variant="primary" className="w-full sm:w-auto min-w-[200px] shadow-lg shadow-[#009BA9]/25">
                  Get Started
                </Button>
              </RouterLink>
              <Link to="calculator" smooth={true} offset={-80}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]">
                  Try BMI Calculator
                </Button>
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4"
            >
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "50K+", label: "Patients served" },
                { value: "4.9/5", label: "User rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-[#20211A]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6B6B6B]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#009BA9]/20 via-transparent to-[#007A85]/10 rounded-3xl blur-2xl" />

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-[#009BA9]/10 p-6 sm:p-8">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FE3F32]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FEB50D]/80" />
                <div className="w-3 h-3 rounded-full bg-[#42B127]/80" />
                <span className="ml-3 text-xs font-medium text-[#6B6B6B]">
                  Curo Dashboard
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Appointments", value: "128", trend: "+12%" },
                  { label: "Patients", value: "2.4K", trend: "+8%" },
                  { label: "Doctors", value: "48", trend: "+3" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-white border border-[#E0E0E0]/60"
                  >
                    <div className="text-[10px] sm:text-xs text-[#6B6B6B] mb-1">
                      {item.label}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#20211A]">
                      {item.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-[#42B127] mt-0.5">
                      {item.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Appointment list */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">
                  Today&apos;s Schedule
                </div>
                {[
                  { name: "Sarah Mitchell", time: "9:00 AM", dept: "Cardiology", status: "Confirmed" },
                  { name: "James Chen", time: "10:30 AM", dept: "General", status: "In Progress" },
                  { name: "Emily Rodriguez", time: "2:00 PM", dept: "Pediatrics", status: "Pending" },
                ].map((appt, i) => (
                  <motion.div
                    key={appt.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.12 }}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-white border border-[#E0E0E0]/50 hover:border-[#009BA9]/30 transition-colors"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#009BA9] to-[#007A85] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {appt.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#20211A] truncate">
                        {appt.name}
                      </div>
                      <div className="text-xs text-[#6B6B6B]">
                        {appt.time} · {appt.dept}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                        appt.status === "Confirmed"
                          ? "bg-[#42B127]/10 text-[#42B127]"
                          : appt.status === "In Progress"
                          ? "bg-[#009BA9]/10 text-[#009BA9]"
                          : "bg-[#FEB50D]/10 text-[#B8860B]"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-[#E0E0E0]/60 px-4 py-3 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#42B127]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#42B127]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-[#6B6B6B]">Patient satisfaction</div>
                <div className="text-sm font-bold text-[#20211A]">98% positive</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
