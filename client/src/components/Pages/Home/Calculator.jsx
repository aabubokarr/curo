import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input } from "../../UI";
import { theme } from "../../../constants/theme";

const bmiCategories = [
  {
    label: "Underweight",
    range: "< 18.5",
    color: theme.colors.bmi.underweight,
  },
  { label: "Normal", range: "18.5 – 24.9", color: theme.colors.bmi.normal },
  {
    label: "Overweight",
    range: "25 – 29.9",
    color: theme.colors.bmi.overweight,
  },
  { label: "Obese", range: "30 – 34.9", color: theme.colors.bmi.obese },
  {
    label: "Extremely Obese",
    range: "≥ 35",
    color: theme.colors.bmi.extremelyObese,
  },
];

export const Calculator = () => {
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [bmi, setBmi] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setBmi(null);
    setCategory("");
    setBgColor("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!weight || !height) {
      setError("Please enter both weight and height");
      return;
    }
    if (weight <= 0 || height <= 0) {
      setError("Weight and height must be greater than 0");
      return;
    }
    if (height > 3) {
      setError("Height should be in meters (e.g., 1.75 for 175cm)");
      return;
    }

    const calculatedBmi = weight / (height * height);
    setBmi(calculatedBmi);
    setError("");

    if (calculatedBmi < 18.5) {
      setCategory("Underweight");
      setBgColor(theme.colors.bmi.underweight);
    } else if (calculatedBmi < 24.9) {
      setCategory("Normal");
      setBgColor(theme.colors.bmi.normal);
    } else if (calculatedBmi < 29.9) {
      setCategory("Overweight");
      setBgColor(theme.colors.bmi.overweight);
    } else if (calculatedBmi < 34.9) {
      setCategory("Obese");
      setBgColor(theme.colors.bmi.obese);
    } else {
      setCategory("Extremely Obese");
      setBgColor(theme.colors.bmi.extremelyObese);
    }
  };

  const activeIndex = bmiCategories.findIndex((c) => c.label === category);

  return (
    <section id="calculator" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#009BA9] uppercase tracking-widest mb-4">
            Health Tools
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#20211A] mb-5 tracking-tight">
            BMI Calculator
          </h2>
          <p className="text-lg text-[#4A4A4A] mb-10 leading-relaxed">
            Understand your body mass index in seconds. A quick wellness check
            to help you stay informed about your health journey.
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-2 items-center">
          {/* Left: info */}
          <div className="flex flex-col gap-2 lg:gap-0 justify-between lg:h-full">
            {bmiCategories.map((cat, i) => (
              <div
                key={cat.label}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  activeIndex === i
                    ? "border-transparent shadow-lg scale-[1.02]"
                    : "border-[#E0E0E0]/60 bg-[#FAFAFA]"
                }`}
                style={
                  activeIndex === i
                    ? {
                        backgroundColor: `${cat.color}15`,
                        borderColor: `${cat.color}40`,
                      }
                    : {}
                }
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#20211A]">
                    {cat.label}
                  </div>
                  <div className="text-xs text-[#6B6B6B]">BMI {cat.range}</div>
                </div>
                {activeIndex === i && bmi !== null && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: cat.color }}
                  >
                    You
                  </motion.span>
                )}
              </div>
            ))}
          </div>
          {/* Right: form */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative bg-gradient-to-br from-[#FAFAFA] to-white rounded-2xl border border-[#E0E0E0]/60 p-6 sm:p-10 shadow-xl shadow-[#009BA9]/5">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 70"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Height (m)"
                  name="height"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 1.75"
                  value={formData.height}
                  onChange={handleChange}
                  helperText="175 cm = 1.75 m"
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="shadow-lg shadow-[#009BA9]/20"
                >
                  Calculate BMI
                </Button>
              </form>

              <AnimatePresence>
                {bmi !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 p-8 rounded-2xl text-white text-center relative overflow-hidden"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative">
                      <div className="text-sm font-medium opacity-80 mb-1">
                        Your BMI
                      </div>
                      <div className="text-5xl font-extrabold mb-2">
                        {bmi.toFixed(1)}
                      </div>
                      <div className="text-lg font-semibold">{category}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
