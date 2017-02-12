import React from 'react';

export default class Progress extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        correctAnswer: React.PropTypes.oneOf([
          'correct',
          'incorrect',
          'empty',
        ]).isRequired,
      }).isRequired,
    ).isRequired,
    questions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
  }

  render() {
    const total = this.props.history.length + this.props.questions.length;

    const records = [];
    this.props.history.forEach((record) => {
      if (records.length === 0 ||
          records[records.length - 1].correctAnswer !== record.correctAnswer) {
        records.push({
          id: record.id,
          correctAnswer: record.correctAnswer,
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
            className={record.correctAnswer === 'correct' ? 'progress-bar progress-bar-success' :
                       record.correctAnswer === 'incorrect' ? 'progress-bar progress-bar-danger' :
                       'progress-bar progress-bar-warning'
                      }
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
