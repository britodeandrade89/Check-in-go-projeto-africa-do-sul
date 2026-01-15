import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Mic, 
  Volume2, 
  StopCircle, 
  Play, 
  MessageSquareText, 
  Sparkles, 
  VolumeX, 
  ArrowRightLeft,
  Globe2,
  BookOpen, 
  Heart, 
  MapPin, 
  Utensils, 
  ShoppingBag,
  Smile,
  DollarSign,
  Clock
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { 
  ScreenState, 
  Language, 
  Category, 
  Dialect, 
  PhraseData, 
  LANGUAGES, 
  CATEGORIES, 
  DIALECTS, 
  PHRASES 
} from '../data/PronunciationData';

// --- SUB-COMPONENTS DEFINED INTERNALLY FOR MODULARITY ---

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in slide-in-from-bottom-4">
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-green-100 mb-8 transform -rotate-2 border border-green-50">
      <Globe2 size={64} className="text-sa-green" />
    </div>
    
    <h1 className="text-3xl font-display font-black text-slate-800 mb-4 tracking-tight">
      Lingo<span className="text-sa-green">Travel</span>
    </h1>
    
    <p className="text-slate-500 text-sm mb-12 max-w-[250px] leading-relaxed mx-auto">
      Aprimore sua pronúncia comparando sua voz com a de falantes nativos ou pratique conversação real.
    </p>

    <button
      onClick={onStart}
      className="w-full max-w-xs bg-sa-green text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-2"
    >
      <Mic size={20} />
      Começar Agora
    </button>
  </div>
);

