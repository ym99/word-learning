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
        spanishComment: React.PropTypes.string,
        english: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string),
        ]).isRequired,
        englishComment: React.PropTypes.string,
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
    function pushQuestions(arr, count, source, comment, target) {
      for (let c = 0; c < count; c += 1) {
        if (typeof source === 'string') {
          arr.push({
            id: App.generateUniqueId(),
            text: source + (comment || ''),
            answers: (typeof target === 'string' ? [target] : target),
          });
        } else {
          source.forEach((sourceItem) => {
            arr.push({
              id: App.generateUniqueId(),
              text: sourceItem + (comment || ''),
              answers: (typeof target === 'string' ? [target] : target),
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
          word.spanishComment,
          word.english,
        );

        pushQuestions(
          questions,
          (word.new ? newRatio : oldRatio),
          word.english,
          word.englishComment,
          word.spanish,
        );
      }
    }

    return questions;
  }

  static isCorrectAnswer(question, answer) {
    return question.answers.some(_answer => _answer.replace(/ /g, '').toUpperCase() === answer.replace(/ /g, '').toUpperCase());
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
        this.setState({
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
    this.setState((prevState) => {
      const question = prevState.questions[prevState.questionIndex];

      const newQuestions = [...prevState.questions];
      newQuestions.splice(prevState.questionIndex, 1);

      return {
        questions: newQuestions,
        questionIndex: App.generateQuestionIndex(newQuestions),
        history: [...prevState.history, {
          id: App.generateUniqueId(),
          isCorrectAnswer: App.isCorrectAnswer(question, answer),
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
