/**
 * @fileoverview LandingPage - Welcome page for the course enrollment system
 * @description Introduces users to SmartSlot with features and navigation
 */

import React from "react";
import { useNavigate } from "react-router";

/**
 * LandingPage Component
 * Welcome screen that introduces the application and its features
 *
 * @returns {JSX.Element} LandingPage component
 */
const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              EnrollMate
            </h1>
            <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Say goodbye to messy Excel sheets and paper sketches.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              With{" "}
              <span className="text-blue-400 font-semibold">EnrollMate</span>,
              designing a perfect timetable takes just a few clicks.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <span className="text-2xl sm:text-3xl">✅</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Choose slots easily
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Just tap and fill. Simple and intuitive.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <span className="text-2xl sm:text-3xl">✅</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Add course details instantly
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Course name, faculty, and credits in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <span className="text-2xl sm:text-3xl">✅</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Detect clashes automatically
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    No more confusion or scheduling conflicts.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <span className="text-2xl sm:text-3xl">✅</span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    Save, edit, and share
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300">
                    Your timetable is always accessible, anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mb-12 sm:mb-16">
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">
              Make planning seamless, visual, and fun.
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold px-8 sm:px-12 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl"
            >
              Start building your perfect schedule today! 🚀
            </button>
          </div>

          {/* Why You'll Love It Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-10 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
              ✨ Why You'll Love It
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-3xl sm:text-4xl">🎨</span>
                <span className="text-base sm:text-lg text-gray-300">
                  Clean & intuitive design
                </span>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-3xl sm:text-4xl">⚡</span>
                <span className="text-base sm:text-lg text-gray-300">
                  Real-time conflict detection
                </span>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-3xl sm:text-4xl">📊</span>
                <span className="text-base sm:text-lg text-gray-300">
                  No spreadsheets, no stress
                </span>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-3xl sm:text-4xl">🌐</span>
                <span className="text-base sm:text-lg text-gray-300">
                  Works right in your browser
                </span>
              </div>
            </div>
          </div>

          {/* Built By Section */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-blue-500/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              🚀 Built by Students, for Students
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/santhosh2673/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-300 cursor-pointer underline decoration-blue-400/50 hover:decoration-blue-300"
              >
                Santhosh
              </a>{" "}
              &{" "}
              <span className="text-blue-400 font-semibold">
                Prahathieswaran
              </span>
              ,
              <br className="hidden sm:block" />
              to make timetable creation smarter, faster, and effortless.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700/50 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © 2025 EnrollMate. Making timetables effortless. 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
