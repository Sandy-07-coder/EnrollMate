import * as React from "react";
import { useState } from "react";
import { cn } from "../../libs/utils";

// --- Card Components ---

export function AnimatedCard({ className, ...props }) {
    return (
        <div
            role="region"
            className={cn(
                "group/animated-card relative overflow-hidden rounded-2xl border border-[#E8EEFF] bg-white shadow-sm hover:shadow-md transition-shadow duration-300",
                className
            )}
            {...props}
        />
    );
}

export function CardBody({ className, ...props }) {
    return (
        <div
            role="group"
            className={cn(
                "flex flex-col space-y-2 border-t border-[#F0F4FF] p-5",
                className
            )}
            {...props}
        />
    );
}

export function CardTitle({ className, ...props }) {
    return (
        <h3
            className={cn(
                "text-base font-semibold leading-tight tracking-tight text-[#1A2B4A]",
                className
            )}
            {...props}
        />
    );
}

export function CardDescription({ className, ...props }) {
    return (
        <p
            className={cn(
                "text-sm text-[#718096] leading-relaxed",
                className
            )}
            {...props}
        />
    );
}

export function CardVisual({ className, ...props }) {
    return (
        <div
            className={cn("h-[180px] overflow-hidden", className)}
            {...props}
        />
    );
}

// --- Visual3 Component with Icon Animation ---

export function Visual3({
    mainColor = "#8b5cf6",
    secondaryColor = "#fbbf24",
    gridColor = "#80808015",
    stat1 = "+15.2%",
    stat2 = "+18.7%",
    hoverTitle = "Technology Stats",
    hoverDesc = "Hover to see details",
    Icon = null,
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div
                className="absolute inset-0 z-20"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    "--color": mainColor,
                    "--secondary-color": secondaryColor,
                }}
            />

            <div className="relative h-[180px] w-full overflow-hidden rounded-t-xl">
                {/* Animated Icon Layer */}
                <IconLayer
                    color={mainColor}
                    secondaryColor={secondaryColor}
                    hovered={hovered}
                    Icon={Icon}
                />
                <Layer2 color={mainColor} hoverTitle={hoverTitle} hoverDesc={hoverDesc} />
                <Layer1 color={mainColor} secondaryColor={secondaryColor} stat1={stat1} stat2={stat2} />
                <EllipseGradient color={mainColor} />
                <GridLayer color={gridColor} />
            </div>
        </>
    );
}

const GridLayer = ({ color }) => {
    return (
        <div
            style={{ "--grid-color": color }}
            className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:24px_24px] bg-center opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]"
        />
    );
};

