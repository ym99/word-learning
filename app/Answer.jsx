import React from 'react';

export default class Answer extends React.Component {
  static propTypes = {
    hasAnswerTextErrors: React.PropTypes.bool.isRequired,
    answerText: React.PropTypes.string.isRequired,
    onAnswerReady: React.PropTypes.func.isRequired,
    onAnswerChange: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.inputObj.focus();
    this.inputObj.scrollIntoView();
  }

  render() {
    const errorStyle = this.props.hasAnswerTextErrors ? {
      backgroundColor: 'rgb(242, 222, 222)',
      outlineColor: 'darkred',
    } : {};

    return (
      <input
        type="text"
        className="form-control"
        ref={(x) => { this.inputObj = x; }}
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
          width: '300px',
        })}
        value={this.props.answerText}
      />
    );
  }
}
