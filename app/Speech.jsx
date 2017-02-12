function sayText(text, lang, callback) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;

  switch (lang) {
    case 'spanish': utterance.lang = 'es'; break;
    case 'english': utterance.lang = 'en'; break;
    default: break;
  }

  if (callback) {
    utterance.addEventListener(
      'end',
      () => window.setTimeout(callback, 0),
    );
  }

  window.speechSynthesis.speak(utterance);
}

export function say(entities, callback) {
  if (entities.length === 0) {
    if (callback) {
      callback();
    }

    return;
  }

  const entity = entities[0];

  const others = [...entities];
  others.splice(0, 1);

  if (entity.question) {
    sayText(
      entity.question.text,
      entity.question.lang,
      () => say(others, callback),
    );

    return;
  }

  if (entity.answers) {
    sayText(
      entity.answers.answers.join(', '),
      entity.answerLang,
      () => say(others, callback),
    );

    return;
  }

  if (entity.english) {
    sayText(
      entity.english,
      'english',
      () => say(others, callback),
    );

    return;
  }

  if (entity.spanish) {
    sayText(
      entity.spanish,
      'spanish',
      () => say(others, callback),
    );

    return;
  }

  say(others, callback);
}
