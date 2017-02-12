import React from 'react';
import Colors from './utils/Colors';

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
        className = 'glyphicon glyphicon-ok-circle';
        color = Colors.green;
        break;

      case 'incorrect':
        className = 'glyphicon glyphicon-ban-circle';
        color = Colors.red;
        break;

      default:
        className = 'glyphicon glyphicon-education';
        color = Colors.yellow;
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
