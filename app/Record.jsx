import React, { Component } from 'react';

export class Record extends Component  {
    render(){
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.record.question}</td>
                <td>{this.props.record.answer}</td>
                <td>{this.props.record.correctAnswer}</td>
            </tr>
        );
    }
}