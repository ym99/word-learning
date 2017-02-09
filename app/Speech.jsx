export default class Speech {
  static speechSynthesis = window.speechSynthesis;

  static say({ text, lang, callback }) {
    const utterance = new SpeechSynthesisUtterance(text);

    switch (lang) {
      case 'spanish': utterance.lang = 'es'; break;
      case 'english': utterance.lang = 'en'; break;
      default: break;
    }

    if (callback) {
      utterance.onend = callback;
    }

    speechSynthesis.speak(utterance);
  }

  static sayQuestion({ question, callback }) {
    Speech.say({
      text: question.text,
      lang: question.lang,
      callback,
    });
  }

  static sayAnswers({ question, callback }) {
    Speech.say({
      text: question.answers.join(', '),
      lang: question.answerLang,
      callback,
    });
  }
}
