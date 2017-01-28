import React from 'react';

export default class Stats extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        isCorrectAnswer: React.PropTypes.bool.isRequired,
        question: React.PropTypes.shape({
          text: React.PropTypes.string.isRequired,
          answer: React.PropTypes.string.isRequired,
        }).isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    words: React.PropTypes.shape({
      old: React.PropTypes.array.isRequired,
      new: React.PropTypes.array.isRequired,
    }).isRequired,
  }

  render() {
    const total = this.props.history.length;
    const correct = this.props.history.reduce((accum, record) =>
      accum + (record.isCorrectAnswer ? 1 : 0), 0);

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

    const percentInfo = percent === null ? '' : `${(percent * 100).toFixed(0)}% correct`;

    return (
      <div
        style={({
          float: 'right',
          padding: '1em',
          border: '1px solid black',
          borderRadius: '0.5em',
        })}
      >
        {grade &&
          <div
            style={({
              paddingBottom: '1em',
              textAlign: 'center',
            })}
          >
            <span
              className={gradeClass}
              style={({
                fontSize: 'large',
              })}
            >{grade}</span>
            &nbsp;
            <span
              className="badge"
            >{percentInfo}</span>
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
