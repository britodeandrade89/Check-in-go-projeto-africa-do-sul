import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full h-80 overflow-hidden shadow-2xl group border-b-4 border-sa-gold bg-black">
      {/* CSS Animation Definitions */}
      <style>{`
        @keyframes eternalMove {
            0% { transform: scale(1.15) translate(0, 0); }
            50% { transform: scale(1.25) translate(-2%, -1%); }
            100% { transform: scale(1.15) translate(0, 0); }
        }
        .animate-eternal {
            animation: eternalMove 25s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Background Image with Eternal Movement */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center animate-eternal"
        style={{ 
          backgroundImage: 'url("https://flagcdn.com/w2560/za.png")',
          filter: 'blur(3px) brightness(0.9)',
        }}
      ></div>
      
      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-4 select-none">
        <div className="flex flex-col items-center transform transition-transform duration-700 hover:scale-105">
            
            {/* Stacked Text Block */}
            <div className="flex flex-col items-center leading-none relative">
                
                {/* "CHECK-IN," */}
                <span 
                    className="block font-display font-black text-white text-5xl sm:text-6xl tracking-tighter relative top-3 z-10"
                    style={{
                        textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                    }}
                >
                    CHECK-IN,
                </span>

                {/* "GO!" with Globe */}
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                    {/* Letter G */}
                    <span 
                        className="font-display font-black text-white text-[8rem] sm:text-[10rem] tracking-tighter"
                        style={{
                            textShadow: '6px 6px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                        }}
                    >
                        G
                    </span>
                    
                    {/* The Globe Icon (Replacing O) */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#0077be] border-[3px] border-black shadow-[4px_4px_0_#000] overflow-hidden shrink-0 mt-2">
                         <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Ocean Base */}
                            <circle cx="50" cy="50" r="50" fill="#2563EB" />
                            
                            {/* Land Masses (Stylized) */}
                            <g fill="#22c55e" stroke="black" strokeWidth="1">
                                {/* Americas-ish */}
                                <path d="M15,30 Q25,20 30,35 Q35,50 25,60 Q15,70 10,50 Z" />
                                {/* Africa/Europe-ish */}
                                <path d="M45,20 Q60,15 70,30 Q80,45 70,60 Q60,75 45,65 Q35,55 40,40 Z" />
                                {/* Asia-ish */}
                                <path d="M75,25 Q90,20 95,40 Q90,60 80,50 Z" />
                            </g>
                            
                            {/* Glossy Reflection */}
                            <path d="M25,25 Q40,15 55,25 Q50,40 35,35 Z" fill="white" opacity="0.3" transform="rotate(-10 40 25)" />
                         </svg>
                    </div>

                    {/* Exclamation Mark */}
                    <span 
                        className="font-display font-black text-white text-[8rem] sm:text-[10rem] tracking-tighter"
                        style={{
                            textShadow: '6px 6px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000'
                        }}
                    >
                        !
                    </span>
                </div>
            </div>

            {/* Subtitle */}
            <h2 
                className="font-display text-lg sm:text-2xl font-bold text-white uppercase tracking-[0.05em] relative -top-2"
                style={{
                    textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
            >
                África do Sul
            </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
