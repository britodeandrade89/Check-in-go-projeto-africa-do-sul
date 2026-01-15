import React, { useState } from 'react';
import { 
  ChevronRight,
  Languages,
  Banknote,
  CalendarCheck,
  ClipboardList,
  Map,
  Hotel,
  Bus,
  Plane,
  Receipt,
  Bot,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import Translator from './Translator';
import PronunciationPractice from './PronunciationPractice';
import CurrencyConverter from './CurrencyConverter';
import FinancialControl from './FinancialControl';
import PackingList from './PackingList';
import GuideList from './GuideList';
import AccommodationList from './AccommodationList';
import BusList from './BusList';
import FlightList from './FlightList';
import AiAssistant from './AiAssistant';

type CurrentView = 'menu' | 'translator' | 'pronunciation' | 'currency' | 'financial' | 'packing' | 'guides' | 'accommodation' | 'bus' | 'flights' | 'ai-assistant';

const Navigation: React.FC = () => {
  const [currentView, setCurrentView] = useState<CurrentView>('menu');

  const menuItems = [
    { id: 'translator', title: 'Tradutor', icon: <Languages className="w-6 h-6 text-white" />, gradient: 'bg-gradient-to-r from-sa-black to-slate-900 shadow-gray-500' },
    { id: 'pronunciation', title: 'Pronúncia', icon: <Languages className="w-6 h-6 text-sa-green" />, gradient: 'bg-gradient-to-r from-sa-green to-emerald-600 shadow-emerald-200' },
    { id: 'currency', title: 'Câmbio', icon: <Banknote className="w-6 h-6 text-sa-black" />, gradient: 'bg-gradient-to-r from-sa-gold to-yellow-500 shadow-yellow-200' },
    { id: 'financial', title: 'Financeiro', icon: <CalendarCheck className="w-6 h-6 text-sa-blue" />, gradient: 'bg-gradient-to-r from-sa-blue to-blue-800 shadow-blue-300' },
    { id: 'packing', title: 'Checklist Malas', icon: <ClipboardList className="w-6 h-6 text-sa-green" />, gradient: 'bg-gradient-to-r from-sa-green to-teal-600 shadow-emerald-200' },
    { id: 'guides', title: 'Guias & Roteiro', icon: <Map className="w-6 h-6 text-sa-green" />, gradient: 'bg-gradient-to-r from-sa-green to-teal-600 shadow-emerald-200' },
    { id: 'accommodation', title: 'Hospedagem', icon: <Hotel className="w-6 h-6 text-sa-blue" />, gradient: 'bg-gradient-to-r from-sa-blue to-indigo-900 shadow-blue-200' },
    { id: 'bus', title: 'Ônibus', icon: <Bus className="w-6 h-6 text-sa-black" />, gradient: 'bg-gradient-to-r from-sa-gold to-orange-400 shadow-orange-200' },
    { id: 'flights', title: 'Voos', icon: <Plane className="w-6 h-6 text-sa-red" />, gradient: 'bg-gradient-to-r from-sa-red to-rose-600 shadow-red-300' },
    { id: 'expenses', title: 'Gastos', icon: <Receipt className="w-6 h-6 text-sa-red" />, gradient: 'bg-gradient-to-r from-sa-red to-red-600 shadow-red-200' },
    { id: 'ai-assistant', title: 'Guia IA', icon: <Bot className="w-6 h-6 text-white" />, gradient: 'bg-gradient-to-r from-sa-black to-gray-800 shadow-gray-400' },
  ];

  const handleMenuClick = (id: string) => {
    setCurrentView(id as CurrentView);
  };

  const renderView = () => {
    switch (currentView) {
      case 'translator':
        return <Translator />;
      case 'pronunciation':
        return <PronunciationPractice />;
      case 'currency':
        return <CurrencyConverter />;
      case 'financial':
        return <FinancialControl />;
      case 'packing':
        return <PackingList />;
      case 'guides':
        return <GuideList />;
      case 'accommodation':
        return <AccommodationList />;
      case 'bus':
        return <BusList />;
      case 'flights':
        return <FlightList />;
      case 'ai-assistant':
        return <AiAssistant />;
      case 'menu':
      default:
        return (
          <div className="space-y-3">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full mb-2 flex items-center justify-between p-3 pl-4 pr-5 rounded-[20px] shadow-lg transition-transform duration-200 active:scale-[0.98] ${item.gradient}`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/90 backdrop-blur-sm p-2.5 rounded-2xl shadow-inner flex items-center justify-center aspect-square h-12 w-12">
                    {item.icon}
                  </div>
                  <span className={`text-lg font-display font-bold tracking-wide text-left drop-shadow-sm ${item.id === 'currency' || item.id === 'bus' ? 'text-sa-black' : 'text-white'}`}>
                    {item.title}
                  </span>
                </div>
                <ChevronRight className={`w-5 h-5 ${item.id === 'currency' || item.id === 'bus' ? 'text-black/50' : 'text-white/80'}`} strokeWidth={3} />
              </button>
            ))}
          </div>
        );
    }
  };

  return (
    <div>
      {currentView !== 'menu' && (
        <button
          onClick={() => setCurrentView('menu')}
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-lg transition-colors"
        >
          ← Voltar ao Menu
        </button>
      )}
      {renderView()}
    </div>
  );
};

export default Navigation;
