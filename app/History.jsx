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
      <div
        style={({
          align: 'center',
          marginTop: '20px',
        })}
      >
        {incorrectRecords.map(record => (
          <div
            key={record.id}
            style={({
              border: '1px solid rgb(217, 83, 79)',
              borderRadius: '10px',
              display: 'inline-block',
              padding: '5px',
            })}
          >
            <span
              style={({
                padding: '5px',
              })}
            >{record.question.text}</span>
            <span
              className="glyphicon glyphicon-arrow-right"
            />
            {record.answer !== '' &&
              <span
                style={({
                  paddingLeft: '5px',
                  textDecoration: 'line-through',
                })}
              >{record.answer}</span>
            }
            <span
              style={({
                padding: '5px',
              })}
            >{record.question.answer}</span>
          </div>
        ))}
      </div>
    );
  }
}
