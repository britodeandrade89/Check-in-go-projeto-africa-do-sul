import React, { useState, useEffect, useRef } from 'react';
import { generateChatContent } from '../services/gemini';
import { Send, Bot, WifiOff, Sparkles, User, Loader2, Info } from 'lucide-react';

// --- TYPES ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isOfflineResponse?: boolean;
}

// --- OFFLINE KNOWLEDGE BASE (THE "BRAIN" WHEN NO INTERNET) ---
const OFFLINE_KNOWLEDGE: Record<string, string> = {
  'segurança': `🇿🇦 **Dica de Segurança Offline:**\n\n1. **Uber/Bolt:** Nunca pegue táxi na rua. Use sempre o App. Confira a placa antes de entrar.\n2. **Andar a pé:** Evite, especialmente à noite ou no centro de Joanesburgo. Em Cape Town, Waterfront é seguro, mas cuidado na Long Street.\n3. **Golpes:** Se alguém for muito simpático no caixa eletrônico (ATM), ignore. Não aceite ajuda.\n4. **Emergência:** Disque 112 do celular.`,
  'agua': `💧 **Água:** A água da torneira na África do Sul é potável e de alta qualidade na maioria das cidades grandes (Cape Town e JNB). Pode beber. Mas, por precaução, se tiver estômago sensível, compre garrafa.`,
  'tomada': `🔌 **Tomadas:** O padrão é o TIPO M (três pinos redondos gigantes). As tomadas brasileiras NÃO entram. Você precisa de um adaptador específico (vende no aeroporto ou mercado) ou um adaptador universal que tenha a entrada "Type M".`,
  'gorjeta': `💸 **Gorjeta (Tips):**\n- Restaurantes: 10% a 15% é o padrão (não incluso na conta).\n- Frentista de posto: R5 a R10.\n- Carregador de mala: R10 a R20 por mala.`,
  'uber': `🚗 **Uber e Bolt:** Funcionam super bem. Em Cape Town, use a categoria "Uber Black" para jantares à noite para mais segurança, mas o "X" é ok. Em Joanesburgo, sempre espere o carro dentro do estabelecimento (Shopping/Hotel), nunca na calçada.`,
  'visto': `🛂 **Visto:** Brasileiros NÃO precisam de visto para turismo até 90 dias. Precisa apenas do Passaporte válido e o Certificado Internacional de Vacina contra Febre Amarela.`,
  'vacina': `💉 **Vacina:** O Certificado Internacional de Vacinação (CIVP) contra Febre Amarela é **OBRIGATÓRIO**. Eles pedem antes da imigração. Tenha ele em mãos (o papel amarelo ou o PDF no celular).`,
  'fuso': `⏰ **Fuso Horário:** A África do Sul está geralmente 5 horas à frente do Brasil (Brasília). Se no Brasil são 12h, lá são 17h.`,
  'clima': `☀️ **Clima (Jan/Fev):** É verão!\n- **Cape Town:** Quente, seco e venta MUITO. Leve casaco corta-vento.\n- **Joanesburgo:** Quente, mas com chuvas fortes de final de tarde (tempestades de verão). À noite esfria.`,
  'mala': `🧳 **Mala:** Lembre-se: Em voos internos pequenos, a bagagem de mão pode ser restrita. Para Safari, prefira roupas neutras (bege, verde musgo). Evite azul escuro (atrai moscas tsé-tsé) e cores neon.`,
  'chip': `📱 **Internet/Chip:** Compre um chip da **Vodacom** ou **MTN** no aeroporto assim que chegar. São as melhores coberturas. Leve o passaporte para registrar o chip (RICA).`,
  'emergencia': `🚨 **Emergência:**\n- Polícia: 10111\n- Ambulância: 10177\n- Emergência Geral (Celular): 112\n- Consulado Brasil (Cape Town): +27 21 421 4040\n- Consulado Brasil (Pretória): +27 12 366 5200`,
  'comida': `🍖 **Comida Típica:**\n- **Braai:** Churrasco sul-africano.\n- **Bobotie:** Carne moída com especiarias e cobertura de ovo.\n- **Biltong:** Carne seca curada (snack viciante).\n- **Malva Pudding:** Sobremesa quente de damasco.\n- **Vinho:** Pinotage (uva local).`,
  'lingua': `🗣️ **Língua:** O país tem 12 línguas oficiais! Mas o Inglês é falado por todo mundo no turismo. Aprenda "Sawubona" (Olá em Zulu) para ser simpático.`,
  'dinheiro': `💰 **Dinheiro:** A moeda é o Rand (ZAR). Quase tudo aceita cartão (aproximação), mas tenha Rands em espécie para gorjetas e mercados de rua. Use o Wise ou Nomad para sacar lá.`,
  'bebida': `🍺 **Álcool e Regras:**\n\n1. **Beber na Rua:** ⛔ **PROIBIDO!** É ilegal beber em locais públicos (ruas, praias, calçadões). É rigoroso igual ao Chile/EUA. Se beber na praia, a polícia confisca e multa.\n2. **Bolsa Térmica:** Ótima para levar no carro em viagens longas ou manter no hotel, mas não saia caminhando com ela bebendo.\n3. **Cerveja Preta:** Sim! Procure a **Castle Milk Stout**. É a mais famosa, escura, cremosa e levemente adocicada (lembra a Caracu/Malzbier). Tem também Guinness em quase todo lugar.\n4. **Onde Comprar:** Bebida alcoólica só vende em "Bottle Stores" (lojas anexas aos mercados) e tem horário restrito (algumas fecham cedo ou não abrem domingo).`
};

