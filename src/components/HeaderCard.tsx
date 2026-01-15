import React from 'react';
import { CheckCircle2, UtensilsCrossed, Snowflake, Wind, Waves, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Accommodation } from '../types';

interface Props {
  hotel: Accommodation;
  expanded: boolean;
  onToggle: () => void;
}

const HeaderCard: React.FC<Props> = ({ hotel, expanded, onToggle }) => {
  return (
    <div className={`p-6 text-center ${hotel.breakfastIncluded ? 'bg-green-50/30' : 'bg-slate-50'}`}>
      <div className="mt-8 mb-4 flex flex-wrap justify-center gap-2">
        <span
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 ${
            hotel.breakfastIncluded ? 'bg-sa-green text-white border-green-700' : 'bg-white text-slate-400 border-slate-200'
          }`}
        >
          {hotel.breakfastIncluded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <UtensilsCrossed className="w-3.5 h-3.5" />}
          {hotel.breakfastIncluded ? 'Café Incluso' : 'Café Pago'}
        </span>

        <span
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 ${
            hotel.coolingType === 'AC' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'
          }`}
        >
          {hotel.coolingType === 'AC' ? <Snowflake className="w-3.5 h-3.5" /> : <Wind className="w-3.5 h-3.5" />}
          {hotel.coolingLabel}
        </span>

        {hotel.hasPool && (
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 bg-cyan-50 text-cyan-700 border-cyan-200">
            <Waves className="w-3.5 h-3.5" /> Piscina
          </span>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="bg-sa-black text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm">{hotel.score}</span>
          <h2 className="text-2xl font-display font-black text-slate-800 leading-tight tracking-tight uppercase">{hotel.name}</h2>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{hotel.scoreLabel}</span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={`${hotel.id}-details`}
          id={`${hotel.id}-toggle`}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg border-b-4 ${
            expanded ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-sa-black text-white border-slate-950'
          }`}
        >
          {expanded ? 'FECHAR DETALHES' : 'LER TUDO SOBRE'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <a href={hotel.link} target="_blank" rel="noopener noreferrer" aria-label={`Abrir link de ${hotel.name}`} className="bg-sa-blue text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-blue-950 active:scale-95 transition-all">
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default HeaderCard;
