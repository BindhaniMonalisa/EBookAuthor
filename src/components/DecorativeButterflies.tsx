"use client";

import React from 'react';

const ButterflySVG = ({ className }: { className: string }) => (
    <svg width="100%" height="100%" viewBox="0 0 100 100" className={`${className} fill-current`}>
        <path d="M50 50 C 50 30, 20 10, 10 30 C 0 50, 40 60, 50 50 C 60 60, 100 50, 90 30 C 80 10, 50 30, 50 50 C 50 70, 70 90, 85 85 C 100 80, 70 60, 50 50 C 30 60, 0 80, 15 85 C 30 90, 50 70, 50 50" />
    </svg>
);

const DecorativeButterflies = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block z-0">
            <div className="absolute right-0 top-0 bottom-0 w-1/3">
                {/* Red Butterfly */}
                <div className="absolute top-[10%] right-[10%] opacity-20 blur-[0.5px] rotate-[15deg] animate-pulse w-[45px] h-[45px]">
                    <ButterflySVG className="text-red-500 drop-shadow-sm" />
                </div>
                {/* Orange Butterfly */}
                <div className="absolute top-[28%] right-[22%] opacity-15 rotate-[-25deg] w-[35px] h-[35px]">
                    <ButterflySVG className="text-orange-500" />
                </div>
                {/* Yellow Butterfly */}
                <div className="absolute top-[48%] right-[8%] opacity-20 rotate-[40deg] animate-bounce w-[40px] h-[40px]" style={{ animationDuration: '4s' }}>
                    <ButterflySVG className="text-yellow-500" />
                </div>
                {/* Green Butterfly */}
                <div className="absolute top-[68%] right-[18%] opacity-15 rotate-[-15deg] w-[50px] h-[50px]">
                    <ButterflySVG className="text-green-500" />
                </div>
                {/* Blue Butterfly */}
                <div className="absolute top-[82%] right-[28%] opacity-20 rotate-[30deg] animate-pulse w-[38px] h-[38px]" style={{ animationDuration: '5s' }}>
                    <ButterflySVG className="text-blue-500" />
                </div>
                {/* Purple Butterfly */}
                <div className="absolute top-[38%] right-[32%] opacity-15 rotate-[50deg] w-[42px] h-[42px]">
                    <ButterflySVG className="text-purple-500" />
                </div>
            </div>
        </div>
    );
};

export default DecorativeButterflies;
