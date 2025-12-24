import { useState, useEffect } from "react";

const Footer = () => {
  const [starCount, setStarCount] = useState(0);
  const [loading, setLoading] = useState(true);

 /* useEffect(() => {
    // Fetch GitHub star count
    fetch("https://api.github.com/repos/Sandy-07-Coder/EnrollMate")
      .then((res) => res.json())
      .then((data) => {
        setStarCount(data.stargazers_count);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching GitHub stars:", err);
        setLoading(false);
      });
  }, []);  */

  return (
    <footer className="w-full bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-3 py-2 sm:px-4 sm:py-3">
        {/* Top Section - GitHub */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          {/* GitHub Star Section */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* GitHub Link */}
            <a
              href="https://github.com/Sandy-07-Coder/EnrollMate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="View on GitHub"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* Star Count */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-700/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded border border-gray-600">
              <span className="text-yellow-400 text-xs sm:text-sm">⭐</span>
              <span className="text-white text-xs sm:text-sm font-semibold">
                {loading ? "..." : starCount !== null ? starCount : "0"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
          {/* Credits Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-xs sm:text-sm text-center">
            {/* Concept by */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-gray-400">💡 Concept by</span>
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Prahathieswaran
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-gray-600"></div>

            {/* Built by */}
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-gray-400">💻 Built with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span className="text-gray-400">by</span>
              <a
                href="https://www.linkedin.com/in/santhosh2673/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-green-400 to-teal-400 hover:from-green-300 hover:to-teal-300 transition-all duration-300 cursor-pointer"
              >
                Santhosh
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} EnrollMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
