import React, { Component } from 'react';
import { History } from 'History';

export class App extends Component  {
    constructor(props){
        super(props);

        this.state = {
            question: {
                question: "q?",
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

    processAnswer(answer, isError){
        // const isCorrectAnswer = x.trim().toUpperCase() === y.trim().toUpperCase();

        // this.setState({

        // })
    }

    render(){
        return (
            <History 
                question={this.state.question}
                history={this.state.history}
            />
        );
    }
}