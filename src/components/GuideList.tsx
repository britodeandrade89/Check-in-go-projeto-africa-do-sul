import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Plus, Trash2, Edit2 } from 'lucide-react';
import { GUIDE_STORAGE_KEY } from '../constants';

interface DayBudget {
  food: number;
  transport: number;
  tickets: number;
}

interface DayPlan {
  day: number;
  date: string;
  title: string;
  activities: string[];
  budget: DayBudget;
}

interface CityPlan {
  [key: string]: DayPlan[];
}

const GuideList: React.FC = () => {
  const [cityPlans, setCityPlans] = useState<CityPlan>({
    CPT: [],
    JNB: [],
  });

  const [selectedCity, setSelectedCity] = useState<'CPT' | 'JNB'>('CPT');

  // Load saved guide data
  useEffect(() => {
    const savedGuide = localStorage.getItem(GUIDE_STORAGE_KEY);
    if (savedGuide) {
      try {
        const parsed = JSON.parse(savedGuide);
        setCityPlans(parsed);
      } catch (e) {
        console.error('Error loading guide data:', e);
      }
    }
  }, []);

  // Save guide data whenever it changes
  useEffect(() => {
    localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify(cityPlans));
  }, [cityPlans]);

  const addDay = (city: 'CPT' | 'JNB') => {
    const newDay: DayPlan = {
      day: (cityPlans[city]?.length || 0) + 1,
      date: new Date().toLocaleDateString('pt-BR'),
      title: `Dia ${(cityPlans[city]?.length || 0) + 1}`,
      activities: [],
      budget: { food: 0, transport: 0, tickets: 0 },
    };

    setCityPlans(prev => ({
      ...prev,
      [city]: [...(prev[city] || []), newDay],
    }));
  };

  const deleteDay = (city: 'CPT' | 'JNB', dayIndex: number) => {
    setCityPlans(prev => ({
      ...prev,
      [city]: prev[city].filter((_, i) => i !== dayIndex),
    }));
  };

  const updateDayBudget = (city: 'CPT' | 'JNB', dayIndex: number, field: keyof DayBudget, value: number) => {
    setCityPlans(prev => {
      const updatedCity = [...prev[city]];
      updatedCity[dayIndex] = {
        ...updatedCity[dayIndex],
        budget: {
          ...updatedCity[dayIndex].budget,
          [field]: value,
        },
      };
      return {
        ...prev,
        [city]: updatedCity,
      };
    });
  };

  const toBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const currentCity = selectedCity;
  const days = cityPlans[currentCity] || [];
  const totalCityBudget = days.reduce((sum, day) => 
    sum + day.budget.food + day.budget.transport + day.budget.tickets, 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-black text-slate-800 font-display">Guia de Viagem</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCity('CPT')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              selectedCity === 'CPT'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cidade do Cabo
          </button>
          <button
            onClick={() => setSelectedCity('JNB')}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
              selectedCity === 'JNB'
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Joanesburgo
          </button>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-4">
        {days.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-200">
            <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 font-medium">Nenhum dia planejado ainda</p>
          </div>
        ) : (
          days.map((day, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{day.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3" /> {day.date}
                  </p>
                </div>
                <button
                  onClick={() => deleteDay(currentCity, index)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Budget Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Alimentação</label>
                  <input
                    type="number"
                    value={day.budget.food || ''}
                    onChange={(e) =>
                      updateDayBudget(currentCity, index, 'food', parseFloat(e.target.value) || 0)
                    }
                    placeholder="0"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm font-bold focus:border-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Transporte</label>
                  <input
                    type="number"
                    value={day.budget.transport || ''}
                    onChange={(e) =>
                      updateDayBudget(currentCity, index, 'transport', parseFloat(e.target.value) || 0)
                    }
                    placeholder="0"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm font-bold focus:border-blue-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Ingressos</label>
                  <input
                    type="number"
                    value={day.budget.tickets || ''}
                    onChange={(e) =>
                      updateDayBudget(currentCity, index, 'tickets', parseFloat(e.target.value) || 0)
                    }
                    placeholder="0"
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm font-bold focus:border-blue-400 outline-none"
                  />
                </div>
              </div>

              {/* Day Total */}
              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Total do Dia</span>
                <span className="text-lg font-black text-blue-600">
                  {toBRL(day.budget.food + day.budget.transport + day.budget.tickets)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Day Button */}
      <button
        onClick={() => addDay(currentCity)}
        className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
      >
        <Plus className="w-4 h-4" /> Adicionar Dia
      </button>

      {/* City Summary */}
      <div className={`rounded-2xl p-4 border-2 ${
        selectedCity === 'CPT' 
          ? 'bg-blue-50 border-blue-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Orçamento Total</p>
            <p className={`text-sm text-gray-600`}>
              {days.length} dia(s) planejado(s)
            </p>
          </div>
          <span className={`text-2xl font-black ${
            selectedCity === 'CPT' ? 'text-blue-600' : 'text-yellow-600'
          }`}>
            {toBRL(totalCityBudget)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GuideList;
