import React from 'react';
import EMail from './utils/EMail';
import DateEx from './utils/DateEx';

export default class Stats extends React.Component {
  static propTypes = {
    finished: React.PropTypes.bool.isRequired,
    startTime: React.PropTypes.instanceOf(DateEx).isRequired,
    mode: React.PropTypes.oneOf([
      'new',
      'test100',
      'testAll',
    ]),
    questions: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
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
    const newWords = this.props.words.reduce(
      (accum, word) => accum + (!word.hide && word.new ? 1 : 0), 0);

    const oldWords = this.props.words.reduce(
      (accum, word) => accum + (!word.hide && !word.new ? 1 : 0), 0);

    const totalAnswers = this.props.history.length;

    const correctAnswers = this.props.history.reduce(
      (accum, record) => accum + (record.correctAnswer === 'correct' ? 1 : 0), 0);
    if (console) { console.info('correctAnswers', correctAnswers); }

    const incorrectAnswers = this.props.history.reduce(
      (accum, record) => accum + (record.correctAnswer === 'incorrect' ? 1 : 0), 0);
    if (console) { console.info('incorrectAnswers', incorrectAnswers); }

    const emptyAnswers = this.props.history.reduce(
      (accum, record) => accum + (record.correctAnswer === 'empty' ? 1 : 0), 0);
    if (console) { console.info('emptyAnswers', emptyAnswers); }

    const percent = totalAnswers === 0 ? null : correctAnswers / totalAnswers;
    if (console) { console.info('percent', percent); }

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
      newWords,
      oldWords,
      totalQuestions: this.props.questions.length + totalAnswers,
      correctAnswers,
      incorrectAnswers,
      emptyAnswers,
      totalAnswers,
      percent: `${(percent * 100).toFixed(0)}%`,
      grade,
      gradeClass,
    };
  }

  sendEmail() {
    const stats = this.getStats();

    const bodySection = (correctAnswerValue) => {
      const array = this.props.history.reduce((accum, record, index) => {
        if (record.correctAnswer === correctAnswerValue) {
          accum.push(`${index + 1}. ${record.question.text}${record.question.newQuestion ? '*' : ''} -> ${record.correctAnswer === 'empty' ? '?' : record.answer} / ${record.question.answers.join(', ')}`);
        }

        return accum;
      }, []);

      return array.length === 0 ? `[No ${correctAnswerValue}]` : `[${array.length} ${correctAnswerValue}]\r\n--------------------\r\n${array.join('\r\n')}`;
    };

    let body = '';
    body += `${stats.totalAnswers} answers of ${stats.totalQuestions} questions made from ${stats.newWords} new and ${stats.oldWords} known words in "${this.props.mode}" mode.\r\n\r\n`;
    body += `[${stats.correctAnswers == null ? 'null' : stats.correctAnswers}] + [${stats.incorrectAnswers == null ? 'null' : stats.incorrectAnswers}] + [${stats.emptyAnswers == null ? 'null' : stats.emptyAnswers}] = [${stats.totalAnswers == null ? 'null' : stats.totalAnswers}]\r\n\r\n`;
    body += `${bodySection('incorrect')}\r\n\r\n`;
    body += `${bodySection('empty')}`;

    EMail.send({
      subject: `${document.title} (${this.props.startTime.getAll()} - ${new DateEx().getTime()}): Grade = ${stats.grade} (${stats.percent})`,
      body,
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
        {stats.totalAnswers !== 0 &&
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
        {stats.totalAnswers !== 0 &&
          <div
            className={stats.gradeClass}
            style={({
              display: 'inline-block',
              fontSize: '3em',
              float: 'left',
            })}
          >{stats.grade}</div>
        }
        {stats.totalAnswers !== 0 &&
          <div
            style={({
              display: 'inline-block',
              paddingLeft: '0.5em',
            })}
          >
            <b>{`${stats.percent}`}</b> correct
          </div>
        }
        {stats.totalAnswers !== 0 &&
          <br />
        }
        <div
          style={({
            display: 'inline-block',
            paddingLeft: '0.5em',
          })}
        >
          <b>
            {stats.newWords}
          </b> new words
        </div>
        <div
          style={({
            display: 'inline-block',
            paddingLeft: '0.5em',
          })}
        >
          <b>
            {stats.oldWords}
          </b> known words
        </div>
      </div>
    );
  }
}
