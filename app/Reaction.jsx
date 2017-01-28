import React from 'react';

export default class Reaction extends React.Component {
  static propTypes = {
    reaction: React.PropTypes.oneOf(['correct', 'incorrect']),
  };

  render() {
    const isCorrect = this.props.reaction === 'correct';

    return this.props.reaction === null ? null : (
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
