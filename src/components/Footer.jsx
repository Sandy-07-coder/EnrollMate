/**
 * @fileoverview Footer - Application footer component
 * @description Displays application credits, copyright, and creator information
 */

import React from "react";

/**
 * Footer Component
 * Application footer with credits and copyright information
 *
 * Features:
 * - Gradient text effects for creator names
 * - Animated heart icon
 * - Responsive layout (column on mobile, row on desktop)
 * - Dynamic copyright year
 * - Sticky to bottom of page
 *
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-4 sm:py-5">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-3">
          {/* Credits Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm sm:text-base">
            {/* Concept by */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400">💡 Concept by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Prahathieswaran
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-gray-600"></div>

            {/* Built by */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400">💻 Built with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-gray-400">by</span>
              <a
                href="https://www.linkedin.com/in/santhosh2673/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-300 hover:to-teal-300 transition-all duration-300 cursor-pointer"
              >
                Santhosh
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()} EnrollMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
