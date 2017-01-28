import React from 'react';

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
    const incorrectRecords = [];
    this.props.history.forEach((record) => {
      if (!record.isCorrectAnswer) {
        incorrectRecords.push(record);
      }
    });

    return incorrectRecords.length === 0 ? null : (
      <table
        className="table table-striped table-bordered"
        style={({
          textAlign: 'center',
          marginTop: '20px',
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
          {incorrectRecords.map(record => (
            <tr
              key={record.id}
              className="danger"
            >
              <td>{record.question.text}</td>
              <td>{record.answer}</td>
              <td>{record.question.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
