import React from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {
  const navigate = useNavigate();
  
  const goToHomePage = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          <div className="max-w-5xl">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                EnrollMate
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium mb-6">
              Smart Course Enrollment. Simple Timetables. Zero Conflicts.
            </p>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              A modern course enrollment and timetable management system built by students, for students.
              Choose courses, organize schedules, detect conflicts instantly, and visualize your perfect timetable.
            </p>
            
            <button
              onClick={goToHomePage}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white">
            What You Can Do
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: "📚", 
                title: "Easy Course Selection",
                description: "Browse and select courses with an intuitive interface"
              },
              { 
                icon: "⚡", 
                title: "Instant Conflict Detection",
                description: "Get real-time alerts for scheduling conflicts"
              },
              { 
                icon: "📊", 
                title: "Visual Timetable",
                description: "See your entire schedule at a glance"
              },
              { 
                icon: "👨‍🏫", 
                title: "Faculty Management",
                description: "Track instructors and their courses easily"
              },
              { 
                icon: "📱", 
                title: "Fully Responsive",
                description: "Access on any device, anywhere, anytime"
              },
              { 
                icon: "💾", 
                title: "Export & Share",
                description: "Download your timetable as HTML"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">
            Built with Modern Tech
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Powered by the MERN stack, Zustand for state management, and Docker for seamless deployment
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {['MongoDB', 'Express', 'React', 'Node.js', 'Zustand', 'Docker'].map((tech, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50 text-gray-300 font-medium hover:border-blue-500/50 transition-all duration-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className="bg-gray-900/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
              For Students. By Students.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Concept by</p>
                <a
                  href="http://www.linkedin.com/in/prakathis-wararn-5672b9372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Prakathiswararn
                </a>
              </div>
              
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Developed by</p>
                <a
                  href="https://www.linkedin.com/in/santhosh2673/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Santhosh Sandy
                </a>
              </div>
              
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Supported by</p>
                <a
                  href="https://techsociety.saveetha.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors"
                >
                  Tech Society
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to organize your schedule?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Start building your perfect timetable today
          </p>
          <button
            onClick={goToHomePage}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Launch EnrollMate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
