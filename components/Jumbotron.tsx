import Link from "next/link";
import React from "react";

const Jumbotron = () => {
  return (
    <div className="bg-gray-100 px-6 py-12 font-[sans-serif]">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img
              src="https://readymadeui.com/management-img.webp"
              alt="Image"
              className="rounded-md object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--primary-color)] mb-4">
              Dive Deep into Legal Mastery
            </h2>
            <p className="text-gray-700 text-sm leading-6">
              Improve your legal knowledge and skills with our extensive library
              of reference books, courses and training materials.
            </p>
            <ul className="list-disc text-sm text-gray-700 space-y-2 pl-4 mt-6">
              <li>Discover innovative courses and books.</li>
              <li>Share your Knowledge in law.</li>
              <li>Collaborate with like-minded individuals.</li>
              <li>Transform your visions into reality.</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/products"
                className="text-[var(--primary-color)] text-sm font-semibold hover:underline"
              >
                Get Started{" "}
                <i aria-hidden className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
