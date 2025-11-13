import React from "react";
import { Navbar } from "../../Bars/Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Calculator } from "./Calculator";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-14">
        <Hero />
        <About />
        <Calculator />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};
