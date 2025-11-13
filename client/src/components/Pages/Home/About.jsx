import React from "react";
import { motion } from "framer-motion";
import { Card } from "../../UI";
import { theme } from "../../../constants/theme";

export const About = () => {
  const features = [
    {
      icon: "🏥",
      title: "Hospital Management",
      description: "Complete solution for managing all aspects of hospital operations",
    },
    {
      icon: "📊",
      title: "Analytics & Reports",
      description: "Real-time insights and comprehensive reporting for better decisions",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is protected with industry-standard security measures",
    },
    {
      icon: "⚡",
      title: "Fast & Efficient",
      description: "Streamlined workflows to save time and improve productivity",
    },
    {
      icon: "👥",
      title: "Multi-User Support",
      description: "Role-based access for admins, doctors, and patients",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Access your data from any device, anywhere, anytime",
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
            Why Choose Curo?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive healthcare management system designed to streamline
            operations and improve patient care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card padding="lg" shadow="md" className="h-full hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: theme.colors.text.primary }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

