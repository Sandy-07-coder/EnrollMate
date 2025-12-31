import React, { useState } from 'react';
import { FaLinkedin, FaUser } from 'react-icons/fa';

const TeamCard = ({
    name,
    role,
    Icon = FaUser,
    linkedinUrl,
    color = '#4F7CFF'
}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div className="w-full sm:w-[220px]">
            <div
                className={`relative bg-gradient-to-br from-white to-[#F8FAFF] rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 border border-[#E8EEFF] 
          hover:shadow-xl hover:border-[#C8D7FF] hover:scale-[1.02]
          ${isPressed ? 'shadow-xl border-[#C8D7FF] scale-[1.02]' : ''}`}
                style={{
                    boxShadow: isPressed ? '0 15px 40px -10px rgba(79, 124, 255, 0.2)' : '0 8px 30px -10px rgba(79, 124, 255, 0.12)',
                }}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
            >
                {/* Colored accent line */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 rounded-b-full transition-all duration-300"
                    style={{
                        backgroundColor: color,
                        opacity: isPressed ? 1 : 0.8,
                        width: isPressed ? '5rem' : undefined
                    }}
                />

                {/* Icon Avatar */}
                <div className="relative mt-3 sm:mt-4 mb-4 sm:mb-5">
                    <div
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center transition-all duration-300
              hover:scale-110 hover:shadow-lg
              ${isPressed ? 'scale-110 shadow-lg' : ''}`}
                        style={{ backgroundColor: `${color}15` }}
                    >
                        <Icon
                            className={`w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 ${isPressed ? 'scale-110' : ''}`}
                            style={{ color: color }}
                        />
                    </div>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-[#1A2B4A] mb-1">
                    {name}
                </h3>

                {/* Role badge */}
                <span
                    className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium mb-4 sm:mb-5"
                    style={{
                        backgroundColor: `${color}15`,
                        color: color
                    }}
                >
                    {role}
                </span>

                {/* LinkedIn Button */}
                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 flex items-center justify-center gap-2 w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
                    style={{
                        backgroundColor: color,
                        boxShadow: `0 4px 12px -3px ${color}40`
                    }}
                >
                    <FaLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Connect
                </a>
            </div>
        </div>
    );
};

export default TeamCard;
