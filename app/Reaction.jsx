import React from 'react';

export default class Reaction extends React.Component {
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
  };

  render() {
    const isCorrect = this.props.history.length === 0 ? null :
      this.props.history[this.props.history.length - 1].isCorrectAnswer;

    return isCorrect === null ? null : (
      <div
        style={({
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '1000',
          textAlign: 'center',
        })}
      >
        <span
          className={isCorrect ? 'glyphicon glyphicon-ok-circle' : 'glyphicon glyphicon-ban-circle'}
          style={({
            fontSize: '15em',
            color: (isCorrect ? '#5cb85c' : 'rgb(217, 83, 79)'),
          })}
        />
      </div>
    );
  }
}
