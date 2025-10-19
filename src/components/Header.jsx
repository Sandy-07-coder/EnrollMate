/**
 * @fileoverview Header - Application header component
 * @description Displays the application branding and navigation bar
 */

import React from "react";

/**
 * Header Component
 * Sticky header bar displaying the EnrollMate application title
 *
 * Features:
 * - Sticky positioning at the top of the page
 * - Responsive text sizing
 * - Dark theme with border and shadow
 *
 * @returns {JSX.Element} Header component
 */
const Header = () => {
  return (
    <header className="sticky top-0 w-full bg-gray-900 text-white border-b border-gray-700 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            EnrollMate
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