const findOfflineAnswer = (input: string): string | null => {
  const normalizedInput = input.toLowerCase();
  const keywords = Object.keys(OFFLINE_KNOWLEDGE);
  for (const key of keywords) {
    if (normalizedInput.includes(key)) {
      return OFFLINE_KNOWLEDGE[key];
    }
  }
  // Synonyms check
  if (normalizedInput.includes('seguro') || normalizedInput.includes('perigoso') || normalizedInput.includes('medo')) return OFFLINE_KNOWLEDGE['segurança'];
  if (normalizedInput.includes('beber') || normalizedInput.includes('hidratar')) return OFFLINE_KNOWLEDGE['agua'];
  if (normalizedInput.includes('adaptador') || normalizedInput.includes('carregar')) return OFFLINE_KNOWLEDGE['tomada'];
  if (normalizedInput.includes('taxi') || normalizedInput.includes('transporte')) return OFFLINE_KNOWLEDGE['uber'];
  if (normalizedInput.includes('documento') || normalizedInput.includes('imigração')) return OFFLINE_KNOWLEDGE['visto'];
  if (normalizedInput.includes('febre amarela')) return OFFLINE_KNOWLEDGE['vacina'];
  if (normalizedInput.includes('hora') || normalizedInput.includes('diferença')) return OFFLINE_KNOWLEDGE['fuso'];
  if (normalizedInput.includes('tempo') || normalizedInput.includes('chove') || normalizedInput.includes('frio') || normalizedInput.includes('calor')) return OFFLINE_KNOWLEDGE['clima'];
  if (normalizedInput.includes('roupa') || normalizedInput.includes('safari')) return OFFLINE_KNOWLEDGE['mala'];
  if (normalizedInput.includes('sim card') || normalizedInput.includes('wifi')) return OFFLINE_KNOWLEDGE['chip'];
  if (normalizedInput.includes('policia') || normalizedInput.includes('hospital') || normalizedInput.includes('socorro')) return OFFLINE_KNOWLEDGE['emergencia'];
  if (normalizedInput.includes('comer') || normalizedInput.includes('prato') || normalizedInput.includes('jantar')) return OFFLINE_KNOWLEDGE['comida'];
  if (normalizedInput.includes('falar') || normalizedInput.includes('idioma')) return OFFLINE_KNOWLEDGE['lingua'];
  if (normalizedInput.includes('pagar') || normalizedInput.includes('cartão') || normalizedInput.includes('saque') || normalizedInput.includes('rand')) return OFFLINE_KNOWLEDGE['dinheiro'];
  if (normalizedInput.includes('cerveja') || normalizedInput.includes('alcool') || normalizedInput.includes('vinho') || normalizedInput.includes('térmica')) return OFFLINE_KNOWLEDGE['bebida'];

  return null;
};

