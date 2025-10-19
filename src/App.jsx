import React from "react";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
