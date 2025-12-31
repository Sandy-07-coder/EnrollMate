import React from 'react';

const FeatureCard3D = ({
    icon: Icon,
    title,
    description,
    color = '#00c37b',
    secondaryColor = '#00894d'
}) => {
    return (
        <div className="group/3d perspective-[1000px] w-full">
            <div
                className="relative h-[280px] sm:h-[300px] rounded-[40px] sm:rounded-[50px] transition-all duration-500 ease-in-out transform-gpu preserve-3d group-hover/3d:rotate-x-[15deg] group-hover/3d:rotate-y-[15deg]"
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 100%)`,
                    boxShadow: `rgba(0, 0, 0, 0) 40px 50px 25px -40px, rgba(0, 0, 0, 0.2) 0px 25px 25px -5px`,
                }}
            >
                {/* Glass overlay */}
                <div
                    className="absolute inset-2 rounded-[45px] sm:rounded-[55px] transition-all duration-500 preserve-3d"
                    style={{
                        borderTopRightRadius: '100%',
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.8) 100%)',
                        transform: 'translate3d(0px, 0px, 25px)',
                        borderLeft: '1px solid white',
                        borderBottom: '1px solid white',
                    }}
                />

                {/* Content */}
                <div
                    className="relative pt-20 sm:pt-24 px-5 sm:px-7 preserve-3d"
                    style={{ transform: 'translate3d(0, 0, 26px)' }}
                >
                    <span
                        className="block font-black text-lg sm:text-xl"
                        style={{ color: secondaryColor }}
                    >
                        {title}
                    </span>
                    <span
                        className="block text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed"
                        style={{ color: `${secondaryColor}cc` }}
                    >
                        {description}
                    </span>
                </div>

                {/* Logo circles */}
                <div className="absolute right-0 top-0 preserve-3d">
                    {/* Circle 1 - Largest */}
                    <span
                        className="block absolute aspect-square rounded-full top-2 right-2 w-[120px] sm:w-[170px] transition-all duration-500 backdrop-blur-sm group-hover/3d:scale-110"
                        style={{
                            background: `${color}33`,
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            transform: 'translate3d(0, 0, 20px)',
                        }}
                    />
                    {/* Circle 2 */}
                    <span
                        className="block absolute aspect-square rounded-full top-2.5 right-2.5 w-[100px] sm:w-[140px] transition-all duration-500 delay-100 backdrop-blur-[1px] group-hover/3d:translate-z-[60px]"
                        style={{
                            background: `${color}33`,
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            transform: 'translate3d(0, 0, 40px)',
                        }}
                    />
                    {/* Circle 3 */}
                    <span
                        className="block absolute aspect-square rounded-full top-4 right-4 w-[80px] sm:w-[110px] transition-all duration-500 delay-200 backdrop-blur-sm group-hover/3d:translate-z-[80px]"
                        style={{
                            background: `${color}33`,
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            transform: 'translate3d(0, 0, 60px)',
                        }}
                    />
                    {/* Circle 4 */}
                    <span
                        className="block absolute aspect-square rounded-full top-5 right-5 w-[60px] sm:w-[80px] transition-all duration-500 delay-300 backdrop-blur-sm group-hover/3d:translate-z-[100px]"
                        style={{
                            background: `${color}33`,
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            transform: 'translate3d(0, 0, 80px)',
                        }}
                    />
                    {/* Circle 5 - Icon container */}
                    <span
                        className="flex items-center justify-center absolute aspect-square rounded-full top-6 sm:top-7 right-6 sm:right-7 w-[45px] sm:w-[50px] transition-all duration-500 delay-500 backdrop-blur-sm group-hover/3d:translate-z-[120px]"
                        style={{
                            background: `${color}33`,
                            boxShadow: 'rgba(100, 100, 111, 0.2) -10px 10px 20px 0px',
                            transform: 'translate3d(0, 0, 100px)',
                        }}
                    >
                        {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" />}
                    </span>
                </div>

                {/* Bottom section */}
                <div
                    className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-end preserve-3d"
                    style={{ transform: 'translate3d(0, 0, 26px)' }}
                >
                    <div className="flex items-center gap-1 transition-all duration-200 hover:translate-z-[10px] group/btn cursor-pointer">
                        <button
                            className="bg-transparent border-none font-bold text-xs"
                            style={{ color: color }}
                        >
                            Learn more
                        </button>
                        <svg
                            className="w-4 h-4"
                            style={{ fill: 'none', stroke: color, strokeWidth: '3px' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard3D;