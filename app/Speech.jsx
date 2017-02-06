export default class Speech {
  static speechSynthesis = window.speechSynthesis;

  static say(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);

    switch (lang) {
      case 'spanish': utterance.lang = 'es'; break;
      case 'english': utterance.lang = 'en'; break;
      default: break;
    }

    speechSynthesis.speak(utterance);
  }
}
