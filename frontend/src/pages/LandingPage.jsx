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
import { AnimatedHero } from "../components/ui/animated-hero";
import TeamCard from "../components/ui/team-card";

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
      color: '#4F7CFF',
      secondaryColor: '#3B5FCC'
    },
    {
      icon: FaBolt,
      title: "Instant Conflict Detection",
      description: "Get real-time alerts for scheduling conflicts",
      color: '#F59E0B',
      secondaryColor: '#D97706'
    },
    {
      icon: FaChartBar,
      title: "Visual Timetable",
      description: "See your entire schedule at a glance",
      color: '#8B9FFF',
      secondaryColor: '#6B7FE0'
    },
    {
      icon: FaUserTie,
      title: "Faculty Management",
      description: "Track instructors and their courses easily",
      color: '#7ECCAA',
      secondaryColor: '#5EBD93'
    },
    {
      icon: FaMobileAlt,
      title: "Fully Responsive",
      description: "Access on any device, anywhere, anytime",
      color: '#F87171',
      secondaryColor: '#DC2626'
    },
    {
      icon: FaDownload,
      title: "Export & Share",
      description: "Download your timetable as HTML",
      color: '#5B8DEF',
      secondaryColor: '#3B6FD0'
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
    <div className="min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#B4C8FF] opacity-40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#9BB5FF] opacity-30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#C8D7FF] opacity-35 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <AnimatedHero onGetStarted={goToHomePage} />

      {/* Features Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2B4A] mb-4">
              What You Can Do
            </h2>
            <p className="text-[#4A5568] text-lg max-w-2xl mx-auto">
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
      <section className="relative py-24" style={{ background: 'linear-gradient(180deg, transparent 0%, #E8EEFF 50%, transparent 100%)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2B4A] mb-4">
              Built with Modern Tech
            </h2>
            <p className="text-[#4A5568] max-w-2xl mx-auto text-lg">
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
                          <span className="text-xs text-[#718096]">{tech.type}</span>
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
                          className="text-[10px] px-2 py-0.5 rounded-full bg-[#F0F4FF] text-[#4A5568] border border-[#E8EEFF]"
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
      <section className="relative py-20 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2B4A] mb-4">
              Meet the Team
            </h2>
            <p className="text-[#718096] max-w-xl mx-auto">
              For Students. By Students.
            </p>
          </div>

          {/* Animated Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4 sm:px-0">
            <TeamCard
              name="Prakathiswararn"
              role="Concept & Idea"
              color="#F59E0B"
              linkedinUrl="http://www.linkedin.com/in/prakathis-wararn-5672b9372"
            />
            <TeamCard
              name="Santhosh Sandy"
              role="Full Stack Developer"
              color="#4F7CFF"
              linkedinUrl="https://www.linkedin.com/in/santhosh2673/"
            />
            <TeamCard
              name="Bala Saravanan K"
              role="Web Designer"
              color="#7ECCAA"
              linkedinUrl="https://www.linkedin.com/in/bala-saravanan-k/"
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A2B4A] mb-6">
            Ready to organize your schedule?
          </h2>
          <p className="text-[#4A5568] mb-10 text-lg max-w-xl mx-auto">
            Start building your perfect timetable today
          </p>
          <button
            onClick={goToHomePage}
            className="group relative px-12 py-4 bg-[#4F7CFF] rounded-full text-lg font-semibold text-white shadow-lg shadow-[#4F7CFF]/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[#4F7CFF]/30 hover:shadow-xl hover:bg-[#3B5FCC]"
          >
            <span className="relative z-10">Launch EnrollMate</span>
          </button>
        </div>
      </section>

      {/* Bottom Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#B4C8FF] to-transparent"></div>
    </div>
  );
};

export default LandingPage;
