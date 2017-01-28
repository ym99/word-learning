import React from 'react';
import Record from './Record';
import Question from './Question';

export default class History extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        isCorrectAnswer: React.PropTypes.bool.isRequired,
        question: React.PropTypes.string.isRequired,
        answer: React.PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
    question: React.PropTypes.shape({
    }),
    processAnswer: React.PropTypes.func.isRequired,
  }

  render() {
    return (
      <table
        className="table table-striped table-bordered"
        style={({
          textAlign: 'center',
        })}
      >
        <thead>
          <tr>
            <th
              className="col-md-3"
              style={({
                textAlign: 'center',
              })}
            >Number</th>
            <th
              className="col-md-3"
              style={({
                textAlign: 'center',
              })}
            >Question</th>
            <th
              className="col-md-3"
              style={({
                textAlign: 'center',
              })}
            >Answer</th>
            <th
              className="col-md-3"
              style={({
                textAlign: 'center',
              })}
            >Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {this.props.history.map((record, index) => (
            <Record key={record.id} index={index + 1} record={record} />
          ))}
          {this.props.question &&
            <Question question={this.props.question} processAnswer={this.props.processAnswer} />
          }
        </tbody>
      </table>
    );
  }
}
