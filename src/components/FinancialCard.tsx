import React from 'react';
import { Wallet, Hotel, UtensilsCrossed } from 'lucide-react';
import { Accommodation } from '../types';

interface Props {
  hotel: Accommodation;
  activeCity: string;
}

const FinancialCard: React.FC<Props> = ({ hotel, activeCity }) => {
  return (
    <div className="p-6 border-t border-slate-100 space-y-4 bg-white">
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 relative">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-slate-400" /> RESUMO FINANCEIRO REAL
        </h4>
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold uppercase text-[10px]">DIÁRIA NO APP:</span>
            <span className="font-black text-slate-800 text-sm">{hotel.dailyPrice}</span>
          </div>
          <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-700 font-black flex items-center gap-2"><Hotel className="w-4 h-4 text-sa-green" /> {activeCity === 'SP' ? 'TOTAL PERNOITE' : 'TOTAL HOSPEDAGEM (5 NOITES)'}:</span>
            <span className="font-black text-sa-green text-lg">{hotel.stayTotalHotels}</span>
          </div>

          {!hotel.breakfastIncluded && (
            <div className="bg-sa-red/5 p-3 rounded-2xl border border-sa-red/20 flex justify-between items-center animate-pulse">
              <span className="text-sa-red font-black flex items-center gap-2 text-[10px] uppercase"><UtensilsCrossed className="w-3.5 h-3.5" /> CAFÉ DA MANHÃ PAGO:</span>
              <span className="font-black text-sa-red">+{hotel.breakfastPrice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialCard;
