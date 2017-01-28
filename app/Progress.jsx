import React from 'react';

export default class Progress extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        isCorrectAnswer: React.PropTypes.bool.isRequired,
        question: React.PropTypes.shape({
          text: React.PropTypes.string.isRequired,
          answer: React.PropTypes.string.isRequired,
        }).isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    questions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }

  render() {
    const total = this.props.history.length + this.props.questions.length;

    const records = [];
    this.props.history.forEach((record) => {
      if (records.length === 0 ||
          records[records.length - 1].isCorrectAnswer !== record.isCorrectAnswer) {
        records.push({
          id: record.id,
          isCorrectAnswer: record.isCorrectAnswer,
          count: 1,
        });
      } else {
        records[records.length - 1].id = record.id;
        records[records.length - 1].count += 1;
      }
    });

    return (
      <div
        className="progress"
      >
        {records.map(record => (
          <div
            key={record.id}
            className={record.isCorrectAnswer ? 'progress-bar progress-bar-success' : 'progress-bar progress-bar-danger'}
            role="progressbar"
            style={({
              width: (`${((record.count * 100) / total).toString()}%`),
            })}
          />
        ))}
      </div>
    );
  }
}
