import React from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  function goToHomePage() {
    navigate("/home");
  }
  return (
    <div className=" min-h-screen bg-slate-900">
      <h1 className=" text-2xl text-center text-white">Landing Page</h1>
      <button
        onClick={() => {
          goToHomePage();
        }}
        className=" text-white bg-amber-500 rounded-sm px-2 py-1.5 text-lg cursor-pointer hover:scale-105 mx-auto block mt-16"
      >
        Click
      </button>
    </div>
  );
};

export default LandingPage;
