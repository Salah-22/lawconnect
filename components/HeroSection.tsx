import React from "react";

const HeroSection = () => {
  return (
    <div className="bg-[url('/images/hero-section.jpg')] bg-cover font-[sans-serif] text-white p-6 grid h-[70vh] w-full">
      <div className="max-md:text-center place-self-center w-full md:w-[40%]">
        <h3 className="md:text-6xl text-2xl font-bold">
          Your online legal partner.
        </h3>
        <p className="mt-6 text-sm md:text-lg">
          A website to help (students and professors) who have difficulty
          accessing information in the field of law using our dashboard
        </p>
        <button
          type="button"
          className="px-6 py-2 mt-8 font-semibold rounded text-sm outline-none border-2 border-white"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
