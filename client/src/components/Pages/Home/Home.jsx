import React from "react";
import { Navbar } from "../../Bars/Navbar";
import { Hero } from "./Hero";
import { Stats } from "./Stats";
import { About } from "./About";
import { Calculator } from "./Calculator";
import { Contact } from "./Contact";
import { CTA } from "./CTA";
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Stats />
        <About />
        <Calculator />
        <Contact />
        <CTA />
        <Footer />
      </main>
    </div>
  );
};