const EllipseGradient = ({ color }) => {
    return (
        <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
            <svg
                width="100%"
                height="180"
                viewBox="0 0 356 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <rect width="356" height="180" fill="url(#paint0_radial_12_207)" />
                <defs>
                    <radialGradient
                        id="paint0_radial_12_207"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(178 98) rotate(90) scale(98 178)"
                    >
                        <stop stopColor={color} stopOpacity="0.25" />
                        <stop offset="0.34" stopColor={color} stopOpacity="0.15" />
                        <stop offset="1" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

const Layer1 = ({ color, secondaryColor, stat1, stat2 }) => {
    return (
        <div
            className="absolute top-3 left-3 z-[8] flex items-center gap-1.5"
            style={{
                "--color": color,
                "--secondary-color": secondaryColor,
            }}
        >
            <div className="flex shrink-0 items-center rounded-full bg-white/90 px-2 py-1 shadow-sm transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color)]" />
                <span className="ml-1.5 text-[10px] font-medium text-[#1A2B4A]">
                    {stat1}
                </span>
            </div>
            <div className="flex shrink-0 items-center rounded-full bg-white/90 px-2 py-1 shadow-sm transition-opacity duration-300 ease-in-out group-hover/animated-card:opacity-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--secondary-color)]" />
                <span className="ml-1.5 text-[10px] font-medium text-[#1A2B4A]">
                    {stat2}
                </span>
            </div>
        </div>
    );
};

const Layer2 = ({ color, hoverTitle, hoverDesc }) => {
    return (
        <div
            className="group relative h-full w-full"
            style={{ "--color": color }}
        >
            <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[15] flex w-full translate-y-full items-start justify-center bg-transparent p-4 transition-transform duration-500 group-hover/animated-card:translate-y-0">
                <div className="ease-[cubic-bezier(0.6, 0, 1)] rounded-md border border-[#C8D7FF] bg-white/90 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-500 shadow-lg group-hover/animated-card:opacity-100">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--color)]" />
                        <p className="text-xs text-[#1A2B4A] font-medium">
                            {hoverTitle}
                        </p>
                    </div>
                    <p className="text-xs text-[#4A5568]">
                        {hoverDesc}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Layer3 = ({ color }) => {
    return (
        <div className="ease-[cubic-bezier(0.6, 0.6, 0, 1)] absolute inset-0 z-[6] flex translate-y-full items-center justify-center opacity-0 transition-all duration-500 group-hover/animated-card:translate-y-0 group-hover/animated-card:opacity-100">
            <svg
                width="100%"
                height="180"
                viewBox="0 0 356 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <rect width="356" height="180" fill="url(#paint0_linear_29_3)" />
                <defs>
                    <linearGradient
                        id="paint0_linear_29_3"
                        x1="178"
                        y1="0"
                        x2="178"
                        y2="180"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0.35" stopColor={color} stopOpacity="0" />
                        <stop offset="1" stopColor={color} stopOpacity="0.3" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// New Icon Layer - replaces the bar chart with animated icon
const IconLayer = ({ color, secondaryColor, hovered, Icon }) => {
    if (!Icon) return null;

    return (
        <div
            className="absolute inset-0 z-[8] flex h-[180px] w-full items-center justify-center transition-all duration-500"
        >
            {/* Outer glow ring */}
            <div
                className={`absolute rounded-full transition-all duration-700 ease-out ${hovered
                    ? 'w-32 h-32 opacity-20'
                    : 'w-20 h-20 opacity-10'
                    }`}
                style={{
                    backgroundColor: color,
                    filter: 'blur(20px)',
                }}
            />

            {/* Pulsing rings */}
            <div
                className={`absolute rounded-full border-2 transition-all duration-500 ${hovered ? 'w-28 h-28 opacity-30' : 'w-16 h-16 opacity-15'
                    }`}
                style={{
                    borderColor: color,
                    animation: 'pulse-ring 2s ease-out infinite',
                }}
            />
            <div
                className={`absolute rounded-full border transition-all duration-500 ${hovered ? 'w-36 h-36 opacity-20' : 'w-20 h-20 opacity-10'
                    }`}
                style={{
                    borderColor: secondaryColor,
                    animation: 'pulse-ring 2s ease-out infinite 0.5s',
                }}
            />

            {/* Icon container */}
            <div
                className={`relative flex items-center justify-center rounded-2xl transition-all duration-500 ease-out ${hovered
                    ? 'w-20 h-20 scale-110 rotate-0'
                    : 'w-16 h-16 scale-100 rotate-0'
                    }`}
                style={{
                    background: `linear-gradient(135deg, ${color}30, ${secondaryColor}20)`,
                    boxShadow: hovered
                        ? `0 0 40px ${color}40, 0 0 80px ${color}20`
                        : `0 0 20px ${color}20`,
                }}
            >
                <Icon
                    className={`transition-all duration-500 ${hovered ? 'w-12 h-12' : 'w-10 h-10'
                        }`}
                    style={{
                        color: color,
                        filter: hovered ? `drop-shadow(0 0 8px ${color})` : 'none',
                    }}
                />
            </div>

            {/* Floating particles */}
            {hovered && (
                <>
                    <div
                        className="absolute w-2 h-2 rounded-full animate-float-particle"
                        style={{
                            backgroundColor: color,
                            top: '30%',
                            left: '25%',
                            animationDelay: '0s',
                        }}
                    />
                    <div
                        className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
                        style={{
                            backgroundColor: secondaryColor,
                            top: '40%',
                            right: '25%',
                            animationDelay: '0.3s',
                        }}
                    />
                    <div
                        className="absolute w-1 h-1 rounded-full animate-float-particle"
                        style={{
                            backgroundColor: color,
                            bottom: '35%',
                            left: '30%',
                            animationDelay: '0.6s',
                        }}
                    />
                    <div
                        className="absolute w-1.5 h-1.5 rounded-full animate-float-particle"
                        style={{
                            backgroundColor: secondaryColor,
                            bottom: '30%',
                            right: '30%',
                            animationDelay: '0.9s',
                        }}
                    />
                </>
            )}

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 1;
          }
        }
        .animate-float-particle {
          animation: float-particle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default AnimatedCard;
