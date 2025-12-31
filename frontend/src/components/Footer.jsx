import { useState, useEffect } from "react";

const Footer = () => {
  const [starCount, setStarCount] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <footer className="w-full glass border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-4 sm:py-5">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-3">
          {/* GitHub Section */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Sandy-07-Coder/EnrollMate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              aria-label="View on GitHub"
            >
              <svg
                className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm text-gray-400 group-hover:text-white font-medium transition-colors duration-200">
                Star on GitHub
              </span>
              <span className="text-yellow-400 text-sm">⭐</span>
              <span className="text-white text-sm font-semibold">
                {loading ? "..." : starCount !== null ? starCount : "0"}
              </span>
            </a>
          </div>

          {/* Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">💡 Concept by</span>
              <a
                href="http://www.linkedin.com/in/prakathis-wararn-5672b9372"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                Prahathieswaran
              </a>
            </div>

            <div className="hidden sm:block w-px h-4 bg-white/10"></div>

            <div className="flex items-center gap-1.5">
              <span className="text-gray-500">💻 Built with</span>
              <span className="text-pink-400">❤️</span>
              <span className="text-gray-500">by</span>
              <a
                href="https://www.linkedin.com/in/santhosh2673/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
              >
                Santhosh
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-600 text-center">
            © {new Date().getFullYear()} EnrollMate. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
