import React from 'react';
import Menu from './Menu';
import Progress from './Progress';
import Question from './Question';
import History from './History';
import Reaction from './Reaction';
import DateEx from './utils/DateEx';
import * as statements from './data/statements';
import { words } from './data/words';
import { say } from './utils/Speech';

export default class App extends React.Component {
  static previousUniqueId = 0;
  static generateUniqueId() {
    const date = Date.now();

    if (date <= App.previousUniqueId) {
      App.previousUniqueId += 1;
    } else {
      App.previousUniqueId = date;
    }

    return App.previousUniqueId;
  }

  static generateQuestionIndex(questions) {
    return questions.length === 0 ? null : Math.floor(Math.random() * questions.length);
  }

  static generateQuestions(mode) {
    function pushQuestions({
        questions,
        count,
        newQuestion,
        textAndComment,
        lang,
        answerOrFew,
        answerLang,
      }) {
      function getQuestionText(value) {
        const splitValue = value.split('+', 2);
        return splitValue[0].trim() + (splitValue.length > 1 ? `\n(${splitValue[1].trim()})` : '');
      }

      function getAnswerText(value) {
        return value.split('+', 1)[0].trim();
      }

      for (let c = 0; c < count; c += 1) {
        if (typeof textAndComment === 'string') {
          questions.push({
            id: App.generateUniqueId(),
            newQuestion,
            text: getQuestionText(textAndComment),
            lang,
            answers: (typeof answerOrFew === 'string' ? [answerOrFew] : answerOrFew).map(answer => getAnswerText(answer)),
            answerLang,
          });
        } else {
          textAndComment.forEach((sourceItem) => {
            questions.push({
              id: App.generateUniqueId(),
              newQuestion,
              text: getQuestionText(sourceItem),
              lang,
              answers: (typeof answerOrFew === 'string' ? [answerOrFew] : answerOrFew).map(answer => getAnswerText(answer)),
              answerLang,
            });
          });
        }
      }
    }

    function wordTextAndComment(word) {
      if (word.russian) { return word.russian; }
      if (word.spanish) { return word.spanish; }

      return word.english;
    }

    function wordLang(word) {
      if (word.russian) { return 'russian'; }
      if (word.spanish) { return 'spanish'; }

      return 'english';
    }

    const tempWords = [...words];
    const questions = [];

    for (let i = 0; i < tempWords.length;) {
      const word = tempWords[i];

      if (word.hide) {
        tempWords.splice(i, 1);
      } else if (word.new) {
        if (!word.onlyFromEnglish) {
          pushQuestions({
            questions,
            count: (mode === 'new' ? 3 : 1),
            newQuestion: word.new,
            textAndComment: wordTextAndComment(word),
            lang: wordLang(word),
            answerOrFew: word.english,
            answerLang: 'english',
          });
        }

        if (!word.onlyToEnglish) {
          pushQuestions({
            questions,
            count: (mode === 'new' ? 3 : 1),
            newQuestion: word.new,
            textAndComment: word.english,
            lang: 'english',
            answerOrFew: wordTextAndComment(word),
            answerLang: wordLang(word),
          });
        }

        tempWords.splice(i, 1);
      } else {
        i += 1;
      }
    }

    if (mode === 'test100' || mode === 'testAll') {
      while ((mode === 'testAll' || questions.length < 100) && tempWords.length > 0) {
        const i = Math.floor(Math.random() * tempWords.length);
        const word = tempWords[i];

        if (!word.onlyFromEnglish) {
          pushQuestions({
            questions,
            count: 1,
            newQuestion: word.new,
            textAndComment: wordTextAndComment(word),
            lang: wordLang(word),
            answerOrFew: word.english,
            answerLang: 'english',
          });
        }

        if (!word.onlyToEnglish) {
          pushQuestions({
            questions,
            count: 1,
            newQuestion: word.new,
            textAndComment: word.english,
            lang: 'english',
            answerOrFew: wordTextAndComment(word),
            answerLang: wordLang(word),
          });
        }

        tempWords.splice(i, 1);
      }
    }

    return questions;
  }

  constructor(props) {
    super(props);

    const startTime = new DateEx();
    const mode = words.some(word => !word.hide && word.new) ? 'new' : 'test100';
    const questions = App.generateQuestions(mode);
    const questionIndex = App.generateQuestionIndex(questions);

    this.state = {
      startTime,
      mode,
      questions,
      questionIndex,
      history: [],
      reviewMode: false,
    };

    this.changeMode = this.changeMode.bind(this);
    this.processAnswer = this.processAnswer.bind(this);
  }

  componentDidMount() {
    this.componentDidUpdate();
  }


  componentDidUpdate() {
    function statement(last) {
      const array = last.correctAnswer === 'correct' ? last.question.newQuestion ? statements.correctNew : statements.correctKnown
                  : last.correctAnswer === 'incorrect' ? last.question.newQuestion ? statements.incorrectNew : statements.incorrectKnown
                  : last.question.newQuestion ? statements.emptyNew : statements.emptyKnown;

      return array[Math.floor(Math.random() * array.length)];
    }

    if (this.state.reviewMode) {
      if (this.state.history.length > 0) {
        say([
          statement(this.state.history[this.state.history.length - 1]),
          { answers: this.state.questions[this.state.questionIndex] },
        ], () => {
          const newQuestions = [...this.state.questions];
          newQuestions.splice(this.state.questionIndex, 1);
          const newQuesitonIndex = App.generateQuestionIndex(newQuestions);

          this.setState({
            questions: newQuestions,
            questionIndex: newQuesitonIndex,
            reviewMode: false,
          });
        });
      }
    } else {
      if (this.state.questionIndex !== null) {
        say([
          { english: 'Translate' },
          { question: this.state.questions[this.state.questionIndex] },
        ]);
      }
    }
  }

  changeMode(mode) {
    if (window.confirm('Start over ?')) {
      const questions = App.generateQuestions(mode);
      const questionIndex = App.generateQuestionIndex(questions);
      this.setState({
        startTime: new DateEx(),
        mode,
        questions,
        questionIndex,
        history: [],
      });
    }
  }

  processAnswer(answer) {
    function generalize(value) {
      return value
        .replace(/ /g, '')
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/ñ/g, 'n')
        .replace(/ü/g, 'u')
        .toUpperCase();
    }

    const generalizedAnswer = generalize(answer);

    this.setState((prevState) => {
      const question = prevState.questions[prevState.questionIndex];

      return {
        history: [...prevState.history, {
          id: question.id,
          correctAnswer: generalizedAnswer === '' ? 'empty' : question.answers.some(x => generalize(x) === generalizedAnswer) ? 'correct' : 'incorrect',
          question,
          answer,
          answerMeaning: null,
        }],
        reviewMode: true,
      };
    });
  }

  render() {
    return (
      <div>
        <Menu
          startTime={this.state.startTime}
          mode={this.state.mode}
          changeMode={this.changeMode}
        />
        <Progress history={this.state.history} questions={this.state.questions} />
        {this.state.questionIndex !== null &&
          <Question
            reviewMode={this.state.reviewMode}
            question={this.state.questions[this.state.questionIndex]}
            processAnswer={this.processAnswer}
          />
        }
        <History
          reviewMode={this.state.reviewMode}
          finished={!this.state.reviewMode && this.state.questionIndex === null}
          startTime={this.state.startTime}
          mode={this.state.mode}
          questions={this.state.questions}
          history={this.state.history}
          words={words}
          processAnswer={this.processAnswer}
        />
        {this.state.reviewMode &&
          <Reaction history={this.state.history} />
        }
      </div>
    );
  }
}
