import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const footerLinks = {
  Product: [
    { label: "Features", href: "#about" },
    { label: "BMI Calculator", href: "#calculator" },
    { label: "Pricing", href: "#contact" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
  ],
};

export const Footer = () => {
  const year = new Date().getFullYear();

  const socialIcons = [
    { icon: faTwitter, label: "twitter" },
    { icon: faLinkedinIn, label: "linkedin" },
    { icon: faGithub, label: "github" },
  ];

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#009BA9] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <img src="./images/logo.png" alt="Logo" className="w-10" />
            </div>
            <p className="text-[#9A9A9A] text-sm leading-relaxed max-w-sm mb-6">
              Your path to health, our commitment to care. The modern hospital
              management platform built for teams that put patients first.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#9A9A9A] hover:bg-[#009BA9]/20 hover:border-[#009BA9]/30 hover:text-white transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="w-4 h-4 group-hover:text-white transition-colors duration-300"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.08 }}
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-5 text-white">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#9A9A9A] hover:text-[#009BA9] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B6B6B]">
            Copyright &copy; {year} Curo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-sm text-[#9A9A9A] hover:text-white transition-colors duration-300"
            >
              Login
            </Link>
            <a
              href="#hero"
              className="text-sm text-[#9A9A9A] hover:text-white transition-colors duration-300"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};