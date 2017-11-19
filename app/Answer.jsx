import React from 'react';
import Colors from './utils/Colors';
import { flagStyle } from './utils/Flag';

export default class Answer extends React.Component {
  static propTypes = {
    reviewMode: React.PropTypes.bool.isRequired,
    hasAnswerTextErrors: React.PropTypes.bool.isRequired,
    answerLang: React.PropTypes.oneOf([
      'english',
      'spanish',
    ]),
    answerText: React.PropTypes.string.isRequired,
    onAnswerReady: React.PropTypes.func.isRequired,
    onAnswerChange: React.PropTypes.func.isRequired,
  };

  render() {
    const errorStyle = this.props.hasAnswerTextErrors ? {
      color: Colors.white,
      backgroundColor: Colors.red,
      outlineColor: Colors.red,
    } : {};

    return (
      <input
        autoFocus
        autoComplete="off"
        spellCheck="false"
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
          ...flagStyle(this.props.answerLang),
          ...errorStyle,
          width: '175px',
          backgroundPosition: 'right center',
        })}
        value={this.props.answerText}
      />
    );
  }
}
