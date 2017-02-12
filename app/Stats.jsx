import React from 'react';

export default class Stats extends React.Component {
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
    words: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        new: React.PropTypes.bool,
        hide: React.PropTypes.bool,
      })).isRequired,
  }

  render() {
    const total = this.props.history.length;
    const correct = this.props.history.reduce((accum, record) =>
      accum + (record.correctAnswer === 'correct' ? 1 : 0), 0);

    const percent = total === 0 ? null : correct / total;

    const grade =
      percent === null ? null :
      percent >= 0.94 ? 'A' :
      percent >= 0.90 ? 'A-' :
      percent >= 0.87 ? 'B+' :
      percent >= 0.83 ? 'B' :
      percent >= 0.80 ? 'B-' :
      percent >= 0.77 ? 'C+' :
      percent >= 0.73 ? 'C' :
      percent >= 0.70 ? 'C-' :
      percent >= 0.67 ? 'D+' :
      percent >= 0.60 ? 'D' :
                        'F'
    ;

    const gradeClass =
        grade === null ? '' :
        grade.startsWith('A') ? 'label label-success' :
        grade.startsWith('B') ? 'label label-info' :
        grade.startsWith('C') ? 'label label-warning' :
                                'label label-danger'
    ;

    return (
      <div
        style={({
          float: 'right',
          padding: '1em',
          border: '1px solid black',
          borderRadius: '0.5em',
        })}
      >
        {total !== 0 &&
          <div
            className={gradeClass}
            style={({
              display: 'inline-block',
              fontSize: '3em',
              float: 'left',
            })}
          >{grade}</div>
        }
        {total !== 0 &&
          <div
            style={({
              display: 'inline-block',
              paddingLeft: '0.5em',
            })}
          >
            <b>{`${(percent * 100).toFixed(0)}%`}</b> correct
          </div>
        }
        {total !== 0 &&
          <br />
        }
        <div
          style={({
            display: 'inline-block',
            paddingLeft: '0.5em',
          })}
        >
          <b>
            {this.props.words.reduce((accum, word) => accum + (!word.hide && word.new ? 1 : 0), 0)}
          </b> new words
        </div>
        <div
          style={({
            display: 'inline-block',
            paddingLeft: '0.5em',
          })}
        >
          <b>
            {this.props.words.reduce((accum, word) => accum + (!word.hide && !word.new ? 1 : 0), 0)}
          </b> known words
        </div>
      </div>
    );
  }
}
