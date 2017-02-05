export default class Speech {
  static speechSynthesis = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);

    switch (lang) {
      case 'spanish': utterance.lang = 'es'; break;
      case 'english': utterance.lang = 'en'; break;
      default: break;
    }

    speechSynthesis.speak(utterance);
  }
}
