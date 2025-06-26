import React, { useState, useEffect, useRef } from 'react';

// Language data for basic translation
// Add more languages and their translations here as needed.
// Ensure all text strings used in the components have a corresponding translation.
const translations = {
  en: {
    websiteTitle: "Multilingual Medical Assistant",
    tagline: "Your Personal Health Companion, In Any Language.",
    welcome: "Welcome to Multilingual Medical Assistant, your innovative multilingual medical assistant. We're here to provide you with instant, reliable health guidance, tailored to your needs and accessible in your preferred language.",
    symptomEntryTitle: "Effortless Symptom Entry",
    symptomEntryText1: "Whether you prefer typing out your symptoms or speaking them aloud, our assistant makes it simple. Just describe what you're feeling, and our intelligent system will begin to understand your health concerns.",
    symptomEntryText2: "Our intuitive interface supports both text input and advanced voice recognition, ensuring a comfortable and efficient experience for everyone.",
    multilingualTitle: "Understand and Be Understood, Globally",
    multilingualText1: "Language should never be a barrier to health. This assistant is designed to be truly multilingual, allowing you to interact in virtually any language you choose. Our system processes your input and provides responses in the language you understand best.",
    multilingualText2: "This feature ensures that people from all linguistic backgrounds can access vital health information without confusion or delay.",
    healthInsightsTitle: "Holistic Health Guidance",
    healthInsightsText1: "Once your symptoms are understood, our assistant provides a comprehensive overview of potential health issues, along with diverse approaches to care. You'll receive details on:",
    homeRemedies: "Home Remedies:",
    ayurvedicApproaches: "Ayurvedic Approaches:",
    modernMedicine: "Modern Medicine Details:",
    healthInsightsText2: "Our aim is to empower you with knowledge, helping you make informed decisions about your health.",
    callToActionTitle: "Ready to Experience Smarter Health Assistance?",
    callToActionText: "Start your journey towards better health understanding with Multilingual Medical Assistant today. It's simple, intuitive, and always here for you.",
    getStartedButton: "Get Started Now",
    footerDisclaimer: "Disclaimer: This website provides general health information and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for any health concerns.",
    assistantPageTitle: "Let's Get Started!",
    assistantPageSubtitle: "Please provide your details and symptoms to help us assist you better.",
    nameLabel: "Your Name:",
    ageLabel: "Your Age:",
    symptomsLabel: "Describe your Symptoms:",
    voiceInputButton: "Start Voice Input",
    submitButton: "Submit Details",
    selectLanguage: "Select Language:",
    coolPictureAlt: "A calming and futuristic medical illustration",
    voiceInputPlaceholder: "Speak your symptoms...",
    voiceInputNotSupported: "Voice input is not supported in this browser.",
    processingVoice: "Processing voice input...",
    voiceInputReady: "Voice input ready.",
    voiceInputError: "Voice input error. Please try again.",
    voiceInputStopped: "Voice input stopped.",
    detailsSubmitted: "Details submitted! We are processing your request.",
    resultsPageTitle: "Your Health Insights",
    resultsPageSubtitle: "Here's some information based on your symptoms:",
    homeRemediesSection: "Home Remedies",
    ayurvedicMedicinesSection: "Ayurvedic Approaches",
    modernMedicinesSection: "Modern Medicines",
    moreSuggestionsSection: "More Suggestions",
    speakButton: "Speak",
    backToAssistant: "Back to Input",
    remediesContent: (symptoms) => `For your symptoms like "${symptoms}", consider these home remedies: rest, drink plenty of fluids, and consume warm broths.`,
    ayurvedicContent: (symptoms) => `Ayurvedic suggestions for "${symptoms}" include herbal teas like ginger-tulsi, light and easily digestible meals, and practicing meditation.`,
    modernContent: (symptoms) => `Modern medicine approach for "${symptoms}" might involve over-the-counter pain relievers if applicable, and consulting a doctor for proper diagnosis and treatment.`,
    suggestionsContent: (symptoms) => `Based on your symptoms "${symptoms}": Expect recovery in 3-5 days for mild cases. Keep well hydrated (2-3 liters water daily). Eat light, nutritious food like fruits and vegetables. Avoid oily and spicy food. If symptoms worsen, seek medical attention immediately.`,
  },
  hi: {
    websiteTitle: "बहुभाषी चिकित्सा सहायक",
    tagline: "आपका व्यक्तिगत स्वास्थ्य साथी, किसी भी भाषा में।",
    welcome: "बहुभाषी चिकित्सा सहायक में आपका स्वागत है, आपका अभिनव बहुभाषी चिकित्सा सहायक। हम आपकी स्वास्थ्य संबंधी सहायता प्रदान करने के लिए यहां हैं, जो आपकी आवश्यकताओं के अनुरूप है और आपकी पसंदीदा भाषा में उपलब्ध है।",
    symptomEntryTitle: "आसान लक्षण प्रविष्टि",
    symptomEntryText1: "चाहे आप अपने लक्षणों को टाइप करना पसंद करते हों या उन्हें बोलकर बताना, हमारा सहायक इसे सरल बनाता है। बस बताएं कि आप कैसा महसूस कर रहे हैं, और हमारी बुद्धिमान प्रणाली आपकी स्वास्थ्य संबंधी चिंताओं को समझना शुरू कर देगी।",
    symptomEntryText2: "हमारा सहज इंटरफ़ेस टेक्स्ट इनपुट और उन्नत आवाज पहचान दोनों का समर्थन करता है, जो सभी के लिए एक आरामदायक और कुशल अनुभव सुनिश्चित करता है।",
    multilingualTitle: "समझें और समझे जाएं, विश्व स्तर पर",
    multilingualText1: "भाषा स्वास्थ्य के लिए कभी बाधा नहीं होनी चाहिए। यह सहायक वास्तव में बहुभाषी होने के लिए डिज़ाइन किया गया है, जिससे आप अपनी पसंद की किसी भी भाषा में बातचीत कर सकते हैं। हमारा सिस्टम आपके इनपुट को संसाधित करता है और आपकी सबसे अच्छी समझ वाली भाषा में प्रतिक्रियाएं प्रदान करता है।",
    multilingualText2: "यह सुविधा सुनिश्चित करती है कि सभी भाषाई पृष्ठभूमि के लोग बिना किसी भ्रम या देरी के महत्वपूर्ण स्वास्थ्य जानकारी तक पहुंच सकें।",
    healthInsightsTitle: "समग्र स्वास्थ्य मार्गदर्शन",
    healthInsightsText1: "एक बार जब आपके लक्षणों को समझ लिया जाता है, तो हमारा सहायक संभावित स्वास्थ्य समस्याओं का एक व्यापक अवलोकन प्रदान करता है, साथ ही देखभाल के विभिन्न दृष्टिकोण भी। आपको विवरण प्राप्त होगा:",
    homeRemedies: "घरेलू उपचार:",
    ayurvedicApproaches: "आयुर्वेदिक दृष्टिकोण:",
    modernMedicine: "आधुनिक चिकित्सा विवरण:",
    healthInsightsText2: "हमारा लक्ष्य आपको ज्ञान के साथ सशक्त बनाना है, जिससे आपको अपने स्वास्थ्य के बारे में सूचित निर्णय लेने में मदद मिल सके।",
    callToActionTitle: "स्मार्ट स्वास्थ्य सहायता का अनुभव करने के लिए तैयार हैं?",
    callToActionText: "आज ही बहुभाषी चिकित्सा सहायक के साथ बेहतर स्वास्थ्य समझ की दिशा में अपनी यात्रा शुरू करें। यह सरल, सहज और हमेशा आपके लिए यहां है।",
    getStartedButton: "अभी शुरू करें",
    footerDisclaimer: "अस्वीकरण: यह वेबसाइट सामान्य स्वास्थ्य जानकारी प्रदान करती है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। किसी भी स्वास्थ्य संबंधी चिंता के लिए हमेशा एक योग्य स्वास्थ्य सेवा प्रदाता से परामर्श करें।",
    assistantPageTitle: "आइए शुरू करें!",
    assistantPageSubtitle: "कृपया हमें आपकी बेहतर सहायता करने के लिए अपने विवरण और लक्षण प्रदान करें।",
    nameLabel: "आपका नाम:",
    ageLabel: "आपकी आयु:",
    symptomsLabel: "अपने लक्षणों का वर्णन करें:",
    voiceInputButton: "वॉयस इनपुट शुरू करें",
    submitButton: "विवरण जमा करें",
    selectLanguage: "भाषा चुनें:",
    coolPictureAlt: "एक शांत और भविष्यवादी चिकित्सा चित्रण",
    voiceInputPlaceholder: "अपने लक्षण बोलें...",
    voiceInputNotSupported: "इस ब्राउज़र में वॉयस इनपुट समर्थित नहीं है।",
    processingVoice: "वॉयस इनपुट संसाधित किया जा रहा है...",
    voiceInputReady: "वॉयस इनपुट तैयार है।",
    voiceInputError: "वॉयस इनपुट त्रुटि। कृपया पुनः प्रयास करें।",
    voiceInputStopped: "वॉयस इनपुट बंद हो गया।",
    detailsSubmitted: "विवरण जमा किए गए! हम आपके अनुरोध को संसाधित कर रहे हैं।",
    resultsPageTitle: "आपकी स्वास्थ्य अंतर्दृष्टि",
    resultsPageSubtitle: "आपके लक्षणों के आधार पर कुछ जानकारी यहाँ दी गई है:",
    homeRemediesSection: "घरेलू उपचार",
    ayurvedicMedicinesSection: "आयुर्वेदिक दृष्टिकोण",
    modernMedicinesSection: "आधुनिक दवाएं",
    moreSuggestionsSection: "अधिक सुझाव",
    speakButton: "बोलें",
    backToAssistant: "इनपुट पर वापस",
    remediesContent: (symptoms) => `आपके लक्षणों जैसे "${symptoms}" के लिए, इन घरेलू उपचारों पर विचार करें: आराम करें, खूब सारे तरल पदार्थ पिएं, और गर्म सूप का सेवन करें।`,
    ayurvedicContent: (symptoms) => `"${symptoms}" के लिए आयुर्वेदिक सुझावों में अदरक-तुलसी जैसी हर्बल चाय, हल्का और आसानी से पचने वाला भोजन, और ध्यान का अभ्यास शामिल है।`,
    modernContent: (symptoms) => `"${symptoms}" के लिए आधुनिक चिकित्सा दृष्टिकोण में यदि लागू हो तो ओवर-द-काउंटर दर्द निवारक शामिल हो सकते हैं, और उचित निदान और उपचार के लिए डॉक्टर से परामर्श करना।`,
    suggestionsContent: (symptoms) => `आपके लक्षणों "${symptoms}" के आधार पर: हल्के मामलों के लिए 3-5 दिनों में ठीक होने की उम्मीद करें। खूब पानी पिएं (प्रतिदिन 2-3 लीटर पानी)। फल और सब्जियों जैसे हल्के, पौष्टिक भोजन खाएं। तैलीय और मसालेदार भोजन से बचें। यदि लक्षण बिगड़ते हैं, तो तुरंत चिकित्सा सहायता लें।`,
  },
  es: {
    websiteTitle: "Asistente Médico Multilingüe",
    tagline: "Tu Compañero de Salud Personal, En Cualquier Idioma.",
    welcome: "Bienvenido a Asistente Médico Multilingüe, tu innovador asistente médico multilingüe. Estamos aquí para brindarte orientación de salud instantánea y confiable, adaptada a tus necesidades y accesible en tu idioma preferido.",
    symptomEntryTitle: "Entrada de Síntomas Sin Esfuerzo",
    symptomEntryText1: "Ya sea que prefieras escribir tus síntomas o decirlos en voz alta, nuestro asistente lo hace simple. Simplemente describe lo que sientes y nuestro sistema inteligente comenzará a comprender tus problemas de salud.",
    symptomEntryText2: "Nuestra interfaz intuitiva es compatible con la entrada de texto y el reconocimiento de voz avanzado, lo que garantiza una experiencia cómoda y eficiente para todos.",
    multilingualTitle: "Comprende y Sé Comprendido, Globalmente",
    multilingualText1: "El idioma nunca debe ser una barrera para la salud. Este asistente está diseñado para ser verdaderamente multilingüe, permitiéndote interactuar en prácticamente cualquier idioma que elijas. Nuestro sistema procesa tu entrada y proporciona respuestas en el idioma que mejor entiendas.",
    multilingualText2: "Esta característica asegura que personas de todos los orígenes lingüísticos puedan acceder a información de salud vital sin confusión ni demora.",
    healthInsightsTitle: "Orientación Integral de Salud",
    healthInsightsText1: "Una vez que se comprenden tus síntomas, nuestro asistente proporciona una descripción general completa de posibles problemas de salud, junto con diversos enfoques de atención. Recibirás detalles sobre:",
    homeRemedies: "Remedios Caseros:",
    ayurvedicApproaches: "Enfoques Ayurvédicos:",
    modernMedicine: "Detalles de Medicina Moderna:",
    healthInsightsText2: "Nuestro objetivo es empoderarte con conocimiento, ayudándote a tomar decisiones informadas sobre tu salud.",
    callToActionTitle: "¿Listo para Experimentar una Asistencia de Salud Más Inteligente?",
    callToActionText: "Comienza tu viaje hacia una mejor comprensión de la salud con Asistente Médico Multilingüe hoy. Es simple, intuitivo y siempre está aquí para ti.",
    getStartedButton: "Empezar Ahora",
    footerDisclaimer: "Descargo de responsabilidad: Este sitio web proporciona información general de salud y no sustituye el consejo médico profesional. Siempre consulta con un proveedor de atención médica calificado para cualquier problema de salud.",
    assistantPageTitle: "¡Comencemos!",
    assistantPageSubtitle: "Por favor, proporciona tus detalles y síntomas para ayudarnos a asistirte mejor.",
    nameLabel: "Tu Nombre:",
    ageLabel: "Tu Edad:",
    symptomsLabel: "Describe tus Síntomas:",
    voiceInputButton: "Iniciar Entrada de Voz",
    submitButton: "Enviar Detalles",
    selectLanguage: "Seleccionar Idioma:",
    coolPictureAlt: "Una ilustración médica relajante y futurista",
    voiceInputPlaceholder: "Di tus síntomas...",
    voiceInputNotSupported: "La entrada de voz no es compatible con este navegador.",
    processingVoice: "Procesando entrada de voz...",
    voiceInputReady: "Entrada de voz lista.",
    voiceInputError: "Error de entrada de voz. Por favor, inténtalo de nuevo.",
    voiceInputStopped: "Entrada de voz detenida.",
    detailsSubmitted: "¡Detalles enviados! Estamos procesando tu solicitud.",
    resultsPageTitle: "Tus Perspectivas de Salud",
    resultsPageSubtitle: "Aquí hay información basada en tus síntomas:",
    homeRemediesSection: "Remedios Caseros",
    ayurvedicMedicinesSection: "Enfoques Ayurvédicos",
    modernMedicinesSection: "Medicinas Modernas",
    moreSuggestionsSection: "Más Sugerencias",
    speakButton: "Hablar",
    backToAssistant: "Volver a Entrada",
    remediesContent: (symptoms) => `Para tus síntomas como "${symptoms}", considera estos remedios caseros: descansa, bebe muchos líquidos y consume caldos calientes.`,
    ayurvedicContent: (symptoms) => `Las sugerencias ayurvédicas para "${symptoms}" incluyen tés de hierbas como jengibre-tulsi, comidas ligeras y de fácil digestión, y practicar la meditación.`,
    modernContent: (symptoms) => `El enfoque de la medicina moderna para "${symptoms}" podría implicar analgésicos de venta libre si aplica, y consultar a un médico para un diagnóstico y tratamiento adecuados.`,
    suggestionsContent: (symptoms) => `Basado en tus síntomas "${symptoms}": Espera una recuperación en 3-5 días para casos leves. Mantente bien hidratado (2-3 litros de agua al día). Come alimentos ligeros y nutritivos como frutas y verduras. Evita los alimentos grasos y picantes. Si los síntomas empeoran, busca atención médica de inmediato.`,
  },
  te: { // Telugu
    websiteTitle: "బహుభాషా వైద్య సహాయకుడు",
    tagline: "మీ వ్యక్తిగత ఆరోగ్య సహాయకుడు, ఏ భాషలోనైనా.",
    welcome: "బహుభాషా వైద్య సహాయకుడు కు స్వాగతం, మీ నూతన బహుభాషా వైద్య సహాయకుడు. మీ ఆరోగ్యానికి సంబంధించిన తక్షణ, నమ్మకమైన మార్గదర్శకత్వం అందించడానికి మేము ఇక్కడ ఉన్నాము, మీ అవసరాలకు అనుగుణంగా మరియు మీకు నచ్చిన భాషలో అందుబాటులో ఉంటుంది.",
    symptomEntryTitle: "సులభమైన లక్షణాల నమోదు",
    symptomEntryText1: "మీరు మీ లక్షణాలను టైప్ చేయాలనుకున్నా లేదా వాటిని గట్టిగా చెప్పాలనుకున్నా, మా సహాయకుడు దానిని సులభతరం చేస్తుంది. మీరు ఎలా భావిస్తున్నారో వివరించండి, మరియు మా తెలివైన వ్యవస్థ మీ ఆరోగ్య సమస్యలను అర్థం చేసుకోవడం ప్రారంభిస్తుంది.",
    symptomEntryText2: "మా సహజమైన ఇంటర్‌ఫేస్ టెక్స్ట్ ఇన్‌పుట్ మరియు అధునాతన వాయిస్ రికగ్నిషన్ రెండింటినీ సపోర్ట్ చేస్తుంది, అందరికీ సౌకర్యవంతమైన మరియు సమర్థవంతమైన అనుభవాన్ని అందిస్తుంది.",
    multilingualTitle: "అర్థం చేసుకోండి మరియు ప్రపంచవ్యాప్తంగా అర్థం చేసుకోండి",
    multilingualText1: "ఆరోగ్యానికి భాష ఎప్పుడూ అడ్డంకి కాకూడదు. ఈ సహాయకుడు నిజంగా బహుభాషాగా రూపొందించబడింది, ఇది మీకు నచ్చిన దాదాపు ఏ భాషలోనైనా సంభాషించడానికి అనుమతిస్తుంది. మా సిస్టమ్ మీ ఇన్‌పుట్‌ను ప్రాసెస్ చేస్తుంది మరియు మీకు బాగా అర్థమయ్యే భాషలో ప్రతిస్పందనలను అందిస్తుంది.",
    multilingualText2: "ఈ ఫీచర్ అన్ని భాషా నేపథ్యాల ప్రజలు గందరగోళం లేదా ఆలస్యం లేకుండా కీలక ఆరోగ్య సమాచారాన్ని యాక్సెస్ చేయగలరని నిర్ధారిస్తుంది.",
    healthInsightsTitle: "సమగ్ర ఆరోగ్య మార్గదర్శకత్వం",
    healthInsightsText1: "మీ లక్షణాలు అర్థం చేసుకున్న తర్వాత, మా సహాయకుడు సంభావ్య ఆరోగ్య సమస్యల యొక్క సమగ్ర అవలోకనాన్ని అందిస్తుంది, అలాగే సంరక్షణకు వివిధ విధానాలను కూడా అందిస్తుంది. మీకు వివరాలు లభిస్తాయి:",
    homeRemedies: "గృహ చిట్కాలు:",
    ayurvedicApproaches: "ఆయుర్వేద విధానాలు:",
    modernMedicine: "ఆధునిక వైద్య వివరాలు:",
    healthInsightsText2: "మా లక్ష్యం మీకు జ్ఞానంతో శక్తినివ్వడం, మీ ఆరోగ్యం గురించి సమాచార నిర్ణయాలు తీసుకోవడంలో మీకు సహాయపడటం.",
    callToActionTitle: "స్మార్ట్ ఆరోగ్య సహాయాన్ని అనుభవించడానికి సిద్ధంగా ఉన్నారా?",
    callToActionText: "ఈరోజే బహుభాషా వైద్య సహాయకుడు తో మెరుగైన ఆరోగ్య అవగాహన వైపు మీ ప్రయాణాన్ని ప్రారంభించండి. ఇది సులభం, సహజమైనది మరియు ఎల్లప్పుడూ మీ కోసం ఇక్కడ ఉంది.",
    getStartedButton: "ఇప్పుడే ప్రారంభించండి",
    footerDisclaimer: "నిరాకరణ: ఈ వెబ్‌సైట్ సాధారణ ఆరోగ్య సమాచారాన్ని అందిస్తుంది మరియు వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. ఏదైనా ఆరోగ్య సమస్యల కోసం ఎల్లప్పుడూ అర్హత కలిగిన ఆరోగ్య సంరక్షణ ప్రదాతతో సంప్రదించండి.",
    assistantPageTitle: "మనం ప్రారంభిద్దాం!",
    assistantPageSubtitle: "దయచేసి మాకు మీకు మెరుగైన సహాయం చేయడానికి మీ వివరాలను మరియు లక్షణాలను అందించండి.",
    nameLabel: "మీ పేరు:",
    ageLabel: "మీ వయస్సు:",
    symptomsLabel: "మీ లక్షణాలను వివరించండి:",
    voiceInputButton: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
    submitButton: "వివరాలను సమర్పించండి",
    selectLanguage: "భాషను ఎంచుకోండి:",
    coolPictureAlt: "ఒక ప్రశాంతమైన మరియు భవిష్యత్ వైద్య దృష్టాంతం",
    voiceInputPlaceholder: "మీ లక్షణాలు చెప్పండి...",
    voiceInputNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ మద్దతు లేదు.",
    processingVoice: "వాయిస్ ఇన్‌పుట్ ప్రాసెస్ అవుతోంది...",
    voiceInputReady: "వాయిస్ ఇన్‌పుట్ సిద్ధంగా ఉంది.",
    voiceInputError: "వాయిస్ ఇన్‌పుట్ లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
    voiceInputStopped: "వాయిస్ ఇన్‌పుట్ ఆగిపోయింది.",
    detailsSubmitted: "వివరాలు సమర్పించబడ్డాయి! మేము మీ అభ్యర్థనను ప్రాసెస్ చేస్తున్నాము.",
    resultsPageTitle: "మీ ఆరోగ్య అంతర్దృష్టులు",
    resultsPageSubtitle: "మీ లక్షణాల ఆధారంగా కొన్ని సమాచారం ఇక్కడ ఉంది:",
    homeRemediesSection: "గృహ చిట్కాలు",
    ayurvedicMedicinesSection: "ఆయుర్వేద విధానాలు",
    modernMedicinesSection: "ఆధునిక మందులు",
    moreSuggestionsSection: "మరిన్ని సూచనలు",
    speakButton: "మాట్లాడండి",
    backToAssistant: "ఇన్‌పుట్‌కు తిరిగి వెళ్ళు",
    remediesContent: (symptoms) => `మీ లక్షణాలైన "${symptoms}" కోసం, ఈ గృహ చిట్కాలను పరిగణించండి: విశ్రాంతి తీసుకోండి, పుష్కలంగా ద్రవాలు త్రాగండి మరియు వెచ్చని సూప్‌లను తీసుకోండి.`,
    ayurvedicContent: (symptoms) => `"${symptoms}" కోసం ఆయుర్వేద సూచనలలో అల్లం-తులసి వంటి మూలికా టీలు, తేలికపాటి మరియు సులభంగా జీర్ణమయ్యే భోజనం, మరియు ధ్యానం చేయడం ఉన్నాయి.`,
    modernContent: (symptoms) => `"${symptoms}" కోసం ఆధునిక వైద్య విధానంలో వర్తిస్తే ఓవర్-ది-కౌంటర్ నొప్పి నివారణలు, మరియు సరైన నిర్ధారణ మరియు చికిత్స కోసం వైద్యుడిని సంప్రదించడం వంటివి ఉండవచ్చు.`,
    suggestionsContent: (symptoms) => `మీ లక్షణాలైన "${symptoms}" ఆధారంగా: తేలికపాటి కేసులకు 3-5 రోజుల్లో కోలుకోవచ్చు. బాగా హైడ్రేటెడ్‌గా ఉండండి (రోజుకు 2-3 లీటర్ల నీరు). పండ్లు మరియు కూరగాయలు వంటి తేలికపాటి, పోషకమైన ఆహారాన్ని తినండి. నూనె మరియు కారంగా ఉండే ఆహారాన్ని నివారించండి. లక్షణాలు తీవ్రమైతే, వెంటనే వైద్య సహాయం తీసుకోండి.`,
  },
  ta: { // Tamil
    websiteTitle: "பல்மொழி மருத்துவ உதவியாளர்",
    tagline: "உங்கள் தனிப்பட்ட சுகாதார துணை, எந்த மொழியிலும்.",
    welcome: "பல்மொழி மருத்துவ உதவியாளர்-க்கு வரவேற்கிறோம், உங்கள் புதுமையான பல்மொழி மருத்துவ உதவியாளர். உங்கள் ஆரோக்கியம் தொடர்பான உடனடி, நம்பகமான வழிகாட்டுதலை வழங்க நாங்கள் இங்குள்ளோம், உங்கள் தேவைகளுக்கு ஏற்பவும், நீங்கள் விரும்பும் மொழியிலும் அணுகலாம்.",
    symptomEntryTitle: "எளிதான அறிகுறிகள் உள்ளீடு",
    symptomEntryText1: "உங்கள் அறிகுறிகளை தட்டச்சு செய்ய விரும்பினாலும் அல்லது சத்தமாக பேச விரும்பினாலும், எங்கள் உதவியாளர் அதை எளிதாக்குகிறது. நீங்கள் எப்படி உணர்கிறீர்கள் என்பதை விவரிக்கவும், எங்கள் அறிவார்ந்த அமைப்பு உங்கள் உடல்நலக் கவலைகளைப் புரிந்துகொள்ளத் தொடங்கும்.",
    symptomEntryText2: "எங்கள் உள்ளுணர்வு இடைமுகம் உரை உள்ளீடு மற்றும் மேம்பட்ட குரல் அங்கீகாரம் இரண்டையும் ஆதரிக்கிறது, அனைவருக்கும் வசதியான மற்றும் திறமையான அனுபவத்தை உறுதி செய்கிறது.",
    multilingualTitle: "புரிந்துகொள்ளுங்கள் மற்றும் உலகளவில் புரிந்துகொள்ளப்படுங்கள்",
    multilingualText1: "மொழி ஒருபோதும் ஆரோக்கியத்திற்கு தடையாக இருக்கக்கூடாது. இந்த உதவியாளர் உண்மையாகவே பல்மொழியாக வடிவமைக்கப்பட்டுள்ளது, நீங்கள் விரும்பும் எந்த மொழியிலும் தொடர்பு கொள்ள அனுமதிக்கிறது. எங்கள் அமைப்பு உங்கள் உள்ளீட்டைச் செயலாக்குகிறது மற்றும் நீங்கள் நன்கு புரிந்துகொள்ளும் மொழியில் பதில்களை வழங்குகிறது.",
    multilingualText2: "இந்த அம்சம் அனைத்து மொழி பின்னணியில் உள்ளவர்களும் குழப்பம் அல்லது தாமதம் இல்லாமல் முக்கிய சுகாதார தகவல்களை அணுக முடியும் என்பதை உறுதி செய்கிறது.",
    healthInsightsTitle: "முழுமையான சுகாதார வழிகாட்டுதல்",
    healthInsightsText1: "உங்கள் அறிகுறிகள் புரிந்துகொள்ளப்பட்டவுடன், எங்கள் உதவியாளர் சாத்தியமான உடல்நலப் பிரச்சினைகள் பற்றிய விரிவான கண்ணோட்டத்தை வழங்குகிறது, அத்துடன் பல்வேறு பராமரிப்பு அணுகுமுறைகளையும் வழங்குகிறது. நீங்கள் விவரங்களைப் பெறுவீர்கள்:",
    homeRemedies: "வீட்டு வைத்தியம்:",
    ayurvedicApproaches: "ஆயுர்வேத அணுகுமுறைகள்:",
    modernMedicine: "நவீன மருத்துவ விவரங்கள்:",
    healthInsightsText2: "உங்கள் ஆரோக்கியம் குறித்து தகவலறிந்த முடிவுகளை எடுக்க உங்களுக்கு அறிவுசார்ந்த அதிகாரத்தை வழங்குவதே எங்கள் நோக்கம்.",
    callToActionTitle: "ஸ்மார்ட் சுகாதார உதவியை அனுபவிக்க தயாரா?",
    callToActionText: "இன்றே பல்மொழி மருத்துவ உதவியாளர் உடன் சிறந்த சுகாதார புரிதலுக்கான உங்கள் பயணத்தைத் தொடங்குங்கள். இது எளிமையானது, உள்ளுணர்வு கொண்டது மற்றும் எப்போதும் உங்களுக்காக உள்ளது.",
    getStartedButton: "இப்போது தொடங்கு",
    footerDisclaimer: "மறுப்பு: இந்த இணையதளம் பொதுவான சுகாதார தகவல்களை வழங்குகிறது மற்றும் தொழில்முறை மருத்துவ ஆலோசனைக்கு மாற்றாக இல்லை. எந்தவொரு உடல்நலக் கவலைகளுக்கும் எப்போதும் ஒரு தகுதியான சுகாதார வழங்குநரை அணுகவும்.",
    assistantPageTitle: "தொடங்குவோம்!",
    assistantPageSubtitle: "உங்களுக்கு சிறப்பாக உதவ உங்கள் விவரங்களையும் அறிகுறிகளையும் வழங்கவும்.",
    nameLabel: "உங்கள் பெயர்:",
    ageLabel: "உங்கள் வயது:",
    symptomsLabel: "உங்கள் அறிகுறிகளை விவரிக்கவும்:",
    voiceInputButton: "குரல் உள்ளீட்டைத் தொடங்கு",
    submitButton: "விவரங்களைச் சமர்ப்பி",
    selectLanguage: "மொழியைத் தேர்ந்தெடு:",
    coolPictureAlt: "ஒரு அமைதியான மற்றும் எதிர்கால மருத்துவ விளக்கம்",
    voiceInputPlaceholder: "உங்கள் அறிகுறிகளைப் பேசுங்கள்...",
    voiceInputNotSupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
    processingVoice: "குரல் உள்ளீடு செயலாக்கப்படுகிறது...",
    voiceInputReady: "குரல் உள்ளீடு தயார்.",
    voiceInputError: "குரல் உள்ளீடு பிழை. மீண்டும் முயற்சிக்கவும்.",
    voiceInputStopped: "குரல் உள்ளீடு நிறுத்தப்பட்டது.",
    detailsSubmitted: "விவரங்கள் சமர்ப்பிக்கப்பட்டன! உங்கள் கோரிக்கையை நாங்கள் செயலாக்குகிறோம்.",
    resultsPageTitle: "உங்கள் சுகாதார நுண்ணறிவுகள்",
    resultsPageSubtitle: "உங்கள் அறிகுறிகளின் அடிப்படையில் சில தகவல்கள் இங்கே:",
    homeRemediesSection: "வீட்டு வைத்தியம்",
    ayurvedicMedicinesSection: "ஆயுர்வேத அணுகுமுறைகள்",
    modernMedicinesSection: "நவீன மருந்துகள்",
    moreSuggestionsSection: "மேலும் பரிந்துரைகள்",
    speakButton: "பேசு",
    backToAssistant: "உள்ளீட்டிற்குத் திரும்பு",
    remediesContent: (symptoms) => `உங்கள் "${symptoms}" போன்ற அறிகுறிகளுக்கு, இந்த வீட்டு வைத்தியங்களைக் கவனியுங்கள்: ஓய்வு எடுங்கள், நிறைய திரவங்களை குடிக்கவும், மற்றும் சூடான சூப்களை உட்கொள்ளவும்.`,
    ayurvedicContent: (symptoms) => `"${symptoms}" க்கான ஆயுர்வேத பரிந்துரைகளில் இஞ்சி-துளசி போன்ற மூலிகை தேநீர், லேசான மற்றும் எளிதில் ஜீரணிக்கக்கூடிய உணவுகள், மற்றும் தியானம் செய்தல் ஆகியவை அடங்கும்.`,
    modernContent: (symptoms) => `"${symptoms}" க்கான நவீன மருத்துவ அணுகுமுறையில், பொருந்தினால், ஓவர்-தி-கவுண்டர் வலி நிவாரணிகள் மற்றும் சரியான நோயறிதல் மற்றும் சிகிச்சைக்காக ஒரு மருத்துவரை அணுகுதல் ஆகியவை இருக்கலாம்.`,
    suggestionsContent: (symptoms) => `உங்கள் அறிகுறிகளான "${symptoms}" அடிப்படையில்: லேசான சந்தர்ப்பங்களுக்கு 3-5 நாட்களில் குணமடைய எதிர்பார்க்கலாம். நன்கு நீரேற்றமாக இருங்கள் (தினமும் 2-3 லிட்டர் தண்ணீர்). பழங்கள் மற்றும் காய்கறிகள் போன்ற லேசான, சத்தான உணவுகளை உண்ணுங்கள். எண்ணெய் மற்றும் காரமான உணவுகளை தவிர்க்கவும். அறிகுறிகள் மோசமடைந்தால், உடனடியாக மருத்துவ உதவியை நாடவும்.`,
  },
  ur: { // Urdu
    websiteTitle: "کثیر لسانی طبی معاون",
    tagline: "آپ کا ذاتی صحت کا ساتھی، کسی بھی زبان میں۔",
    welcome: "کثیر لسانی طبی معاون میں خوش آمدید، آپ کا جدید کثیر لسانی طبی معاون۔ ہم آپ کو فوری، قابل اعتماد صحت کی رہنمائی فراہم کرنے کے لیے یہاں ہیں، جو آپ کی ضروریات کے مطابق ہے اور آپ کی پسندیدہ زبان میں دستیاب ہے۔",
    symptomEntryTitle: "آسان علامات کا اندراج",
    symptomEntryText1: "چاہے آپ اپنی علامات کو ٹائپ کرنا پسند کریں یا انہیں بلند آواز میں کہنا، ہمارا معاون اسے آسان بناتا ہے۔ بس بیان کریں کہ آپ کیسا محسوس کر رہے ہیں، اور ہمارا ذہین نظام آپ کی صحت کی پریشانیوں کو سمجھنا شروع کر دے گا۔",
    symptomEntryText2: "ہمارا بدیہی انٹرفیس ٹیکسٹ ان پٹ اور جدید آواز کی شناخت دونوں کو سپورٹ کرتا ہے، جو ہر کسی کے لیے ایک آرام دہ اور موثر تجربہ کو یقینی بناتا ہے۔",
    multilingualTitle: "سمجھیں اور عالمی سطح پر سمجھا جائے",
    multilingualText1: "زبان کبھی بھی صحت کے لیے رکاوٹ نہیں ہونی چاہیے۔ یہ معاون واقعی کثیر لسانی ہونے کے لیے ڈیزائن کیا گیا ہے، جو آپ کو اپنی پسند کی کسی بھی زبان میں بات چیت کرنے کی اجازت دیتا ہے۔ ہمارا نظام آپ کے ان پٹ کو پروسیس کرتا ہے اور آپ کو بہترین سمجھ میں آنے والی زبان میں جوابات فراہم کرتا ہے۔",
    multilingualText2: "یہ خصوصیت یقینی بناتی ہے کہ تمام لسانی پس منظر کے لوگ بغیر کسی الجھن یا تاخیر کے اہم صحت کی معلومات تک رسائی حاصل کر سکیں۔",
    healthInsightsTitle: "جامع صحت کی رہنمائی",
    healthInsightsText1: "ایک بار جب آپ کی علامات کو سمجھ لیا جاتا ہے، تو ہمارا معاون صحت کے ممکنہ مسائل کا ایک جامع جائزہ فراہم کرتا ہے، ساتھ ہی دیکھ بھال کے مختلف طریقوں کو بھی۔ آپ کو تفصیلات حاصل ہوں گی:",
    homeRemedies: "گھریلو علاج:",
    ayurvedicApproaches: "آیورویدک طریقے:",
    modernMedicine: "جدید ادویات کی تفصیلات:",
    healthInsightsText2: "ہمارا مقصد آپ کو علم سے بااختیار بنانا ہے، تاکہ آپ اپنی صحت کے بارے میں باخبر فیصلے کر سکیں۔",
    callToActionTitle: "ذہین صحت کی معاونت کا تجربہ کرنے کے لیے تیار ہیں؟",
    callToActionText: "آج ہی کثیر لسانی طبی معاون کے ساتھ بہتر صحت کی سمجھ کی طرف اپنا سفر شروع کریں۔ یہ سادہ، بدیہی اور ہمیشہ آپ کے لیے موجود ہے۔",
    getStartedButton: "ابھی شروع کریں",
    footerDisclaimer: "دستبرداری: یہ ویب سائٹ عام صحت کی معلومات فراہم کرتی ہے اور پیشہ ورانہ طبی مشورے کا متبادل نہیں ہے۔ کسی بھی صحت کی پریشانی کے لیے ہمیشہ ایک مستند صحت کی دیکھ بھال فراہم کرنے والے سے مشورہ کریں۔",
    assistantPageTitle: "آئیے شروع کریں!",
    assistantPageSubtitle: "براہ کرم ہمیں آپ کی بہتر مدد کرنے کے لیے اپنی تفصیلات اور علامات فراہم کریں۔",
    nameLabel: "آپ کا نام:",
    ageLabel: "آپ کی عمر:",
    symptomsLabel: "اپنی علامات بیان کریں:",
    voiceInputButton: "آواز کا ان پٹ شروع کریں",
    submitButton: "تفصیلات جمع کروائیں",
    selectLanguage: "زبان منتخب کریں:",
    coolPictureAlt: "ایک پرسکون اور مستقبل کی طبی مثال",
    voiceInputPlaceholder: "اپنی علامات بولیں...",
    voiceInputNotSupported: "اس براؤزر میں آواز کا ان پٹ تعاون یافتہ نہیں ہے۔",
    processingVoice: "آواز کا ان پٹ پروسیس کیا جا رہا ہے...",
    voiceInputReady: "آواز کا ان پٹ تیار ہے۔",
    voiceInputError: "آواز کا ان پٹ ایرر۔ براہ کرم دوبارہ کوشش کریں۔",
    voiceInputStopped: "آواز کا ان پٹ رک گیا ہے۔",
    detailsSubmitted: "تفصیلات جمع کر دی گئیں! ہم آپ کی درخواست پر کارروائی کر رہے ہیں۔",
    resultsPageTitle: "آپ کی صحت کی بصیرتیں",
    resultsPageSubtitle: "آپ کی علامات کی بنیاد پر کچھ معلومات یہاں دی گئی ہے:",
    homeRemediesSection: "گھریلو علاج",
    ayurvedicMedicinesSection: "آیورویدک طریقے",
    modernMedicinesSection: "جدید ادویات",
    moreSuggestionsSection: "مزید تجاویز",
    speakButton: "بولو",
    backToAssistant: "ان پٹ پر واپس",
    remediesContent: (symptoms) => `آپ کی علامات جیسے "${symptoms}" کے لیے، ان گھریلو علاج پر غور کریں: آرام کریں، کافی مقدار میں سیال پئیں، اور گرم شوربے کا استعمال کریں۔`,
    ayurvedicContent: (symptoms) => `"${symptoms}" کے لیے آیورویدک تجاویز میں ادرک-تلسی جیسی جڑی بوٹیوں والی چائے، ہلکا اور آسانی سے ہضم ہونے والا کھانا، اور مراقبہ کی مشق شامل ہے۔`,
    modernContent: (symptoms) => `"${symptoms}" کے لیے جدید طب کا نقطہ نظر اگر قابل اطلاق ہو تو اوور دی کاؤنٹر درد کش ادویات، اور مناسب تشخیص اور علاج کے لیے ڈاکٹر سے مشورہ کرنا شامل ہو سکتا ہے۔`,
    suggestionsContent: (symptoms) => `آپ کی علامات "${symptoms}" کی بنیاد پر: ہلکے کیسز کے لیے 3-5 دنوں میں صحت یابی کی توقع کریں۔ اچھی طرح سے ہائیڈریٹڈ رہیں (روزانہ 2-3 لیٹر پانی)۔ پھل اور سبزیوں جیسے ہلکے، غذائیت سے بھرپور کھانے کھائیں۔ تیل اور مسالہ دار کھانے سے پرہیز کریں۔ اگر علامات بگڑ جائیں تو فوری طور پر طبی امداد حاصل کریں۔`,
  },
  kn: { // Kannada
    websiteTitle: "ಬಹುಭಾಷಾ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ",
    tagline: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಸಹಾಯಕ, ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ.",
    welcome: "ಬಹುಭಾಷಾ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ ಗೆ ಸ್ವಾಗತ, ನಿಮ್ಮ ನವೀನ ಬಹುಭಾಷಾ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ. ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಮತ್ತು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಲಭ್ಯವಿರುವ ತಕ್ಷಣದ, ವಿಶ್ವಾಸಾರ್ಹ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನವನ್ನು ನಿಮಗೆ ಒದಗಿಸಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ.",
    symptomEntryTitle: "ಪ್ರಯತ್ನವಿಲ್ಲದ ರೋಗಲಕ್ಷಣ ಪ್ರವೇಶ",
    symptomEntryText1: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಟೈಪ್ ಮಾಡಲು ಅಥವಾ ಅವುಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಹೇಳಲು ನೀವು ಬಯಸುತ್ತೀರಾ, ನಮ್ಮ ಸಹಾಯಕ ಅದನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ. ನೀವು ಹೇಗೆ ಭಾವಿಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ವಿವರಿಸಿ, ಮತ್ತು ನಮ್ಮ ಬುದ್ಧಿವಂತ ವ್ಯವಸ್ಥೆಯು ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸುತ್ತದೆ.",
    symptomEntryText2: "ನಮ್ಮ ಅರ್ಥಗರ್ಭಿತ ಇಂಟರ್ಫೇಸ್ ಪಠ್ಯ ಇನ್ಪುಟ್ ಮತ್ತು ಸುಧಾರಿತ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಎರಡನ್ನೂ ಬೆಂಬಲಿಸುತ್ತದೆ, ಎಲ್ಲರಿಗೂ ಆರಾಮದಾಯಕ ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಅನುಭವವನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
    multilingualTitle: "ಜಾಗತಿಕವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
    multilingualText1: "ಆರೋಗ್ಯಕ್ಕೆ ಭಾಷೆ ಎಂದಿಗೂ ಅಡ್ಡಿಯಾಗಬಾರದು. ಈ ಸಹಾಯಕವನ್ನು ನಿಜವಾಗಿಯೂ ಬಹುಭಾಷಾ ಆಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ, ಇದು ನಿಮಗೆ ಇಷ್ಟವಾದ ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಸಂವಹನ ಮಾಡಲು ಅನುಮತಿಸುತ್ತದೆ. ನಮ್ಮ ವ್ಯವಸ್ಥೆಯು ನಿಮ್ಮ ಇನ್ಪುಟ್ ಅನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ನೀವು ಉತ್ತಮವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವ ಭಾಷೆಯಲ್ಲಿ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.",
    multilingualText2: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಎಲ್ಲಾ ಭಾಷಾ ಹಿನ್ನೆಲೆಯ ಜನರು ಗೊಂದಲ ಅಥವಾ ವಿಳಂಬವಿಲ್ಲದೆ ಪ್ರಮುಖ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಪ್ರವೇಶಿಸಬಹುದು ಎಂದು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
    healthInsightsTitle: "ಸಮಗ್ರ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ",
    healthInsightsText1: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಂಡ ನಂತರ, ನಮ್ಮ ಸಹಾಯಕ ಸಂಭಾವ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳ ಸಮಗ್ರ ಅವಲೋಕನವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಜೊತೆಗೆ ಆರೈಕೆಗೆ ವಿವಿಧ ವಿಧಾನಗಳನ್ನು ಸಹ ಒದಗಿಸುತ್ತದೆ. ನೀವು ವಿವರಗಳನ್ನು ಪಡೆಯುತ್ತೀರಿ:",
    homeRemedies: "ಮನೆಮದ್ದುಗಳು:",
    ayurvedicApproaches: "ಆಯುರ್ವೇದ ವಿಧಾನಗಳು:",
    modernMedicine: "ಆಧುನಿಕ ಔಷಧ ವಿವರಗಳು:",
    healthInsightsText2: "ನಿಮಗೆ ಜ್ಞಾನವನ್ನು ನೀಡುವ ಮೂಲಕ, ನಿಮ್ಮ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ತಿಳುವಳಿಕೆಯುಳ್ಳ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುವುದು ನಮ್ಮ ಗುರಿಯಾಗಿದೆ.",
    callToActionTitle: "ಸ್ಮಾರ್ಟರ್ ಆರೋಗ್ಯ ಸಹಾಯವನ್ನು ಅನುಭವಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    callToActionText: "ಇಂದೇ ಬಹುಭಾಷಾ ವೈದ್ಯಕೀಯ ಸಹಾಯಕ ನೊಂದಿಗೆ ಉತ್ತಮ ಆರೋಗ್ಯ ತಿಳುವಳಿಕೆಯ ಕಡೆಗೆ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ಇದು ಸರಳ, ಅರ್ಥಗರ್ಭಿತ ಮತ್ತು ಯಾವಾಗಲೂ ನಿಮಗಾಗಿ ಇಲ್ಲಿದೆ.",
    getStartedButton: "ಈಗಲೇ ಪ್ರಾರಂಭಿಸಿ",
    footerDisclaimer: "ಹಕ್ಕುತ್ಯಾಗ: ಈ ವೆಬ್‌ಸೈಟ್ ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಗೆ ಬದಲಿಯಾಗಿಲ್ಲ. ಯಾವುದೇ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳಿಗೆ ಯಾವಾಗಲೂ ಅರ್ಹ ವೈದ್ಯಕೀಯ ಸೇವಾ ಪೂರೈಕೆದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    assistantPageTitle: "ಪ್ರಾರಂಭಿಸೋಣ!",
    assistantPageSubtitle: "ದಯವಿಟ್ಟು ನಮಗೆ ಉತ್ತಮವಾಗಿ ಸಹಾಯ ಮಾಡಲು ನಿಮ್ಮ ವಿವರಗಳು ಮತ್ತು ರೋಗಲಕ್ಷಣಗಳನ್ನು ಒದಗಿಸಿ.",
    nameLabel: "ನಿಮ್ಮ ಹೆಸರು:",
    ageLabel: "ನಿಮ್ಮ ವಯಸ್ಸು:",
    symptomsLabel: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ:",
    voiceInputButton: "ಧ್ವನಿ ಇನ್ಪುಟ್ ಪ್ರಾರಂಭಿಸಿ",
    submitButton: "ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ:",
    coolPictureAlt: "ಒಂದು ಶಾಂತ ಮತ್ತು ಭವಿಷ್ಯದ ವೈದ್ಯಕೀಯ ವಿವರಣೆ",
    voiceInputPlaceholder: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ...",
    voiceInputNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್ಪುಟ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
    processingVoice: "ಧ್ವನಿ ಇನ್ಪುಟ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತಿದೆ...",
    voiceInputReady: "ಧ್ವನಿ ಇನ್ಪುಟ್ ಸಿದ್ಧವಾಗಿದೆ.",
    voiceInputError: "ಧ್ವನಿ ಇನ್ಪುಟ್ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    voiceInputStopped: "ಧ್ವನಿ ಇನ್ಪುಟ್ ನಿಲ್ಲಿಸಲಾಗಿದೆ.",
    detailsSubmitted: "ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ! ನಾವು ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತಿದ್ದೇವೆ.",
    resultsPageTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಒಳನೋಟಗಳು",
    resultsPageSubtitle: "ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ಕೆಲವು ಮಾಹಿತಿ ಇಲ್ಲಿ ಇದೆ:",
    homeRemediesSection: "ಮನೆಮದ್ದುಗಳು",
    ayurvedicMedicinesSection: "ಆಯುರ್ವೇದ ವಿಧಾನಗಳು",
    modernMedicinesSection: "ಆಧುನಿಕ ಔಷಧಗಳು",
    moreSuggestionsSection: "ಹೆಚ್ಚಿನ ಸಲಹೆಗಳು",
    speakButton: "ಮಾತನಾಡಿ",
    backToAssistant: "ಇನ್ಪುಟ್ ಗೆ ಹಿಂತಿರುಗಿ",
    remediesContent: (symptoms) => `ನಿಮ್ಮ "${symptoms}" ನಂತಹ ರೋಗಲಕ್ಷಣಗಳಿಗೆ, ಈ ಮನೆಮದ್ದುಗಳನ್ನು ಪರಿಗಣಿಸಿ: ವಿಶ್ರಾಂತಿ, ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಕುಡಿಯಿರಿ, ಮತ್ತು ಬೆಚ್ಚಗಿನ ಸಾರುಗಳನ್ನು ಸೇವಿಸಿ.`,
    ayurvedicContent: (symptoms) => `"${symptoms}" ಗಾಗಿ ಆಯುರ್ವೇದ ಸಲಹೆಗಳಲ್ಲಿ ಶುಂಠಿ-ತುಳಸಿ, ಹಗುರವಾದ ಮತ್ತು ಸುಲಭವಾಗಿ ಜೀರ್ಣವಾಗುವ ಊಟ, ಮತ್ತು ಧ್ಯಾನವನ್ನು ಅಭ್ಯಾಸ ಮಾಡುವುದು ಸೇರಿವೆ.`,
    modernContent: (symptoms) => `"${symptoms}" ಗಾಗಿ ಆಧುನಿಕ ವೈದ್ಯಕೀಯ ವಿಧಾನವು ಅನ್ವಯಿಸಿದರೆ, ಓವರ್-ದಿ-ಕೌಂಟರ್ ನೋವು ನಿವಾರಕಗಳು ಮತ್ತು ಸರಿಯಾದ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸುವುದು ಒಳಗೊಂಡಿರಬಹುದು.`,
    suggestionsContent: (symptoms) => `ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳಾದ "${symptoms}" ಆಧಾರದ ಮೇಲೆ: ಸೌಮ್ಯ ಪ್ರಕರಣಗಳಿಗೆ 3-5 ದಿನಗಳಲ್ಲಿ ಚೇತರಿಕೆ ನಿರೀಕ್ಷಿಸಬಹುದು. ಚೆನ್ನಾಗಿ ಹೈಡ್ರೇಟೆಡ್ ಆಗಿರಿ (ಪ್ರತಿದಿನ 2-3 ಲೀಟರ್ ನೀರು). ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳಂತಹ ಹಗುರವಾದ, ಪೌಷ್ಟಿಕ ಆಹಾರವನ್ನು ಸೇವಿಸಿ. ಎಣ್ಣೆಯುಕ್ತ ಮತ್ತು ಮಸಾಲೆಯುಕ್ತ ಆಹಾರವನ್ನು ತಪ್ಪಿಸಿ. ರೋಗಲಕ್ಷಣಗಳು ಹದಗೆಟ್ಟರೆ, ತಕ್ಷಣವೇ ವೈದ್ಯಕೀಯ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ.`,
  },
  ml: { // Malayalam
    websiteTitle: "ബഹുഭാഷാ മെഡിക്കൽ അസിസ്റ്റന്റ്",
    tagline: "നിങ്ങളുടെ വ്യക്തിഗത ആരോഗ്യ സഹായി, ഏത് ഭാഷയിലും.",
    welcome: "ബഹുഭാഷാ മെഡിക്കൽ അസിസ്റ്റന്റിലേക്ക് സ്വാഗതം, നിങ്ങളുടെ നൂതന ബഹുഭാഷാ മെഡിക്കൽ അസിസ്റ്റന്റ്. നിങ്ങളുടെ ആരോഗ്യ സംബന്ധമായ തൽക്ഷണവും വിശ്വസനീയവുമായ മാർഗ്ഗനിർദ്ദേശം നൽകാൻ ഞങ്ങൾ ഇവിടെയുണ്ട്, നിങ്ങളുടെ ആവശ്യങ്ങൾക്കനുസരിച്ച് ക്രമീകരിച്ചിരിക്കുന്നു, കൂടാതെ നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷയിൽ ലഭ്യമാണ്.",
    symptomEntryTitle: "ലളിതമായ രോഗലക്ഷണ എൻട്രി",
    symptomEntryText1: "നിങ്ങളുടെ രോഗലക്ഷണങ്ങൾ ടൈപ്പ് ചെയ്യാനോ അല്ലെങ്കിൽ അവ ഉച്ചത്തിൽ പറയാനോ നിങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ, ഞങ്ങളുടെ സഹായി അത് ലളിതമാക്കുന്നു. നിങ്ങൾക്ക് എന്തു തോന്നുന്നു എന്ന് വിവരിക്കുക, ഞങ്ങളുടെ ബുദ്ധിപരമായ സിസ്റ്റം നിങ്ങളുടെ ആരോഗ്യ പ്രശ്നങ്ങൾ മനസ്സിലാക്കാൻ തുടങ്ങും.",
    symptomEntryText2: "ഞങ്ങളുടെ അവബോധജന്യമായ ഇന്റർഫേസ് ടെക്സ്റ്റ് ഇൻപുട്ടും നൂതന വോയിസ് റെക്കഗ്നിഷനും പിന്തുണയ്ക്കുന്നു, എല്ലാവർക്കും സൗകര്യപ്രദവും കാര്യക്ഷമവുമായ അനുഭവം ഉറപ്പാക്കുന്നു.",
    multilingualTitle: "മനസ്സിലാക്കുക, ആഗോളതലത്തിൽ മനസ്സിലാക്കപ്പെടുക",
    multilingualText1: "ആരോഗ്യത്തിന് ഭാഷ ഒരിക്കലും ഒരു തടസ്സമാകരുത്. ഈ സഹായി യഥാർത്ഥത്തിൽ ബഹുഭാഷാ ആയി രൂപകൽപ്പന ചെയ്തിരിക്കുന്നു, ഇത് നിങ്ങൾക്ക് ഇഷ്ടമുള്ള ഏത് ഭാഷയിലും സംവദിക്കാൻ അനുവദിക്കുന്നു. ഞങ്ങളുടെ സിസ്റ്റം നിങ്ങളുടെ ഇൻപുട്ട് പ്രോസസ്സ് ചെയ്യുകയും നിങ്ങൾക്ക് ഏറ്റവും നന്നായി മനസ്സിലാകുന്ന ഭാഷയിൽ പ്രതികരണങ്ങൾ നൽകുകയും ചെയ്യുന്നു.",
    multilingualText2: "ഈ സവിശേഷത എല്ലാ ഭാഷാ പശ്ചാത്തലങ്ങളിലുള്ള ആളുകൾക്കും ആശയക്കുഴപ്പമോ കാലതാമസമോ കൂടാതെ പ്രധാനപ്പെട്ട ആരോഗ്യ വിവരങ്ങൾ ആക്സസ് ചെയ്യാൻ കഴിയുമെന്ന് ഉറപ്പാക്കുന്നു.",
    healthInsightsTitle: "സമഗ്ര ആരോഗ്യ മാർഗ്ഗനിർദ്ദേശം",
    healthInsightsText1: "നിങ്ങളുടെ രോഗലക്ഷണങ്ങൾ മനസ്സിലാക്കിയ ശേഷം, ഞങ്ങളുടെ സഹായി സാധ്യതയുള്ള ആരോഗ്യ പ്രശ്നങ്ങളുടെ സമഗ്രമായ ഒരു അവലോകനം നൽകുന്നു, ഒപ്പം പരിചരണത്തിനുള്ള വിവിധ സമീപനങ്ങളും. നിങ്ങൾക്ക് വിവരങ്ങൾ ലഭിക്കും:",
    homeRemedies: "വീട്ടു വൈദ്യം:",
    ayurvedicApproaches: "ആയുർവേദ സമീപനങ്ങൾ:",
    modernMedicine: "ആധുനിക വൈദ്യശാസ്ത്ര വിവരങ്ങൾ:",
    healthInsightsText2: "നിങ്ങൾക്ക് അറിവ് നൽകി, നിങ്ങളുടെ ആരോഗ്യത്തെക്കുറിച്ച് അറിവുള്ള തീരുമാനങ്ങൾ എടുക്കാൻ സഹായിക്കുക എന്നതാണ് ഞങ്ങളുടെ ലക്ഷ്യം.",
    callToActionTitle: "സ്മാർട്ടർ ആരോഗ്യ സഹായം അനുഭവിക്കാൻ തയ്യാറാണോ?",
    callToActionText: "ഇന്ന് തന്നെ ബഹുഭാഷാ മെഡിക്കൽ അസിസ്റ്റന്റ് ഉപയോഗിച്ച് മികച്ച ആരോഗ്യ ധാരണയിലേക്കുള്ള നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക. ഇത് ലളിതവും അവബോധജന്യവും എപ്പോഴും നിങ്ങൾക്കായി ഇവിടെയുമുണ്ട്.",
    getStartedButton: "ഇപ്പോൾ ആരംഭിക്കുക",
    footerDisclaimer: "നിരാകരണം: ഈ വെബ്സൈറ്റ് പൊതുവായ ആരോഗ്യ വിവരങ്ങൾ നൽകുന്നു, ഇത് പ്രൊഫഷണൽ മെഡിക്കൽ ഉപദേശത്തിന് പകരമല്ല. ഏതെങ്കിലും ആരോഗ്യ പ്രശ്നങ്ങൾക്ക് എല്ലായ്പ്പോഴും ഒരു യോഗ്യതയുള്ള ആരോഗ്യ സംരക്ഷണ ദാതാവിനെ സമീപിക്കുക.",
    assistantPageTitle: "നമുക്ക് തുടങ്ങാം!",
    assistantPageSubtitle: "നിങ്ങൾക്ക് മികച്ച സഹായം നൽകുന്നതിന് നിങ്ങളുടെ വിവരങ്ങളും രോഗലക്ഷണങ്ങളും നൽകുക.",
    nameLabel: "നിങ്ങളുടെ പേര്:",
    ageLabel: "നിങ്ങളുടെ പ്രായം:",
    symptomsLabel: "നിങ്ങളുടെ രോഗലക്ഷണങ്ങൾ വിവരിക്കുക:",
    voiceInputButton: "വോയിസ് ഇൻപുട്ട് ആരംഭിക്കുക",
    submitButton: "വിവരങ്ങൾ സമർപ്പിക്കുക",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക:",
    coolPictureAlt: "ശാന്തവും ഭാവനാത്മകവുമായ ഒരു മെഡിക്കൽ ചിത്രീകരണം",
    voiceInputPlaceholder: "നിങ്ങളുടെ രോഗലക്ഷണങ്ങൾ പറയുക...",
    voiceInputNotSupported: "ഈ ബ്രൗസറിൽ വോയിസ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല.",
    processingVoice: "വോയിസ് ഇൻപുട്ട് പ്രോസസ്സ് ചെയ്യുന്നു...",
    voiceInputReady: "വോയിസ് ഇൻപുട്ട് തയ്യാറാണ്.",
    voiceInputError: "വോയിസ് ഇൻപുട്ട് പിശക്. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    voiceInputStopped: "വോയിസ് ഇൻപുട്ട് നിർത്തി.",
    detailsSubmitted: "വിവരങ്ങൾ സമർപ്പിച്ചു! ഞങ്ങൾ നിങ്ങളുടെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നു.",
    resultsPageTitle: "നിങ്ങളുടെ ആരോഗ്യ ഉൾക്കാഴ്ചകൾ",
    resultsPageSubtitle: "നിങ്ങളുടെ രോഗലക്ഷണങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള ചില വിവരങ്ങൾ ഇതാ:",
    homeRemediesSection: "വീട്ടു വൈദ്യം",
    ayurvedicMedicinesSection: "ആയുർവേദ സമീപനങ്ങൾ",
    modernMedicinesSection: "ആധുനിക മരുന്നുകൾ",
    moreSuggestionsSection: "കൂടുതൽ നിർദ്ദേശങ്ങൾ",
    speakButton: "സംസാരിക്കുക",
    backToAssistant: "ഇൻപുട്ടിലേക്ക് മടങ്ങുക",
    remediesContent: (symptoms) => `നിങ്ങളുടെ "${symptoms}" പോലുള്ള രോഗലക്ഷണങ്ങൾക്ക്, ഈ വീട്ടു വൈദ്യങ്ങൾ പരിഗണിക്കുക: വിശ്രമിക്കുക, ധാരാളം ദ്രാവകങ്ങൾ കുടിക്കുക, ചൂടുള്ള സൂപ്പുകൾ കഴിക്കുക.`,
    ayurvedicContent: (symptoms) => `"${symptoms}" നായുള്ള ആയുർവേദ നിർദ്ദേശങ്ങളിൽ ഇഞ്ചി-തുളസി പോലുള്ള ഔഷധ ചായകൾ, ലഘുവും എളുപ്പത്തിൽ ദഹിക്കുന്നതുമായ ഭക്ഷണം, ധ്യാനം എന്നിവ ഉൾപ്പെടുന്നു.`,
    modernContent: (symptoms) => `"${symptoms}" നായുള്ള ആധുനിക വൈദ്യശാസ്ത്ര സമീപനത്തിൽ, ബാധകമെങ്കിൽ, ഓവർ-ദി-കൗണ്ടർ വേദന സംഹാരികളും, ശരിയായ രോഗനിർണ്ണയത്തിനും ചികിത്സയ്ക്കും ഡോക്ടറെ സമീപിക്കുന്നതും ഉൾപ്പെട്ടേക്കാം.`,
    suggestionsContent: (symptoms) => `നിങ്ങളുടെ രോഗലക്ഷണങ്ങളായ "${symptoms}" അടിസ്ഥാനമാക്കി: നേരിയ കേസുകൾക്ക് 3-5 ദിവസത്തിനുള്ളിൽ സുഖം പ്രാപിക്കാൻ പ്രതീക്ഷിക്കാം. നന്നായി ജലാംശം നിലനിർത്തുക (ദിവസവും 2-3 ലിറ്റർ വെള്ളം). പഴങ്ങളും പച്ചക്കറികളും പോലുള്ള ലഘുവും പോഷകസമൃദ്ധവുമായ ഭക്ഷണം കഴിക്കുക. എണ്ണമയമുള്ളതും മസാലകൾ നിറഞ്ഞതുമായ ഭക്ഷണം ഒഴിവാക്കുക. രോഗലക്ഷണങ്ങൾ വഷളായാൽ, ഉടൻ വൈദ്യസഹായം തേടുക.`,
  },
  or: { // Odia
    websiteTitle: "ବହୁଭାଷୀ ଚିକିତ୍ସା ସହାୟକ",
    tagline: "ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ, ଯେକୌଣସି ଭାଷାରେ।",
    welcome: "ବହୁଭାଷୀ ଚିକିତ୍ସା ସହାୟକକୁ ସ୍ୱାଗତ, ଆପଣଙ୍କର ଅଭିନବ ବହୁଭାଷୀ ଚିକିତ୍ସା ସହାୟକ। ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଏବଂ ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ ଉପଲବ୍ଧ ତୁରନ୍ତ, ନିର୍ଭରଯୋଗ୍ୟ ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ ପ୍ରଦାନ କରିବାକୁ ଆମେ ଏଠାରେ ଅଛୁ।",
    symptomEntryTitle: "ସହଜ ଲକ୍ଷଣ ପ୍ରବେଶ",
    symptomEntryText1: "ଆପଣ ନିଜ ଲକ୍ଷଣଗୁଡ଼ିକୁ ଟାଇପ୍ କରିବାକୁ ପସନ୍ଦ କରନ୍ତୁ କିମ୍ବା ଉଚ୍ଚ ସ୍ୱରରେ କହିବାକୁ, ଆମର ସହାୟକ ଏହାକୁ ସରଳ କରିଥାଏ। ଆପଣ କିପରି ଅନୁଭବ କରୁଛନ୍ତି ତାହା ବର୍ଣ୍ଣନା କରନ୍ତୁ, ଏବଂ ଆମର ବୁଦ୍ଧିମାନ ପ୍ରଣାଳୀ ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଚିନ୍ତାଧାରାକୁ ବୁଝିବାକୁ ଆରମ୍ଭ କରିବ।",
    symptomEntryText2: "ଆମର ଅନ୍ତର୍ନିହିତ ଇଣ୍ଟରଫେସ୍ ଟେକ୍ସଟ୍ ଇନପୁଟ୍ ଏବଂ ଉନ୍ନତ ଭଏସ୍ ରେକଗ୍ନିସନ୍ ଉଭୟକୁ ସମର୍ଥନ କରେ, ଯାହା ସମସ୍ତଙ୍କ ପାଇଁ ଏକ ଆରାମଦାୟକ ଏବଂ ଦକ୍ଷ ଅନୁଭୂତି ସୁନିଶ୍ଚିତ କରେ।",
    multilingualTitle: "ବୁଝନ୍ତୁ ଏବଂ ବିଶ୍ୱସ୍ତରରେ ବୁଝାନ୍ତୁ",
    multilingualText1: "ସ୍ୱାସ୍ଥ୍ୟ ପାଇଁ ଭାଷା କେବେବି ବାଧକ ହେବା ଉଚିତ୍ ନୁହେଁ। ଏହି ସହାୟକ ପ୍ରକୃତରେ ବହୁଭାଷୀ ହେବା ପାଇଁ ଡିଜାଇନ୍ କରାଯାଇଛି, ଯାହା ଆପଣଙ୍କୁ ଆପଣଙ୍କ ପସନ୍ଦର ଯେକୌଣସି ଭାଷାରେ କଥାବାର୍ତ୍ତା କରିବାକୁ ଅନୁମତି ଦିଏ। ଆମର ପ୍ରଣାଳୀ ଆପଣଙ୍କ ଇନପୁଟ୍ ପ୍ରକ୍ରିୟାକରଣ କରେ ଏବଂ ଆପଣଙ୍କୁ ସବୁଠାରୁ ଭଲ ଭାବରେ ବୁଝାଉଥିବା ଭାଷାରେ ପ୍ରତିକ୍ରିୟା ପ୍ରଦାନ କରେ।",
    multilingualText2: "ଏହି ବୈଶିଷ୍ଟ୍ୟ ସମସ୍ତ ଭାଷାଭାଷୀ ଲୋକଙ୍କୁ ବିଭ୍ରାଟ କିମ୍ବା ବିଳମ୍ବ ବିନା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପ୍ରାପ୍ତ କରିବାକୁ ସୁନିଶ୍ଚିତ କରେ।",
    healthInsightsTitle: "ସମଗ୍ର ସ୍ୱାସ୍ଥ୍ୟ ମାର୍ଗଦର୍ଶନ",
    healthInsightsText1: "ଥରେ ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକୁ ବୁଝିଗଲେ, ଆମର ସହାୟକ ସମ୍ଭାବ୍ୟ ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟାଗୁଡ଼ିକର ଏକ ବିସ୍ତୃତ ଅବଲୋକନ ପ୍ରଦାନ କରେ, ଏହା ସହିତ ଯତ୍ନ ପାଇଁ ବିଭିନ୍ନ ପଦ୍ଧତି ମଧ୍ୟ ପ୍ରଦାନ କରେ। ଆପଣ ବିବରଣୀ ପାଇବେ:",
    homeRemedies: "ଘରୋଇ ଉପଚାର:",
    ayurvedicApproaches: "ଆୟୁର୍ବେଦିକ ପଦ୍ଧତି:",
    modernMedicine: "ଆଧୁନିକ ଔଷଧ ବିବରଣୀ:",
    healthInsightsText2: "ଆମର ଲକ୍ଷ୍ୟ ହେଉଛି ଆପଣଙ୍କୁ ଜ୍ଞାନ ସହିତ ସଶକ୍ତ କରିବା, ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ସୂଚିତ ନିଷ୍ପତ୍ତି ନେବାରେ ସାହାଯ୍ୟ କରିବା।",
    callToActionTitle: "ସ୍ମାର୍ଟର୍ ସ୍ୱାସ୍ଥ୍ୟ ସହାୟତା ଅନୁଭବ କରିବାକୁ ପ୍ରସ୍ତୁତ ଅଛନ୍ତି କି?",
    callToActionText: "ଆଜି ହିଁ ବହୁଭାଷୀ ଚିକିତ୍ସା ସହାୟକ ସହିତ ଉତ୍ତମ ସ୍ୱାସ୍ଥ୍ୟ ବୁଝାମଣା ଦିଗରେ ଆପଣଙ୍କ ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ। ଏହା ସରଳ, ଅନ୍ତର୍ନିହିତ ଏବଂ ସବୁବେଳେ ଆପଣଙ୍କ ପାଇଁ ଏଠାରେ ଅଛି।",
    getStartedButton: "ବର୍ତ୍ତମାନ ଆରମ୍ଭ କରନ୍ତୁ",
    footerDisclaimer: "ଅସ୍ୱୀକରଣ: ଏହି ୱେବସାଇଟ୍ ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପ୍ରଦାନ କରେ ଏବଂ ବୃତ୍ତିଗତ ଚିକିତ୍ସା ପରାମର୍ଶର ବିକଳ୍ପ ନୁହେଁ। ଯେକୌଣସି ସ୍ୱାସ୍ଥ୍ୟ ସମସ୍ୟା ପାଇଁ ସର୍ବଦା ଜଣେ ଯୋଗ୍ୟ ସ୍ୱାସ୍ଥ୍ୟସେବା ପ୍ରଦାନକାରୀଙ୍କ ସହିତ ପରାମର୍ଶ କରନ୍ତୁ।",
    assistantPageTitle: "ଆସନ୍ତୁ ଆରମ୍ଭ କରିବା!",
    assistantPageSubtitle: "ଆପଣଙ୍କୁ ଭଲ ଭାବରେ ସାହାଯ୍ୟ କରିବା ପାଇଁ ଦୟାକରି ଆପଣଙ୍କ ବିବରଣୀ ଏବଂ ଲକ୍ଷଣ ପ୍ରଦାନ କରନ୍ତୁ।",
    nameLabel: "ଆପଣଙ୍କ ନାମ:",
    ageLabel: "ଆପଣଙ୍କ ବୟସ:",
    symptomsLabel: "ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକୁ ବର୍ଣ୍ଣନା କରନ୍ତୁ:",
    voiceInputButton: "ଭଏସ୍ ଇନପୁଟ୍ ଆରମ୍ଭ କରନ୍ତୁ",
    submitButton: "ବିବରଣୀ ଦାଖଲ କରନ୍ତୁ",
    selectLanguage: "ଭାଷା ବାଛନ୍ତୁ:",
    coolPictureAlt: "ଏକ ଶାନ୍ତ ଏବଂ ଭବିଷ୍ୟତର ଚିକିତ୍ସା ଚିତ୍ରଣ",
    voiceInputPlaceholder: "ଆପଣଙ୍କ ଲକ୍ଷଣ କୁହନ୍ତୁ...",
    voiceInputNotSupported: "ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଇନପୁଟ୍ ସମର୍ଥିତ ନୁହେଁ।",
    processingVoice: "ଭଏସ୍ ଇନପୁଟ୍ ପ୍ରକ୍ରିୟାକରଣ କରାଯାଉଛି...",
    voiceInputReady: "ଭଏସ୍ ଇନପୁଟ୍ ପ୍ରସ୍ତୁତ।",
    voiceInputError: "ଭଏସ୍ ଇନପୁଟ୍ ତ୍ରୁଟି। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।",
    voiceInputStopped: "ଭଏସ୍ ଇନପୁଟ୍ ବନ୍ଦ ହୋଇଗଲା।",
    detailsSubmitted: "ବିବରଣୀ ଦାଖଲ କରାଗଲା! ଆମେ ଆପଣଙ୍କ ଅନୁରୋଧ ପ୍ରକ୍ରିୟାକରଣ କରୁଛୁ।",
    resultsPageTitle: "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଅନ୍ତର୍ଦୃଷ୍ଟି",
    resultsPageSubtitle: "ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକ ଆଧାରରେ କିଛି ସୂଚନା ଏଠାରେ ଅଛି:",
    homeRemediesSection: "ଘରୋଇ ଉପଚାର",
    ayurvedicMedicinesSection: "ଆୟୁର୍ବେଦିକ ପଦ୍ଧତି",
    modernMedicinesSection: "ଆଧୁନିକ ଔଷଧ",
    moreSuggestionsSection: "ଅଧିକ ପରାମର୍ଶ",
    speakButton: "କଥା ହୁଅନ୍ତୁ",
    backToAssistant: "ଇନପୁଟ୍ କୁ ଫେରନ୍ତୁ",
    remediesContent: (symptoms) => `ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକ ଯେପରିକି "${symptoms}" ପାଇଁ, ଏହି ଘରୋଇ ଉପଚାରଗୁଡ଼ିକୁ ବିଚାର କରନ୍ତୁ: ବିଶ୍ରାମ ନିଅନ୍ତୁ, ପ୍ରଚୁର ତରଳ ପଦାର୍ଥ ପିଅନ୍ତୁ, ଏବଂ ଗରମ ସୁପ୍ ଖାଆନ୍ତୁ।`,
    ayurvedicContent: (symptoms) => `"${symptoms}" ପାଇଁ ଆୟୁର୍ବେଦିକ ପରାମର୍ଶରେ ଅଦା-ତୁଳସୀ ଭଳି ହର୍ବାଲ୍ ଚା, ହାଲୁକା ଏବଂ ସହଜରେ ହଜମ ହେଉଥିବା ଭୋଜନ, ଏବଂ ଧ୍ୟାନ ଅଭ୍ୟାସ କରିବା ଅନ୍ତର୍ଭୁକ୍ତ।`,
    modernContent: (symptoms) => `"${symptoms}" ପାଇଁ ଆଧୁନିକ ଚିକିତ୍ସା ପଦ୍ଧତିରେ ଯଦି ଲାଗୁ ହୁଏ, ତେବେ ଓଭର-ଦି-କାଉଣ୍ଟର ଯନ୍ତ୍ରଣା ନିବାରକ ଏବଂ ସଠିକ୍ ରୋଗ ନିର୍ଣ୍ଣୟ ଏବଂ ଚିକିତ୍ସା ପାଇଁ ଡାକ୍ତରଙ୍କ ସହିତ ପରାମର୍ଶ କରିବା ଅନ୍ତର୍ଭୁକ୍ତ ହୋଇପାରେ।`,
    suggestionsContent: (symptoms) => `ଆପଣଙ୍କ ଲକ୍ଷଣଗୁଡ଼ିକ ଯେପରିକି "${symptoms}" ଆଧାରରେ: ସାମାନ୍ୟ କ୍ଷେତ୍ରରେ 3-5 ଦିନରେ ସୁସ୍ଥ ହେବାକୁ ଆଶା କରନ୍ତୁ। ଭଲ ଭାବରେ ହାଇଡ୍ରେଟେଡ୍ ରୁହନ୍ତୁ (ଦିନକୁ 2-3 ଲିଟର ପାଣି)। ଫଳ ଏବଂ ପନିପରିବା ଭଳି ହାଲୁକା, ପୁଷ୍ଟିକର ଖାଦ୍ୟ ଖାଆନ୍ତୁ। ତେଲିଆ ଏବଂ ମସଲାଯୁକ୍ତ ଖାଦ୍ୟରୁ ଦୂରେଇ ରୁହନ୍ତୁ। ଯଦି ଲକ୍ଷଣଗୁଡ଼ିକ ଖରାପ ହୁଏ, ତୁରନ୍ତ ଚିକିତ୍ସା ସହାୟତା ଲୋଡ଼ନ୍ତୁ।`,
  },
  fr: { // French
    websiteTitle: "Assistant Médical Multilingue",
    tagline: "Votre Compagnon de Santé Personnel, Dans N'importe Quelle Langue.",
    welcome: "Bienvenue sur Assistant Médical Multilingue, votre assistant médical multilingue innovant. Nous sommes là pour vous fournir des conseils de santé instantanés et fiables, adaptés à vos besoins et accessibles dans votre langue préférée.",
    symptomEntryTitle: "Saisie Facile des Symptômes",
    symptomEntryText1: "Que vous préfériez taper vos symptômes ou les prononcer à voix haute, notre assistant simplifie les choses. Décrivez simplement ce que vous ressentez, et notre système intelligent commencera à comprendre vos préoccupations de santé.",
    symptomEntryText2: "Notre interface intuitive prend en charge la saisie de texte et la reconnaissance vocale avancée, garantissant une expérience confortable et efficace pour tous.",
    multilingualTitle: "Comprendre et Être Compris, Globalement",
    multilingualText1: "La langue ne devrait jamais être un obstacle à la santé. Cet assistant est conçu pour être véritablement multilingue, vous permettant d'interagir dans pratiquement n'importe quelle langue de votre choix. Notre système traite votre saisie et fournit des réponses dans la langue que vous comprenez le mieux.",
    multilingualText2: "Cette fonctionnalité garantit que les personnes de toutes les origines linguistiques peuvent accéder à des informations de santé vitales sans confusion ni délai.",
    healthInsightsTitle: "Conseils de Santé Holistiques",
    healthInsightsText1: "Une fois vos symptômes compris, notre assistant fournit un aperçu complet des problèmes de santé potentiels, ainsi que diverses approches de soins. Vous recevrez des détails sur :",
    homeRemedies: "Remèdes Maison :",
    ayurvedicApproaches: "Approches Ayurvédiques :",
    modernMedicine: "Détails de la Médecine Moderne :",
    healthInsightsText2: "Notre objectif est de vous donner les connaissances nécessaires pour vous aider à prendre des décisions éclairées concernant votre santé.",
    callToActionTitle: "Prêt à Expérimenter une Assistance Santé Plus Intelligente ?",
    callToActionText: "Commencez votre voyage vers une meilleure compréhension de la santé avec Assistant Médical Multilingue dès aujourd'hui. C'est simple, intuitif et toujours là pour vous.",
    getStartedButton: "Commencer Maintenant",
    footerDisclaimer: "Avertissement : Ce site Web fournit des informations générales sur la santé et ne remplace pas un avis médical professionnel. Consultez toujours un professionnel de la santé qualifié pour tout problème de santé.",
    assistantPageTitle: "Commençons !",
    assistantPageSubtitle: "Veuillez fournir vos coordonnées et vos symptômes pour nous aider à mieux vous assister.",
    nameLabel: "Votre Nom :",
    ageLabel: "Votre Âge :",
    symptomsLabel: "Décrivez vos Symptômes :",
    voiceInputButton: "Démarrer la Saisie Vocale",
    submitButton: "Soumettre les Détails",
    selectLanguage: "Sélectionner la Langue :",
    coolPictureAlt: "Une illustration médicale apaisante et futuriste",
    voiceInputPlaceholder: "Parlez vos symptômes...",
    voiceInputNotSupported: "La saisie vocale n'est pas prise en charge dans ce navigateur.",
    processingVoice: "Traitement de la saisie vocale...",
    voiceInputReady: "Saisie vocale prête.",
    voiceInputError: "Erreur de saisie vocale. Veuillez réessayer.",
    voiceInputStopped: "Saisie vocale arrêtée.",
    detailsSubmitted: "Détails soumis ! Nous traitons votre demande.",
    resultsPageTitle: "Vos Aperçus de Santé",
    resultsPageSubtitle: "Voici quelques informations basées sur vos symptômes :",
    homeRemediesSection: "Remèdes Maison",
    ayurvedicMedicinesSection: "Approches Ayurvédiques",
    modernMedicinesSection: "Médecines Modernes",
    moreSuggestionsSection: "Plus de Suggestions",
    speakButton: "Parler",
    backToAssistant: "Retour à la Saisie",
    remediesContent: (symptoms) => `Pour vos symptômes comme "${symptoms}", considérez ces remèdes maison : reposez-vous, buvez beaucoup de liquides et consommez des bouillons chauds.`,
    ayurvedicContent: (symptoms) => `Les suggestions ayurvédiques pour "${symptoms}" incluent des tisanes comme le gingembre-tulsi, des repas légers et facilement digestibles, et la pratique de la méditation.`,
    modernContent: (symptoms) => `L'approche de la médecine moderne pour "${symptoms}" pourrait impliquer des analgésiques en vente libre si applicable, et consulter un médecin pour un diagnostic et un traitement appropriés.`,
    suggestionsContent: (symptoms) => `Basé sur vos symptômes "${symptoms}" : Attendez-vous à un rétablissement en 3-5 jours pour les cas bénins. Restez bien hydraté (2-3 litres d'eau par jour). Mangez des aliments légers et nutritifs comme des fruits et légumes. Évitez les aliments gras et épicés. Si les symptômes s'aggravent, consultez immédiatement un médecin.`,
  },
  de: { // German
    websiteTitle: "Mehrsprachiger Medizinischer Assistent",
    tagline: "Ihr persönlicher Gesundheitsbegleiter, in jeder Sprache.",
    welcome: "Willkommen beim Mehrsprachigen Medizinischen Assistenten, Ihrem innovativen mehrsprachigen medizinischen Assistenten. Wir sind hier, um Ihnen sofortige, zuverlässige Gesundheitsberatung zu bieten, die auf Ihre Bedürfnisse zugeschnitten und in Ihrer bevorzugten Sprache zugänglich ist.",
    symptomEntryTitle: "Mühelose Symptomeingabe",
    symptomEntryText1: "Egal, ob Sie Ihre Symptome tippen oder laut aussprechen möchten, unser Assistent macht es einfach. Beschreiben Sie einfach, wie Sie sich fühlen, und unser intelligentes System beginnt, Ihre gesundheitlichen Bedenken zu verstehen.",
    symptomEntryText2: "Unsere intuitive Benutzeroberfläche unterstützt sowohl die Texteingabe als auch die fortschrittliche Spracherkennung und gewährleistet so ein komfortables und effizientes Erlebnis für alle.",
    multilingualTitle: "Verstehen und Verstanden Werden, Global",
    multilingualText1: "Sprache sollte niemals ein Hindernis für die Gesundheit sein. Dieser Assistent wurde entwickelt, um wirklich mehrsprachig zu sein, sodass Sie in praktisch jeder Sprache Ihrer Wahl interagieren können. Unser System verarbeitet Ihre Eingaben und liefert Antworten in der Sprache, die Sie am besten verstehen.",
    multilingualText2: "Diese Funktion stellt sicher, dass Menschen aus allen sprachlichen Hintergründen ohne Verwirrung oder Verzögerung auf wichtige Gesundheitsinformationen zugreifen können.",
    healthInsightsTitle: "Ganzheitliche Gesundheitsberatung",
    healthInsightsText1: "Sobald Ihre Symptome verstanden sind, bietet unser Assistent einen umfassenden Überblick über potenzielle Gesundheitsprobleme sowie verschiedene Behandlungsansätze. Sie erhalten Details zu:",
    homeRemedies: "Hausmittel:",
    ayurvedicApproaches: "Ayurvedische Ansätze:",
    modernMedicine: "Details zur modernen Medizin:",
    healthInsightsText2: "Unser Ziel ist es, Sie mit Wissen zu befähigen, um Ihnen zu helfen, fundierte Entscheidungen über Ihre Gesundheit zu treffen.",
    callToActionTitle: "Bereit für intelligentere Gesundheitsassistenz?",
    callToActionText: "Beginnen Sie noch heute Ihre Reise zu einem besseren Gesundheitsverständnis mit dem Mehrsprachigen Medizinischen Assistenten. Es ist einfach, intuitiv und immer für Sie da.",
    getStartedButton: "Jetzt starten",
    footerDisclaimer: "Haftungsausschluss: Diese Website bietet allgemeine Gesundheitsinformationen und ist kein Ersatz für professionelle medizinische Beratung. Konsultieren Sie bei gesundheitlichen Bedenken immer einen qualifizierten Gesundheitsdienstleister.",
    assistantPageTitle: "Lass uns anfangen!",
    assistantPageSubtitle: "Bitte geben Sie Ihre Daten und Symptome an, damit wir Ihnen besser helfen können.",
    nameLabel: "Ihr Name:",
    ageLabel: "Ihr Alter:",
    symptomsLabel: "Beschreiben Sie Ihre Symptome:",
    voiceInputButton: "Spracheingabe starten",
    submitButton: "Details absenden",
    selectLanguage: "Sprache auswählen:",
    coolPictureAlt: "Eine beruhigende und futuristische medizinische Illustration",
    voiceInputPlaceholder: "Sprechen Sie Ihre Symptome...",
    voiceInputNotSupported: "Spracheingabe wird in diesem Browser nicht unterstützt.",
    processingVoice: "Spracheingabe wird verarbeitet...",
    voiceInputReady: "Spracheingabe bereit.",
    voiceInputError: "Spracheingabefehler. Bitte versuchen Sie es erneut.",
    voiceInputStopped: "Spracheingabe gestoppt.",
    detailsSubmitted: "Details übermittelt! Wir bearbeiten Ihre Anfrage.",
    resultsPageTitle: "Ihre Gesundheitserkenntnisse",
    resultsPageSubtitle: "Hier sind einige Informationen basierend auf Ihren Symptomen:",
    homeRemediesSection: "Hausmittel",
    ayurvedicMedicinesSection: "Ayurvedische Ansätze",
    modernMedicinesSection: "Moderne Medizin",
    moreSuggestionsSection: "Weitere Vorschläge",
    speakButton: "Sprechen",
    backToAssistant: "Zurück zur Eingabe",
    remediesContent: (symptoms) => `Für Ihre Symptome wie „${symptoms}“ sollten Sie diese Hausmittel in Betracht ziehen: Ruhe, viel Flüssigkeit trinken und warme Brühen zu sich nehmen.`,
    ayurvedicContent: (symptoms) => `Ayurvedische Vorschläge für „${symptoms}“ umfassen Kräutertees wie Ingwer-Tulsi, leichte und leicht verdauliche Mahlzeiten sowie Meditationsübungen.`,
    modernContent: (symptoms) => `Der moderne medizinische Ansatz für „${symptoms}“ könnte, falls zutreffend, rezeptfreie Schmerzmittel und die Konsultation eines Arztes für eine korrekte Diagnose und Behandlung umfassen.`,
    suggestionsContent: (symptoms) => `Basierend auf Ihren Symptomen „${symptoms}“: Erwarten Sie eine Genesung in 3-5 Tagen bei leichten Fällen. Bleiben Sie gut hydriert (2-3 Liter Wasser täglich). Essen Sie leichte, nahrhafte Lebensmittel wie Obst und Gemüse. Vermeiden Sie fettige und scharfe Speisen. Wenn sich die Symptome verschlimmern, suchen Sie sofort ärztliche Hilfe auf.`,
  },
};

