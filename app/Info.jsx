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
          float: 'right',
          padding: '1em',
          border: '1px solid black',
          borderRadius: '0.5em',
        })}
      >
        {this.props.stats.grade &&
          <div
            style={({
              paddingBottom: '1em',
              textAlign: 'center',
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
            >{this.props.stats.percentInfo}</span>
            &nbsp;
          </div>
        }
        <div>
          <b>
            {this.props.words.new.length}
          </b> new and <b>
            {this.props.words.old.length}
          </b> known words
        </div>
      </div>
    );
  }
}
