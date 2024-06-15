import React from "react";

const StatsSection = () => {
  return (
    <div className="px-4 py-16 font-[sans-serif] text-white">
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-12 max-w-7xl mx-auto">
        <div className="text-center bg-[var(--primary-color)] p-4 border-b-4 border-orange-600 rounded-md">
          <i
            className="fa-solid fa-book-open-reader fa-2xl"
            style={{ display: "inline-block", color: "var(--btn-color)" }}
          ></i>

          <h3 className="text-4xl font-extrabold mt-5">400+</h3>
          <p className="text-gray-300 font-semibold mt-3">Readers</p>
        </div>
        <div className="text-center bg-[var(--primary-color)] p-4 border-b-4 border-orange-600 rounded-md">
          <i
            className="fa-solid fa-book fa-2xl"
            style={{
              display: "inline-block",
              color: "var(--btn-color)",
            }}
          ></i>
          <h3 className="text-4xl font-extrabold mt-5">1500+</h3>
          <p className="text-gray-300 font-semibold mt-3">Books</p>
        </div>
        <div className="text-center bg-[var(--primary-color)] p-4 border-b-4 border-orange-600 rounded-md">
          <i
            className="fa-solid fa-person-walking fa-2xl"
            style={{ display: "inline-block", color: "var(--btn-color)" }}
          ></i>
          <h3 className="text-4xl font-extrabold mt-5">500+</h3>
          <p className="text-gray-300 font-semibold mt-3">Visitor</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
