import React from 'react';
import { 
  Banknote, 
  Bot,
  Bus, 
  CalendarCheck, 
  ClipboardList,
  Hotel, 
  Languages,
  Map, 
  Plane, 
  Receipt,
} from 'lucide-react';
import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cambio',
    title: 'Câmbio',
    icon: <Banknote className="w-6 h-6 text-sa-black" />,
    themeColor: 'gold',
    gradientClass: 'bg-gradient-to-r from-sa-gold to-yellow-500 shadow-yellow-200',
    textColor: 'text-sa-black'
  },
  {
    id: 'checklist',
    title: 'Checklist Malas',
    icon: <ClipboardList className="w-6 h-6 text-sa-green" />,
    themeColor: 'green',
    gradientClass: 'bg-gradient-to-r from-sa-green to-emerald-600 shadow-emerald-200'
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    icon: <CalendarCheck className="w-6 h-6 text-sa-blue" />,
    themeColor: 'blue',
    gradientClass: 'bg-gradient-to-r from-sa-blue to-blue-800 shadow-blue-300'
  },
  {
    id: 'gastos',
    title: 'Gastos',
    icon: <Receipt className="w-6 h-6 text-sa-red" />,
    themeColor: 'red',
    gradientClass: 'bg-gradient-to-r from-sa-red to-red-600 shadow-red-200'
  },
  {
    id: 'ia_assistant',
    title: 'Guia IA',
    icon: <Bot className="w-6 h-6 text-white" />,
    themeColor: 'black',
    gradientClass: 'bg-gradient-to-r from-sa-black to-gray-800 shadow-gray-400'
  },
  {
    id: 'guias',
    title: 'Guias & Roteiro',
    icon: <Map className="w-6 h-6 text-sa-green" />,
    themeColor: 'green',
    gradientClass: 'bg-gradient-to-r from-sa-green to-teal-600 shadow-emerald-200'
  },
  {
    id: 'hospedagem',
    title: 'Hospedagem',
    icon: <Hotel className="w-6 h-6 text-sa-blue" />,
    themeColor: 'blue',
    gradientClass: 'bg-gradient-to-r from-sa-blue to-indigo-900 shadow-blue-200'
  },
  {
    id: 'onibus',
    title: 'Ônibus',
    icon: <Bus className="w-6 h-6 text-sa-black" />,
    themeColor: 'gold',
    gradientClass: 'bg-gradient-to-r from-sa-gold to-orange-400 shadow-orange-200',
    textColor: 'text-sa-black'
  },
  {
    id: 'tradutor',
    title: 'Tradutor',
    icon: <Languages className="w-6 h-6 text-white" />,
    themeColor: 'black',
    gradientClass: 'bg-gradient-to-r from-sa-black to-slate-900 shadow-gray-500'
  },
  {
    id: 'voos',
    title: 'Voos',
    icon: <Plane className="w-6 h-6 text-sa-red" />,
    themeColor: 'red',
    gradientClass: 'bg-gradient-to-r from-sa-red to-rose-600 shadow-red-300'
  },
];
