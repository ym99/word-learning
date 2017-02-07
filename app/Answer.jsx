import React from 'react';

export default class Answer extends React.Component {
  static propTypes = {
    reviewMode: React.PropTypes.bool.isRequired,
    hasAnswerTextErrors: React.PropTypes.bool.isRequired,
    answerText: React.PropTypes.string.isRequired,
    onAnswerReady: React.PropTypes.func.isRequired,
    onAnswerChange: React.PropTypes.func.isRequired,
  };

  render() {
    const errorStyle = this.props.hasAnswerTextErrors ? {
      backgroundColor: 'rgb(242, 222, 222)',
      outlineColor: 'darkred',
    } : {};

    return (
      <input
        autoFocus
        type="text"
        className="form-control"
        disabled={this.props.reviewMode}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            this.props.onAnswerReady();
            return false;
          }

          return true;
        }}
        onChange={(event) => {
          this.props.onAnswerChange(event.target.value);
          return true;
        }}
        style={({
          ...errorStyle,
          width: '10em',
        })}
        value={this.props.answerText}
      />
    );
  }
}
