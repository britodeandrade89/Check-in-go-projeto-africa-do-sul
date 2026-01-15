import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Globe2, 
  MessageCircle, 
  Plane, 
  Bus, 
  BedDouble, 
  Utensils, 
  ShoppingBag, 
  AlertCircle, 
  Volume2, 
  ArrowRightLeft, 
  MessageSquareText, 
  StopCircle, 
  Sparkles, 
  VolumeX,
  Play,
  Check,
  X
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

// --- TYPES ---
export type ScreenState = 'welcome' | 'language-select' | 'dialect-select' | 'category-select' | 'practice' | 'conversation';

export interface PhraseData {
  id: number;
  pt: string;
  target_text: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  countryCode: string;
  code: string;
}

export interface Dialect {
  id: string;
  name: string;
  countryCode: string;
  code: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// --- DATA ---
const LANGUAGES: Language[] = [
  { id: 'en', name: 'Inglês', flag: '🇺🇸', countryCode: 'us', code: 'en-US' },
  { id: 'es', name: 'Espanhol', flag: '🇪🇸', countryCode: 'es', code: 'es-ES' },
  { id: 'fr', name: 'Francês', flag: '🇫🇷', countryCode: 'fr', code: 'fr-FR' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹', countryCode: 'it', code: 'it-IT' },
];

const DIALECTS: Record<string, Dialect[]> = {
  en: [
    { id: 'en-US', name: 'Estados Unidos', countryCode: 'us', code: 'en-US' },
    { id: 'en-GB', name: 'Reino Unido', countryCode: 'gb', code: 'en-GB' },
    { id: 'en-AU', name: 'Austrália', countryCode: 'au', code: 'en-AU' },
    { id: 'en-ZA', name: 'África do Sul', countryCode: 'za', code: 'en-ZA' },
    { id: 'en-IE', name: 'Irlanda', countryCode: 'ie', code: 'en-IE' },
    { id: 'en-CA', name: 'Canadá', countryCode: 'ca', code: 'en-CA' },
    { id: 'en-IN', name: 'Índia', countryCode: 'in', code: 'en-IN' },
  ],
  es: [
    { id: 'es-ES', name: 'Espanha', countryCode: 'es', code: 'es-ES' },
    { id: 'es-MX', name: 'México', countryCode: 'mx', code: 'es-MX' },
    { id: 'es-AR', name: 'Argentina', countryCode: 'ar', code: 'es-AR' },
    { id: 'es-CO', name: 'Colômbia', countryCode: 'co', code: 'es-CO' },
    { id: 'es-PE', name: 'Peru', countryCode: 'pe', code: 'es-PE' },
    { id: 'es-CL', name: 'Chile', countryCode: 'cl', code: 'es-CL' },
  ],
  fr: [
    { id: 'fr-FR', name: 'França', countryCode: 'fr', code: 'fr-FR' },
    { id: 'fr-CA', name: 'Canadá', countryCode: 'ca', code: 'fr-CA' },
    { id: 'fr-CH', name: 'Suíça', countryCode: 'ch', code: 'fr-CH' },
    { id: 'fr-BE', name: 'Bélgica', countryCode: 'be', code: 'fr-BE' },
  ],
  it: [
    { id: 'it-IT', name: 'Itália', countryCode: 'it', code: 'it-IT' },
    { id: 'it-CH', name: 'Suíça', countryCode: 'ch', code: 'it-CH' },
  ]
};

const CATEGORIES: Category[] = [
  { id: 'basics', name: 'Básico', icon: 'MessageCircle', description: 'Cumprimentos e dia a dia' },
  { id: 'travel', name: 'Aeroporto', icon: 'Plane', description: 'Check-in, malas e voo' },
  { id: 'transport', name: 'Transporte', icon: 'Bus', description: 'Táxi, trem e ônibus' },
  { id: 'accommodation', name: 'Hotel', icon: 'BedDouble', description: 'Check-in e problemas' },
  { id: 'food', name: 'Restaurante', icon: 'Utensils', description: 'Pedidos e alergias' },
  { id: 'shopping', name: 'Compras', icon: 'ShoppingBag', description: 'Preços e pagamentos' },
  { id: 'emergency', name: 'Emergência', icon: 'AlertCircle', description: 'Ajuda médica e policial' },
];

const PHRASES: Record<string, Record<string, PhraseData[]>> = {
  en: {
    basics: [
      { id: 1, pt: "Como você está?", target_text: "How are you doing?" },
      { id: 2, pt: "Prazer em te conhecer.", target_text: "Nice to meet you." },
      { id: 3, pt: "Poderia falar mais devagar?", target_text: "Could you speak slower please?" },
      { id: 4, pt: "Eu não entendo.", target_text: "I don't understand." },
      { id: 5, pt: "Você fala português?", target_text: "Do you speak Portuguese?" },
      { id: 6, pt: "Obrigado pela ajuda.", target_text: "Thanks for your help." },
    ],
    travel: [
      { id: 101, pt: "Onde fica o portão 5?", target_text: "Where is gate 5?" },
      { id: 102, pt: "Minha mala foi perdida.", target_text: "My luggage is lost." },
      { id: 103, pt: "Eu gostaria de um assento na janela.", target_text: "I would like a window seat." },
      { id: 104, pt: "Quanto tempo dura o voo?", target_text: "How long is the flight?" },
      { id: 105, pt: "Tenho algo a declarar.", target_text: "I have something to declare." },
    ],
    transport: [
      { id: 401, pt: "Leve-me a este endereço, por favor.", target_text: "Take me to this address, please." },
      { id: 402, pt: "Quanto custa a corrida?", target_text: "How much is the fare?" },
      { id: 403, pt: "Onde posso comprar um bilhete?", target_text: "Where can I buy a ticket?" },
      { id: 404, pt: "Esse ônibus vai para o centro?", target_text: "Does this bus go to downtown?" },
    ],
    accommodation: [
      { id: 501, pt: "Tenho uma reserva.", target_text: "I have a reservation." },
      { id: 502, pt: "O café da manhã está incluído?", target_text: "Is breakfast included?" },
      { id: 503, pt: "O ar condicionado não funciona.", target_text: "The air conditioner is not working." },
      { id: 504, pt: "Posso deixar minhas malas aqui?", target_text: "Can I leave my bags here?" },
    ],
    food: [
      { id: 201, pt: "A conta, por favor.", target_text: "The check, please." },
      { id: 202, pt: "Eu tenho alergia a amendoim.", target_text: "I am allergic to peanuts." },
      { id: 203, pt: "Uma mesa para dois.", target_text: "A table for two." },
      { id: 204, pt: "Posso ver o cardápio?", target_text: "May I see the menu?" },
      { id: 205, pt: "A água é potável?", target_text: "Is the tap water safe to drink?" },
    ],
    shopping: [
      { id: 601, pt: "Quanto custa isso?", target_text: "How much is this?" },
      { id: 602, pt: "Posso experimentar?", target_text: "Can I try it on?" },
      { id: 603, pt: "Vocês aceitam cartão de crédito?", target_text: "Do you take credit cards?" },
      { id: 604, pt: "É muito caro.", target_text: "It's too expensive." },
    ],
    emergency: [
      { id: 301, pt: "Preciso de um médico.", target_text: "I need a doctor." },
      { id: 302, pt: "Chame a polícia!", target_text: "Call the police!" },
      { id: 303, pt: "Perdi meu passaporte.", target_text: "I lost my passport." },
      { id: 304, pt: "Onde fica o hospital mais próximo?", target_text: "Where is the nearest hospital?" },
    ]
  },
  es: {
    basics: [
      { id: 1, pt: "Como você está?", target_text: "¿Cómo estás?" },
      { id: 2, pt: "Prazer em te conhecer.", target_text: "Mucho gusto." },
      { id: 3, pt: "Bom dia!", target_text: "¡Buenos días!" },
      { id: 4, pt: "Não entendo.", target_text: "No entiendo." },
      { id: 5, pt: "Você fala português?", target_text: "¿Hablas portugués?" },
    ],
  },
};

// --- SUB-COMPONENTS (From LingoTravel) ---

// 1. Wrapper with Background Shapes
const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex-1 bg-slate-50 flex flex-col items-center relative overflow-hidden font-sans rounded-3xl min-h-[500px]">
    {/* Abstract Background Shapes */}
    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-200 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
    <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-teal-200 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
    
    {/* Content */}
    <div className="z-10 w-full flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

// 2. Welcome Screen
const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center animate-in fade-in h-full">
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-indigo-100 mb-8 transform rotate-3">
      <Globe2 size={64} className="text-indigo-600" />
    </div>
    
    <h1 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
      Lingo<span className="text-indigo-600">Travel</span>
    </h1>
    
    <p className="text-slate-500 text-lg mb-12 max-w-xs leading-relaxed">
      Aprimore sua pronúncia comparando sua voz com a de falantes nativos.
    </p>

    <button
      onClick={onStart}
      className="w-full max-w-xs bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
    >
      <Mic size={20} />
      Começar Agora
    </button>

    <p className="mt-8 text-xs text-slate-400 font-medium">
      100% Offline • Gratuito
    </p>
  </div>
);

// 3. Selection Screen
const SelectionScreen: React.FC<{
  title: string;
  subtitle: string;
  items: any[];
  type: 'language' | 'category';
  onSelect: (item: any) => void;
  onBack: () => void;
  headerIcon?: React.ReactNode;
}> = ({ title, subtitle, items, type, onSelect, onBack, headerIcon }) => {
  
  // Icon Mapping helper
  const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'MessageCircle': return <MessageCircle size={26} strokeWidth={2.5} />;
        case 'Plane': return <Plane size={26} strokeWidth={2.5} />;
        case 'Bus': return <Bus size={26} strokeWidth={2.5} />;
        case 'BedDouble': return <BedDouble size={26} strokeWidth={2.5} />;
        case 'Utensils': return <Utensils size={26} strokeWidth={2.5} />;
        case 'ShoppingBag': return <ShoppingBag size={26} strokeWidth={2.5} />;
        case 'AlertCircle': return <AlertCircle size={26} strokeWidth={2.5} />;
        default: return <Globe2 size={26} strokeWidth={2.5} />;
    }
  };

  return (
    <div className="flex flex-col p-6 max-w-lg mx-auto w-full animate-in slide-in-from-right font-sans h-full overflow-y-auto">
      <header className="flex items-center mb-4 pt-2">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors active:scale-95"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
      </header>

      <div className="flex flex-row items-center gap-4 mb-2">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {title}
        </h2>
        {headerIcon && (
            <div className="w-10 h-10 shadow-sm rounded-full bg-white flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                {headerIcon}
            </div>
        )}
      </div>
      
      <p className="text-slate-500 mb-8 text-base font-medium leading-relaxed">
        {subtitle}
      </p>

      <div className="flex flex-col gap-4 pb-8">
        {items.map((item) => {
          const isCategory = type === 'category';

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="group bg-white p-5 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-transparent flex items-center gap-5 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 text-left"
            >
              {isCategory ? (
                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                  {getIcon(item.icon)}
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-sm border border-slate-100 shrink-0 relative bg-slate-50">
                  <img 
                    src={`https://flagcdn.com/w160/${item.countryCode}.png`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="flex-1 flex flex-col justify-center">
                {type === 'language' && (
                     <div className="flex items-center gap-3">
                         <span className="font-bold text-slate-800 text-lg uppercase tracking-wider">{item.countryCode.toUpperCase()}</span>
                         <h3 className="font-bold text-slate-800 text-lg tracking-tight">
                            {item.name}
                         </h3>
                     </div>
                )}
                
                {type === 'category' && (
                    <>
                        <h3 className="font-bold text-slate-800 text-lg tracking-tight mb-1">
                        {item.name}
                        </h3>
                        {item.description && (
                        <p className="text-slate-400 text-xs font-medium leading-snug">
                            {item.description}
                        </p>
                        )}
                    </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 4. Action Buttons (Sub-component of Practice)
const ActionButtons: React.FC<{
  hasRecording: boolean;
  onPlayNative: () => void;
  onCompare: () => void;
  isPlayingNative: boolean;
  isPlayingComparison: boolean;
}> = ({ hasRecording, onPlayNative, onCompare, isPlayingNative, isPlayingComparison }) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-4 px-4">
      <button
        onClick={onPlayNative}
        disabled={isPlayingNative || isPlayingComparison}
        className={`
          w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-white shadow-md transition-all
          ${isPlayingNative 
            ? 'bg-blue-400 cursor-wait' 
            : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
          }
        `}
      >
        <Volume2 size={24} className={isPlayingNative ? 'animate-bounce' : ''} />
        {isPlayingNative ? "Tocando..." : "Ouvir Nativo"}
      </button>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${hasRecording ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <button
          onClick={onCompare}
          disabled={isPlayingComparison || isPlayingNative}
          className={`
            w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-white shadow-md transition-all
            ${isPlayingComparison 
              ? 'bg-green-400 cursor-wait' 
              : 'bg-green-500 hover:bg-green-600 active:scale-95'
            }
          `}
        >
          <ArrowRightLeft size={24} className={isPlayingComparison ? 'animate-spin' : ''} />
          {isPlayingComparison ? "Comparando..." : "COMPARAR"}
        </button>
      </div>
    </div>
  );
};

// 5. Record Button (Sub-component of Practice)
const RecordButton: React.FC<{
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled: boolean;
}> = ({ isRecording, onStart, onStop, disabled }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onMouseDown={onStart}
        onMouseUp={onStop}
        onTouchStart={onStart}
        onTouchEnd={onStop}
        disabled={disabled}
        className={`
          w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-300' : ''}
          ${isRecording 
            ? 'bg-red-500 scale-110 ring-4 ring-red-200' 
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }
        `}
      >
        {isRecording ? (
          <div className="w-8 h-8 bg-white rounded-md animate-pulse" />
        ) : (
          <Mic size={40} className="text-white" />
        )}
      </button>
      <p className={`text-sm font-semibold transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
        {isRecording ? "Gravando..." : "Segure para gravar"}
      </p>
    </div>
  );
};

// 6. Practice Session
const PracticeSession: React.FC<{ 
  languageName: string;
  dialect: Dialect;
  phrases: PhraseData[];
  onBack: () => void;
  onConversationMode: (phrase: PhraseData, allPhrases: PhraseData[]) => void;
}> = ({ languageName, dialect, phrases, onBack, onConversationMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [isPlayingComparison, setIsPlayingComparison] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentPhrase = phrases[currentIndex] || { id: -1, pt: '', target_text: '' };

  useEffect(() => {
    setUserAudioUrl(null);
    audioChunksRef.current = [];
  }, [currentIndex]);

  const speakNative = useCallback(async (): Promise<void> => {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        alert("Seu navegador não suporta áudio nativo.");
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPhrase.target_text);
      utterance.lang = dialect.code; 
      utterance.rate = 0.85; 
      
      utterance.onstart = () => setIsPlayingNative(true);
      utterance.onend = () => { setIsPlayingNative(false); resolve(); };
      utterance.onerror = () => { setIsPlayingNative(false); resolve(); };

      window.speechSynthesis.speak(utterance);
    });
  }, [currentPhrase, dialect]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      recorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setUserAudioUrl(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };
      recorder.start();
      setIsRecording(true);
    } catch (err) { alert("Permissão de microfone necessária."); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playUserAudio = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!userAudioUrl) { resolve(); return; }
      if (userAudioRef.current) userAudioRef.current.pause();
      const audio = new Audio(userAudioUrl);
      userAudioRef.current = audio;
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });
  };

  const handleCompare = async () => {
    if (isPlayingComparison) return;
    setIsPlayingComparison(true);
    await speakNative();
    await new Promise(r => setTimeout(r, 600)); 
    await playUserAudio();
    setIsPlayingComparison(false);
  };

  return (
    <div className="flex flex-col items-center h-full p-4 relative animate-in fade-in pb-20 overflow-y-auto">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 pt-2">
        <button onClick={onBack} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200">
                <img src={`https://flagcdn.com/w80/${dialect.countryCode}.png`} alt="flag" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    {languageName} ({dialect.name})
                </span>
                <span className="text-xs font-bold text-indigo-600 text-center">
                    Frase {currentIndex + 1} de {phrases.length}
                </span>
            </div>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Phrase Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-indigo-50 border border-slate-100 mb-6 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100">
            <div className="h-full bg-indigo-500 transition-all duration-300 ease-out" style={{ width: `${((currentIndex + 1) / phrases.length) * 100}%` }}></div>
        </div>
        <h3 className="text-slate-400 font-medium text-lg mb-4">{currentPhrase.pt}</h3>
        <h2 className="text-3xl font-extrabold text-slate-800 leading-snug tracking-tight">
            {currentPhrase.target_text}
        </h2>
      </div>

      {/* Conversation Mode Trigger */}
      <button 
        onClick={() => onConversationMode(currentPhrase, phrases)}
        className="w-full max-w-md mb-6 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 p-4 rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors border border-indigo-200"
      >
        <MessageSquareText size={20} />
        Abrir Modo Conversação
      </button>

      <div className="flex-1 w-full max-w-md flex flex-col items-center justify-center">
        <ActionButtons 
          hasRecording={!!userAudioUrl}
          onPlayNative={() => speakNative()}
          onCompare={handleCompare}
          isPlayingNative={isPlayingNative}
          isPlayingComparison={isPlayingComparison}
        />
        
        <div className="h-6"></div>

        <RecordButton 
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          disabled={isPlayingComparison || isPlayingNative}
        />
      </div>

      {/* Navigation Footer */}
      <div className="w-full max-w-md flex justify-between items-center mt-6 pb-4 px-4">
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} 
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 font-medium text-sm p-3 rounded-xl transition-colors ${currentIndex === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <ChevronLeft size={18} /> Anterior
        </button>
        
        <button 
          onClick={() => setCurrentIndex(prev => Math.min(phrases.length - 1, prev + 1))} 
          disabled={currentIndex === phrases.length - 1}
          className={`flex items-center gap-1 font-medium text-sm p-3 rounded-xl transition-colors ${currentIndex === phrases.length - 1 ? 'text-slate-300' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}
        >
          Próxima <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

// 7. Conversation Mode (Gemini Live)
const ConversationMode: React.FC<{
  initialPhrase: PhraseData;
  allPhrases: PhraseData[];
  dialect: Dialect;
  onBack: () => void;
}> = ({ initialPhrase, allPhrases, dialect, onBack }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{id: string, text: string, sender: 'user' | 'model', final: boolean}[]>([]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Audio Contexts
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentSessionRef = useRef<any>(null);
  const inputBufferRef = useRef<string>('');
  const outputBufferRef = useRef<string>('');

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => { return () => disconnectSession(); }, []);

  const disconnectSession = () => {
    currentSessionRef.current?.close();
    sourcesRef.current.forEach(source => { try { source.stop(); } catch (e) {} });
    sourcesRef.current.clear();
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    setIsConnected(false);
  };

  const playQuickPhrase = (phrase: PhraseData) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.target_text);
      utterance.lang = dialect.code;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setMessages(prev => [...prev, { id: Date.now().toString(), text: phrase.target_text, sender: 'user', final: true }]);
  };

  // Helper: Create Blob
  function createBlob(data: Float32Array): { data: string; mimeType: string } {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) { int16[i] = data[i] * 32768; }
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) { binary += String.fromCharCode(bytes[i]); }
    return { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' };
  }

  // Helper: Play Audio Chunk
  async function playAudioChunk(base64: string) {
    if (!outputAudioContextRef.current || !outputNodeRef.current) return;
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) { bytes[i] = binaryString.charCodeAt(i); }
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = outputAudioContextRef.current.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) { channelData[i] = dataInt16[i] / 32768.0; }
    
    const source = outputAudioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(outputNodeRef.current);
    const now = outputAudioContextRef.current.currentTime;
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += buffer.duration;
    source.onended = () => sourcesRef.current.delete(source);
    sourcesRef.current.add(source);
  }

  const connectToLiveAPI = async () => {
    if (!process.env.API_KEY) { setError("Chave API não encontrada."); return; }
    try {
      setError(null);
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputNodeRef.current = outputAudioContextRef.current!.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current!.destination);
      outputNodeRef.current.gain.value = isSpeakerOn ? 1.0 : 0.0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const blob = createBlob(e.inputBuffer.getChannelData(0));
              sessionPromise.then((s) => s.sendRealtimeInput({ media: blob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Text Handling
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              inputBufferRef.current += text;
              // Update generic user bubble
              setMessages(prev => {
                 const last = prev[prev.length - 1];
                 if (last?.sender === 'user' && !last.final) return [...prev.slice(0, -1), { ...last, text: inputBufferRef.current }];
                 return [...prev, { id: Date.now().toString(), text: inputBufferRef.current, sender: 'user', final: false }];
              });
            }
            if (message.serverContent?.outputTranscription) {
                const text = message.serverContent.outputTranscription.text;
                outputBufferRef.current += text;
                setMessages(prev => {
                    const last = prev[prev.length - 1];
                    if (last?.sender === 'model' && !last.final) return [...prev.slice(0, -1), { ...last, text: outputBufferRef.current }];
                    return [...prev, { id: Date.now().toString(), text: outputBufferRef.current, sender: 'model', final: false }];
                });
            }
            if (message.serverContent?.turnComplete) {
                inputBufferRef.current = '';
                outputBufferRef.current = '';
                setMessages(prev => prev.map(m => ({...m, final: true})));
            }

            // Audio Handling
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) playAudioChunk(base64Audio);
          },
          onerror: (e) => { setError("Erro na conexão."); setIsConnected(false); },
          onclose: () => setIsConnected(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
          outputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
          systemInstruction: `You are a real-time interpreter translating bidirectionally between Portuguese and ${dialect.name}. Output ONLY translated audio.`,
        },
      });
      currentSessionRef.current = await sessionPromise;
    } catch (err) { setError("Erro ao acessar microfone."); }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-white font-sans overflow-hidden fixed inset-0 z-50">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-md border-b border-slate-700 z-10 shrink-0">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ChevronLeft size={24} />
            </button>
            <div>
                <h1 className="font-bold text-lg leading-tight">Tradutor Ao Vivo</h1>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>PT 🇧🇷</span>
                    <span className="text-slate-600">⇄</span>
                    <span className="flex items-center gap-1">
                        {dialect.name} 
                        <img src={`https://flagcdn.com/w20/${dialect.countryCode}.png`} alt="flag" className="w-3 h-2"/>
                    </span>
                </div>
            </div>
        </div>
        
        <button 
            onClick={() => { setIsSpeakerOn(!isSpeakerOn); if (outputNodeRef.current) outputNodeRef.current.gain.value = !isSpeakerOn ? 1.0 : 0.0; }} 
            className={`p-3 rounded-full transition-all ${isSpeakerOn ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}
        >
            {isSpeakerOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Main Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
      >
        {messages.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60">
                <Sparkles size={48} className="mb-4 text-indigo-400" />
                <p className="text-center max-w-xs">
                    Toque no microfone para começar a tradução simultânea. <br/>
                    Fale em Português ou {dialect.name}.
                </p>
            </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-lg leading-relaxed animate-in slide-in-from-bottom-2 ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 self-end rounded-br-none' // User messages
                : 'bg-slate-700 self-start rounded-bl-none border border-slate-600' // Model Translation
            }`}>
            {msg.text}
            {!msg.final && <span className="inline-block w-2 h-2 ml-2 bg-white rounded-full animate-ping"/>
}</div>
        ))}
        
        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center text-sm mx-auto mt-4">
                {error}
            </div>
        )}
        <div className="h-4"></div>
      </div>

      {/* Footer Controls */}
      <div className="bg-slate-800 border-t border-slate-700 pb-safe z-10 flex flex-col shrink-0">
        
        {/* Quick Phrases Scroll */}
        <div className="py-4 border-b border-slate-700/50">
           <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
             Frases Rápidas
           </p>
           <div 
             ref={scrollContainerRef}
             className="flex overflow-x-auto px-4 gap-3 no-scrollbar snap-x"
           >
              {allPhrases.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => playQuickPhrase(p)}
                    className="flex-shrink-0 snap-start bg-slate-700 hover:bg-slate-600 active:scale-95 transition-all text-sm font-medium px-4 py-3 rounded-xl border border-slate-600 text-slate-200 whitespace-nowrap"
                  >
                    {p.target_text}
                  </button>
              ))}
           </div>
        </div>

        {/* Main Mic Button */}
        <div className="p-4 flex items-center justify-center">
            <button
                onClick={isConnected ? disconnectSession : connectToLiveAPI}
                className={`
                    w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl
                    ${isConnected 
                        ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                        : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/30'
                    }
                `}
            >
                {isConnected ? (
                    <StopCircle size={32} className="text-white animate-pulse" />
                ) : (
                    <Mic size={32} className="text-white" />
                )}
            </button>
        </div>
        
        {/* Connection Status Text */}
        <p className="text-center text-xs text-slate-500 font-medium pb-4">
             {isConnected ? "Conectado • Traduzindo em tempo real (0.3s)" : "Toque para conectar"}
        </p>
      </div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---

const PronunciationTool: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  // Context for conversation
  const [conversationContext, setConversationContext] = useState<{phrases: PhraseData[], current: PhraseData} | null>(null);

  const handleStart = () => setScreen('language-select');

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setScreen('dialect-select');
  };

  const handleDialectSelect = (dialect: Dialect) => {
    setSelectedDialect(dialect);
    setScreen('category-select');
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setScreen('practice');
  };

  const handleConversationMode = (currentPhrase: PhraseData, allPhrases: PhraseData[]) => {
    setConversationContext({ phrases: allPhrases, current: currentPhrase });
    setScreen('conversation');
  };

  const getPhrases = () => {
    if (!selectedLanguage || !selectedCategory) return [];
    return PHRASES[selectedLanguage.id]?.[selectedCategory.id] || [];
  };

  const getDialectsForLanguage = () => {
    if (!selectedLanguage) return [];
    return DIALECTS[selectedLanguage.id] || [];
  };

  return (
    <Wrapper>
      {screen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {screen === 'language-select' && (
        <SelectionScreen 
          title="Qual idioma?"
          subtitle="Escolha o idioma base que deseja praticar."
          items={LANGUAGES}
          type="language"
          onSelect={handleLanguageSelect}
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'dialect-select' && selectedLanguage && (
        <SelectionScreen 
          title="Qual sotaque?"
          subtitle={`Escolha a região para a pronúncia em ${selectedLanguage.name}.`}
          items={getDialectsForLanguage()}
          type="language" 
          onSelect={handleDialectSelect}
          onBack={() => setScreen('language-select')}
          headerIcon={
             <img 
                src={`https://flagcdn.com/w80/${selectedLanguage.countryCode}.png`} 
                alt="Flag" 
                className="w-full h-full object-cover opacity-50 grayscale" 
             />
          }
        />
      )}

      {screen === 'category-select' && selectedDialect && (
        <SelectionScreen 
          title="O que aprender?"
          subtitle="Escolha um tópico para começar."
          items={CATEGORIES}
          type="category"
          onSelect={handleCategorySelect}
          onBack={() => setScreen('dialect-select')}
          headerIcon={
             <img 
                src={`https://flagcdn.com/w80/${selectedDialect.countryCode}.png`} 
                alt="Flag" 
                className="w-full h-full object-cover" 
             />
          }
        />
      )}

      {screen === 'practice' && selectedLanguage && selectedDialect && (
        <PracticeSession 
          languageName={selectedLanguage.name}
          dialect={selectedDialect}
          phrases={getPhrases()}
          onBack={() => setScreen('category-select')}
          onConversationMode={handleConversationMode}
        />
      )}

      {screen === 'conversation' && conversationContext && selectedDialect && (
        <ConversationMode 
          initialPhrase={conversationContext.current}
          allPhrases={conversationContext.phrases}
          dialect={selectedDialect}
          onBack={() => setScreen('practice')}
        />
      )}
    </Wrapper>
  );
};

export default PronunciationTool;
