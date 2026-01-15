import React from 'react';
import { Info, Car, ShoppingBag, Navigation, Bus } from 'lucide-react';
import { Accommodation } from '../types';

interface Props {
  hotel: Accommodation;
  activeCity: string;
}

const ExpandableDetails: React.FC<Props> = ({ hotel, activeCity }) => {
  return (
    <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6" id={`${hotel.id}-details`} role="region" aria-labelledby={`${hotel.id}-toggle`}>
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
        <h4 className="text-[10px] font-black text-sa-green uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" /> Dossiê de Hospedagem
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4 italic">"{hotel.description}"</p>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="bg-red-50 p-3 rounded-2xl border border-red-100 flex-1">
              <span className="text-[9px] font-black text-sa-red uppercase block mb-1">Check-in Crítico</span>
              <p className="text-[10px] text-red-900 font-bold leading-tight">{hotel.checkInWarning}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-2xl border border-green-100 flex-1">
              <span className="text-[9px] font-black text-sa-green uppercase block mb-1">Segurança Bairro</span>
              <p className="text-[10px] text-green-900 font-bold leading-tight">{hotel.securityScore}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Car className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase">Uber Aeroporto</span>
          </div>
          <span className="text-xs font-black text-slate-800">{hotel.uberAirport}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sa-gold mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase">{activeCity === 'SP' ? 'Distância GRU' : 'Mercado'}</span>
          </div>
          <span className="text-xs font-black text-slate-800 leading-tight">{activeCity === 'SP' ? hotel.uberToCenter : hotel.market}</span>
        </div>
      </div>

      <div className="bg-sa-black text-white p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <Navigation className="w-5 h-5 text-sa-gold" />
          <h4 className="text-xs font-black uppercase tracking-widest">O que tem perto?</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sa-gold mt-1.5 shrink-0" />
            <p className="text-[11px] leading-relaxed opacity-90"><strong>Lazer:</strong> {hotel.leisureInfo}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sa-gold mt-1.5 shrink-0" />
            <p className="text-[11px] leading-relaxed opacity-90"><strong>Diferencial:</strong> {hotel.differential}</p>
          </div>
        </div>
        {hotel.hasBRT && (
          <div className="mt-4 bg-sa-blue p-3 rounded-2xl flex items-center justify-between border border-blue-400">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-wider">{activeCity === 'CPT' ? 'BRT MyCiTi' : 'Red Bus / Gautrain'}</span>
            </div>
            <span className="text-[9px] font-black bg-white text-sa-blue px-2 py-1 rounded-lg">TEM ESTAÇÃO</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandableDetails;
