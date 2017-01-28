import React from 'react';
import Stats from './Stats';

export default class Log extends React.Component {
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
    words: React.PropTypes.shape({
      old: React.PropTypes.array.isRequired,
      new: React.PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const incorrectRecords = [];
    this.props.history.forEach((record) => {
      if (!record.isCorrectAnswer) {
        incorrectRecords.push(record);
      }
    });

    return (
      <div
        style={({
          align: 'center',
          marginTop: '1em',
        })}
      >
        <Stats history={this.props.history} words={this.props.words} />
        {incorrectRecords.map(record => (
          <div
            key={record.id}
            style={({
              border: '1px solid rgb(217, 83, 79)',
              borderRadius: '0.5em',
              display: 'inline-block',
              padding: '0.25em',
              margin: '0.25em',
            })}
          >
            <span
              style={({
                padding: '0.25em',
              })}
            >{record.question.text}</span>
            <span
              className="glyphicon glyphicon-arrow-right"
            />
            {record.answer !== '' &&
              <span
                style={({
                  paddingLeft: '0.25em',
                  textDecoration: 'line-through',
                })}
              >{record.answer}</span>
            }
            <span
              style={({
                padding: '0.25em',
              })}
            >{record.question.answer}</span>
          </div>
        ))}
      </div>
    );
  }
}
