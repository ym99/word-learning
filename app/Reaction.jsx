import React from 'react';
import Colors from './utils/Colors';

export default class Reaction extends React.Component {
  static propTypes = {
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
  }

  render() {
    if (this.props.history.length === 0) {
      return null;
    }

    const record = this.props.history[this.props.history.length - 1];

    let color;
    switch (this.props.history[this.props.history.length - 1].correctAnswer) {
      case 'correct':
        color = Colors.green;
        break;

      case 'empty':
        color = Colors.yellow;
        break;

      default:
        color = Colors.red;
        break;
    }

    return (
      <div
        style={({
          textAlign: 'center',
          align: 'center',
        })}
      >
        <div
          style={({
            border: `5px solid ${color}`,
            borderRadius: '0.5em',
            display: 'inline-block',
            padding: '0.25em',
            margin: '0.25em',
            cursor: 'pointer',
            fontSize: 'xx-large',
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
      </div>
    );
  }
}
