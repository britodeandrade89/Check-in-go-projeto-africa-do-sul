// EXEMPLOS DE USO - PronunciationPractice Component

// ============================================
// 1. IMPORTAÇÃO NO APP PRINCIPAL
// ============================================

import PronunciationPractice from './src/components/PronunciationPractice';

// Dentro do componente:
<PronunciationPractice />


// ============================================
// 2. FLUXO DE ESTADOS
// ============================================

// Estado inicial
screen: 'welcome'

// Fluxo completo
'welcome' 
  → 'language-select' (clica em "Começar Agora")
  → 'dialect-select' (seleciona um idioma)
  → 'category-select' (seleciona um sotaque)
  → 'practice' (seleciona uma categoria)
  → 'conversation' (clica em "Praticar em Conversa Real")


// ============================================
// 3. ESTRUTURA DE DADOS
// ============================================

// Exemplo de Language
{
  id: 'en',
  name: 'English',
  code: 'en',
  countryCode: 'gb' // Para bandeira
}

// Exemplo de Dialect
{
  id: 'en-us',
  name: 'American',
  code: 'en-US',
  countryCode: 'us',
  language_id: 'en'
}

// Exemplo de Category
{
  id: 'basics',
  name: 'Básico',
  description: 'Cumprimentos e expressões essenciais'
}

// Exemplo de PhraseData
{
  id: '1',
  pt: 'Olá',
  target_text: 'Hello',
  target_phonetic: '/həˈloʊ/', // Opcional
  category_id: 'basics',
  language_id: 'en',
  dialect_id: 'en-us'
}


// ============================================
// 4. RECURSO: GRAVAÇÃO DE ÁUDIO
// ============================================

// O componente PracticeSession já implementa:
// - Acesso ao microfone: navigator.mediaDevices.getUserMedia()
// - Gravação: MediaRecorder API
// - Reprodução: new Audio(url)

// Usuário:
// 1. Pressiona e segura o botão do microfone
// 2. Fala a frase
// 3. Solta o botão
// 4. Áudio é processado e armazenado
// 5. Pode reproduzir clicando no play


// ============================================
// 5. RECURSO: MODO CONVERSAÇÃO LIVE
// ============================================

// Integração com Google Gemini Live API:

// Conexão
ai.live.connect({
  model: 'gemini-2.5-flash-native-audio-preview-12-2025',
  callbacks: {
    onopen: () => { /* conexão estabelecida */ },
    onmessage: (msg) => { /* nova mensagem */ },
    onclose: () => { /* conexão fechada */ }
  }
})

// Fluxo:
// 1. Usuário clica no microfone (botão verde)
// 2. Áudio do usuário é enviado em chunks
// 3. IA transcreve em tempo real (msg.inputTranscription)
// 4. IA responde (msg.outputTranscription)
// 5. Áudio da resposta é reproduzido automaticamente
// 6. Usuário clica novamente para desconectar (botão vermelho)


// ============================================
// 6. TEXTO-PARA-FALA (TTS)
// ============================================

// Implementado em PracticeSession:
const speakNative = () => {
  const u = new SpeechSynthesisUtterance(currentPhrase.target_text);
  u.lang = dialect.code; // ex: 'en-US', 'es-ES'
  u.rate = 0.8; // Velocidade mais lenta para clareza
  window.speechSynthesis.speak(u);
};

// Clique em "Ouvir Nativo" para escutar a pronúncia correta


// ============================================
// 7. NAVEGAÇÃO ENTRE FRASES
// ============================================

// Exemplo: Inglês → American → Viagem
// Carrega array de frases:
PHRASES['en']['travel'] = [
  { id: '9', pt: 'Onde é o aeroporto?', target_text: 'Where is the airport?' },
  { id: '10', pt: 'Preciso de um táxi', target_text: 'I need a taxi' },
  { id: '11', pt: 'Qual é a próxima parada?', target_text: 'What is the next stop?' },
  // ... mais frases
]

// Estado:
const [index, setIndex] = useState(0);
const currentPhrase = phrases[index]; // Começa em 0

// Navegação:
// Botão ← : decrementa index (desativado se index === 0)
// Botão → : incrementa index (desativado se index === phrases.length - 1)


// ============================================
// 8. TEMAS E CORES
// ============================================

// Cores da bandeira sul-africana usadas:
const themeColors = {
  'sa-green': '#007749',   // Verde
  'sa-gold': '#FFB81C',    // Ouro
  'sa-red': '#E03C31',     // Vermelho
  'sa-blue': '#001489',    // Azul
  'sa-black': '#000000'    // Preto
};

// Aplicadas via Tailwind (custom colors em tailwind.config.js)


// ============================================
// 9. ACESSIBILIDADE
// ============================================

// Recursos implementados:
// - Botões com labels descritivos
// - Contraste de cores adequado
// - Indicadores visuais (botão vermelho = gravando)
// - Feedback de estado (spinning icon enquanto traduz)
// - Navegação por teclado (Enter, Setas)


// ============================================
// 10. PERFORMANCE
// ============================================

// Otimizações incluídas:
// - Dados carregados staticamente (sem API calls)
// - Audio Web API para processamento eficiente
// - useCallback para evitar re-renders desnecessários
// - useRef para gerenciar AudioContext
// - Lazy loading de imagens (flags via CDN)


// ============================================
// CONFIGURAÇÃO NECESSÁRIA
// ============================================

// .env arquivo:
REACT_APP_GOOGLE_API_KEY=sk_live_...seu_google_api_key...

// package.json (dependências já instaladas):
{
  "dependencies": {
    "react": "^18.0.0",
    "@google/genai": "^0.x.x",
    "lucide-react": "^0.x.x"
  }
}


// ============================================
// ESTRUTURA DE PASTAS
// ============================================

src/
├── components/
│   ├── PronunciationPractice.tsx    (novo)
│   ├── Navigation.tsx                (novo)
│   └── ... outros componentes
├── data/
│   ├── PronunciationData.ts          (novo)
│   └── ... outros dados
├── services/
│   ├── gemini.ts                     (novo)
│   └── ... outros serviços
└── types.ts


// ============================================
// DICAS DE DESENVOLVIMENTO
// ============================================

// 1. Para adicionar novo idioma:
// - Adicionar objeto ao array LANGUAGES em PronunciationData.ts
// - Adicionar dialetos ao objeto DIALECTS
// - Adicionar frases ao objeto PHRASES

// 2. Para modificar categorias:
// - Editar array CATEGORIES em PronunciationData.ts
// - Adicionar novas frases no PHRASES

// 3. Para melhorar o modelo de IA:
// - Editar systemInstruction no ConversationMode
// - Alterar model de 'gemini-2.5-flash-native-audio-preview-12-2025' para versão mais nova

// 4. Para debug:
// - Abrir DevTools (F12)
// - Ir para Console
// - Procurar por erros de Audio/CORS
// - Verificar se API key está setada: console.log(process.env.REACT_APP_GOOGLE_API_KEY)
