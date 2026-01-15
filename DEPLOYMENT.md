# Check-in, Go! - Setup & Deployment Guide

## 🚀 Quick Start

### 1. **Local Development**

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (porta 5173)
npm run dev

# Abrir http://localhost:5173
```

### 2. **Variáveis de Ambiente**

Copiar `.env.example` para `.env` e preencher:

```bash
cp .env.example .env
```

Editar `.env`:
```env
REACT_APP_GOOGLE_API_KEY=sua_chave_aqui
```

Obtenha a chave em: https://aistudio.google.com/app/apikeys

### 3. **Build para Produção**

```bash
# Compilar para dist/
npm run build

# Testar build localmente (porta 4173)
npm run preview

# Executar servidor (produção)
npm start
```

---

## 📦 Dependências Principais

- **React 18** - Framework UI
- **Vite 5** - Build tool
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling
- **Google Gemini API** - IA/Traduções
- **Lucide React** - Ícones
- **Express.js** - Servidor Node

---

## 🌐 Deployment

### **Render.com**

1. **Conectar repositório** em https://render.com
2. **Variáveis de ambiente**:
   - Adicionar `REACT_APP_GOOGLE_API_KEY` no dashboard
3. **Automático**:
   - `render.yaml` define build e start commands
   - Deploy ocorre a cada push na branch principal

```yaml
# render.yaml já configurado com:
buildCommand: npm install && npm run build
startCommand: npm run preview
```

### **Docker**

```bash
# Build
docker build -t checkingo .

# Run
docker run -p 3000:3000 -e REACT_APP_GOOGLE_API_KEY=xxx checkingo
```

### **Vercel**

```bash
vercel deploy

# Com variáveis:
vercel env add REACT_APP_GOOGLE_API_KEY
```

---

## 📊 Estrutura do Projeto

```
src/
├── components/
│   ├── PronunciationPractice.tsx  ← Sistema de pronúncia
│   ├── Navigation.tsx             ← Menu principal
│   ├── Translator.tsx             ← Tradutor em tempo real
│   └── ... (outros componentes)
├── data/
│   ├── PronunciationData.ts       ← Dados de frases (8 idiomas)
│   └── ... (outros dados)
├── services/
│   ├── gemini.ts                  ← Google Gemini API
│   └── ... (outros serviços)
└── types.ts

public/
dist/                             ← Build output

vite.config.ts                    ← Configuração Vite
tailwind.config.js                ← Tailwind
tsconfig.json                     ← TypeScript
package.json
.env                              ← Variáveis de ambiente
render.yaml                       ← Config Render.com
```

---

## 🎯 Features Disponíveis

✅ **Tradutor ao Vivo** - Texto/Voz com IA
✅ **Prática de Pronúncia** - 8 idiomas, 264 frases
✅ **Conversação ao Vivo** - Google Gemini Live API
✅ **Offline Ready** - Funciona sem internet (com cache)
✅ **Responsivo** - Mobile first design
✅ **TypeScript** - 100% tipado

---

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Dev server (http://localhost:5173) |
| `npm run build` | Build para produção |
| `npm run preview` | Preview build local |
| `npm start` | Servidor Express (produção) |
| `npm test` | Executar testes |

---

## 🐛 Troubleshooting

### **"API Key not configured"**
- Verificar se `.env` tem `REACT_APP_GOOGLE_API_KEY`
- Em produção, adicionar no dashboard da plataforma

### **"Build failed: terser not found"**
- Executar: `npm install terser --save-dev`

### **"Port already in use"**
- Mudar porta em `vite.config.ts`
- Ou: `npm run dev -- --port 5174`

### **CORS errors na API**
- Verificar se URL de API está nos headers corretos
- Google Gemini API é CORS-safe

---

## 📱 Suporte de Navegadores

- Chrome/Edge 90+
- Firefox 89+
- Safari 14.1+
- Opera 76+

---

## 📞 Support

Para issues ou dúvidas:
1. Verificar console do navegador (F12)
2. Verificar logs do servidor (`npm start`)
3. Verificar variáveis de ambiente

---

**Versão**: 1.0.0
**Última atualização**: 15 de Janeiro de 2026
