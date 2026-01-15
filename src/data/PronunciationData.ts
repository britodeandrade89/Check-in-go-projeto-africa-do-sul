import React from 'react';

export type ScreenState = 
  | 'welcome' 
  | 'language-select' 
  | 'dialect-select' 
  | 'category-select' 
  | 'practice' 
  | 'conversation';

export interface Language {
  id: string;
  name: string;
  code: string;
  countryCode: string;
}

export interface Dialect {
  id: string;
  name: string;
  code: string;
  countryCode: string;
  language_id: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface PhraseData {
  id: string;
  pt: string;
  target_text: string;
  target_phonetic?: string;
  category_id: string;
  language_id: string;
  dialect_id?: string;
}

export const LANGUAGES: Language[] = [
  { id: 'en', name: 'English', code: 'en', countryCode: 'gb' },
  { id: 'es', name: 'Español', code: 'es', countryCode: 'es' },
  { id: 'fr', name: 'Français', code: 'fr', countryCode: 'fr' },
  { id: 'de', name: 'Deutsch', code: 'de', countryCode: 'de' },
  { id: 'it', name: 'Italiano', code: 'it', countryCode: 'it' },
  { id: 'ja', name: '日本語', code: 'ja', countryCode: 'jp' },
  { id: 'zh', name: '中文', code: 'zh', countryCode: 'cn' },
  { id: 'ko', name: '한국어', code: 'ko', countryCode: 'kr' },
];

export const DIALECTS: Record<string, Dialect[]> = {
  en: [
    { id: 'en-gb', name: 'British', code: 'en-GB', countryCode: 'gb', language_id: 'en' },
    { id: 'en-us', name: 'American', code: 'en-US', countryCode: 'us', language_id: 'en' },
    { id: 'en-au', name: 'Australian', code: 'en-AU', countryCode: 'au', language_id: 'en' },
    { id: 'en-ca', name: 'Canadian', code: 'en-CA', countryCode: 'ca', language_id: 'en' },
  ],
  es: [
    { id: 'es-es', name: 'España', code: 'es-ES', countryCode: 'es', language_id: 'es' },
    { id: 'es-mx', name: 'México', code: 'es-MX', countryCode: 'mx', language_id: 'es' },
    { id: 'es-ar', name: 'Argentina', code: 'es-AR', countryCode: 'ar', language_id: 'es' },
  ],
  fr: [
    { id: 'fr-fr', name: 'France', code: 'fr-FR', countryCode: 'fr', language_id: 'fr' },
    { id: 'fr-ca', name: 'Canadá', code: 'fr-CA', countryCode: 'ca', language_id: 'fr' },
    { id: 'fr-be', name: 'Bélgica', code: 'fr-BE', countryCode: 'be', language_id: 'fr' },
  ],
  de: [
    { id: 'de-de', name: 'Alemanha', code: 'de-DE', countryCode: 'de', language_id: 'de' },
    { id: 'de-at', name: 'Áustria', code: 'de-AT', countryCode: 'at', language_id: 'de' },
    { id: 'de-ch', name: 'Suíça', code: 'de-CH', countryCode: 'ch', language_id: 'de' },
  ],
  it: [
    { id: 'it-it', name: 'Itália', code: 'it-IT', countryCode: 'it', language_id: 'it' },
  ],
  ja: [
    { id: 'ja-jp', name: 'Japão', code: 'ja-JP', countryCode: 'jp', language_id: 'ja' },
  ],
  zh: [
    { id: 'zh-cn', name: 'China (Mandarim)', code: 'zh-CN', countryCode: 'cn', language_id: 'zh' },
    { id: 'zh-tw', name: 'Taiwan', code: 'zh-TW', countryCode: 'tw', language_id: 'zh' },
  ],
  ko: [
    { id: 'ko-kr', name: 'Coreia do Sul', code: 'ko-KR', countryCode: 'kr', language_id: 'ko' },
  ],
};

export const CATEGORIES: Category[] = [
  {
    id: 'basics',
    name: 'Básico',
    description: 'Cumprimentos e expressões essenciais'
  },
  {
    id: 'travel',
    name: 'Viagem',
    description: 'Frases para aeroporto e transporte'
  },
  {
    id: 'food',
    name: 'Comida',
    description: 'Pedir comidas e bebidas'
  },
  {
    id: 'shopping',
    name: 'Compras',
    description: 'Comprar e negociar preços'
  },
  {
    id: 'accommodation',
    name: 'Hospedagem',
    description: 'Check-in e dúvidas no hotel'
  },
  {
    id: 'emergency',
    name: 'Emergência',
    description: 'Frases de segurança importantes'
  },
  {
    id: 'business',
    name: 'Negócios',
    description: 'Vocabulário profissional'
  },
  {
    id: 'culture',
    name: 'Cultura',
    description: 'Expressões culturais e idiomáticas'
  },
];

export const PHRASES: Record<string, Record<string, PhraseData[]>> = {
  en: {
    basics: [
      { id: '1', pt: 'Olá', target_text: 'Hello', category_id: 'basics', language_id: 'en' },
      { id: '2', pt: 'Bom dia', target_text: 'Good morning', category_id: 'basics', language_id: 'en' },
      { id: '3', pt: 'Boa tarde', target_text: 'Good afternoon', category_id: 'basics', language_id: 'en' },
      { id: '4', pt: 'Boa noite', target_text: 'Good evening', category_id: 'basics', language_id: 'en' },
      { id: '5', pt: 'Obrigado', target_text: 'Thank you', category_id: 'basics', language_id: 'en' },
      { id: '6', pt: 'De nada', target_text: "You're welcome", category_id: 'basics', language_id: 'en' },
      { id: '7', pt: 'Desculpa', target_text: 'Excuse me', category_id: 'basics', language_id: 'en' },
      { id: '8', pt: 'Por favor', target_text: 'Please', category_id: 'basics', language_id: 'en' },
    ],
    travel: [
      { id: '9', pt: 'Onde é o aeroporto?', target_text: 'Where is the airport?', category_id: 'travel', language_id: 'en' },
      { id: '10', pt: 'Preciso de um táxi', target_text: 'I need a taxi', category_id: 'travel', language_id: 'en' },
      { id: '11', pt: 'Qual é a próxima parada?', target_text: 'What is the next stop?', category_id: 'travel', language_id: 'en' },
      { id: '12', pt: 'Uma passagem para...', target_text: 'A ticket to...', category_id: 'travel', language_id: 'en' },
      { id: '13', pt: 'Quanto custa?', target_text: 'How much does it cost?', category_id: 'travel', language_id: 'en' },
      { id: '14', pt: 'Estou perdido', target_text: "I'm lost", category_id: 'travel', language_id: 'en' },
    ],
    food: [
      { id: '15', pt: 'Qual é o prato especial?', target_text: "What's the special dish?", category_id: 'food', language_id: 'en' },
      { id: '16', pt: 'Uma mesa para dois', target_text: 'A table for two', category_id: 'food', language_id: 'en' },
      { id: '17', pt: 'Estou vegetariano', target_text: "I'm vegetarian", category_id: 'food', language_id: 'en' },
      { id: '18', pt: 'A conta, por favor', target_text: 'The check, please', category_id: 'food', language_id: 'en' },
      { id: '19', pt: 'Delicioso!', target_text: 'Delicious!', category_id: 'food', language_id: 'en' },
      { id: '20', pt: 'Água, por favor', target_text: 'Water, please', category_id: 'food', language_id: 'en' },
    ],
    shopping: [
      { id: '21', pt: 'Quanto custa isto?', target_text: 'How much is this?', category_id: 'shopping', language_id: 'en' },
      { id: '22', pt: 'Você tem tamanho menor?', target_text: 'Do you have a smaller size?', category_id: 'shopping', language_id: 'en' },
      { id: '23', pt: 'Posso devolver?', target_text: 'Can I return it?', category_id: 'shopping', language_id: 'en' },
      { id: '24', pt: 'Qual é o desconto?', target_text: 'What is the discount?', category_id: 'shopping', language_id: 'en' },
      { id: '25', pt: 'Aceita cartão?', target_text: 'Do you accept cards?', category_id: 'shopping', language_id: 'en' },
    ],
    accommodation: [
      { id: '26', pt: 'Tenho uma reserva', target_text: 'I have a reservation', category_id: 'accommodation', language_id: 'en' },
      { id: '27', pt: 'Qual é o meu quarto?', target_text: "What's my room number?", category_id: 'accommodation', language_id: 'en' },
      { id: '28', pt: 'O ar condicionado não funciona', target_text: "The air conditioning doesn't work", category_id: 'accommodation', language_id: 'en' },
      { id: '29', pt: 'Preciso de toalhas', target_text: 'I need towels', category_id: 'accommodation', language_id: 'en' },
      { id: '30', pt: 'Qual é o horário de checkout?', target_text: "What's the checkout time?", category_id: 'accommodation', language_id: 'en' },
    ],
    emergency: [
      { id: '31', pt: 'Preciso de ajuda!', target_text: 'I need help!', category_id: 'emergency', language_id: 'en' },
      { id: '32', pt: 'Chame a polícia', target_text: 'Call the police', category_id: 'emergency', language_id: 'en' },
      { id: '33', pt: 'Preciso de um médico', target_text: 'I need a doctor', category_id: 'emergency', language_id: 'en' },
      { id: '34', pt: 'Hospital', target_text: 'Hospital', category_id: 'emergency', language_id: 'en' },
      { id: '35', pt: 'Perdi meu passaporte', target_text: "I lost my passport", category_id: 'emergency', language_id: 'en' },
    ],
    business: [
      { id: '36', pt: 'Prazer em conhecê-lo', target_text: 'Nice to meet you', category_id: 'business', language_id: 'en' },
      { id: '37', pt: 'Qual é sua profissão?', target_text: 'What do you do?', category_id: 'business', language_id: 'en' },
      { id: '38', pt: 'Vamos assinar o contrato', target_text: "Let's sign the contract", category_id: 'business', language_id: 'en' },
      { id: '39', pt: 'Qual é o prazo?', target_text: 'What is the deadline?', category_id: 'business', language_id: 'en' },
    ],
    culture: [
      { id: '40', pt: 'Como vai?', target_text: "How are you?", category_id: 'culture', language_id: 'en' },
      { id: '41', pt: 'Estou bem, obrigado', target_text: "I'm well, thank you", category_id: 'culture', language_id: 'en' },
      { id: '42', pt: 'Qual é seu nome?', target_text: "What's your name?", category_id: 'culture', language_id: 'en' },
      { id: '43', pt: 'De onde você é?', target_text: 'Where are you from?', category_id: 'culture', language_id: 'en' },
    ],
  },
  es: {
    basics: [
      { id: '1', pt: 'Olá', target_text: 'Hola', category_id: 'basics', language_id: 'es' },
      { id: '2', pt: 'Bom dia', target_text: 'Buenos días', category_id: 'basics', language_id: 'es' },
      { id: '3', pt: 'Boa tarde', target_text: 'Buenas tardes', category_id: 'basics', language_id: 'es' },
      { id: '4', pt: 'Boa noite', target_text: 'Buenas noches', category_id: 'basics', language_id: 'es' },
      { id: '5', pt: 'Obrigado', target_text: 'Gracias', category_id: 'basics', language_id: 'es' },
      { id: '6', pt: 'De nada', target_text: 'De nada', category_id: 'basics', language_id: 'es' },
      { id: '7', pt: 'Desculpa', target_text: 'Disculpa', category_id: 'basics', language_id: 'es' },
      { id: '8', pt: 'Por favor', target_text: 'Por favor', category_id: 'basics', language_id: 'es' },
    ],
    travel: [
      { id: '9', pt: 'Onde é o aeroporto?', target_text: '¿Dónde está el aeropuerto?', category_id: 'travel', language_id: 'es' },
      { id: '10', pt: 'Preciso de um táxi', target_text: 'Necesito un taxi', category_id: 'travel', language_id: 'es' },
      { id: '11', pt: 'Qual é a próxima parada?', target_text: '¿Cuál es la próxima parada?', category_id: 'travel', language_id: 'es' },
      { id: '12', pt: 'Uma passagem para...', target_text: 'Un boleto para...', category_id: 'travel', language_id: 'es' },
      { id: '13', pt: 'Quanto custa?', target_text: '¿Cuánto cuesta?', category_id: 'travel', language_id: 'es' },
      { id: '14', pt: 'Estou perdido', target_text: 'Estoy perdido', category_id: 'travel', language_id: 'es' },
    ],
    food: [
      { id: '15', pt: 'Qual é o prato especial?', target_text: '¿Cuál es el plato especial?', category_id: 'food', language_id: 'es' },
      { id: '16', pt: 'Uma mesa para dois', target_text: 'Una mesa para dos', category_id: 'food', language_id: 'es' },
      { id: '17', pt: 'Estou vegetariano', target_text: 'Soy vegetariano', category_id: 'food', language_id: 'es' },
      { id: '18', pt: 'A conta, por favor', target_text: 'La cuenta, por favor', category_id: 'food', language_id: 'es' },
      { id: '19', pt: 'Delicioso!', target_text: '¡Delicioso!', category_id: 'food', language_id: 'es' },
      { id: '20', pt: 'Água, por favor', target_text: 'Agua, por favor', category_id: 'food', language_id: 'es' },
    ],
    shopping: [
      { id: '21', pt: 'Quanto custa isto?', target_text: '¿Cuánto cuesta esto?', category_id: 'shopping', language_id: 'es' },
      { id: '22', pt: 'Você tem tamanho menor?', target_text: '¿Tiene un tamaño más pequeño?', category_id: 'shopping', language_id: 'es' },
      { id: '23', pt: 'Posso devolver?', target_text: '¿Puedo devolverlo?', category_id: 'shopping', language_id: 'es' },
      { id: '24', pt: 'Qual é o desconto?', target_text: '¿Cuál es el descuento?', category_id: 'shopping', language_id: 'es' },
      { id: '25', pt: 'Aceita cartão?', target_text: '¿Acepta tarjeta?', category_id: 'shopping', language_id: 'es' },
    ],
    accommodation: [
      { id: '26', pt: 'Tenho uma reserva', target_text: 'Tengo una reserva', category_id: 'accommodation', language_id: 'es' },
      { id: '27', pt: 'Qual é o meu quarto?', target_text: '¿Cuál es mi habitación?', category_id: 'accommodation', language_id: 'es' },
      { id: '28', pt: 'O ar condicionado não funciona', target_text: 'El aire acondicionado no funciona', category_id: 'accommodation', language_id: 'es' },
      { id: '29', pt: 'Preciso de toalhas', target_text: 'Necesito toallas', category_id: 'accommodation', language_id: 'es' },
      { id: '30', pt: 'Qual é o horário de checkout?', target_text: '¿Cuál es la hora de salida?', category_id: 'accommodation', language_id: 'es' },
    ],
    emergency: [
      { id: '31', pt: 'Preciso de ajuda!', target_text: '¡Necesito ayuda!', category_id: 'emergency', language_id: 'es' },
      { id: '32', pt: 'Chame a polícia', target_text: 'Llama a la policía', category_id: 'emergency', language_id: 'es' },
      { id: '33', pt: 'Preciso de um médico', target_text: 'Necesito un doctor', category_id: 'emergency', language_id: 'es' },
      { id: '34', pt: 'Hospital', target_text: 'Hospital', category_id: 'emergency', language_id: 'es' },
      { id: '35', pt: 'Perdi meu passaporte', target_text: 'Perdí mi pasaporte', category_id: 'emergency', language_id: 'es' },
    ],
    business: [
      { id: '36', pt: 'Prazer em conhecê-lo', target_text: 'Mucho gusto', category_id: 'business', language_id: 'es' },
      { id: '37', pt: 'Qual é sua profissão?', target_text: '¿A qué te dedicas?', category_id: 'business', language_id: 'es' },
      { id: '38', pt: 'Vamos assinar o contrato', target_text: 'Firmaremos el contrato', category_id: 'business', language_id: 'es' },
      { id: '39', pt: 'Qual é o prazo?', target_text: '¿Cuál es la fecha límite?', category_id: 'business', language_id: 'es' },
    ],
    culture: [
      { id: '40', pt: 'Como vai?', target_text: '¿Cómo estás?', category_id: 'culture', language_id: 'es' },
      { id: '41', pt: 'Estou bem, obrigado', target_text: 'Estoy bien, gracias', category_id: 'culture', language_id: 'es' },
      { id: '42', pt: 'Qual é seu nome?', target_text: '¿Cuál es tu nombre?', category_id: 'culture', language_id: 'es' },
      { id: '43', pt: 'De onde você é?', target_text: '¿De dónde eres?', category_id: 'culture', language_id: 'es' },
    ],
  },
  fr: {
    basics: [
      { id: '1', pt: 'Olá', target_text: 'Bonjour', category_id: 'basics', language_id: 'fr' },
      { id: '2', pt: 'Bom dia', target_text: 'Bon matin', category_id: 'basics', language_id: 'fr' },
      { id: '3', pt: 'Boa tarde', target_text: 'Bon après-midi', category_id: 'basics', language_id: 'fr' },
      { id: '4', pt: 'Boa noite', target_text: 'Bonsoir', category_id: 'basics', language_id: 'fr' },
      { id: '5', pt: 'Obrigado', target_text: 'Merci', category_id: 'basics', language_id: 'fr' },
      { id: '6', pt: 'De nada', target_text: 'De rien', category_id: 'basics', language_id: 'fr' },
      { id: '7', pt: 'Desculpa', target_text: 'Excusez-moi', category_id: 'basics', language_id: 'fr' },
      { id: '8', pt: 'Por favor', target_text: 'S\'il vous plaît', category_id: 'basics', language_id: 'fr' },
    ],
    travel: [
      { id: '9', pt: 'Onde é o aeroporto?', target_text: 'Où est l\'aéroport?', category_id: 'travel', language_id: 'fr' },
      { id: '10', pt: 'Preciso de um táxi', target_text: 'J\'ai besoin d\'un taxi', category_id: 'travel', language_id: 'fr' },
      { id: '11', pt: 'Qual é a próxima parada?', target_text: 'Quel est le prochain arrêt?', category_id: 'travel', language_id: 'fr' },
      { id: '12', pt: 'Uma passagem para...', target_text: 'Un ticket pour...', category_id: 'travel', language_id: 'fr' },
      { id: '13', pt: 'Quanto custa?', target_text: 'Combien ça coûte?', category_id: 'travel', language_id: 'fr' },
      { id: '14', pt: 'Estou perdido', target_text: 'Je suis perdu', category_id: 'travel', language_id: 'fr' },
    ],
    food: [
      { id: '15', pt: 'Qual é o prato especial?', target_text: 'Quel est le plat spécial?', category_id: 'food', language_id: 'fr' },
      { id: '16', pt: 'Uma mesa para dois', target_text: 'Une table pour deux', category_id: 'food', language_id: 'fr' },
      { id: '17', pt: 'Estou vegetariano', target_text: 'Je suis végétarien', category_id: 'food', language_id: 'fr' },
      { id: '18', pt: 'A conta, por favor', target_text: 'L\'addition, s\'il vous plaît', category_id: 'food', language_id: 'fr' },
      { id: '19', pt: 'Delicioso!', target_text: 'Délicieux!', category_id: 'food', language_id: 'fr' },
      { id: '20', pt: 'Água, por favor', target_text: 'De l\'eau, s\'il vous plaît', category_id: 'food', language_id: 'fr' },
    ],
    shopping: [
      { id: '21', pt: 'Quanto custa isto?', target_text: 'Combien coûte ceci?', category_id: 'shopping', language_id: 'fr' },
      { id: '22', pt: 'Você tem tamanho menor?', target_text: 'Avez-vous une taille plus petite?', category_id: 'shopping', language_id: 'fr' },
      { id: '23', pt: 'Posso devolver?', target_text: 'Puis-je le retourner?', category_id: 'shopping', language_id: 'fr' },
      { id: '24', pt: 'Qual é o desconto?', target_text: 'Quel est la remise?', category_id: 'shopping', language_id: 'fr' },
      { id: '25', pt: 'Aceita cartão?', target_text: 'Acceptez-vous les cartes?', category_id: 'shopping', language_id: 'fr' },
    ],
    accommodation: [
      { id: '26', pt: 'Tenho uma reserva', target_text: 'J\'ai une réservation', category_id: 'accommodation', language_id: 'fr' },
      { id: '27', pt: 'Qual é o meu quarto?', target_text: 'Quel est mon numéro de chambre?', category_id: 'accommodation', language_id: 'fr' },
      { id: '28', pt: 'O ar condicionado não funciona', target_text: 'La climatisation ne fonctionne pas', category_id: 'accommodation', language_id: 'fr' },
      { id: '29', pt: 'Preciso de toalhas', target_text: 'J\'ai besoin de serviettes', category_id: 'accommodation', language_id: 'fr' },
      { id: '30', pt: 'Qual é o horário de checkout?', target_text: 'Quelle est l\'heure du départ?', category_id: 'accommodation', language_id: 'fr' },
    ],
    emergency: [
      { id: '31', pt: 'Preciso de ajuda!', target_text: 'J\'ai besoin d\'aide!', category_id: 'emergency', language_id: 'fr' },
      { id: '32', pt: 'Chame a polícia', target_text: 'Appelez la police', category_id: 'emergency', language_id: 'fr' },
      { id: '33', pt: 'Preciso de um médico', target_text: 'J\'ai besoin d\'un médecin', category_id: 'emergency', language_id: 'fr' },
      { id: '34', pt: 'Hospital', target_text: 'Hôpital', category_id: 'emergency', language_id: 'fr' },
      { id: '35', pt: 'Perdi meu passaporte', target_text: 'J\'ai perdu mon passeport', category_id: 'emergency', language_id: 'fr' },
    ],
    business: [
      { id: '36', pt: 'Prazer em conhecê-lo', target_text: 'Enchanté', category_id: 'business', language_id: 'fr' },
      { id: '37', pt: 'Qual é sua profissão?', target_text: 'Que faites-vous?', category_id: 'business', language_id: 'fr' },
      { id: '38', pt: 'Vamos assinar o contrato', target_text: 'Signons le contrat', category_id: 'business', language_id: 'fr' },
      { id: '39', pt: 'Qual é o prazo?', target_text: 'Quel est le délai?', category_id: 'business', language_id: 'fr' },
    ],
    culture: [
      { id: '40', pt: 'Como vai?', target_text: 'Comment allez-vous?', category_id: 'culture', language_id: 'fr' },
      { id: '41', pt: 'Estou bem, obrigado', target_text: 'Je vais bien, merci', category_id: 'culture', language_id: 'fr' },
      { id: '42', pt: 'Qual é seu nome?', target_text: 'Quel est votre nom?', category_id: 'culture', language_id: 'fr' },
      { id: '43', pt: 'De onde você é?', target_text: 'D\'où venez-vous?', category_id: 'culture', language_id: 'fr' },
    ],
  },
};
