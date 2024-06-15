"use client";

import React from "react";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import Jumbotron from "./Jumbotron";
import FeaturesSection from "./FeaturesSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <Jumbotron />
      <FeaturesSection />
    </div>
  );
};

export default Home;