const SelectionScreen: React.FC<{
  title: string;
  subtitle: string;
  items: any[];
  type: 'language' | 'category';
  onSelect: (item: any) => void;
  onBack: () => void;
  headerIcon?: React.ReactNode;
}> = ({ title, subtitle, items, type, onSelect, onBack, headerIcon }) => {
  
  const getIconForCategory = (categoryId: string) => {
    const icons: Record<string, React.ReactNode> = {
      basics: <Smile size={24} />,
      travel: <MapPin size={24} />,
      food: <Utensils size={24} />,
      shopping: <ShoppingBag size={24} />,
      accommodation: <Heart size={24} />,
      emergency: <Clock size={24} />,
      business: <DollarSign size={24} />,
      culture: <BookOpen size={24} />
    };
    return icons[categoryId] || null;
  };

  return (
  <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
    <header className="flex items-center mb-6 pt-2">
      <button 
        onClick={onBack}
        className="p-2 -ml-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <ChevronLeft size={28} />
      </button>
      <div className="ml-2">
         <h2 className="text-2xl font-display font-black text-slate-800 leading-none">{title}</h2>
         <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>
      {headerIcon && <div className="ml-auto opacity-80">{headerIcon}</div>}
    </header>

    <div className="flex-1 overflow-y-auto pb-20 space-y-3 pr-1">
      {items.map((item) => {
        const IconComponent = type === 'category' ? getIconForCategory(item.id) : null;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:border-green-200 hover:shadow-md transition-all text-left group"
          >
            {type === 'category' ? (
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-sa-green shrink-0 group-hover:bg-sa-green group-hover:text-white transition-colors">
                {IconComponent}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 shrink-0 relative shadow-sm">
                <img 
                  src={`https://flagcdn.com/w160/${item.countryCode}.png`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
              {type === 'language' && <span className="text-xs font-mono text-slate-400">{item.code}</span>}
              {type === 'category' && <span className="text-xs text-slate-400">{item.description}</span>}
            </div>
            
            <ChevronRight className="ml-auto text-slate-300 group-hover:text-sa-green" size={20} />
          </button>
        );
      })}
    </div>
  </div>
);};

const ConversationMode: React.FC<{
  initialPhrase: PhraseData;
  allPhrases: PhraseData[];
  dialect: Dialect;
  onBack: () => void;
}> = ({ allPhrases, dialect, onBack }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<{id:string, text:string, sender:'user'|'model', final:boolean}[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Audio Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentSessionRef = useRef<any>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    return () => disconnectSession();
  }, []);

  const disconnectSession = () => {
    if (currentSessionRef.current) {
      try { currentSessionRef.current.close(); } catch (e) { console.error(e); }
    }
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
    sourcesRef.current.clear();
    inputAudioContextRef.current?.close();
    outputAudioContextRef.current?.close();
    setIsConnected(false);
  };

  const connectToLiveAPI = async () => {
    if (!process.env.REACT_APP_GOOGLE_API_KEY) {
      setError("Chave API não configurada.");
      return;
    }

    try {
      setError(null);
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputNodeRef.current = outputAudioContextRef.current!.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current!.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GOOGLE_API_KEY });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((s) => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: (msg: LiveServerMessage) => {
            if (msg.serverContent?.inputTranscription?.text) {
               updateMessages('user', msg.serverContent.inputTranscription.text, false);
            }
            if (msg.serverContent?.outputTranscription?.text) {
               updateMessages('model', msg.serverContent.outputTranscription.text, false);
            }
            if (msg.serverContent?.turnComplete) {
               finalizeMessages();
            }
            
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) playAudioChunk(audioData);
          },
          onclose: () => setIsConnected(false),
          onerror: () => { setError("Erro de conexão."); setIsConnected(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
          outputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-12-2025" },
          systemInstruction: `You are a helpful travel assistant and translator. 
          The user speaks Portuguese. You should help them practice ${dialect.name}.
          If they speak Portuguese, translate to ${dialect.name}. 
          If they speak ${dialect.name}, reply in ${dialect.name} to keep the conversation going, but correct them gently if needed.
          Keep responses short and conversational.`,
        }
      });
      sessionPromise.then(s => currentSessionRef.current = s);
    } catch (e) {
      console.error(e);
      setError("Erro ao iniciar. Verifique microfone.");
    }
  };

  const updateMessages = (sender: 'user' | 'model', text: string, final: boolean) => {
    setMessages(prev => {
      const last = prev[prev.length - 1];
      if (last && last.sender === sender && !last.final) {
        return [...prev.slice(0, -1), { ...last, text: last.text + text, final }];
      }
      return [...prev, { id: Date.now().toString(), text, sender, final }];
    });
  };

  const finalizeMessages = () => {
     setMessages(prev => prev.map(m => ({...m, final: true})));
  };

  function createBlob(data: Float32Array) {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) int16[i] = data[i] * 32768;
    const bytes = new Uint8Array(int16.buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' };
  }

  async function playAudioChunk(base64: string) {
    if (!outputAudioContextRef.current || !outputNodeRef.current) return;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i=0; i<binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const float32 = new Float32Array(bytes.buffer);
    
    const dataInt16 = new Int16Array(bytes.buffer);
    const audioBuffer = outputAudioContextRef.current.createBuffer(1, dataInt16.length, 24000);
    const channelData = audioBuffer.getChannelData(0);
    for(let i=0; i<dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

    const source = outputAudioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputNodeRef.current);
    const now = outputAudioContextRef.current.currentTime;
    nextStartTimeRef.current = Math.max(nextStartTimeRef.current, now);
    source.start(nextStartTimeRef.current);
    nextStartTimeRef.current += audioBuffer.duration;
    sourcesRef.current.add(source);
    source.onended = () => sourcesRef.current.delete(source);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] bg-slate-900 rounded-3xl overflow-hidden relative text-white">
      <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
         <button onClick={onBack}><ChevronLeft /></button>
         <div className="text-center">
            <h3 className="font-bold text-sm">Conversação Ao Vivo</h3>
            <span className="text-[10px] text-slate-400">{dialect.name}</span>
         </div>
         <div className="w-6" />
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
           <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
             <Sparkles size={48} className="mb-2" />
             <p className="text-sm">Toque no microfone para conversar.</p>
           </div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-sa-green ml-auto rounded-tr-none' : 'bg-slate-700 mr-auto rounded-tl-none'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      
      {error && <div className="bg-red-500/20 text-red-300 text-xs p-2 text-center">{error}</div>}

      <div className="p-4 bg-slate-800 flex flex-col gap-4">
         <div ref={scrollContainerRef} className="flex gap-2 overflow-x-auto pb-2">
             {allPhrases.map(p => (
               <button key={p.id} onClick={() => { /* Send text as mock input */ }} className="bg-slate-700 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs border border-slate-600">
                  {p.target_text}
               </button>
             ))}
         </div>
         <div className="flex justify-center">
             <button
               onClick={isConnected ? disconnectSession : connectToLiveAPI}
               className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isConnected ? 'bg-red-500 animate-pulse' : 'bg-sa-green shadow-lg shadow-green-900/50'}`}
             >
                {isConnected ? <StopCircle size={32} /> : <Mic size={32} />}
             </button>
         </div>
      </div>
    </div>
  );
};

const PracticeSession: React.FC<{
  languageName: string;
  dialect: Dialect;
  phrases: PhraseData[];
  onBack: () => void;
  onConversationMode: (phrase: PhraseData, allPhrases: PhraseData[]) => void;
}> = ({ languageName, dialect, phrases, onBack, onConversationMode }) => {
  const [index, setIndex] = useState(0);
  const [userAudio, setUserAudio] = useState<string|null>(null);
  const [recording, setRecording] = useState(false);
  const [playingNative, setPlayingNative] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const currentPhrase = phrases[index];

  const speakNative = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(currentPhrase.target_text);
    u.lang = dialect.code;
    u.rate = 0.8;
    u.onstart = () => setPlayingNative(true);
    u.onend = () => setPlayingNative(false);
    window.speechSynthesis.speak(u);
  };

  const startRec = async () => {
    try {
       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
       const mr = new MediaRecorder(stream);
       recorderRef.current = mr;
       chunksRef.current = [];
       mr.ondataavailable = e => chunksRef.current.push(e.data);
       mr.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          setUserAudio(URL.createObjectURL(blob));
       };
       mr.start();
       setRecording(true);
    } catch (e) { alert("Erro microfone"); }
  };

  const stopRec = () => {
    if (recorderRef.current && recording) {
      recorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
       <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100"><ChevronLeft /></button>
          <div className="flex items-center gap-2">
             <img src={`https://flagcdn.com/w40/${dialect.countryCode}.png`} className="w-6 h-4 rounded shadow-sm" alt="flag" />
             <span className="text-xs font-bold uppercase text-slate-500">{languageName} ({dialect.name})</span>
          </div>
          <div className="w-8" />
       </div>

       {/* Phrase Card */}
       <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 text-center mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sa-green to-sa-gold"></div>
          <p className="text-sm text-slate-400 font-medium mb-4">{currentPhrase.pt}</p>
          <h2 className="text-2xl font-display font-black text-slate-800 leading-tight mb-6">
             {currentPhrase.target_text}
          </h2>
          <div className="flex justify-center gap-4">
             <button onClick={speakNative} disabled={playingNative} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors">
                <Volume2 size={16} className={playingNative ? 'animate-pulse' : ''} />
                Ouvir Nativo
             </button>
          </div>
       </div>

       {/* Controls */}
       <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-xs bg-slate-50 rounded-2xl p-4 border border-slate-200">
             {userAudio ? (
                <div className="flex items-center gap-3">
                   <button onClick={() => new Audio(userAudio).play()} className="bg-green-100 text-green-700 p-3 rounded-full hover:bg-green-200"><Play size={20} fill="currentColor" /></button>
                   <div className="flex-1">
                      <div className="h-1 bg-slate-200 rounded-full w-full">
                         <div className="h-full bg-green-500 w-1/2 rounded-full"></div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Sua gravação</span>
                   </div>
                   <button onClick={() => setUserAudio(null)} className="text-slate-400 hover:text-red-500"><VolumeX size={16} /></button>
                </div>
             ) : (
                <div className="text-center py-2">
                   <p className="text-xs text-slate-400 mb-3">Segure para gravar sua pronúncia</p>
                   <button
                     onMouseDown={startRec}
                     onMouseUp={stopRec}
                     onTouchStart={startRec}
                     onTouchEnd={stopRec}
                     className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mx-auto ${recording ? 'bg-red-500 scale-110 shadow-red-200 shadow-xl' : 'bg-sa-green shadow-lg shadow-green-200'}`}
                   >
                      <Mic size={28} className="text-white" />
                   </button>
                </div>
             )}
          </div>
          
          <button 
             onClick={() => onConversationMode(currentPhrase, phrases)}
             className="flex items-center gap-2 text-sa-green font-bold text-sm bg-green-50 px-4 py-3 rounded-xl hover:bg-green-100 w-full justify-center"
          >
             <MessageSquareText size={18} />
             Praticar em Conversa Real
          </button>
       </div>

       {/* Navigation */}
       <div className="flex justify-between mt-auto pt-6">
          <button onClick={() => setIndex(i => Math.max(0, i-1))} disabled={index===0} className="p-3 bg-white border border-slate-200 rounded-xl disabled:opacity-50 text-slate-600"><ChevronLeft /></button>
          <span className="self-center text-xs font-bold text-slate-400">{index + 1} / {phrases.length}</span>
          <button onClick={() => { setIndex(i => Math.min(phrases.length-1, i+1)); setUserAudio(null); }} disabled={index===phrases.length-1} className="p-3 bg-sa-green text-white rounded-xl disabled:opacity-50"><ChevronRight /></button>
       </div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---

const PronunciationPractice: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Context for conversation mode
  const [convContext, setConvContext] = useState<{current: PhraseData, all: PhraseData[]} | null>(null);

  const getPhrases = () => {
    if (!selectedLanguage || !selectedCategory) return [];
    return PHRASES[selectedLanguage.id]?.[selectedCategory.id] || PHRASES['en']['basics'];
  };

  const getDialects = () => selectedLanguage ? DIALECTS[selectedLanguage.id] : [];

  return (
    <div className="h-full w-full bg-[#FDFBF7] font-sans">
      {screen === 'welcome' && <WelcomeScreen onStart={() => setScreen('language-select')} />}
      
      {screen === 'language-select' && (
        <SelectionScreen
          title="Qual idioma?"
          subtitle="Escolha o idioma base."
          items={LANGUAGES}
          type="language"
          onSelect={(l) => { setSelectedLanguage(l); setScreen('dialect-select'); }}
          onBack={() => setScreen('welcome')}
        />
      )}

      {screen === 'dialect-select' && selectedLanguage && (
        <SelectionScreen
          title="Qual sotaque?"
          subtitle={`Região para pronúncia em ${selectedLanguage.name}.`}
          items={getDialects()}
          type="language"
          onSelect={(d) => { setSelectedDialect(d); setScreen('category-select'); }}
          onBack={() => setScreen('language-select')}
          headerIcon={<img src={`https://flagcdn.com/w80/${selectedLanguage.countryCode}.png`} className="w-8 h-8 rounded-full object-cover" />}
        />
      )}

      {screen === 'category-select' && selectedDialect && (
        <SelectionScreen
          title="O que aprender?"
          subtitle="Escolha um tópico."
          items={CATEGORIES}
          type="category"
          onSelect={(c) => { setSelectedCategory(c); setScreen('practice'); }}
          onBack={() => setScreen('dialect-select')}
          headerIcon={<img src={`https://flagcdn.com/w80/${selectedDialect.countryCode}.png`} className="w-8 h-8 rounded-full object-cover" />}
        />
      )}

      {screen === 'practice' && selectedLanguage && selectedDialect && (
        <PracticeSession
          languageName={selectedLanguage.name}
          dialect={selectedDialect}
          phrases={getPhrases()}
          onBack={() => setScreen('category-select')}
          onConversationMode={(curr, all) => { setConvContext({current: curr, all}); setScreen('conversation'); }}
        />
      )}

      {screen === 'conversation' && convContext && selectedDialect && (
        <ConversationMode
          initialPhrase={convContext.current}
          allPhrases={convContext.all}
          dialect={selectedDialect}
          onBack={() => setScreen('practice')}
        />
      )}
    </div>
  );
};

export default PronunciationPractice;
