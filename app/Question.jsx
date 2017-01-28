import React from 'react';
import Answer from './Answer';

export default class Question extends React.Component {
  static propTypes = {
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      answer: React.PropTypes.string.isRequired,
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
      <div className="input-group">
        <span className="input-group-addon">{this.props.question.text}</span>
        <Answer
          hasAnswerTextErrors={this.state.hasAnswerTextErrors}
          answerText={this.state.answerText}
          onAnswerChange={this.handleAnswerChange}
          onAnswerReady={this.handleAnswerReady}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default"
            type="button"
            disabled={this.state.hasAnswerTextErrors}
            onClick={this.handleAnswerReady}
          >
            Check
          </button>
        </span>
      </div>
    );
  }
}
