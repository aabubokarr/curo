import React from "react";
import { Navbar } from "../../Bars/Navbar";
import { Hero } from "./Hero";
import { Calculator } from "./Calculator";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Calculator />
      <Contact />
      <Footer />
    </div>
  );
};
