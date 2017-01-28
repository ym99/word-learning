import React from 'react';
import Record from './Record';

export default class History extends React.Component {
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
        </tbody>
      </table>
    );
  }
}
