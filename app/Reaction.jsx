import React from 'react';

export default class Reaction extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        correctAnswer: React.PropTypes.oneOf([
          'correct',
          'incorrect',
          'empty',
        ]).isRequired,
      }).isRequired,
    ).isRequired,
  };

  render() {
    if (this.props.history.length === 0) {
      return null;
    }

    let className;
    let color;
    switch (this.props.history[this.props.history.length - 1].correctAnswer) {
      case 'correct':
        className = 'glyphicon glyphicon-ok-sign';
        color = '#5cb85c';
        break;

      case 'incorrect':
        className = 'glyphicon glyphicon-minus-sign';
        color = '#d9534f';
        break;

      default:
        className = 'glyphicon glyphicon-question-sign';
        color = '#f0ad4e';
        break;
    }

    return (
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
          className={className}
          style={({
            fontSize: '15em',
            color,
          })}
        />
      </div>
    );
  }
}
