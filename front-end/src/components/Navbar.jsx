// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full max-w-6xl flex justify-between items-center mb-8 text-gray-700">
      <h1 className="text-2xl font-bold">🐾 Doggofy</h1>
      <div className="space-x-4 hidden sm:block">
        <button className="hover:underline">Home</button>
        <button className="hover:underline">About</button>
        <button className="hover:underline">API</button>
      </div>
    </nav>
  );
};

export default Navbar;
