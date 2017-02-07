import React from 'react';
import Menu from './Menu';
import Progress from './Progress';
import Question from './Question';
import Log from './Log';
import Reaction from './Reaction';

export default class App extends React.Component {
  static propTypes = {
    words: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        hide: React.PropTypes.bool,
        new: React.PropTypes.bool,
        spanish: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string),
        ]).isRequired,
        english: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string),
        ]).isRequired,
      })).isRequired,
  }

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

  static generateQuestions({ words }, mode) {
    function pushQuestions(arr, count, textAndComment, lang, answerOrFew, answerLang) {
      function getQuestionText(value) {
        const splitValue = value.split('+', 2);
        return splitValue[0].trim() + (splitValue.length > 1 ? ` (${splitValue[1].trim()})` : '');
      }

      function getAnswerText(value) {
        return value.split('+', 1)[0].trim();
      }

      for (let c = 0; c < count; c += 1) {
        if (typeof textAndComment === 'string') {
          arr.push({
            id: App.generateUniqueId(),
            text: getQuestionText(textAndComment),
            lang,
            answers: (typeof answerOrFew === 'string' ? [answerOrFew] : answerOrFew).map(answer => getAnswerText(answer)),
            answerLang,
          });
        } else {
          textAndComment.forEach((sourceItem) => {
            arr.push({
              id: App.generateUniqueId(),
              text: getQuestionText(sourceItem),
              lang,
              answers: (typeof answerOrFew === 'string' ? [answerOrFew] : answerOrFew).map(answer => getAnswerText(answer)),
              answerLang,
            });
          });
        }
      }
    }

    let newRatio;
    let oldRatio;
    switch (mode) {
      case 'new':
        newRatio = 10;
        oldRatio = 0;
        break;

      case 'mix':
        newRatio = 5;
        oldRatio = 1;
        break;

      case 'test':
        newRatio = 1;
        oldRatio = 1;
        break;

      default:
        newRatio = 1;
        oldRatio = 1;
        break;
    }

    const questions = [];

    for (let i = 0; i < words.length; i += 1) {
      const word = words[i];

      if (!word.hide) {
        pushQuestions(
          questions,
          (word.new ? newRatio : oldRatio),
          word.spanish,
          'spanish',
          word.english,
          'english',
        );

        pushQuestions(
          questions,
          (word.new ? newRatio : oldRatio),
          word.english,
          'english',
          word.spanish,
          'spanish',
        );
      }
    }

    return questions;
  }

  constructor(props) {
    super(props);

    const mode = 'new';
    const questions = App.generateQuestions(this.props, mode);
    const questionIndex = App.generateQuestionIndex(questions);

    this.state = {
      mode,
      questions,
      questionIndex,
      history: [],
      showReaction: false,
    };

    this.changeMode = this.changeMode.bind(this);
    this.processAnswer = this.processAnswer.bind(this);
  }

  componentDidUpdate() {
    if (this.state.showReaction) {
      setTimeout(() => {
        const newQuestions = [...this.state.questions];
        newQuestions.splice(this.state.questionIndex, 1);

        this.setState({
          questions: newQuestions,
          questionIndex: App.generateQuestionIndex(newQuestions),
          showReaction: false,
        });
      }, 500);
    }
  }

  changeMode(mode) {
    this.setState((prevState, props) => {
      if (!window.confirm('Start over ?')) {
        return {};
      }

      const questions = App.generateQuestions(props, mode);
      const questionIndex = App.generateQuestionIndex(questions);

      return {
        mode,
        questions,
        questionIndex,
        history: [],
      };
    });
  }

  processAnswer(answer) {
    function isCorrectAnswer(question) {
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

      return question.answers.some(_answer => generalize(_answer) === generalize(answer));
    }

    this.setState((prevState) => {
      const question = prevState.questions[prevState.questionIndex];

      return {
        history: [...prevState.history, {
          id: App.generateUniqueId(),
          isCorrectAnswer: isCorrectAnswer(question, answer),
          question,
          answer,
        }],
        showReaction: true,
      };
    });
  }

  render() {
    return (
      <div>
        <Menu mode={this.state.mode} changeMode={this.changeMode} />
        <Progress history={this.state.history} questions={this.state.questions} />
        {this.state.questionIndex !== null &&
          <Question
            reviewMode={this.state.showReaction}
            question={this.state.questions[this.state.questionIndex]}
            processAnswer={this.processAnswer}
          />
        }
        <Log
          history={this.state.history}
          words={this.props.words}
          processAnswer={this.processAnswer}
        />
        {this.state.showReaction &&
          <Reaction history={this.state.history} />
        }
      </div>
    );
  }
}
