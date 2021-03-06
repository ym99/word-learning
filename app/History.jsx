import React from 'react';
import Stats from './Stats';
import Colors from './utils/Colors';
import DateEx from './utils/DateEx';
import { say } from './utils/Speech';

export default class History extends React.Component {
  static propTypes = {
    finished: React.PropTypes.bool.isRequired,
    startTime: React.PropTypes.instanceOf(DateEx).isRequired,
    mode: React.PropTypes.oneOf([
      'new',
      'test100',
      'testAll',
    ]),
    questions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        correctAnswer: React.PropTypes.oneOf([
          'correct',
          'incorrect',
          'empty',
        ]).isRequired,
        question: React.PropTypes.shape({
          text: React.PropTypes.string.isRequired,
          lang: React.PropTypes.string.isRequired,
          answerLang: React.PropTypes.string.isRequired,
          answers: React.PropTypes.arrayOf(React.PropTypes.string),
          answerMeaning: React.PropTypes.string,
        }).isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    words: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        new: React.PropTypes.bool,
        hide: React.PropTypes.bool,
      })).isRequired,
  }

  render() {
    const incorrectRecords = [];
    this.props.history.forEach((record) => {
      if (record.correctAnswer !== 'correct') {
        incorrectRecords.unshift(record);
      }
    });

    return (
      <div
        style={({
          align: 'center',
          marginTop: '1em',
        })}
      >
        <Stats
          finished={this.props.finished}
          startTime={this.props.startTime}
          mode={this.props.mode}
          questions={this.props.questions}
          history={this.props.history}
          words={this.props.words}
        />
        {incorrectRecords.map(record => (
          <div
            key={record.id}
            style={({
              border: (record.correctAnswer === 'incorrect' ? `2px solid ${Colors.red}` : `2px solid ${Colors.yellow}`),
              borderRadius: '0.5em',
              display: 'inline-block',
              padding: '0.25em',
              margin: '0.25em',
              cursor: 'pointer',
            })}
            onClick={() => say([
              { question: record.question },
              { english: 'is' },
              { answers: (record.question) },
            ])}
          >
            <span
              style={({
                padding: '0.25em',
              })}
            >{record.question.text}</span>
            <span
              className="glyphicon glyphicon-arrow-right"
            />
            {record.correctAnswer === 'incorrect' &&
              <span
                style={({
                  paddingLeft: '0.25em',
                  color: Colors.red,
                })}
              >
                {record.answer}{record.answerMeaning === null ? '' : ` (${record.answerMeaning})`}
              </span>
            }
            <span
              style={({
                padding: '0.25em',
              })}
            >{record.question.answers.join(', ')}</span>
          </div>
        ))}
      </div>
    );
  }
}
