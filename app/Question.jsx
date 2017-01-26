import React from 'react';
import Answer from './Answer';

export default class Question extends React.Component {
  static propTypes = {
    index: React.PropTypes.number.isRequired,
    question: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
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
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.question.text}</td>
        <td>
          <Answer
            hasAnswerTextErrors={this.state.hasAnswerTextErrors}
            answerText={this.state.answerText}
            onAnswerChange={this.handleAnswerChange}
            onAnswerReady={this.handleAnswerReady}
          />
        </td>
        <td>
          <button
            type="button"
            disabled={this.state.hasAnswerTextErrors}
            onClick={this.handleAnswerReady}
          >
            Check
          </button>
        </td>
      </tr>
    );
  }
}
