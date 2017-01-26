import React from 'react';

export default class Record extends React.Component {
  static propTypes = {
    index: React.PropTypes.number.isRequired,
    record: React.PropTypes.shape({
      question: React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
      isCorrectAnswer: React.PropTypes.bool.isRequired,
      answer: React.PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <tr
        className={this.props.record.isCorrectAnswer ? 'success' : 'danger'}
      >
        <td>{this.props.index}</td>
        <td>{this.props.record.question.text}</td>
        <td>{this.props.record.answer}</td>
        <td>{this.props.record.question.answer}</td>
      </tr>
    );
  }
}