// List of available languages for the dropdown
const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी (Hindi)' },
  { value: 'es', label: 'Español (Spanish)' },
  { value: 'fr', label: 'Français (French)' },
  { value: 'de', label: 'Deutsch (German)' },
  { value: 'te', label: 'తెలుగు (Telugu)' },
  { value: 'ta', label: 'தமிழ் (Tamil)' },
  { value: 'ur', label: 'اردو (Urdu)' },
  { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { value: 'ml', label: 'മലയാളം (Malayalam)' },
  { value: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  // Add more languages here as needed
  // { value: 'bn', label: 'বাংলা (Bengali)' },
  // { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
  // { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  // { value: 'mr', label: 'मराठी (Marathi)' },
  // { value: 'ar', label: 'العربية (Arabic)' },
  // { value: 'zh', label: '中文 (Chinese)' },
  // { value: 'ja', label: '日本語 (Japanese)' },
  // { value: 'ru', label: 'Русский (Russian)' },
];

// Simple Modal Component
const Modal = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg font-semibold mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ onGetStarted, currentLanguage }) => {
  const t = translations[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800">
      {/* Header Section */}
      <header className="bg-white shadow-lg py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
            <span className="block">{t.websiteTitle}</span>
          </h1>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {t.tagline.split(',').map((part, index) => (
              <React.Fragment key={index}>
                {part.trim()}
                {index === 0 && <br className="hidden sm:inline" />}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.welcome}
          </p>
        </section>

        {/* Feature Section 1: Symptom Input */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t.symptomEntryTitle}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t.symptomEntryText1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.symptomEntryText2}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Placeholder for an image related to text/voice input */}
            <img
              src="https://placehold.co/600x400/ADD8E6/000000?text=Text/Voice+Input"
              alt="Text and Voice Input for Symptoms"
              className="rounded-xl shadow-lg w-full max-w-md h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/ADD8E6/000000?text=Image+Not+Found'; }}
            />
          </div>
        </section>

        {/* Feature Section 2: Multilingual Support */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t.multilingualTitle}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t.multilingualText1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.multilingualText2}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Placeholder for an image related to multilingual support */}
            <img
              src="https://placehold.co/600x400/90EE90/000000?text=Multilingual+Support"
              alt="Multilingual Support"
              className="rounded-xl shadow-lg w-full max-w-md h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/90EE90/000000?text=Image+Not+Found'; }}
            />
          </div>
        </section>

        {/* Feature Section 3: Comprehensive Health Insights */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t.healthInsightsTitle}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t.healthInsightsText1}
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 pl-4">
              <li>
                <span className="font-semibold text-blue-700">{t.homeRemedies}</span> Simple, natural solutions you can try at home.
              </li>
              <li>
                <span className="font-semibold text-green-700">{t.ayurvedicApproaches}</span> Traditional Indian medicine principles for holistic well-being.
              </li>
              <li>
                <span className="font-semibold text-purple-700">{t.modernMedicine}</span> Information on conventional treatments, medications, and when to seek professional medical advice.
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              {t.healthInsightsText2}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            {/* Placeholder for an image related to health insights */}
            <img
              src="https://placehold.co/600x400/FFD700/000000?text=Health+Insights"
              alt="Holistic Health Guidance"
              className="rounded-xl shadow-lg w-full max-w-md h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/FFD700/000000?text=Image+Not+Found'; }}
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-12 bg-blue-600 text-white rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold mb-4">{t.callToActionTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t.callToActionText}
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            {t.getStartedButton}
          </button>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t.websiteTitle}. All rights reserved.</p>
          <p className="mt-2 text-sm">{t.footerDisclaimer}</p>
        </div>
      </footer>
    </div>
  );
};

