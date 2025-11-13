import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Card } from "../../UI";
import { theme } from "../../../constants/theme";

export const Calculator = () => {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
  });
  const [bmi, setBmi] = useState(null);
  const [bgColor, setBgColor] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
      setCategory("Normal");
      setBgColor(theme.colors.bmi.normal);
    } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
      setCategory("Overweight");
      setBgColor(theme.colors.bmi.overweight);
    } else if (calculatedBmi >= 30 && calculatedBmi < 34.9) {
      setCategory("Obese");
      setBgColor(theme.colors.bmi.obese);
    } else {
      setCategory("Extremely Obese");
      setBgColor(theme.colors.bmi.extremelyObese);
    }
  };

  return (
    <section
      id="calculator"
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Card padding="lg" shadow="lg" className="w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2" style={{ color: theme.colors.text.primary }}>
            BMI Calculator
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Calculate your Body Mass Index to understand your health better
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Input
                label="Weight (kg)"
                name="weight"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter your weight in kilograms"
                value={formData.weight}
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
                label="Height (m)"
                name="height"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter your height in meters (e.g., 1.75)"
                value={formData.height}
                onChange={handleChange}
                helperText="Enter height in meters. For example, 175cm = 1.75m"
                required
              />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Calculate BMI
              </Button>
            </motion.div>
          </form>

          {bmi !== null && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-6 rounded-lg text-white text-center"
              style={{ backgroundColor: bgColor }}
            >
              <h3 className="text-2xl font-bold mb-2">
                Your BMI: {bmi.toFixed(2)}
              </h3>
              <p className="text-lg font-medium">{category}</p>
            </motion.div>
          )}

          {/* BMI Reference */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text.primary }}>
              BMI Categories:
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.bmi.underweight}20` }}>
                <div className="font-semibold">Underweight</div>
                <div className="text-xs text-gray-600">&lt; 18.5</div>
              </div>
              <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.bmi.normal}20` }}>
                <div className="font-semibold">Normal</div>
                <div className="text-xs text-gray-600">18.5 - 24.9</div>
              </div>
              <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.bmi.overweight}20` }}>
                <div className="font-semibold">Overweight</div>
                <div className="text-xs text-gray-600">25 - 29.9</div>
              </div>
              <div className="text-center p-2 rounded" style={{ backgroundColor: `${theme.colors.bmi.obese}20` }}>
                <div className="font-semibold">Obese</div>
                <div className="text-xs text-gray-600">30 - 34.9</div>
              </div>
              <div className="text-center p-2 rounded col-span-2 md:col-span-1" style={{ backgroundColor: `${theme.colors.bmi.extremelyObese}20` }}>
                <div className="font-semibold">Extremely Obese</div>
                <div className="text-xs text-gray-600">≥ 35</div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};
