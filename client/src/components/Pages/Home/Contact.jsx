import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Card } from "../../UI";
import { theme } from "../../../constants/theme";

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

    // Here you would typically send the data to your backend
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

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to
            us and we'll get back to you as soon as possible.
          </p>
        </div>

        <Card padding="lg" shadow="lg" className="w-full">
          {submitted && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
            >
              Thank you for contacting us! We'll get back to you soon.
            </motion.div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Input
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Input
                  label="Last Name"
                  name="last_name"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
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
                  placeholder="Enter your message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:border-[#009BA9] focus:ring-[#009BA9] transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: theme.colors.background.paper,
                    color: theme.colors.text.primary,
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-start gap-3"
            >
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 w-5 h-5 cursor-pointer accent-[#009BA9]"
                required
              />
              <label htmlFor="agree" className="text-base text-gray-700 cursor-pointer">
                I agree with the Terms and Conditions
              </label>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Submit
              </Button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </section>
  );
};