// Assistant Page Component
const AssistantPage = ({ onBack, currentLanguage, onLanguageChange, onNavigateToResults }) => {
  const t = translations[currentLanguage];
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState(t.voiceInputReady);
  const [modalMessage, setModalMessage] = useState('');
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Listen for a single utterance
      recognitionRef.current.interimResults = false; // Only return final results
      // Set language for speech recognition based on selected UI language
      recognitionRef.current.lang = currentLanguage === 'hi' ? 'hi-IN' :
                                   currentLanguage === 'es' ? 'es-ES' :
                                   currentLanguage === 'fr' ? 'fr-FR' :
                                   currentLanguage === 'de' ? 'de-DE' :
                                   currentLanguage === 'te' ? 'te-IN' :
                                   currentLanguage === 'ta' ? 'ta-IN' :
                                   currentLanguage === 'ur' ? 'ur-PK' : // Or ur-IN
                                   currentLanguage === 'kn' ? 'kn-IN' :
                                   currentLanguage === 'ml' ? 'ml-IN' :
                                   currentLanguage === 'or' ? 'or-IN' :
                                   'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setVoiceStatus(t.processingVoice);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSymptoms(prevSymptoms => prevSymptoms ? prevSymptoms + ' ' + transcript : transcript);
        setIsListening(false);
        setVoiceStatus(t.voiceInputStopped);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setVoiceStatus(t.voiceInputError);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) { // If still listening, means it ended unexpectedly
          setIsListening(false);
          setVoiceStatus(t.voiceInputStopped);
        }
      };
    } else {
      setVoiceStatus(t.voiceInputNotSupported);
    }

    // Clean up on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [currentLanguage, isListening, t]); // Re-initialize if language changes

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
        setVoiceStatus(t.voiceInputStopped);
      } else {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error("Error starting speech recognition:", error);
          setVoiceStatus(t.voiceInputError);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to a backend or an LLM
    console.log({ name, age, symptoms, currentLanguage });
    setModalMessage(t.detailsSubmitted); // Show modal
    setTimeout(() => {
      setModalMessage(''); // Close modal
      onNavigateToResults({ name, age, symptoms }); // Navigate to results page
    }, 1500); // Simulate processing time
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 font-sans text-gray-800 flex flex-col">
      {/* Header with Language Selector */}
      <header className="bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          &larr; Back to Home
        </button>
        <h1 className="text-3xl font-extrabold text-purple-700 tracking-tight">
          {t.websiteTitle}
        </h1>
        <div className="flex items-center">
          <label htmlFor="language-select" className="mr-2 text-gray-700 font-semibold">{t.selectLanguage}</label>
          <select
            id="language-select"
            value={currentLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.assistantPageTitle}</h2>
            <p className="text-xl text-gray-600">{t.assistantPageSubtitle}</p>
          </div>

          {/* Cool Picture Display */}
          <div className="mb-10 flex justify-center">
            <img
              src="https://placehold.co/800x450/C3B1E1/FFFFFF?text=Health+Assistant+Image"
              alt={t.coolPictureAlt}
              className="rounded-2xl shadow-lg w-full max-w-2xl h-auto object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x450/C3B1E1/FFFFFF?text=Image+Not+Found'; }}
            />
          </div>

          {/* User Data Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                {t.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-2">
                {t.ageLabel}
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                placeholder="e.g., 30"
                min="0"
                max="120"
                required
              />
            </div>

            <div>
              <label htmlFor="symptoms" className="block text-lg font-medium text-gray-700 mb-2">
                {t.symptomsLabel}
              </label>
              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="6"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                placeholder={t.voiceInputPlaceholder}
                required
              ></textarea>
            </div>

            {/* Voice Input Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`flex items-center justify-center px-6 py-3 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105 shadow-lg
                  ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                disabled={voiceStatus === t.voiceInputNotSupported}
              >
                {isListening ? (
                  <>
                    <svg className="animate-pulse h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.53-2.94 6.4-6.3 6.4S5.7 14.53 5.7 11H4c0 3.98 3.15 7.22 7 7.74V22h2v-3.26c3.85-.52 7-3.76 7-7.74h-1.7z"/>
                    </svg>
                    {t.processingVoice}
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3.53-2.94 6.4-6.3 6.4S5.7 14.53 5.7 11H4c0 3.98 3.15 7.22 7 7.74V22h2v-3.26c3.85-.52 7-3.76 7-7.74h-1.7z"/>
                    </svg>
                    {t.voiceInputButton}
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500">{voiceStatus}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              {t.submitButton}
            </button>
          </form>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t.websiteTitle}. All rights reserved.</p>
        </div>
      </footer>
      <Modal message={modalMessage} onClose={() => setModalMessage('')} />
    </div>
  );
};

// Results Page Component
const ResultsPage = ({ onBack, currentLanguage, name, age, symptoms }) => {
  const t = translations[currentLanguage];

  // Function to speak text
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage; // Set language for speech
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback for unsupported browsers (using the custom modal)
      // This message itself would ideally be translated too
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 font-sans text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105 shadow-md"
        >
          &larr; {t.backToAssistant}
        </button>
        <h1 className="text-3xl font-extrabold text-teal-700 tracking-tight">
          {t.websiteTitle}
        </h1>
        {/* Language selector is handled by the parent App component */}
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.resultsPageTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {t.resultsPageSubtitle}
            </p>
            <p className="text-lg text-gray-700 mt-4">
              <span className="font-semibold">{t.nameLabel.replace(':', '')}:</span> {name},
              <span className="font-semibold ml-4">{t.ageLabel.replace(':', '')}:</span> {age}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <span className="font-semibold">{t.symptomsLabel.replace(':', '')}:</span> {symptoms}
            </p>
          </div>

          {/* Home Remedies Section */}
          <div className="mb-8 p-6 bg-blue-50 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-blue-800 mb-3 flex items-center justify-between">
              {t.homeRemediesSection}
              <button
                onClick={() => speakText(t.remediesContent(symptoms))}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-full transition duration-300"
              >
                {t.speakButton}
              </button>
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {t.remediesContent(symptoms)}
            </p>
          </div>

          {/* Ayurvedic Medicines Section */}
          <div className="mb-8 p-6 bg-green-50 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-green-800 mb-3 flex items-center justify-between">
              {t.ayurvedicMedicinesSection}
              <button
                onClick={() => speakText(t.ayurvedicContent(symptoms))}
                className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded-full transition duration-300"
              >
                {t.speakButton}
              </button>
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {t.ayurvedicContent(symptoms)}
            </p>
          </div>

          {/* Modern Medicines Section */}
          <div className="mb-8 p-6 bg-purple-50 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-purple-800 mb-3 flex items-center justify-between">
              {t.modernMedicinesSection}
              <button
                onClick={() => speakText(t.modernContent(symptoms))}
                className="bg-purple-500 hover:bg-purple-600 text-white text-sm py-1 px-3 rounded-full transition duration-300"
              >
                {t.speakButton}
              </button>
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {t.modernContent(symptoms)}
            </p>
          </div>

          {/* More Suggestions Section */}
          <div className="mb-8 p-6 bg-yellow-50 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-yellow-800 mb-3 flex items-center justify-between">
              {t.moreSuggestionsSection}
              <button
                onClick={() => speakText(t.suggestionsContent(symptoms))}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-3 rounded-full transition duration-300"
              >
                {t.speakButton}
              </button>
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed">
              {t.suggestionsContent(symptoms)}
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {t.websiteTitle}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Main App Component (Parent)
function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'assistant', 'results'
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language
  const [userData, setUserData] = useState({ name: '', age: '', symptoms: '' });

  const handleGetStarted = () => {
    setCurrentPage('assistant');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNavigateToResults = (data) => {
    setUserData(data);
    setCurrentPage('results');
  };

  const handleBackToAssistant = () => {
    setCurrentPage('assistant');
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage
          onGetStarted={handleGetStarted}
          currentLanguage={currentLanguage}
        />
      )}
      {currentPage === 'assistant' && (
        <AssistantPage
          onBack={handleBackToHome}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onNavigateToResults={handleNavigateToResults}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage
          onBack={handleBackToAssistant}
          currentLanguage={currentLanguage}
          name={userData.name}
          age={userData.age}
          symptoms={userData.symptoms}
        />
      )}
    </>
  );
}

export default App;
