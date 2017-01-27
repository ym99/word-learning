import React from 'react';

export default class Progress extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.object.isRequired,
    ).isRequired,
    questions: React.PropTypes.arrayOf(
      React.PropTypes.object.isRequired,
    ).isRequired,
  }

  render() {
    const total = this.props.history.length + this.props.questions.length;

    const records = [];
    this.props.history.forEach((record) => {
      if (records.length === 0 ||
          records[records.length - 1].isCorrectAnswer !== record.isCorrectAnswer) {
        records.push({
          isCorrectAnswer: record.isCorrectAnswer,
          count: 1,
        });
      } else {
        records[records.length - 1].count += 1;
      }
    });

    return (
      <div
        className="progress"
      >
        {records.map((record, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${record.isCorrectAnswer ? 'c' : 'i'}-${record.count}-${index}`}
            className={record.isCorrectAnswer ? 'progress-bar progress-bar-success' : 'progress-bar progress-bar-danger'}
            role="progressbar"
            style={({
              width: (`${((record.count * 100) / total).toFixed(0)}%`),
            })}
          />
        ))}
      </div>
    );
  }
}
