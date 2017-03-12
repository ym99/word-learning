const mute = typeof SpeechSynthesisUtterance === 'undefined';
window.dummyUtterances = [];

function sayText(text, lang, callback) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;

  switch (lang) {
    case 'spanish': utterance.lang = 'es'; break;
    case 'english': utterance.lang = 'en'; break;
    case 'russian': utterance.lang = 'ru'; break;
    default: break;
  }

  if (callback) {
    utterance.addEventListener(
      'end',
      () => window.setTimeout(callback, 0),
    );

    utterance.addEventListener(
      'error',
      () => window.setTimeout(callback, 0),
    );
  }

  window.dummyUtterances.push(utterance);

  window.speechSynthesis.speak(utterance);
}

function dontSayText(text, lang, callback) {
  window.setTimeout(callback, 500);
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
    (mute ? dontSayText : sayText)(
      entity.question.text,
      entity.question.lang,
      () => say(others, callback),
    );

    return;
  }

  if (entity.answers) {
    (mute ? dontSayText : sayText)(
      entity.answers.answers.join(', '),
      entity.answers.answerLang,
      () => say(others, callback),
    );

    return;
  }

  if (entity.english) {
    (mute ? dontSayText : sayText)(
      entity.english,
      'english',
      () => say(others, callback),
    );

    return;
  }

  if (entity.spanish) {
    (mute ? dontSayText : sayText)(
      entity.spanish,
      'spanish',
      () => say(others, callback),
    );

    return;
  }

  if (entity.russian) {
    (mute ? dontSayText : sayText)(
      entity.russian,
      'russian',
      () => say(others, callback),
    );

    return;
  }

  say(others, callback);
}
