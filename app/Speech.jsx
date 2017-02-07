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

  static sayQuestion(question) {
    Speech.say(question.text, question.lang);
  }

  static sayIs() {
    Speech.say('is', 'english');
  }

  static sayAnswers(question) {
    Speech.say(question.answers.join(', '), question.answerLang);
  }
}
