import React from "react";
import { useNavigate } from "react-router";
import {
  AnimatedCard,
  CardBody,
  CardTitle,
  CardDescription,
  CardVisual,
  Visual3
} from "../components/ui/animated-card-chart";
import FeatureCard3D from "../components/ui/FeatureCard3D";

// React Icons imports
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiDocker
} from "react-icons/si";
import {
  FaBook,
  FaBolt,
  FaChartBar,
  FaUserTie,
  FaMobileAlt,
  FaDownload,
  FaGithub,
  FaCube
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home");
  };

  const features = [
    {
      icon: FaBook,
      title: "Easy Course Selection",
      description: "Browse and select courses with an intuitive interface",
      color: '#3b82f6',
      secondaryColor: '#1d4ed8'
    },
    {
      icon: FaBolt,
      title: "Instant Conflict Detection",
      description: "Get real-time alerts for scheduling conflicts",
      color: '#f59e0b',
      secondaryColor: '#d97706'
    },
    {
      icon: FaChartBar,
      title: "Visual Timetable",
      description: "See your entire schedule at a glance",
      color: '#a855f7',
      secondaryColor: '#7c3aed'
    },
    {
      icon: FaUserTie,
      title: "Faculty Management",
      description: "Track instructors and their courses easily",
      color: '#10b981',
      secondaryColor: '#059669'
    },
    {
      icon: FaMobileAlt,
      title: "Fully Responsive",
      description: "Access on any device, anywhere, anytime",
      color: '#f43f5e',
      secondaryColor: '#e11d48'
    },
    {
      icon: FaDownload,
      title: "Export & Share",
      description: "Download your timetable as HTML",
      color: '#6366f1',
      secondaryColor: '#4f46e5'
    },
  ];

  const techStack = [
    {
      name: 'MongoDB',
      Icon: SiMongodb,
      description: 'NoSQL database for flexible data storage',
      mainColor: '#10b981',
      secondaryColor: '#059669',
      type: 'Database',
      version: 'v7.0',
      features: ['Document-based', 'Scalable', 'Flexible Schema'],
      stat1: '10M+ docs',
      stat2: '99.9% uptime',
      hoverTitle: 'MongoDB Atlas',
      hoverDesc: 'Cloud-hosted NoSQL database'
    },
    {
      name: 'Express',
      Icon: SiExpress,
      description: 'Fast, minimalist Node.js framework',
      mainColor: '#6366f1',
      secondaryColor: '#4f46e5',
      type: 'Backend Framework',
      version: 'v4.18',
      features: ['Middleware', 'Routing', 'RESTful APIs'],
      stat1: '50+ routes',
      stat2: '<100ms latency',
      hoverTitle: 'Express.js API',
      hoverDesc: 'RESTful backend services'
    },
    {
      name: 'React',
      Icon: SiReact,
      description: 'Modern UI library for building interfaces',
      mainColor: '#06b6d4',
      secondaryColor: '#0891b2',
      type: 'Frontend Library',
      version: 'v18.2',
      features: ['Components', 'Virtual DOM', 'Hooks'],
      stat1: '30+ components',
      stat2: '60fps render',
      hoverTitle: 'React Frontend',
      hoverDesc: 'Component-based UI library'
    },
    {
      name: 'Node.js',
      Icon: SiNodedotjs,
      description: 'JavaScript runtime for server-side code',
      mainColor: '#22c55e',
      secondaryColor: '#16a34a',
      type: 'Runtime Environment',
      version: 'v20 LTS',
      features: ['Async I/O', 'NPM', 'Event-driven'],
      stat1: '1M+ req/day',
      stat2: 'Non-blocking',
      hoverTitle: 'Node.js Runtime',
      hoverDesc: 'Server-side JavaScript engine'
    },
    {
      name: 'Zustand',
      Icon: FaCube,
      description: 'Lightweight state management solution',
      mainColor: '#f59e0b',
      secondaryColor: '#d97706',
      type: 'State Management',
      version: 'v4.4',
      features: ['Minimal API', 'No Boilerplate', 'TypeScript'],
      stat1: '5 stores',
      stat2: '<1kb bundle',
      hoverTitle: 'Zustand Store',
      hoverDesc: 'Lightweight state management'
    },
    {
      name: 'Docker',
      Icon: SiDocker,
      description: 'Container platform for deployment',
      mainColor: '#3b82f6',
      secondaryColor: '#2563eb',
      type: 'DevOps Tool',
      version: 'v24.0',
      features: ['Containers', 'Compose', 'Portable'],
      stat1: '3 containers',
      stat2: '100% portable',
      hoverTitle: 'Docker Compose',
      hoverDesc: 'Containerized deployment'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          <div className="max-w-5xl animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 animate-fade-in-down">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300 font-medium">Built for Students, By Students</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="gradient-text animate-gradient">
                EnrollMate
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-medium mb-6">
              Smart Course Enrollment. Simple Timetables.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400"> Zero Conflicts.</span>
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              A modern course enrollment and timetable management system.
              Choose courses, organize schedules, detect conflicts instantly, and visualize your perfect timetable.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={goToHomePage}
                className="group relative px-10 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </button>

              <a
                href="https://github.com/Sandy-07-Coder/EnrollMate"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-lg font-medium text-gray-300 border border-gray-600 hover:border-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <FaGithub className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-gray-500 flex justify-center pt-2">
              <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What You Can Do
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to plan your perfect semester
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard3D
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                  secondaryColor={feature.secondaryColor}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section with Animated Cards */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Built with Modern Tech
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Powered by the MERN stack, Zustand for state management, and Docker for seamless deployment
            </p>
          </div>

          {/* Animated Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {techStack.map((tech, index) => {
              const IconComponent = tech.Icon;
              return (
                <AnimatedCard
                  key={index}
                  className="w-full animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardVisual>
                    <Visual3
                      mainColor={tech.mainColor}
                      secondaryColor={tech.secondaryColor}
                      stat1={tech.stat1}
                      stat2={tech.stat2}
                      hoverTitle={tech.hoverTitle}
                      hoverDesc={tech.hoverDesc}
                      Icon={IconComponent}
                    />
                  </CardVisual>
                  <CardBody className="space-y-3">
                    {/* Header with icon, name and version */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent
                          className="w-7 h-7"
                          style={{ color: tech.mainColor }}
                        />
                        <div>
                          <CardTitle>{tech.name}</CardTitle>
                          <span className="text-xs text-gray-500">{tech.type}</span>
                        </div>
                      </div>
                      <span
                        className="text-xs font-mono px-2 py-1 rounded-full"
                        style={{ backgroundColor: `${tech.mainColor}20`, color: tech.mainColor }}
                      >
                        {tech.version}
                      </span>
                    </div>

                    {/* Description */}
                    <CardDescription>{tech.description}</CardDescription>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tech.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardBody>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="relative py-16 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 text-center">
              <p className="text-2xl font-semibold gradient-text mb-8">
                For Students. By Students.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Concept by</p>
                  <a
                    href="http://www.linkedin.com/in/prakathis-wararn-5672b9372"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-amber-400 hover:text-amber-300 transition-colors duration-300"
                  >
                    Prakathiswararn
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Developed by</p>
                  <a
                    href="https://www.linkedin.com/in/santhosh2673/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    Santhosh Sandy
                  </a>
                </div>

                <div className="group">
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Supported by</p>
                  <a
                    href="https://techsociety.saveetha.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-green-400 hover:text-green-300 transition-colors duration-300"
                  >
                    Tech Society
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to organize your schedule?
          </h2>
          <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">
            Start building your perfect timetable today
          </p>
          <button
            onClick={goToHomePage}
            className="group relative px-12 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-full text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
          >
            <span className="relative z-10">Launch EnrollMate</span>
          </button>
        </div>
      </section>

      {/* Bottom Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
    </div>
  );
};

export default LandingPage;
