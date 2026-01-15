import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps extends MenuItem {
  onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  title, 
  icon, 
  gradientClass,
  textColor = 'text-white', // Default to white
  onClick
}) => {
  
  return (
    <button
      onClick={onClick}
      className={`w-full mb-4 flex items-center justify-between p-3 pl-4 pr-5 rounded-[20px] shadow-lg transition-transform duration-200 active:scale-[0.98] ${gradientClass}`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container - White Square with soft shadow */}
        <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-2xl shadow-inner flex items-center justify-center aspect-square h-12 w-12">
          {icon}
        </div>
        
        {/* Title */}
        <span className={`${textColor} text-lg font-display font-bold tracking-wide text-left drop-shadow-sm`}>
          {title}
        </span>
      </div>
      
      {/* Chevron */}
      <ChevronRight className={`w-5 h-5 ${textColor === 'text-white' ? 'text-white/80' : 'text-black/50'}`} strokeWidth={3} />
    </button>
  );
};

export default MenuCard;
