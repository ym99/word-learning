import React from 'react';
import Record from './Record';
import Question from './Question';

export default class History extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.object.isRequired,
    ).isRequired,
    question: React.PropTypes.shape({
    }).isRequired,
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
          {this.props.history.map((obj, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Record key={index + 1} index={index + 1} record={obj} />
          ))}
          {this.props.question &&
            <Question question={this.props.question} processAnswer={this.props.processAnswer} />
          }
        </tbody>
      </table>
    );
  }
}
