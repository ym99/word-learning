import React, { Component } from 'react';
import { History } from 'History';

export class App extends Component  {
    constructor(props){
        super(props);

        this.processAnswer = this.processAnswer.bind(this);

        const wordRatios = {
                new: 1,
                old: 1
            };

        const questions = App.generateQuestions(this.props, wordRatios);

        this.state = {
            wordRatios: wordRatios,
            questions: questions,
            questionIndex: App.generateQuestionIndex(questions),
            history: []
        };
    }

    static generateQuestionIndex(questions){
        return questions.length === 0 ? null : Math.floor(Math.random() * questions.length);
    }

    static generateQuestions({words}, wordRatios){
        function createSpanishQuestion(word) {
            return {
                text: word.spanish + (word.spanishComment || ""),
                answer: word.english,
            };
        }

        function createEnglishQuestion(word) {
            return {
                text: word.english + (word.englishComment || ""),
                answer: word.spanish,
            };
        }

        let questions = [];

        for (let i = 0; i < (words.new || []).length; i++) {
            for (let c = 0; c < wordRatios.new; c++) {
                questions.push(createSpanishQuestion(words.new[i]));
                questions.push(createEnglishQuestion(words.new[i]));
            }
        }

        for (let i = 0; i < (words.old || []).length; i++) {
            for (let c = 0; c < wordRatios.old; c++) {
                questions.push(createSpanishQuestion(words.old[i]));
                questions.push(createEnglishQuestion(words.old[i]));
            }
        }

        return questions;
    }

    processAnswer(answer){
        this.setState((prevState) => {
            var question = prevState.questions[prevState.questionIndex];

            var newQuestions = [...prevState.questions];
            newQuestions.splice(prevState.questionIndex, 1);

            return {
                questions: newQuestions, 
                questionIndex: App.generateQuestionIndex(newQuestions),
                history: [...prevState.history, {
                    isCorrectAnswer: answer.trim().toUpperCase() === question.answer.trim().toUpperCase(),
                    question: question,
                    answer: answer,
                }]
            };
        });
    }

    render(){
        return (
            <History 
                question={this.state.questionIndex ? this.state.questions[this.state.questionIndex] : null}
                history={this.state.history}
                processAnswer={this.processAnswer}
            />
        );
    }
}