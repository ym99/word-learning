import React, { Component } from 'react';

export class Record extends Component  {
    render(){
        return (
            <tr className={this.props.record.isCorrectAnswer ? "success" : "danger"}>
                <td>{this.props.index}</td>
                <td>{this.props.record.question.text}</td>
                <td>{this.props.record.answer}</td>
                <td>{this.props.record.question.answer}</td>
            </tr>
        );
    }
}