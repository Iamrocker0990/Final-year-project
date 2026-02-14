import { Language } from '../types';

// Sentiment Analysis
export const analyzeSentiment = (text: string): 'happy' | 'sad' | 'neutral' => {
  const happyWords = [
    'happy', 'excited', 'great', 'awesome', 'fantastic', 'wonderful', 'amazing', 'excellent', 'love', 'perfect',
    'good', 'nice', 'best', 'brilliant', 'outstanding', 'superb', 'marvelous', 'terrific', 'fabulous', 'incredible',
    // Hindi
    'खुश', 'खुशी', 'अच्छा', 'बेहतरीन', 'शानदार', 'उत्कृष्ट', 'प्रेम', 'पसंद', 'सुंदर', 'मजेदार',
    // French
    'heureux', 'content', 'formidable', 'génial', 'parfait', 'excellent', 'merveilleux', 'fantastique', 'super', 'magnifique'
  ];

  const sadWords = [
    'sad', 'disappointed', 'upset', 'angry', 'frustrated', 'terrible', 'awful', 'bad', 'horrible', 'hate',
    'annoying', 'boring', 'difficult', 'hard', 'problem', 'issue', 'wrong', 'error', 'fail', 'broken',
    // Hindi
    'दुखी', 'परेशान', 'गुस्सा', 'निराश', 'बुरा', 'गलत', 'समस्या', 'मुश्किल', 'कठिन', 'नफरत',
    // French
    'triste', 'déçu', 'fâché', 'frustré', 'terrible', 'mauvais', 'horrible', 'déteste', 'ennuyeux', 'difficile'
  ];

  const lowerText = text.toLowerCase();
  
  const happyScore = happyWords.filter(word => lowerText.includes(word)).length;
  const sadScore = sadWords.filter(word => lowerText.includes(word)).length;

  if (happyScore > sadScore) return 'happy';
  if (sadScore > happyScore) return 'sad';
  return 'neutral';
};