// --- SYSTEM PROMPT ---
const SYSTEM_INSTRUCTION = `
Você é o "Braço Direito" do André e da Marcelly em sua viagem para a África do Sul.
Sua persona é: Um guia experiente, calmo, super organizado e proativo. Você fala Português do Brasil.

CONTEXTO:
- Destinos: Cidade do Cabo e Joanesburgo.
- Interesses: Safari, Museus, Vinhos, Compras.

REGRAS:
1. Respostas diretas e concisas.
2. Use emojis para categorizar.
3. Se perguntarem sobre Clima, lembre-se do vento em CPT e chuva em JNB.
4. Se a internet estiver instável, seja breve.
`;

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Olá André! Sou seu Braço Direito nesta viagem. 🇿🇦\n\nMinha base de dados está carregada com tudo sobre a África do Sul. Estou usando a conexão direta para maior estabilidade.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // 2. Try Online (HTTP Adapter) then Offline
    try {
      if (!process.env.API_KEY || !navigator.onLine) {
         throw new Error("Offline Mode Trigger");
      }

      // Convert local message format to API format (Role + Parts)
      const history = messages.map(m => ({
        role: m.sender,
        parts: [{ text: m.text }]
      }));

      const aiText = await generateChatContent(history, userMsg.text, SYSTEM_INSTRUCTION);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.log("Entering Offline/Fallback Mode");
      
      const offlineAnswer = findOfflineAnswer(userMsg.text);
      let replyText = "";
      
      if (offlineAnswer) {
          replyText = offlineAnswer;
      } else {
          replyText = "⚠️ **Modo Offline:** Sem conexão com a IA.\n\nTente perguntar sobre: Segurança, Uber, Tomadas, Água ou Emergência.";
      }

      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'ai',
        timestamp: new Date(),
        isOfflineResponse: true
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#e5ddd5] rounded-xl overflow-hidden shadow-inner relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4a5568 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Header Info */}
      <div className="bg-slate-900 text-white p-3 flex items-center gap-3 shadow-md z-10">
        <div className="relative">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600">
                <Bot className="w-6 h-6 text-blue-300" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
        </div>
        <div>
            <h3 className="font-bold text-sm">Seu Braço Direito 🇿🇦</h3>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> IA HTTP Direct • Dados Offline
            </span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-lg p-3 text-sm shadow-sm relative ${
                msg.sender === 'user' 
                  ? 'bg-[#dcf8c6] text-gray-800 rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
              </div>
              <div className="flex items-center justify-end gap-1 mt-1 opacity-60">
                {msg.isOfflineResponse && <WifiOff className="w-3 h-3 text-red-500" />}
                <span className="text-[9px]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={`absolute top-0 w-0 h-0 border-[6px] border-transparent ${
                  msg.sender === 'user' 
                  ? 'right-[-6px] border-l-[#dcf8c6] border-t-[#dcf8c6]' 
                  : 'left-[-6px] border-r-white border-t-white'
              }`}></div>
            </div>
          </div>
        ))}
        
        {isLoading && (
            <div className="flex justify-start animate-pulse">
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2 text-xs text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Conectando via Satélite...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-100 p-2 z-10 border-t border-gray-200">
         <div className="flex items-end gap-2 bg-white rounded-2xl border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
             <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pergunte qualquer coisa..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 resize-none max-h-24 py-2"
                rows={1}
                style={{ minHeight: '24px' }}
             />
             <button 
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="p-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-0.5"
             >
                <Send className="w-4 h-4" />
             </button>
         </div>
      </div>
    </div>
  );
};

export default AiAssistant;
