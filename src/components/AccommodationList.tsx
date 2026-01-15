import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Car, 
  ShoppingBag, 
  AlertTriangle, 
  ExternalLink,
  Clock,
  Bus,
  MapPin,
  UtensilsCrossed,
  CheckCircle2,
  Hotel,
  Wallet,
  ChevronDown,
  ChevronUp,
  Info,
  Navigation,
  ShieldAlert,
  Zap,
  Snowflake,
  Wind,
  Waves,
  Plane
} from 'lucide-react';

type City = 'CPT' | 'JNB' | 'SP';

interface Accommodation {
  id: string;
  name: string;
  link: string;
  breakfastIncluded: boolean;
  breakfastPrice?: string; 
  security: string;
  securityScore: string;
  uberAirport: string;
  uberToCenter: string;
  market: string;
  differential: string;
  totalTripEst: string;
  rankLabel?: string;
  hasBRT?: boolean;
  hasPool?: boolean; 
  dailyPrice: string; 
  stayTotalHotels: string; 
  description: string;
  checkInWarning: string;
  score: string; 
  scoreLabel: string;
  neighborhoodInfo: string;
  leisureInfo: string;
  coolingType: 'AC' | 'Fan'; 
  coolingLabel: string;
}

const DATA_SP: Accommodation[] = [
  {
    id: 'sp-bristol',
    name: 'Bristol International Airport',
    link: 'https://www.booking.com/hotel/br/bristol-international-guarulhos.pt-br.html',
    breakfastIncluded: true,
    dailyPrice: 'R$ 399',
    stayTotalHotels: 'R$ 399 (1 Noite)',
    totalTripEst: 'R$ 438',
    score: '8,5',
    scoreLabel: 'Muito Bom',
    rankLabel: '🥇 IDA: O MELHOR (24/JAN)',
    security: 'Aeroporto (9/10)',
    securityScore: 'Seguro e movimentado.',
    uberAirport: 'GRÁTIS (Van do Hotel)',
    uberToCenter: 'R$ 38,92 (Uber do Tietê)',
    market: 'Farmácias e Mercados ao redor',
    differential: 'Transfer Gratuito + Piscina Aquecida Coberta.',
    hasPool: true,
    checkInWarning: 'Ida 24/01. Use a Van gratuita do hotel.',
    description: 'Estratégia de Ida: Descanso total antes do voo internacional. Piscina aquecida para relaxar e transfer grátis para o terminal.',
    neighborhoodInfo: 'Centro de Guarulhos: Prático para quem quer conveniência.',
    leisureInfo: 'Piscina térmica coberta.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'sp-novo-mexico',
    name: 'Hotel Novo México',
    link: 'https://www.booking.com/hotel/br/novo-mexico-guarulhos.pt-br.html',
    breakfastIncluded: true,
    dailyPrice: 'R$ 199',
    stayTotalHotels: 'R$ 199 (1 Noite)',
    totalTripEst: 'R$ 275',
    score: '8,2',
    scoreLabel: 'Bom Custo',
    rankLabel: '🥈 VOLTA: ECONÔMICO (06/FEV)',
    security: 'Guarulhos (7/10)',
    securityScore: 'Bairro residencial simples.',
    uberAirport: 'R$ 35,00 (Uber Necessário)',
    uberToCenter: 'R$ 40,00 (Uber p/ Tietê)',
    market: 'Comércio local',
    differential: 'Preço baixo e atendimento gentil.',
    hasPool: false,
    checkInWarning: 'Volta 06/02. Não tem transfer, use Uber.',
    description: 'Estratégia de Volta: Ótimo apenas para dormir e tomar banho após o voo longo de retorno. Simples, limpo e barato.',
    neighborhoodInfo: 'Jardim Santa Mena (Guarulhos).',
    leisureInfo: 'Apenas pernoite.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  }
];

const DATA_CPT: Accommodation[] = [
  {
    id: 'cpt-onyx',
    name: 'The Onyx - Estúdio Incrível (Airbnb)',
    link: 'https://www.airbnb.com.br/s/Cape-Town--South-Africa/homes?refinement_paths%5B%5D=%2Fhomes&query=The%20Onyx%20Cape%20Town',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 0 (Cozinha Completa)',
    dailyPrice: 'R$ 370 (Média)',
    stayTotalHotels: 'R$ 1.848 (5 Noites)',
    totalTripEst: 'R$ 1.968',
    score: '9,8',
    scoreLabel: 'Excepcional',
    rankLabel: '🏆 AIRBNB: TOP 1 (SEM APAGÃO)',
    security: 'Concierge 24h (10/10)',
    securityScore: 'Prédio de luxo com segurança armada e recepção.',
    uberAirport: 'R$ 60 - R$ 90',
    uberToCenter: 'R$ 0 (A pé p/ Waterfront)',
    market: 'Food Lovers (Térreo)',
    differential: '⚡ SEM LOAD SHEDDING (Gerador) + Piscina Rooftop.',
    hasPool: true,
    checkInWarning: 'Airbnb: Combine a entrega das chaves ou senha do cofre com o host.',
    description: 'Vencedor absoluto. Energia garantida (raridade), estrutura de hotel 5 estrelas, Spa e academia. Localização estratégica no Foreshore.',
    neighborhoodInfo: 'Foreshore: Área financeira moderna, segura e ao lado do Waterfront.',
    leisureInfo: 'Piscina aquecida int/ext, bar e spa no prédio.',
    coolingType: 'AC',
    coolingLabel: 'Ar Central'
  },
  {
    id: 'cpt-bree',
    name: '16 on Bree - Vista Montanha (Airbnb)',
    link: 'https://www.airbnb.com.br/s/Cape-Town--South-Africa/homes?refinement_paths%5B%5D=%2Fhomes&query=16%20on%20Bree%20Cape%20Town',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 0 (Cozinha Completa)',
    dailyPrice: 'R$ 393 (Média)',
    stayTotalHotels: 'R$ 1.964 (5 Noites)',
    totalTripEst: 'R$ 2.084',
    score: '9,5',
    scoreLabel: 'Fantástico',
    rankLabel: '🥈 AIRBNB: VISTA & VIBE',
    security: 'Portaria 24h (9/10)',
    securityScore: 'Acesso biométrico e segurança.',
    uberAirport: 'R$ 60 - R$ 90',
    uberToCenter: 'R$ 0 (No Centro)',
    market: 'Woolworths (5 min a pé)',
    differential: 'Na rua mais badalada (Bree St) + Piscina Deck.',
    hasPool: true,
    checkInWarning: 'Airbnb: Self check-in geralmente disponível.',
    description: 'Moderno e vibrante. Ideal para quem quer descer do elevador e já estar nos restaurantes da moda. Perto do estádio.',
    neighborhoodInfo: 'City Bowl / Bree St: O coração gastronômico e noturno.',
    leisureInfo: 'Piscina no deck com bar e vista da montanha.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'broadway',
    name: 'Broadway Tygervalley',
    link: 'https://www.hoteis.com/ho624061/broadway-tygervalley-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: true,
    dailyPrice: 'R$ 299',
    stayTotalHotels: 'R$ 1.721',
    totalTripEst: 'R$ 2.381',
    score: '8,0',
    scoreLabel: 'Muito boa',
    rankLabel: '🥉 HOTEL: ECONOMIA TOTAL',
    security: 'Urbana (6.5/10)',
    securityScore: 'Atenção com celular na rua.',
    uberAirport: 'R$ 45 - R$ 75',
    uberToCenter: 'R$ 75 - R$ 105',
    market: 'Tyger Valley Shopping (10min a pé)',
    differential: 'Perto de tudo e Uber barato do aeroporto.',
    checkInWarning: 'Recepção fecha às 23h. Como o voo chega 22:45, avise agora para entrar à 00h.',
    description: 'Quartos funcionais com micro-ondas e frigobar. Ideal para comprar janta no mercado e economizar.',
    neighborhoodInfo: 'Bellville é uma área comercial movimentada. Seguro no hotel e shopping, mas evite caminhar à noite.',
    leisureInfo: 'Próximo ao shopping e fácil acesso às vinícolas de Durbanville.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'balmoral',
    name: 'Balmoral Lodge',
    link: 'https://www.hoteis.com/ho355129/balmoral-lodge-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: true,
    dailyPrice: 'R$ 272',
    stayTotalHotels: 'R$ 1.561',
    totalTripEst: 'R$ 2.296',
    score: '8,4',
    scoreLabel: 'Muito boa',
    security: 'Residencial (7.5/10)',
    securityScore: 'Bairro calmo e arborizado.',
    uberAirport: 'R$ 55 - R$ 80',
    uberToCenter: 'R$ 80 - R$ 115',
    market: 'Sanlam Centre (5 min de Uber)',
    differential: 'Estrutura 4 estrelas com piscina e ótimo café.',
    checkInWarning: 'Staff estruturado, mas a chegada à meia-noite exige confirmação por mensagem.',
    description: 'Pousada tradicional com jardins e buffet de café da manhã farto incluso.',
    neighborhoodInfo: 'De La Haye é tranquilo, mas saia do hotel direto para o Uber.',
    leisureInfo: 'Excelente área de lazer interna para relaxar entre passeios.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado Split'
  },
  {
    id: 'high-street',
    name: 'The High Street Accommodation',
    link: 'https://www.hoteis.com/ho3288542304/the-high-street-accommodation-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: true,
    dailyPrice: 'R$ 354',
    stayTotalHotels: 'R$ 1.770',
    totalTripEst: 'R$ 2.730',
    score: '9,6',
    scoreLabel: 'Extraordinária',
    security: 'Elite (10/10)',
    securityScore: 'O lugar mais seguro da lista.',
    uberAirport: 'R$ 80 - R$ 110',
    uberToCenter: 'R$ 90 - R$ 135',
    market: 'Aurora Shopping (1.6km - Uber)',
    differential: 'Paz absoluta em bairro residencial de luxo.',
    checkInWarning: 'Recepção fecha cedo (20h). Chaves ficam em cofre se avisado antes.',
    description: 'Chalés privativos modernos em Durbanville. Quase um mini-apartamento.',
    neighborhoodInfo: 'Área nobre de Aurora. Perfeito para sono silencioso e total segurança.',
    leisureInfo: 'A 10 min das vinícolas de luxo de Durbanville Hills.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'bluebottle',
    name: 'Bluebottle Guest House',
    link: 'https://www.hoteis.com/ho449592/bluebottle-guest-house-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: true,
    dailyPrice: 'R$ 310',
    stayTotalHotels: 'R$ 1.784',
    totalTripEst: 'R$ 2.484',
    score: '8,8',
    scoreLabel: 'Excelente',
    security: 'Nobre (8/10)',
    securityScore: 'Seguro, mas cuidado em Muizenberg à noite.',
    uberAirport: 'R$ 90 - R$ 120',
    uberToCenter: 'R$ 65 - R$ 95',
    market: 'Checkers Muizenberg (2km)',
    differential: 'Vista para o mar e pinguins por perto.',
    checkInWarning: 'Estilo B&B familiar. Dono precisa te esperar à meia-noite.',
    description: 'Localizada na montanha em St James. Varanda com vista incrível do oceano.',
    neighborhoodInfo: 'Vibe praiana e natureza. Perto das casinhas coloridas.',
    leisureInfo: 'Caminhada matinal até Boulders Beach (pinguins) e Kalk Bay.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'grand-blue',
    name: 'Grand Blue D Boutique',
    link: 'https://www.hoteis.com/ho606267616/grand-blue-d-boutique-guesthouse-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 300 (Total casal 5 dias)',
    dailyPrice: 'R$ 282',
    stayTotalHotels: 'R$ 1.623',
    totalTripEst: 'R$ 2.823',
    score: '8,4',
    scoreLabel: 'Muito boa',
    security: 'Turística (8.5/10)',
    securityScore: 'Seguro para caminhar na orla de dia.',
    uberAirport: 'R$ 105 - R$ 145',
    uberToCenter: 'R$ 8,00 (Ônibus BRT MyCiTi)',
    market: 'Eden on the Bay (Ao lado)',
    differential: 'Vista clássica da Table Mountain e BRT na porta.',
    hasBRT: true,
    checkInWarning: 'Rigorosa. Combine o depósito em dinheiro (Rands) antes de reservar.',
    description: 'Hospedagem estilo boutique moderna em Bloubergstrand.',
    neighborhoodInfo: 'Blouberg é a capital do kitesurf. Visual espetacular da baía.',
    leisureInfo: 'Restaurantes de frente para o mar e passeios de BRT até o centro.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'happy-home',
    name: 'Happy Home Imhoff\'s Gift',
    link: 'https://www.hoteis.com/ho712574816/happy-home-imhoffs-gift-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 300 (Total casal 5 dias)',
    dailyPrice: 'R$ 201',
    stayTotalHotels: 'R$ 1.198',
    totalTripEst: 'R$ 3.098',
    score: '9,2',
    scoreLabel: 'Maravilhosa',
    security: 'Máxima (10/10)',
    securityScore: 'Dentro de condomínio fechado.',
    uberAirport: 'R$ 150 - R$ 220',
    uberToCenter: 'R$ 120 - R$ 165',
    market: 'Longbeach Mall (5km - Uber)',
    differential: 'Isolamento total e paz rural.',
    checkInWarning: 'Se não avisar, a portaria do condomínio barra o Uber à meia-noite.',
    description: 'Casa familiar em Kommetjie. Diária barata, mas Uber caríssimo pela distância.',
    neighborhoodInfo: 'Ambiente de condomínio de luxo com lago e montanhas.',
    leisureInfo: 'Visita ao Farol de Kommetjie e praias selvagens.',
    coolingType: 'Fan',
    coolingLabel: 'Apenas Ventilador'
  },
  {
    id: 'melkbosch',
    name: 'Melkbosch Guesthouse',
    link: 'https://www.hoteis.com/ho630993/melkbosch-guesthouse-cidade-do-cabo-africa-do-sul/',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 350 (Total casal 5 dias)',
    dailyPrice: 'R$ 377',
    stayTotalHotels: 'R$ 1.885',
    totalTripEst: 'R$ 2.965',
    score: '9,4',
    scoreLabel: 'Extraordinária',
    security: 'Vila Segura (9/10)',
    securityScore: 'Vilarejo de praia muito pacato.',
    uberAirport: 'R$ 135 - R$ 180',
    uberToCenter: 'R$ 10,00 (Ônibus BRT MyCiTi)',
    market: 'Pick n Pay (Ao lado - a pé)',
    differential: 'Conveniência total com mercado e ônibus na porta.',
    hasBRT: true,
    checkInWarning: 'A mais distante do aeroporto. Chegada tarde exige aviso vital.',
    description: 'Vila costeira calma. Ótimo para quem quer fugir do caos do centro.',
    neighborhoodInfo: 'Melkbosstrand é seguro e ideal para caminhar até a orla.',
    leisureInfo: 'Caminhadas na praia e jantares em restaurantes locais de frutos do mar.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  }
];

const DATA_JNB: Accommodation[] = [
  {
    id: 'jnb-84',
    name: '84 on Fourth',
    link: 'https://www.google.com/search?q=84+on+Fourth+Guest+House+Melville',
    breakfastIncluded: true,
    dailyPrice: 'R$ 246',
    stayTotalHotels: 'R$ 1.230',
    totalTripEst: 'R$ 1.630',
    score: '9,4',
    scoreLabel: 'Excecional',
    rankLabel: '🥇 TOP 1: O CAMPEÃO',
    security: 'Turística Segura (9/10)',
    securityScore: 'Bairro patrulhado e vibrante.',
    uberAirport: 'R$ 100 - R$ 130',
    uberToCenter: 'R$ 30 - R$ 50',
    market: 'Pick n Pay Campus Square (1km)',
    differential: 'Melhor custo-benefício com piscina e charme.',
    hasPool: true,
    hasBRT: true,
    checkInWarning: 'Avise sobre chegada tardia. Transfer disponível (ZAR 400).',
    description: 'Equilíbrio perfeito entre charme, segurança e preço. No coração de Melville.',
    neighborhoodInfo: 'Melville é artístico e seguro. Pode caminhar até os restaurantes da 7th St.',
    leisureInfo: 'Perto do Red Bus e vida noturna local charmosa.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-arum',
    name: 'Arum Place Guest House',
    link: 'https://www.google.com/search?q=Arum+Place+Guest+House+Melville',
    breakfastIncluded: true,
    dailyPrice: 'R$ 264',
    stayTotalHotels: 'R$ 1.320',
    totalTripEst: 'R$ 1.720',
    score: '9,4',
    scoreLabel: 'Excecional',
    rankLabel: '🥈 TOP 2: SOFISTICAÇÃO',
    security: 'Residencial Luxo (9.5/10)',
    securityScore: 'Zona residencial muito segura.',
    uberAirport: 'R$ 100 - R$ 130',
    uberToCenter: 'R$ 30 - R$ 50',
    market: 'Pick n Pay Campus Square (1.5km)',
    differential: 'Piscina em jardim privativo e café gourmet.',
    hasPool: true,
    checkInWarning: 'Caução padrão no cartão de crédito.',
    description: 'Opção sofisticada e moderna, vizinha ao campeão.',
    neighborhoodInfo: 'Westdene/Melville: Silencioso e de alto padrão.',
    leisureInfo: 'Fácil acesso a Uber e Red Bus.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-muco',
    name: 'Muco Guest House',
    link: 'https://www.google.com/search?q=Muco+Guest+House+Rivonia',
    breakfastIncluded: true,
    dailyPrice: 'R$ 217',
    stayTotalHotels: 'R$ 1.085',
    totalTripEst: 'R$ 1.550',
    score: '8,8',
    scoreLabel: 'Muito Bom',
    rankLabel: '🥉 TOP 3: SEGURANÇA SANDTON',
    security: 'Executiva (10/10)',
    securityScore: 'Sandton é a área mais segura de JNB.',
    uberAirport: 'R$ 110 - R$ 150',
    uberToCenter: 'R$ 40 - R$ 60',
    market: 'Rivonia Village',
    differential: 'Preço excelente para a região nobre de Sandton.',
    hasPool: true,
    checkInWarning: 'Pode haver bloqueio de caução no cartão.',
    description: 'Estilo mais executivo e menos "charmoso", mas funcional e seguro.',
    neighborhoodInfo: 'Sandton/Rivonia: Onde fica o dinheiro e a segurança máxima.',
    leisureInfo: 'Perto do Gautrain e Shoppings.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-sunbury',
    name: 'Sunbury Bed & Breakfast',
    link: 'https://www.google.com/search?q=Sunbury+Bed+and+Breakfast+Johannesburg',
    breakfastIncluded: true,
    dailyPrice: 'R$ 217',
    stayTotalHotels: 'R$ 1.085',
    totalTripEst: 'R$ 1.485',
    score: '9,0',
    scoreLabel: 'Excecional',
    security: 'Vibrante (8.5/10)',
    securityScore: 'Seguro e turístico.',
    uberAirport: 'R$ 100 - R$ 130',
    uberToCenter: 'R$ 30 - R$ 50',
    market: 'Pick n Pay (1.2km)',
    differential: 'Red Bus na porta (Stop 9). Logística perfeita.',
    hasPool: true,
    hasBRT: true,
    checkInWarning: 'Verificar se o quarto específico tem AC ou ventilador potente.',
    description: 'Excelente alternativa em Melville com ótima logística.',
    neighborhoodInfo: 'Auckland Park/Melville: Área universitária e turística.',
    leisureInfo: 'Parada do ônibus turístico na porta facilita tudo.',
    coolingType: 'Fan',
    coolingLabel: 'Ventilador (Confirmar AC)'
  },
  {
    id: 'jnb-bannister',
    name: 'Bannister Hotel',
    link: 'https://www.google.com/search?q=Bannister+Hotel+Braamfontein',
    breakfastIncluded: true,
    dailyPrice: 'R$ 224',
    stayTotalHotels: 'R$ 1.120',
    totalTripEst: 'R$ 1.520',
    score: '8,0',
    scoreLabel: 'Muito Bom',
    security: 'Urbana Agitada (7/10)',
    securityScore: 'Seguro dentro, atenção redobrada na rua.',
    uberAirport: 'R$ 90 - R$ 120',
    uberToCenter: 'R$ 20 (A pé/Uber curto)',
    market: 'Pick n Pay (Quarteirão ao lado)',
    differential: 'Vibe jovem, moderno e no centro da ação.',
    hasPool: false,
    hasBRT: true,
    checkInWarning: 'Área central movimenta à noite.',
    description: 'Estilo urbano para quem quer viver o agito do centro com conforto.',
    neighborhoodInfo: 'Braamfontein: Bairro jovem, artístico e universitário.',
    leisureInfo: 'Ao lado da Park Station (Gautrain) e Red Bus.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-eagle',
    name: 'Eagle Nest Luxury',
    link: 'https://www.google.com/search?q=Eagle+Nest+Luxury+Accommodation+Roodepoort',
    breakfastIncluded: true,
    dailyPrice: 'R$ 234',
    stayTotalHotels: 'R$ 1.170',
    totalTripEst: 'R$ 1.670',
    score: '8,5',
    scoreLabel: 'Muito Bom',
    security: 'Residencial Calma (9/10)',
    securityScore: 'Subúrbio muito tranquilo.',
    uberAirport: 'R$ 140 - R$ 180',
    uberToCenter: 'R$ 80 - R$ 110',
    market: 'Mercados locais',
    differential: 'Apenas 20 min do estádio Soccer City.',
    hasPool: true,
    checkInWarning: 'Longe do centro turístico.',
    description: 'Boa opção se a prioridade for o jogo no Soccer City.',
    neighborhoodInfo: 'Roodepoort: Subúrbio residencial afastado.',
    leisureInfo: 'Dependência total de Uber para turismo.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-furaha',
    name: 'Furaha Guest Lodge',
    link: 'https://www.google.com/search?q=Furaha+Guest+Lodge+Observatory',
    breakfastIncluded: true,
    dailyPrice: 'R$ 267',
    stayTotalHotels: 'R$ 1.335',
    totalTripEst: 'R$ 1.835',
    score: '8,2',
    scoreLabel: 'Muito Bom',
    security: 'Isolada (8/10)',
    securityScore: 'Seguro, mas isolado em colinas.',
    uberAirport: 'R$ 80 - R$ 110',
    uberToCenter: 'R$ 40 - R$ 60',
    market: 'Eastgate Shopping',
    differential: 'Luxuoso e focado em eventos.',
    hasPool: true,
    checkInWarning: 'Uber necessário para tudo.',
    description: 'Menos prático para turismo individual, mais para eventos.',
    neighborhoodInfo: 'Observatory: Área de colinas e vistas.',
    leisureInfo: 'Próximo a um dos melhores shoppings (Eastgate).',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-travetel',
    name: 'Travetel OR Tambo',
    link: 'https://www.google.com/search?q=Travetel+OR+Tambo+Airport+Hotel',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 250 (Est.)',
    dailyPrice: 'R$ 244',
    stayTotalHotels: 'R$ 1.220',
    totalTripEst: 'R$ 1.470',
    score: '8,0',
    scoreLabel: 'Bom',
    security: 'Aeroporto (9/10)',
    securityScore: 'Zona hoteleira do aeroporto.',
    uberAirport: 'Grátis (Transfer)',
    uberToCenter: 'R$ 150 (Longe!)',
    market: 'Lojinha do posto',
    differential: 'Transfer grátis 24h para o aeroporto.',
    hasPool: true,
    checkInWarning: 'Longe de tudo (40km de Soweto).',
    description: 'Melhor custo-benefício se precisar ficar colado no aeroporto.',
    neighborhoodInfo: 'Kempton Park: Área funcional de aeroporto.',
    leisureInfo: 'Nenhuma. Só hotel e aeroporto.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-aerotropolis',
    name: 'Aerotropolis Guest Lodge',
    link: 'https://www.google.com/search?q=Aerotropolis+Guest+Lodge',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 250 (Est.)',
    dailyPrice: 'R$ 256',
    stayTotalHotels: 'R$ 1.280',
    totalTripEst: 'R$ 1.530',
    score: '8,6',
    scoreLabel: 'Muito Bom',
    security: 'Aeroporto (9/10)',
    securityScore: 'Seguro.',
    uberAirport: 'Grátis (Transfer)',
    uberToCenter: 'R$ 150',
    market: 'Nenhum perto',
    differential: 'Infraestrutura sólida de aeroporto.',
    hasPool: true,
    checkInWarning: 'Preço alto pela localização.',
    description: 'Opção cara para aeroporto, mas com boa nota.',
    neighborhoodInfo: 'Kempton Park.',
    leisureInfo: 'Apenas descanso pré-voo.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-bnb8th',
    name: 'B&B on 8th Avenue',
    link: 'https://www.google.com/search?q=Bed+and+Breakfast+on+8th+Avenue+Melville',
    breakfastIncluded: true,
    dailyPrice: 'R$ 276',
    stayTotalHotels: 'R$ 1.380',
    totalTripEst: 'R$ 1.780',
    score: '8,5',
    scoreLabel: 'Muito Bom',
    security: 'Turística (9/10)',
    securityScore: 'Seguro (Melville).',
    uberAirport: 'R$ 100 - R$ 130',
    uberToCenter: 'R$ 30 - R$ 50',
    market: 'Lojas locais',
    differential: 'Localização boa, mas preço alto.',
    hasPool: false,
    checkInWarning: 'Menos competitivo que o 84 on Fourth.',
    description: 'Muito bom, mas caro demais comparado aos vizinhos de Melville.',
    neighborhoodInfo: 'Melville.',
    leisureInfo: 'Restaurantes locais.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-emerald',
    name: 'Emerald Guesthouse',
    link: 'https://www.google.com/search?q=Emerald+Guesthouse+Kempton+Park',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 200 (Est.)',
    dailyPrice: 'R$ 244',
    stayTotalHotels: 'R$ 1.220',
    totalTripEst: 'R$ 1.420',
    score: '7,8',
    scoreLabel: 'Bom',
    security: 'Aeroporto (8/10)',
    securityScore: 'Ok.',
    uberAirport: 'Grátis (Transfer)',
    uberToCenter: 'R$ 150',
    market: 'Não',
    differential: 'Transfer Grátis.',
    hasPool: true,
    checkInWarning: 'Básico.',
    description: 'Padrão de aeroporto sólido, sem luxos.',
    neighborhoodInfo: 'Kempton Park.',
    leisureInfo: 'Nenhuma.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-angel',
    name: 'Angel Guest House',
    link: 'https://www.google.com/search?q=Angel+Guest+House+Johannesburg',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 150 (Est.)',
    dailyPrice: 'R$ 134',
    stayTotalHotels: 'R$ 670',
    totalTripEst: 'R$ 1.000',
    score: '7,0',
    scoreLabel: 'Razoável',
    security: 'Alerta (5/10)',
    securityScore: 'Zona menos policiada.',
    uberAirport: 'R$ 90 - R$ 120',
    uberToCenter: 'R$ 30',
    market: 'Mercados de rua',
    differential: 'Preço extremamente baixo.',
    hasPool: false,
    checkInWarning: 'Segurança é uma preocupação aqui.',
    description: 'O campeão do preço baixo, mas com alertas de segurança.',
    neighborhoodInfo: 'Downtown/Bez Valley: Área mais degradada.',
    leisureInfo: 'Economia radical.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-garden',
    name: 'Garden Top Hotel',
    link: 'https://www.google.com/search?q=Garden+Top+Hotel+Bellevue+East',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 150 (Est.)',
    dailyPrice: 'R$ 158',
    stayTotalHotels: 'R$ 790',
    totalTripEst: 'R$ 1.100',
    score: '7,2',
    scoreLabel: 'Razoável',
    security: 'Média (6/10)',
    securityScore: 'Isolado.',
    uberAirport: 'R$ 100',
    uberToCenter: 'R$ 40',
    market: 'Não',
    differential: 'Simples.',
    hasPool: false,
    checkInWarning: 'Simples e isolado.',
    description: 'Opção básica.',
    neighborhoodInfo: 'Bellevue East.',
    leisureInfo: 'Nenhuma.',
    coolingType: 'Fan',
    coolingLabel: 'Ventilador'
  },
  {
    id: 'jnb-olu',
    name: 'Olu Guest Lodge',
    link: 'https://www.google.com/search?q=Olu+Guest+Lodge+Kempton+Park',
    breakfastIncluded: false,
    breakfastPrice: 'R$ 200 (Est.)',
    dailyPrice: 'R$ 221',
    stayTotalHotels: 'R$ 1.105',
    totalTripEst: 'R$ 1.305',
    score: '7,5',
    scoreLabel: 'Bom',
    security: 'Aeroporto (8/10)',
    securityScore: 'Ok.',
    uberAirport: 'Pago',
    uberToCenter: 'R$ 150',
    market: 'Não',
    differential: 'Nenhum.',
    hasPool: false,
    checkInWarning: 'Pior que Travetel/Emerald na mesma região.',
    description: 'Opção básica de aeroporto.',
    neighborhoodInfo: 'Kempton Park.',
    leisureInfo: 'Nenhuma.',
    coolingType: 'AC',
    coolingLabel: 'Ar Condicionado'
  },
  {
    id: 'jnb-nest',
    name: 'The Nest B&B',
    link: 'https://www.google.com/search?q=The+Nest+B%26B+Vosloorus',
    breakfastIncluded: false,
    breakfastPrice: '?',
    dailyPrice: 'R$ 212',
    stayTotalHotels: 'R$ 1.060',
    totalTripEst: 'R$ 1.500',
    score: '6,0',
    scoreLabel: 'Fraco',
    security: 'Baixa (4/10)',
    securityScore: 'Longe de tudo (Vosloorus).',
    uberAirport: 'Caro',
    uberToCenter: 'Muito Caro',
    market: 'Não',
    differential: 'Nenhum.',
    hasPool: false,
    checkInWarning: 'Não recomendado. Sem fotos do banheiro.',
    description: 'O pior custo-benefício. Longe de tudo (40km).',
    neighborhoodInfo: 'Vosloorus (Township área).',
    leisureInfo: 'Nenhuma.',
    coolingType: 'Fan',
    coolingLabel: 'Desconhecido'
  }
];

const AccommodationList: React.FC = () => {
  const [activeCity, setActiveCity] = useState<City>('CPT');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCurrentData = () => {
      switch(activeCity) {
          case 'CPT': return DATA_CPT;
          case 'JNB': return DATA_JNB;
          case 'SP': return DATA_SP;
          default: return DATA_CPT;
      }
  };

  const currentData = getCurrentData();

  const getAlertMessage = () => {
      switch(activeCity) {
          case 'CPT': return 'Voo pousa 22:45. Chegada estimada 00:00. Avisar o hotel IMEDIATAMENTE após reservar.';
          case 'JNB': return 'JNB exige cuidado com transporte à noite. Prefira hotéis com Transfer ou use Uber dentro do aeroporto.';
          case 'SP': return 'Estratégia SP: Bristol na Ida (piscina/descanso) e Novo México na Volta (economia/dormir).';
          default: return '';
      }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* CITY SWITCHER */}
      <div className="flex bg-gray-200 p-1 rounded-2xl shadow-inner overflow-x-auto">
        {(['CPT', 'JNB', 'SP'] as City[]).map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`flex-1 min-w-[80px] flex flex-col items-center justify-center py-3 rounded-xl text-xs font-black font-display transition-all ${
              activeCity === city ? 'bg-white text-sa-green shadow-sm' : 'text-gray-400 opacity-60'
            }`}
          >
            {city === 'SP' ? <Plane className="w-4 h-4 mb-1 rotate-45" /> : <MapPin className="w-4 h-4 mb-1" />}
            {city === 'CPT' ? 'CIDADE DO CABO' : city === 'JNB' ? 'JOANESBURGO' : 'SÃO PAULO'}
          </button>
        ))}
      </div>

      {/* GLOBAL ALERTS */}
      <div className="bg-sa-red/10 border-l-4 border-sa-red p-4 rounded-r-2xl shadow-sm">
        <h3 className="font-display font-black text-sa-red uppercase text-[10px] tracking-widest mb-1 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Alerta de Check-in & Logística
        </h3>
        <p className="text-[11px] text-red-900 font-medium leading-relaxed">
          {getAlertMessage()}
        </p>
      </div>

      {/* LIST OF CARDS */}
      <div className="space-y-8">
        {currentData.length > 0 ? (
          currentData.map((hotel) => (
            <div 
              key={hotel.id}
              className={`rounded-[40px] border-2 overflow-hidden shadow-2xl transition-all bg-white relative group ${
                hotel.breakfastIncluded 
                ? 'border-sa-green ring-4 ring-sa-green/5' 
                : 'border-slate-200'
              }`}
            >
              {hotel.rankLabel && (
                <div className="absolute top-0 left-0 bg-sa-gold text-sa-black text-[10px] font-black uppercase px-5 py-2 rounded-br-3xl z-30 shadow-md tracking-wider">
                   {hotel.rankLabel}
                </div>
              )}

              {/* CARD HEADER (Always Visible) */}
              <div className={`p-6 text-center ${hotel.breakfastIncluded ? 'bg-green-50/30' : 'bg-slate-50'}`}>
                {/* AMENITIES BADGES */}
                <div className="mt-8 mb-4 flex flex-wrap justify-center gap-2">
                    {/* Breakfast Badge */}
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 ${
                        hotel.breakfastIncluded 
                        ? 'bg-sa-green text-white border-green-700' 
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}>
                        {hotel.breakfastIncluded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <UtensilsCrossed className="w-3.5 h-3.5" />}
                        {hotel.breakfastIncluded ? 'Café Incluso' : 'Café Pago'}
                    </span>

                    {/* Cooling Badge (AC vs Fan) */}
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 ${
                        hotel.coolingType === 'AC'
                        ? 'bg-blue-50 text-blue-700 border-blue-200' 
                        : 'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                        {hotel.coolingType === 'AC' ? <Snowflake className="w-3.5 h-3.5" /> : <Wind className="w-3.5 h-3.5" />}
                        {hotel.coolingLabel}
                    </span>

                    {/* Pool Badge */}
                    {hotel.hasPool && (
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border-2 bg-cyan-50 text-cyan-700 border-cyan-200">
                            <Waves className="w-3.5 h-3.5" /> Piscina
                        </span>
                    )}
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-3">
                        <span className="bg-sa-black text-white text-xs font-black px-2 py-1 rounded-lg shadow-sm">{hotel.score}</span>
                        <h2 className="text-2xl font-display font-black text-slate-800 leading-tight tracking-tight uppercase">
                            {hotel.name}
                        </h2>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{hotel.scoreLabel}</span>
                </div>

                <div className="mt-6 flex gap-3">
                    <button 
                        onClick={() => setExpandedId(expandedId === hotel.id ? null : hotel.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-lg border-b-4 ${
                            expandedId === hotel.id 
                            ? 'bg-slate-100 text-slate-800 border-slate-300' 
                            : 'bg-sa-black text-white border-slate-950'
                        }`}
                    >
                        {expandedId === hotel.id ? 'FECHAR DETALHES' : 'LER TUDO SOBRE'}
                        {expandedId === hotel.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <a href={hotel.link} target="_blank" rel="noopener noreferrer" className="bg-sa-blue text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-blue-950 active:scale-95 transition-all">
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </div>
              </div>

              {/* EXPANDABLE SECTION (1x Animation feel) */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedId === hotel.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6">
                    
                    {/* FICHA TÉCNICA */}
                    <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                        <h4 className="text-[10px] font-black text-sa-green uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Dossiê de Hospedagem
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4 italic">
                            "{hotel.description}"
                        </p>
                        
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

                    {/* LOGÍSTICA & DISTÂNCIAS */}
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

                    {/* VAI FAZER O QUE? */}
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
              </div>

              {/* FINANCIAL CARD (Always Visible) */}
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

              {/* GRAND TOTAL FOOTER */}
              <div className={`p-6 text-center text-white relative overflow-hidden ${hotel.breakfastIncluded ? 'bg-sa-green' : 'bg-slate-800'}`}>
                {/* Visual Background Decoration */}
                <div className="absolute -right-4 -bottom-4 opacity-10">
                    <Zap className="w-24 h-24" />
                </div>
                
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 block mb-2">
                  GASTO TOTAL ESTIMADO
                </span>
                <span className="text-4xl font-display font-black tracking-tighter">
                  {hotel.totalTripEst}
                </span>
                <p className="text-[9px] opacity-60 mt-2 font-bold uppercase tracking-widest">
                    Hospedagem + {activeCity === 'SP' ? 'Uber (Ida/Volta GRU)' : 'Uber (Geral)'} + {hotel.breakfastIncluded ? 'Café Grátis' : 'Estimativa Café'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300 bg-white rounded-[50px] shadow-sm border border-gray-100">
            <Hotel className="w-16 h-16 mb-4 opacity-10" />
            <p className="text-sm font-black uppercase tracking-widest text-slate-400">Nenhuma opção carregada.</p>
          </div>
        )}
      </div>

      <div className="text-center px-8 mt-6 pb-12">
        <p className="text-[10px] text-gray-400 leading-relaxed font-bold uppercase tracking-widest">
          * Valores de diária e totais reais consultados em Jan/2026. <br/>
          Animações otimizadas para experiência de 1x.
        </p>
      </div>
    </div>
  );
};

export default AccommodationList;
