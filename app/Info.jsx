import React from 'react';

export default class Info extends React.Component {
  static propTypes = {
    stats: React.PropTypes.shape({
      grade: React.PropTypes.string,
      gradeClass: React.PropTypes.string.isRequired,
      percentInfo: React.PropTypes.string.isRequired,
    }).isRequired,
    words: React.PropTypes.shape({
      old: React.PropTypes.array.isRequired,
      new: React.PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div
        style={({
          position: 'fixed',
          right: '0px',
          top: '0px',
          paddingTop: '20px',
          paddingRight: '20px',
        })}
      >
        {this.props.stats.grade &&
          <span>
            <span
              className={this.props.stats.gradeClass}
              style={({
                fontSize: 'large',
              })}
            >{this.props.stats.grade}</span>
            &nbsp;
            <span
              className="badge"
            >{this.props.stats.percentInfo}</span>
            &nbsp;
          </span>
        }
        <b>
          {this.props.words.new.length}
        </b> new and <b>
          {this.props.words.old.length}
        </b> known words
      </div>
    );
  }
}
