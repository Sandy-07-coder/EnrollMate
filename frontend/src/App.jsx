import React, { useEffect, useRef } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import { useCourseStore } from "./store/courseStore";

function App() {
  const courses = useCourseStore(state => state.courses);
  const navigate = useNavigate();

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    if (courses.length > 0) {
      navigate('/home', { replace: true });
    }
  }, [courses, navigate]);

  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
