import React from 'react';

export default class Info extends React.Component {
  static propTypes = {
    stats: React.PropTypes.shape({
      grade: React.PropTypes.string.isRequired,
      gradeClass: React.PropTypes.string.isRequired,
      percentInfo: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return this.props.stats.grade ? (
      <div
        className="well"
        style={({
          position: 'fixed',
          right: '0px',
          top: '0px',
        })}
      >
        <span
          className={this.props.stats.gradeClass}
          style={({
            fontSize: 'large',
          })}
        >{this.props.stats.grade}</span>
        &nbsp;
        <span
          className="badge"
          style={({
            fontSize: 'larger',
          })}
        >{this.props.stats.percentInfo}</span>
      </div>
    ) : null;
  }
}
