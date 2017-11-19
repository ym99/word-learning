export const words = [
    /* 001 */ { spanish: 'gracias', english: 'thanks' },
    /* 002 */ { spanish: 'ser', english: 'to be + somebody' },
    /* 003 */ { onlyToEnglish: true, spanish: 'a', english: 'to' },
    /* 004 */ { spanish: 'ir', english: 'to go' },
    /* 005 */ { spanish: 'estar', english: 'to be + location, feeling' },
    /* 006 */ { spanish: 'bueno', english: 'good' },
    /* 007 */ { spanish: 'de', english: 'of' },
    /* 008 */ { spanish: 'su', english: ['your', 'her', 'his', 'their'] },
    /* 009 */ { spanish: 'hacer', english: ['to do', 'to make'] },

    /* 010 */ { spanish: 'amigo', english: 'friend' },
    /* 011 */ { spanish: 'por favor', english: 'please' },
    /* 012 */ { spanish: 'no', english: 'no' },
    /* 013 */ { spanish: 'en', english: ['on', 'in'] },
    /* 014 */ { spanish: 'haber', english: 'to have + auxiliary, supportive verb' },
    /* 015 */ { spanish: 'tener', english: ['to have + to possess', 'to possess'] },
    /* 016 */ { spanish: ['un', 'uno', 'una'], english: ['a', 'one'] },
    /* 017 */ { spanish: 'ahora', english: 'now' },
    /* 018 */ { spanish: 'y', english: 'and' },
    /* 019 */ { spanish: 'qué', english: 'what' },

    /* 020 */ { onlyToEnglish: true, spanish: 'por', english: ['for', 'by'] },
    /* 021 */ { spanish: 'amar', english: 'to love' },
    /* 022 */ { spanish: 'quién', english: 'who' },
    /* 023 */ { onlyToEnglish: true, spanish: 'para', english: ['for', 'to'] },
    /* 024 */ { spanish: 'venir', english: 'to come' },
    /* 025 */ { spanish: 'porque', english: 'because' },
    /* 026 */ { spanish: ['el', 'la', 'los', 'las'], english: 'the' },
    /* 027 */ { spanish: 'antes', english: 'before' },
    /* 028 */ { spanish: 'más', english: 'more' },
    /* 029 */ { spanish: 'bien', english: 'well' },

    /* 030 */ { spanish: ['aqui', 'alli'], english: ['here', 'there'] },
    /* 031 */ { spanish: 'querer', english: 'to want' },
    /* 032 */ { spanish: 'hola', english: 'hello' },
    /* 033 */ { spanish: 'tú', english: 'you + singular' },
    /* 034 */ { spanish: 'poder', english: 'to be able' },
    /* 035 */ { spanish: 'gustar', english: ['to be pleasing', 'to like'] },
    /* 036 */ { spanish: 'poner', english: 'to put' },
    /* 037 */ { spanish: 'casi', english: 'almost' },
    /* 038 */ { spanish: 'saber', english: 'to know + fact or skill' },
    /* 039 */ { spanish: 'como', english: ['like', 'as'] },

    /* 040 */ { spanish: 'donde', english: 'where' },
    /* 041 */ { spanish: 'dar', english: 'to give' },
    /* 042 */ { spanish: 'pero', english: 'but' },
    /* 043 */ { spanish: 'se', english: ['itself', 'herself', 'himself', 'themselves'] },
    /* 044 */ { spanish: 'mucho', english: 'much' },
    /* 045 */ { spanish: 'nuevo', english: 'new' },
    /* 046 */ { spanish: 'cuando', english: 'when' },
    /* 047a*/ { spanish: 'chico', english: 'boy' },
    /* 047b*/ { spanish: 'chica', english: 'girl' },
    /* 048 */ { spanish: ['entender', 'comprender'], english: 'to understand' },
    /* 049 */ { spanish: 'si', english: ['if', 'yes'] },

    /* 050 */ { spanish: 'o', english: 'or' },
    /* 051 */ { spanish: 'feliz', english: 'happy' },
    /* 052 */ { spanish: 'todo', english: ['all', 'every'] },
    /* 053 */ { spanish: 'mismo', english: 'same' },
    /* 054 */ { spanish: 'muy', english: 'very' },
    /* 055 */ { spanish: 'nunca', english: 'never' },
    /* 056 */ { spanish: 'yo', english: 'I' },
    /* 057 */ // coded in 049:si -> yes
    /* 058a*/ { spanish: 'grande', english: 'big' },
    /* 058b*/ { spanish: 'gran', english: 'great' },
    /* 059 */ { spanish: 'deber', english: ['to owe', 'should'] },

    /* 060 */ { spanish: 'usted', english: 'you + plural' },
    /* 061 */ { spanish: 'bajo', english: ['low', 'under'] },
    /* 062 */ { spanish: 'otro', english: 'other' },
    /* 063 */ { spanish: 'salir', english: 'to leave' },
    /* 064 */ { spanish: 'hora', english: 'hour' },
    /* 065 */ { spanish: 'desde', english: 'from' },
    /* 066 */ { spanish: 'ver', english: ['to see', 'to watch'] },
    /* 067 */ { spanish: ['malo', 'mal'], english: 'bad' },
    /* 068 */ { spanish: 'pensar', english: 'to think' },
    /* 069 */ { spanish: 'hasta', english: 'until' },

    /* 070 */ // ['tanto', 'tan'], '?', ' used in making comparison' },
    /* 071 */ { spanish: 'entre', english: ['between', 'among'] },
    /* 072 */ { spanish: 'durante', english: 'during' },
    /* 073 */ { spanish: 'llevar', english: ['to wear', 'to carry'] },
    /* 074 */ { spanish: 'siempre', english: 'always' },
    /* 075 */ { spanish: 'empezar', english: 'to begin' },
    /* 076a*/ { spanish: 'él', english: 'he' },
    /* 076b*/ { spanish: 'ella', english: 'she' },
    /* 076c*/ { spanish: ['ellos', 'ellas'], english: 'they' },
    /* 077 */ { spanish: 'leer', english: 'to read' },
    /* 078 */ { spanish: 'cosa', english: 'thing' },
    /* 079 */ { spanish: 'sacar', english: ['to take out', 'to remove'] },

    /* 080 */ { spanish: 'conocer', english: 'to know + person or place' },
    /* 081 */ { spanish: 'primero', english: 'first' },
    /* 082 */ { spanish: 'andar', english: 'to walk + when enjoying ...' },
    /* 083 */ { spanish: 'sobre', english: ['over', 'about'] },
    /* 084 */ { spanish: 'echar', english: 'to throw' },
    /* 085 */ { spanish: 'sin', english: 'without' },
    /* 086 */ { spanish: 'decir', english: 'to say' },
    /* 087 */ { spanish: 'trabajar', english: 'to work' },
    /* 088 */ { spanish: 'nosotros', english: 'we' },
    /* 089 */ { spanish: 'tambien', english: 'also' },

    /* 090 */ { spanish: 'adiós', english: 'goodbye' },
    /* 091 */ { spanish: 'comer', english: 'to eat' },
    /* 092 */ { spanish: 'triste', english: 'sad' },
    /* 093 */ { spanish: 'pais', english: 'country' },
    /* 094 */ { spanish: 'escuchar', english: 'to listen' },
    /* 095 */ { spanish: 'hombre', english: 'man' },
    /* 096 */ { spanish: 'mujer', english: 'woman' },
    /* 097 */ // le
    /* 098 */ { spanish: 'creer', english: ['to believe', 'to think + (to believe)'] },
    /* 099 */ { spanish: 'encontrar', english: 'to find' },

    /* 100 */ { spanish: 'beber', english: 'to drink' },

    { spanish: 'mirar', english: 'to look' },
    { spanish: 'hablar', english: 'to talk' },
    { spanish: 'sentir', english: 'to feel' },
    { spanish: 'oir', english: 'to hear' },
    { spanish: 'rapido', english: 'fast' },
    { spanish: 'lento', english: 'slow' },
    { spanish: 'tuerte', english: 'strong + when speaking' },
    { spanish: 'suave', english: 'soft' },
    { spanish: 'caro', english: 'car' },

    { spanish: 'caminar', english: 'to walk + to some location' },
    { spanish: 'plátano', english: 'banana' },
    { spanish: 'respuesta', english: 'answer' },
    { spanish: 'esta', english: 'this + you can touch it' },
    { spanish: 'esa', english: 'that + you can\'t touch it' },
    { spanish: 'con', english: 'with' },
    { spanish: 'salud', english: 'health' },
    { spanish: 'perfecta', english: 'perfect' },

    { spanish: 'dulce', english: 'sweet' },
    { spanish: 'salado', english: 'salty' },
    { spanish: 'sabroso', english: 'tasty' },
    { spanish: 'amargo', english: 'bitter' },
    { spanish: 'agrio', english: 'sour' },

    { spanish: 'huevo', english: 'egg' },
    { spanish: 'leche', english: 'milk' },
    { spanish: 'almuerzo', english: 'lunch' },
    { spanish: 'desayuno', english: 'breakfast' },
    { spanish: 'cereal', english: 'cereal' },
    { spanish: 'salchicha', english: 'sausage' },
    { spanish: 'tocino', english: 'bacon' },
    { spanish: 'yogur', english: 'yogurt' },
    { spanish: 'fresa', english: 'strawberry' },
    { spanish: 'hamburguesa', english: 'hamburger' },
    { spanish: 'jamón', english: 'ham' },
    { spanish: 'manzana', english: 'apple' },
    { spanish: 'cheese', english: 'queso' },

    { spanish: 'comida', english: 'food' },
    { spanish: 'galleta', english: 'cookie' },
    { spanish: 'limón', english: 'lemon' },
    { spanish: 'espaguetis', english: 'spaghetti' },
    { spanish: 'jugo', english: 'juice' },
    { spanish: 'pescado', english: 'fish' },
    { spanish: 'arroz', english: 'rice' },
    { spanish: 'tomate', english: 'tomato' },
    { spanish: 'cebolla', english: 'onion' },
    { spanish: 'pollo', english: 'chicken' },
    { spanish: 'carne', english: 'meat' },
    { spanish: 'mantequilla', english: 'butter' },
    { spanish: 'ensalada', english: 'salad' },
    { spanish: 'calorías', english: 'calories' },
    { spanish: 'grasa', english: 'grease' },
    { spanish: 'sal', english: 'salt' },
    { spanish: 'tostada', english: 'toast' },

    { spanish: 'enfermo', english: 'sick' },
    { spanish: 'cansado', english: 'tired' },
    { spanish: 'triste', english: 'sad' },
    { spanish: 'sediento', english: 'thirsty' },
    { spanish: 'hambriento', english: 'hungry' },
    { spanish: 'mejor', english: 'best' },

    { spanish: 'pelar', english: 'to peel' },
    { spanish: 'necesitar', english: 'to need' },

    { spanish: 'logar', english: 'place' },
    { spanish: 'plaza', english: 'square' },
    { spanish: 'oficina', english: 'office' },
    { spanish: 'casa', english: 'home' },
    { spanish: 'parque', english: 'park' },
    { spanish: 'restaurante', english: 'restaurant' },
    { spanish: 'baño', english: 'bathroom' },
    { spanish: 'biblioteca', english: 'library' },
    { spanish: 'gimnasio', english: 'fitness center' },
    { spanish: 'escuela', english: 'school' },
    { spanish: 'museo', english: 'museum' },
    { spanish: 'cine', english: ['cinema', 'movie theater'] },
    { spanish: 'cocina', english: 'kitchen' },

    { spanish: ['banito', 'banita'], english: 'pretty' },
    { spanish: 'quedar', english: 'to stay' },
    { spanish: 'viajar', english: 'to travel' },
    { spanish: 'buscar', english: 'to search' },
    { spanish: 'encontrar', english: 'to find' },
    { spanish: 'cocinar', english: 'to cook' },

    { spanish: 'sala', english: 'living room' },
    { spanish: 'cuarto', english: 'room' },
    { spanish: 'sótano', english: 'basement' },
    { spanish: 'teatro', english: 'theater' },
    { spanish: 'ciudad', english: 'city' },
    { spanish: 'iglesia', english: 'church' },

    { spanish: 'jugar', english: 'to play + sport' },
    { spanish: 'tocar', english: 'to play + musical instrument' },
    { spanish: 'escalera', english: 'stairs' },
    { spanish: 'conocimiento', english: 'knowledge' },
    { spanish: 'junto', english: 'together' },
    { spanish: 'padre', english: 'father' },
    { spanish: 'mother', english: 'madre' },
    { spanish: 'papá', english: 'dad' },
    { spanish: 'mamá', english: 'mom' },
    { spanish: 'hermano', english: 'brother' },
    { spanish: 'hermana', english: 'sister' },
    { spanish: 'hijo', english: 'son' },
    { spanish: 'hija', english: 'daughter' },
    { spanish: ['primo', 'prima'], english: 'cousin' },
    { spanish: 'abuelo', english: 'grandfather' },
    { spanish: 'abuela', english: 'grandmother' },

    { onlyToEnglish: true, russian: 'поросёнок', english: 'little pig' },
    { onlyToEnglish: true, russian: 'красавица', english: 'beauty' },

    { spanish: 'compartir', english: 'share' },
    { spanish: 'contigo', english: 'with you' },
    { spanish: 'cena', english: 'dinner' },
    { spanish: 'minuto', english: 'minute' },
    { spanish: 'semana', english: 'week' },
    { spanish: 'fecha', english: 'date' },
    { spanish: 'mes', english: 'month' },
    { spanish: 'año', english: 'year' },
    { spanish: 'cuántos', english: 'how many' },
    { spanish: 'cual', english: 'which' },
    { spanish: 'buenos días', english: 'good morning' },
    { spanish: 'buena noches', english: 'good evening' },
    { spanish: 'buenas noches', english: 'goodnight' },
    { spanish: 'buenas tardes', english: 'good afternoon' },
    { spanish: 'nombre', english: 'name' },
    { spanish: 'llamar', english: 'to call' },
    { spanish: 'ayuda', english: 'help' },
    { spanish: 'ayudar', english: 'to help' },
    { spanish: 'escribir', english: 'to write' },
    { spanish: 'playa', english: 'beach' },
    { spanish: 'vacaciones', english: 'vacation' },
    { spanish: 'pescar', english: 'to fish' },
    { spanish: 'viaje', english: 'trip' },
    { spanish: 'preparar', english: 'to prepare' },
    { spanish: 'fin de semana', english: 'weekend' },
    { spanish: 'nadar', english: 'to swim' },

    { spanish: 'caer', english: 'to fall' },
    { spanish: 'traer', english: 'to bring' },
    { spanish: 'ayer', english: 'yesterday' },
    { spanish: 'vamos', english: 'come on' },
    { spanish: 'trompeta', english: 'trumpet' },
    { spanish: 'hoy', english: 'today' },
    { spanish: 'en punto', english: 'o\'clock' },
    { spanish: 'anoche', english: 'last night' },
    { spanish: 'en la mañana', english: 'morning' },
    { spanish: 'mañana', english: 'tomorrow' },
    { spanish: 'otro día', english: 'other day' },
    { spanish: 'pasado', english: 'past + last' },

    { spanish: 'proximo', english: 'next' },
    { spanish: 'tarde', english: 'afternoon' },
    { spanish: 'después', english: 'after' },
    { spanish: 'invitar', english: 'to invite' },

    { spanish: 'abordar', english: 'to board' },
    { spanish: 'abrazar', english: 'to embrace' },
    { spanish: 'abrir', english: 'to open' },
    { spanish: 'absolver', english: 'to absolve' },
    { spanish: 'acabar de', english: 'to have just' },
    { spanish: 'acabarse', english: 'to use up' },
    { spanish: 'acercarse', english: 'to approach' },
    { spanish: 'aclarar', english: 'to clarify' },
    { spanish: 'acompanar', english: 'to accompany' },
    { spanish: 'aconsejar', english: 'to adivise' },
    { spanish: 'acordarse', english: 'to remember' },
    { spanish: 'acostarse', english: 'to go to bed' },
    { spanish: 'acostumbrar', english: 'to be accustomed' },
    { spanish: 'actuar', english: 'to act' },
    { spanish: 'acusar', english: 'to accuse' },
    { spanish: 'adivinar', english: 'to guess' },
    { hide: true, spanish: 'admitir', english: 'to admit' },
    { hide: true, spanish: 'advertir', english: 'to warn' },
    { hide: true, spanish: 'agotar', english: 'to exhaust' },
    { hide: true, spanish: 'agradar', english: 'to be pleasing' },
    { hide: true, spanish: 'agradecer', english: 'to thank' },
    { hide: true, spanish: 'aguantar', english: 'to tolerate' },
    { hide: true, spanish: 'ahorrar', english: 'to save' },
    { hide: true, spanish: 'alcanzar', english: 'to reach' },
    { hide: true, spanish: 'almorzar', english: 'to have lunch' },
    { hide: true, spanish: 'alquilar', english: 'to rent' },
    { hide: true, spanish: 'alzar', english: 'to lift' },
    { hide: true, spanish: 'amenazar', english: 'to threaten' },
    { hide: true, spanish: 'anadir', english: 'to add' },
    { hide: true, spanish: 'animarse', english: 'to cheer up' },
    { hide: true, spanish: 'anorar', english: 'to yearn' },
    { hide: true, spanish: 'anular', english: 'to annual' },
    { hide: true, spanish: 'anunciar', english: 'to announce' },
    { hide: true, spanish: 'apagar', english: 'to turn off' },
    { hide: true, spanish: 'aparecer', english: 'to appear' },
    { hide: true, spanish: 'aparecer', english: 'to separate' },
    { hide: true, spanish: 'apostar', english: 'to bet' },
    { hide: true, spanish: 'apoyar', english: 'to support' },
    { hide: true, spanish: 'apreciar', english: 'to appreciate' },
    { hide: true, spanish: 'aprender', english: 'to learn' },
    { hide: true, spanish: 'apresurarse', english: 'to hurry' },
    { hide: true, spanish: 'apretar', english: 'to squeeze' },
    { hide: true, spanish: 'aprobar', english: 'to pass' },
    { hide: true, spanish: 'arrancar', english: 'to pull out' },
    { hide: true, spanish: 'arreglar', english: 'to fix' },
    { hide: true, spanish: 'arreglarse', english: 'to get ready' },
    { hide: true, spanish: 'arriesgar', english: 'to risk' },
    { hide: true, spanish: 'asegurar', english: 'to assure' },
    { hide: true, spanish: 'asistir', english: 'to attend' },
    { hide: true, spanish: 'asustarse', english: 'to become scared' },
    { hide: true, spanish: 'atender', english: 'to attend' },
    { hide: true, spanish: 'aterrizar', english: 'to land' },
    { hide: true, spanish: 'atraer', english: 'to attract' },
    { hide: true, spanish: 'atravesar', english: 'to cross' },
    { hide: true, spanish: 'atreverse', english: 'to dare to' },
    { hide: true, spanish: 'averiguar', english: 'to find out' },
    { hide: true, spanish: 'bajarse', english: 'to get off' },
    { hide: true, spanish: 'barrer', english: 'to sweep' },
    { hide: true, spanish: 'basar', english: 'to base' },
    { hide: true, spanish: 'besar', english: 'to kiss' },
    { hide: true, spanish: 'borrar', english: 'to erase' },
    { hide: true, spanish: 'bostezar', english: 'to yawn' },
    { hide: true, spanish: 'broncear', english: 'to drink' },
    { hide: true, spanish: 'caber', english: 'to fit' },
    { hide: true, spanish: 'calentar', english: 'to warm' },
    { hide: true, spanish: 'callarse', english: 'to be quiet' },
    { hide: true, spanish: 'calmarse', english: 'to calm down' },
    { hide: true, spanish: 'cambiar', english: 'to change' },
    { hide: true, spanish: 'captar', english: 'to grasp' },
    { hide: true, spanish: 'cargar', english: 'to load' },
    { hide: true, spanish: 'castigar', english: 'to punish' },
    { hide: true, spanish: 'cenar', english: 'to cine' },
    { hide: true, spanish: 'cerrar', english: 'to close' },
    { hide: true, spanish: 'charlar', english: 'to chat' },
    { hide: true, spanish: 'cobrar', english: '' },
    { hide: true, spanish: 'coger', english: 'to catch' },
    { hide: true, spanish: 'colgar', english: 'to hang up' },
];
/*
    { new: true, spanish: '', english: '' },
    {
        hide: true,
        new: true,
        onlyToEnglish: true, onlyFromEnglish: true,
        spanish: 'word', spanish: 'word + comment', spanish: ['word', 'word'],
        english: '',
        russian: '',
    }

    á Alt + 0225
    é Alt + 0233
    í Alt + 0237
    ó Alt + 0243
    ú Alt + 0250
    ñ Alt + 0241
    ü Alt + 0252
    ¡ Alt + 0161
    ¿ Alt + 0191
*/
