import React, { Component } from 'react';
import { History } from 'History';

export class App extends Component  {
    constructor(props){
        super(props);

        this.state = {
            question: {
                text: "q?",
                correctAnswer: "ca?"
            },
            history: [ 
                { 
                    isCorrectAnswer: true,
                    question: "q1",
                    answer: "a1",
                    correctAnswer: "ca1"
                }, {
                    isCorrectAnswer: false,
                    question: "q2",
                    answer: "a2",
                    correctAnswer: "ca2"
                }, {
                    isCorrectAnswer: true,
                    question: "q3",
                    answer: "a3",
                    correctAnswer: "ca3"
                }
            ]
        };

        this.processAnswer = this.processAnswer.bind(this);
    }

    processAnswer({answer, isError}){
        this.setState((prevState) => {
            return {
                history: [...prevState.history, {
                    isCorrectAnswer: answer.trim().toUpperCase() === prevState.question.correctAnswer.trim().toUpperCase(),
                    question: prevState.question.text,
                    answer: answer,
                    correctAnswer: prevState.question.correctAnswer
                }]
            };
        })
    }

    render(){
        return (
            <History 
                question={this.state.question}
                history={this.state.history}
                processAnswer={this.processAnswer}
            />
        );
    }
}