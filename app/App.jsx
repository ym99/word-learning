import React from 'react';
import Menu from './Menu';
import Progress from './Progress';
import Question from './Question';
import Log from './Log';
import Reaction from './Reaction';

export default class App extends React.Component {
  static propTypes = {
    words: React.PropTypes.shape({
      old: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          spanish: React.PropTypes.string.isRequired,
          spanishComment: React.PropTypes.string,
          english: React.PropTypes.string.isRequired,
          englishComment: React.PropTypes.string,
        })).isRequired,
      new: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          spanish: React.PropTypes.string.isRequired,
          spanishComment: React.PropTypes.string,
          english: React.PropTypes.string.isRequired,
          englishComment: React.PropTypes.string,
        })).isRequired,
    }).isRequired,
  }

  static generateQuestionIndex(questions) {
    return questions.length === 0 ? null : Math.floor(Math.random() * questions.length);
  }

  static generateQuestions({ words }, mode) {
    function createSpanishQuestion(word) {
      return {
        text: word.spanish + (word.spanishComment || ''),
        answer: word.english,
      };
    }

    function createEnglishQuestion(word) {
      return {
        text: word.english + (word.englishComment || ''),
        answer: word.spanish,
      };
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

    for (let i = 0; i < (words.new || []).length; i += 1) {
      for (let c = 0; c < newRatio; c += 1) {
        questions.push(createSpanishQuestion(words.new[i]));
        questions.push(createEnglishQuestion(words.new[i]));
      }
    }

    for (let i = 0; i < (words.old || []).length; i += 1) {
      for (let c = 0; c < oldRatio; c += 1) {
        questions.push(createSpanishQuestion(words.old[i]));
        questions.push(createEnglishQuestion(words.old[i]));
      }
    }

    return questions;
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
          isCorrectAnswer: answer.trim().toUpperCase() === question.answer.trim().toUpperCase(),
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
