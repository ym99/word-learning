import React from 'react';
import Flag from './Flag';
import Answer from './Answer';

export default class Question extends React.Component {
  static propTypes = {
    question: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      lang: React.PropTypes.string.isRequired,
      answerLang: React.PropTypes.string.isRequired,
    }).isRequired,
    processAnswer: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasAnswerTextErrors: false,
      answerText: '',
    };

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerReady = this.handleAnswerReady.bind(this);
  }

  handleAnswerChange(answerText) {
    this.setState({
      hasAnswerTextErrors: !answerText.match(/^[ A-Za-z]*$/),
      answerText,
    });
  }

  handleAnswerReady() {
    if (!this.state.hasAnswerTextErrors) {
      this.props.processAnswer(this.state.answerText);

      this.setState({
        hasAnswerTextErrors: false,
        answerText: '',
      });
    }
  }

  render() {
    return (
      <div
        key={this.props.question.id}
        className="input-group"
        style={({
          width: '100%',
        })}
      >
        <div
          style={({
            display: 'table',
            margin: '0 auto',
          })}
        >
          <Flag lang={this.props.question.lang} />
          <span
            className="input-group-addon"
            style={({
              width: '10em',
              textAlign: 'right',
            })}
          >{this.props.question.text}</span>
          <Answer
            hasAnswerTextErrors={this.state.hasAnswerTextErrors}
            answerText={this.state.answerText}
            onAnswerChange={this.handleAnswerChange}
            onAnswerReady={this.handleAnswerReady}
          />
          <button
            className="btn btn-default"
            type="button"
            disabled={this.state.hasAnswerTextErrors}
            onClick={this.handleAnswerReady}
          >
            Check
          </button>
          <Flag lang={this.props.question.answerLang} />
        </div>
      </div>
    );
  }
}
