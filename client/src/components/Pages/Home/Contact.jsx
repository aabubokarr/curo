import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "../../UI";
import { theme } from "../../../constants/theme";

const contactInfo = [
  {
    label: "Email",
    value: "info@curo.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+1 (555) 123-4567",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "123 Healthcare St, Medical City",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
      agree: false,
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#009BA9] uppercase tracking-widest mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#20211A] mb-5 tracking-tight">
            We&apos;d love to hear from you
          </h2>
          <p className="text-lg text-[#4A4A4A]">
            Questions about Curo? Our team is ready to help you transform your
            healthcare operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-4">
          {/* Contact cards */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4 grid gap-4"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ x: -16, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#E0E0E0]/60 hover:border-[#009BA9]/25 hover:shadow-lg hover:shadow-[#009BA9]/5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#009BA9]/8 text-[#009BA9] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-[#20211A]">{item.value}</div>
                </div>
              </motion.div>
            ))}

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#009BA9] to-[#007A85] text-white flex flex-col justify-center">
              <div className="text-sm font-semibold opacity-80 mb-2">Response time</div>
              <div className="text-2xl font-bold mb-1">Under 24 hours</div>
              <div className="text-sm opacity-70">
                We typically respond to all inquiries within one business day.
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl border border-[#E0E0E0]/60 p-6 sm:p-10 shadow-xl shadow-[#009BA9]/5">
              {submitted && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-6 p-4 bg-[#42B127]/10 border border-[#42B127]/20 rounded-2xl text-[#2D8A1F] text-sm font-medium flex items-center gap-3"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Thank you! We&apos;ll get back to you soon.
                </motion.div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="message"
                    className="text-base font-medium"
                    style={{ color: theme.colors.primary.main }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Tell us how we can help..."
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#009BA9] focus:ring-[#009BA9] transition-all duration-300 resize-none bg-[#FAFAFA]"
                    style={{ color: theme.colors.text.primary }}
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 cursor-pointer accent-[#009BA9]"
                    required
                  />
                  <span className="text-sm text-[#4A4A4A]">
                    I agree with the Terms and Conditions
                  </span>
                </label>

                <Button type="submit" variant="primary" size="lg" fullWidth className="shadow-lg shadow-[#009BA9]/20">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
