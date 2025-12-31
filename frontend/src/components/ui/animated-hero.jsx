import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function AnimatedHero({ onGetStarted }) {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["Seamless", "Intelligent", "Effortless", "Powerful", "Modern"],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2500);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Subtle decorative circles - hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-[#B4C8FF] opacity-30 blur-3xl" />
            <div className="hidden sm:block absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#9BB5FF] opacity-20 blur-3xl" />

            <div className="relative z-10 w-full max-w-4xl mx-auto py-12 sm:py-16 lg:py-20">
                <div className="text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/70 border border-[#B4C8FF] shadow-sm mb-6 sm:mb-10"
                    >
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#4F7CFF]" />
                        <span className="text-xs sm:text-sm text-[#1A2B4A] font-medium">Crafted for Students</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="mb-6 sm:mb-8"
                    >
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                            <span className="text-[#1A2B4A]">Course Enrollment</span>
                            <br />
                            <span className="text-[#1A2B4A]">Made </span>

                            {/* Animated Word */}
                            <span className="relative inline-block w-[160px] sm:w-[220px] md:w-[280px] lg:w-[340px] h-[1.15em] overflow-hidden align-bottom">
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute inset-0 flex items-center justify-center text-[#4F7CFF]"
                                        initial={{ opacity: 0, y: "100%" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 20
                                        }}
                                        animate={
                                            titleNumber === index
                                                ? { y: "0%", opacity: 1 }
                                                : {
                                                    y: titleNumber > index ? "-100%" : "100%",
                                                    opacity: 0
                                                }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-[#4A5568] leading-relaxed font-light">
                            Manage your academic schedule with ease.
                        </p>
                        <p className="text-base sm:text-lg md:text-xl text-[#4A5568] leading-relaxed font-light">
                            Select courses, detect conflicts, visualize your timetable.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                    >
                        <button
                            onClick={onGetStarted}
                            className="group flex justify-center gap-2 items-center shadow-xl text-base sm:text-lg bg-white font-semibold relative z-10 px-5 sm:px-6 py-2.5 sm:py-3 overflow-hidden border-2 border-gray-200 rounded-full transition-all duration-300 hover:bg-[#4F7CFF] hover:border-[#4F7CFF] hover:text-white active:bg-[#4F7CFF] active:border-[#4F7CFF] active:text-white active:scale-95"
                        >
                            Get Started
                            <svg
                                className="w-7 h-7 sm:w-8 sm:h-8 ease-linear duration-300 rounded-full border border-gray-400 group-hover:border-white group-hover:rotate-90 group-active:border-white group-active:rotate-90 p-2 rotate-45"
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                    className="fill-gray-600 group-hover:fill-white group-active:fill-white transition-colors duration-300"
                                />
                            </svg>
                        </button>

                        <a
                            href="https://github.com/Sandy-07-Coder/EnrollMate"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium text-[#1A2B4A] bg-white/60 border border-[#B4C8FF] hover:bg-white hover:border-[#7BA3FF] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                            View Source
                        </a>
                    </motion.div>

                    {/* Feature Highlights */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-12 sm:mt-16"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-xl bg-[#7ECCAA]/15 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#5EBD93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs text-[#4A5568]">Conflicts</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-xl bg-[#4F7CFF]/15 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#4F7CFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xs text-[#4A5568]">Timetable</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className="w-10 h-10 rounded-xl bg-[#8B9FFF]/15 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#8B9FFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                                <span className="text-xs text-[#4A5568]">Export</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export { AnimatedHero };
