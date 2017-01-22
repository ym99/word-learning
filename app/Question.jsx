import React, { Component } from 'react';
import { Answer } from 'Answer';

export class Question extends Component  {
    constructor(props){
        super(props);

        this.state ={
            hasAnswerTextErrors: false,
            answerText: ""
        };

        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleAnswerReady = this.handleAnswerReady.bind(this);
    }

    handleAnswerChange(answerText){
        this.setState({
            hasAnswerTextErrors: !answerText.match(/^[ A-Za-z]*$/),
            answerText: answerText
        })
    }

    handleAnswerReady(){
        if (!this.state.hasAnswerTextErrors){
            this.props.processAnswer(this.state.answerText);
        }
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineCcolor: 'darkred'
        } : {};

        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.question.text}</td>
                <td>
                    <Answer 
                        hasAnswerTextErrors={this.state.hasAnswerTextErrors}
                        answerText={this.state.answerText}
                        onAnswerChange={this.handleAnswerChange}
                        onAnswerReady={this.handleAnswerReady}
                    />
                </td>
                <td>
                    <button
                        type='button'
                        disabled={this.state.hasAnswerTextErrors}
                        onClick={this.handleAnswerReady}
                    >
                        Check
                    </button>
                </td>
            </tr>
        );
    }
}