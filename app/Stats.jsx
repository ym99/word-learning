import React from 'react';
import EMail from './utils/EMail';
import DateEx from './utils/DateEx';

export default class Stats extends React.Component {
  static propTypes = {
    finished: React.PropTypes.bool.isRequired,
    startTime: React.PropTypes.instanceOf(DateEx).isRequired,
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

  constructor(props) {
    super(props);

    this.getStats = this.getStats.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }

  componentDidUpdate() {
    if (this.props.finished) {
      this.sendEmail();
    }
  }

  getStats() {
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

    return {
      total,
      percent: `${(percent * 100).toFixed(0)}%`,
      grade,
      gradeClass,
    };
  }

  sendEmail() {
    const stats = this.getStats();

    const incorrect = this.props.history.reduce((accum, record, index) => (
      record.correctAnswer !== 'incorrect' ? accum :
        `${accum} ${index + 1}. ${record.question.text} -> ${record.answer} / ${record.question.answers.join(', ')}\n`
    ), '');

    const empty = this.props.history.reduce((accum, record, index) => (
      record.correctAnswer !== 'empty' ? accum :
        `${accum} ${index + 1}. ${record.question.text} -> ? / ${record.question.answers.join(', ')}\n`
    ), '');

    const correct = this.props.history.reduce((accum, record, index) => (
      record.correctAnswer !== 'correct' ? accum :
        `${accum} ${index + 1}. ${record.question.text} -> ${record.answer} / ${record.question.answers.join(', ')}\n`
    ), '');

    EMail.send({
      subject: `${document.title} (${this.props.startTime.getAll()} - ${new DateEx().getTime()}) Grade = ${stats.grade} ${stats.percent}`,
      body: `${incorrect === '' ? '' : 'WRONG\n'}${incorrect}${empty === '' ? '' : '\nNO IDEA\n'}${empty}${correct === '' ? '' : '\nCORRECT\n'}${correct}`,
    });
  }

  render() {
    const stats = this.getStats();

    return (
      <div
        style={({
          float: 'right',
          padding: '1em',
          border: '1px solid black',
          borderRadius: '0.5em',
        })}
      >
        {stats.total !== 0 &&
          <div
            className="glyphicon glyphicon-envelope"
            style={({
              float: 'right',
              padding: '0.2em',
              fontSize: 'large',
              cursor: 'pointer',
            })}
            onClick={() => this.sendEmail()}
          />
        }
        {stats.total !== 0 &&
          <div
            className={stats.gradeClass}
            style={({
              display: 'inline-block',
              fontSize: '3em',
              float: 'left',
            })}
          >{stats.grade}</div>
        }
        {stats.total !== 0 &&
          <div
            style={({
              display: 'inline-block',
              paddingLeft: '0.5em',
            })}
          >
            <b>{`${stats.percent}`}</b> correct
          </div>
        }
        {stats.total !== 0 &&
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