// Response Generation based on sentiment and language
export const generateResponse = async (
  userMessage: string, 
  sentiment: 'happy' | 'sad' | 'neutral', 
  language: Language
): Promise<string> => {
  const responses = {
    en: {
      happy: [
        "That's wonderful to hear! 😊 I'm excited to help you on your learning journey. What specific topic interests you?",
        "I love your enthusiasm! 🌟 Let's find the perfect course to match your energy. What would you like to learn?",
        "Your positive attitude is amazing! ✨ I'm here to help you achieve your learning goals. What can I assist you with?",
        "That's fantastic! 🎉 With that kind of motivation, you'll do great. What subject are you passionate about?"
      ],
      sad: [
        "I understand you might be feeling frustrated. 💙 Don't worry, I'm here to help make learning easier for you. What's bothering you?",
        "I hear you, and I want to help. 🤗 Learning can be challenging, but we'll find a way together. What specific help do you need?",
        "I'm sorry you're having difficulties. 💪 Let's work through this step by step. Can you tell me what you're struggling with?",
        "It's okay to feel overwhelmed sometimes. 🌈 I'm here to support you. What would make your learning experience better?"
      ],
      neutral: [
        "Hello! I'm here to help you with your learning needs. What can I assist you with today?",
        "Hi there! I can help you find courses, answer questions, or guide you through our platform. What would you like to know?",
        "Welcome! I'm your learning assistant. Feel free to ask me about courses, instructors, or anything else you need help with.",
        "Greetings! I'm here to make your learning journey smoother. How can I help you today?"
      ],
      courseHelp: [
        "I can help you find the perfect course! What subject are you interested in? We have courses in Development, Design, Marketing, Data Science, and Business.",
        "Great question! Our courses are designed by industry experts and include hands-on projects. What level are you looking for - Beginner, Intermediate, or Advanced?",
        "We offer courses with lifetime access, certificates of completion, and expert support. Which category interests you most?",
        "Our platform has courses for every skill level. Would you like me to recommend some popular courses based on your interests?"
      ]
    },
    hi: {
      happy: [
        "यह सुनकर बहुत खुशी हुई! 😊 मैं आपकी शिक्षा यात्रा में मदद करने के लिए उत्साहित हूं। कौन सा विषय आपको रुचिकर लगता है?",
        "आपका उत्साह बहुत अच्छा है! 🌟 आइए आपकी ऊर्जा के अनुकूल सही कोर्स खोजते हैं। आप क्या सीखना चाहते हैं?",
        "आपका सकारात्मक दृष्टिकोण अद्भुत है! ✨ मैं आपके शिक्षा लक्ष्यों को पूरा करने में मदद करने के लिए यहां हूं। मैं आपकी कैसे सहायता कर सकता हूं?",
        "यह शानदार है! 🎉 इस तरह की प्रेरणा के साथ, आप बहुत अच्छा करेंगे। आप किस विषय के बारे में जानना चाहते हैं?"
      ],
      sad: [
        "मैं समझता हूं कि आप परेशान महसूस कर रहे होंगे। 💙 चिंता न करें, मैं आपके लिए सीखना आसान बनाने के लिए यहां हूं। आपको क्या परेशान कर रहा है?",
        "मैं आपकी बात समझता हूं, और मैं मदद करना चाहता हूं। 🤗 सीखना चुनौतीपूर्ण हो सकता है, लेकिन हम मिलकर एक रास्ता खोजेंगे। आपको किस तरह की मदद चाहिए?",
        "मुझे खुशी है कि आप कठिनाइयों का सामना कर रहे हैं। 💪 आइए इसे कदम दर कदम हल करते हैं। क्या आप बता सकते हैं कि आप किस चीज़ से परेशान हैं?",
        "कभी-कभी भारी महसूस करना सामान्य है। 🌈 मैं आपका साथ देने के लिए यहां हूं। आपके शिक्षा अनुभव को बेहतर बनाने के लिए क्या करना होगा?"
      ],
      neutral: [
        "नमस्ते! मैं आपकी शिक्षा संबंधी ज़रूरतों में मदद करने के लिए यहां हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
        "हैलो! मैं आपको कोर्स खोजने, सवालों के जवाब देने, या हमारे प्लेटफॉर्म के माध्यम से मार्गदर्शन करने में मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
        "स्वागत है! मैं आपका शिक्षा सहायक हूं। कोर्स, प्रशिक्षकों या किसी और चीज़ के बारे में मुझसे पूछने में संकोच न करें जिसमें आपको मदद की ज़रूरत है।",
        "नमस्कार! मैं आपकी शिक्षा यात्रा को आसान बनाने के लिए यहां हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
      ],
      courseHelp: [
        "मैं आपको सही कोर्स खोजने में मदद कर सकता हूं! आप किस विषय में रुचि रखते हैं? हमारे पास डेवलपमेंट, डिजाइन, मार्केटिंग, डेटा साइंस और बिजनेस के कोर्स हैं।",
        "बहुत अच्छा सवाल! हमारे कोर्स उद्योग विशेषज्ञों द्वारा डिजाइन किए गए हैं और इसमें व्यावहारिक प्रोजेक्ट शामिल हैं। आप किस स्तर की तलाश कर रहे हैं - शुरुआती, मध्यम, या उन्नत?",
        "हम जीवनभर पहुंच, पूर्णता प्रमाणपत्र और विशेषज्ञ सहायता के साथ कोर्स प्रदान करते हैं। कौन सी श्रेणी आपको सबसे दिलचस्प लगती है?",
        "हमारे प्लेटफॉर्म में हर कौशल स्तर के लिए कोर्स हैं। क्या आप चाहते हैं कि मैं आपकी रुचियों के आधार पर कुछ लोकप्रिय कोर्स की सिफारिश करूं?"
      ]
    },
    fr: {
      happy: [
        "C'est merveilleux à entendre ! 😊 Je suis ravi de vous aider dans votre parcours d'apprentissage. Quel sujet vous intéresse ?",
        "J'adore votre enthousiasme ! 🌟 Trouvons le cours parfait qui correspond à votre énergie. Qu'aimeriez-vous apprendre ?",
        "Votre attitude positive est incroyable ! ✨ Je suis là pour vous aider à atteindre vos objectifs d'apprentissage. Comment puis-je vous aider ?",
        "C'est fantastique ! 🎉 Avec ce genre de motivation, vous allez très bien vous en sortir. Quel sujet vous passionne ?"
      ],
      sad: [
        "Je comprends que vous puissiez vous sentir frustré. 💙 Ne vous inquiétez pas, je suis là pour rendre l'apprentissage plus facile pour vous. Qu'est-ce qui vous dérange ?",
        "Je vous entends, et je veux vous aider. 🤗 L'apprentissage peut être difficile, mais nous trouverons un moyen ensemble. De quelle aide spécifique avez-vous besoin ?",
        "Je suis désolé que vous ayez des difficultés. 💪 Travaillons ensemble étape par étape. Pouvez-vous me dire avec quoi vous avez du mal ?",
        "Il est normal de se sentir dépassé parfois. 🌈 Je suis là pour vous soutenir. Qu'est-ce qui rendrait votre expérience d'apprentissage meilleure ?"
      ],
      neutral: [
        "Bonjour ! Je suis là pour vous aider avec vos besoins d'apprentissage. Comment puis-je vous aider aujourd'hui ?",
        "Salut ! Je peux vous aider à trouver des cours, répondre aux questions, ou vous guider à travers notre plateforme. Que voulez-vous savoir ?",
        "Bienvenue ! Je suis votre assistant d'apprentissage. N'hésitez pas à me poser des questions sur les cours, les instructeurs, ou tout ce dont vous avez besoin.",
        "Salutations ! Je suis là pour rendre votre parcours d'apprentissage plus fluide. Comment puis-je vous aider aujourd'hui ?"
      ],
      courseHelp: [
        "Je peux vous aider à trouver le cours parfait ! Quel sujet vous intéresse ? Nous avons des cours en Développement, Design, Marketing, Science des Données et Business.",
        "Excellente question ! Nos cours sont conçus par des experts de l'industrie et incluent des projets pratiques. Quel niveau recherchez-vous - Débutant, Intermédiaire ou Avancé ?",
        "Nous offrons des cours avec accès à vie, certificats de completion et support d'experts. Quelle catégorie vous intéresse le plus ?",
        "Notre plateforme a des cours pour tous les niveaux de compétence. Voulez-vous que je recommande quelques cours populaires basés sur vos intérêts ?"
      ]
    }
  };

  // Detect if user is asking about courses
  const courseKeywords = ['course', 'learn', 'study', 'class', 'tutorial', 'कोर्स', 'सीखना', 'पढ़ाई', 'cours', 'apprendre', 'étudier'];
  const isAskingAboutCourses = courseKeywords.some(keyword => 
    userMessage.toLowerCase().includes(keyword)
  );

  if (isAskingAboutCourses) {
    const courseResponses = responses[language].courseHelp;
    return courseResponses[Math.floor(Math.random() * courseResponses.length)];
  }

  const sentimentResponses = responses[language][sentiment];
  return sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)];
};

export const getLanguageName = (language: Language): string => {
  const names = {
    en: 'English',
    hi: 'हिंदी',
    fr: 'Français'
  };
  return names[language];
};