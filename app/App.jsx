/* eslint-disable no-nested-ternary */
import React from 'react';
import Menu from './Menu';
import Progress from './Progress';
import Info from './Info';
import History from './History';
import FinalInfo from './FinalInfo';

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

  static getStats({ history }) {
    const total = history.length;
    const correct = history.reduce((accum, record) => accum + (record.isCorrectAnswer ? 1 : 0), 0);
    const percent = total === 0 ? null : correct / total;
    const grade =
      percent === null ? null :
      percent >= 0.94 ? 'A' :
      percent >= 0.90 ? 'A-' :
      percent >= 0.87 ? 'B+' :
      percent >= 0.83 ? 'B' :
      percent >= 0.80 ? 'B-' :
      percent >= 0.77 ? 'C+' :
      percent >= 0.73 ? 'C' :
      percent >= 0.70 ? 'C-' :
      percent >= 0.67 ? 'D+' :
      percent >= 0.60 ? 'D' :
                        'F'
    ;

    return {
      total,
      correct,
      percentInfo: percent === null ? '' : `${(percent * 100).toFixed(0)}% correct`,
      grade,
      gradeClass:
        percent === null ? '' :
        grade.startsWith('A') ? 'label label-success' :
        grade.startsWith('B') ? 'label label-info' :
        grade.startsWith('C') ? 'label label-warning' :
                                'label label-danger',
    };
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
    };

    this.processAnswer = this.processAnswer.bind(this);
    this.changeMode = this.changeMode.bind(this);
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
          isCorrectAnswer: answer.trim().toUpperCase() === question.answer.trim().toUpperCase(),
          question,
          answer,
        }],
      };
    });
  }

  render() {
    const noQuestions = this.state.questionIndex === null;
    const stats = App.getStats(this.state);

    return (
      <div>
        <Menu mode={this.state.mode} changeMode={this.changeMode} />
        <Info stats={stats} words={this.props.words} />
        <Progress history={this.state.history} questions={this.state.questions} />
        <div className="input-group">
          <span className="input-group-addon">Some words in spanish</span>
          <input type="text" className="form-control" />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">
              Check
            </button>
          </span>
        </div>
        <History
          question={noQuestions ? null : this.state.questions[this.state.questionIndex]}
          history={this.state.history}
          processAnswer={this.processAnswer}
        />
        {noQuestions &&
          <FinalInfo stats={stats} words={this.props.words} />
        }
      </div>
    );
  }
}
