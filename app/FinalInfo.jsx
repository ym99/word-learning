import React from 'react';

export default class FinalInfo extends React.Component {
  static propTypes = {
    stats: React.PropTypes.shape({
      grade: React.PropTypes.string.isRequired,
      gradeClass: React.PropTypes.string.isRequired,
      percentInfo: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div
        style={({
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: '1000',
        })}
      >
        <span
          className={this.props.stats.gradeClass}
          style={({
            fontSize: '1000%',
          })}
        >{this.props.stats.grade}</span>
        <br />
        <br />
        <br />
        <br />
        <span
          className="badge"
          style={({
            fontSize: '300%',
          })}
        >{this.props.stats.percentInfo}</span>
      </div>
    );
  }
}
