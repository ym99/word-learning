import React, { Component } from 'react';
import { Progress } from 'Progress';
import { Info } from 'Info';
import { History } from 'History';
import { FinalInfo } from 'FinalInfo';

export class App extends Component  {
    constructor(props){
        super(props);

        this.switchTo  = this.switchTo.bind(this);
        this.processAnswer = this.processAnswer.bind(this);

        const mode = "test";
        const questions = App.generateQuestions(this.props, mode);
        const questionIndex = App.generateQuestionIndex(questions);

        this.state = {
            mode,
            questions,
            questionIndex,
            history: []
        };
    }

    static generateQuestionIndex(questions){
        return questions.length === 0 ? null : Math.floor(Math.random() * questions.length);
    }

    static generateQuestions({words}, mode){
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

        let newRatio = 1;
        let oldRatio = 1;
        switch (mode){
            case "new":
                newRatio = 10;
                oldRatio = 0;
                break;

            case "mix":
                newRatio = 5;
                oldRatio = 1;
                break;

            case "test":
                newRatio = 1;
                oldRatio = 1;
                break;
        }

        let questions = [];

        for (let i = 0; i < (words.new || []).length; i++) {
            for (let c = 0; c < newRatio; c++) {
                questions.push(createSpanishQuestion(words.new[i]));
                questions.push(createEnglishQuestion(words.new[i]));
            }
        }

        for (let i = 0; i < (words.old || []).length; i++) {
            for (let c = 0; c < oldRatio; c++) {
                questions.push(createSpanishQuestion(words.old[i]));
                questions.push(createEnglishQuestion(words.old[i]));
            }
        }

        return questions;
    }

    static getStats({questions, history}) {
        const total = history.length;
        const correct = history.reduce(function(accum, record) { return accum + record.isCorrectAnswer ? 1 : 0; }, 0);
        const percent = total === 0 ? null : correct / total;
        const grade = 
                percent === null ? null :
                percent >= 0.94 ? "A" :
                percent >= 0.90 ? "A-" :
                percent >= 0.87 ? "B+" :
                percent >= 0.83 ? "B" :
                percent >= 0.80 ? "B-" :
                percent >= 0.77 ? "C+" :
                percent >= 0.73 ? "C" :
                percent >= 0.70 ? "C-" :
                percent >= 0.67 ? "D+" :
                percent >= 0.60 ? "D" :
                                  "F"
        ;
        
        return {
            total,
            correct,
            percentInfo: percent === null ? "" : (percent * 100).toFixed(0) + "% correct",
            grade,
            gradeClass: 
                percent === null ? "" :
                grade.startsWith("A") ? "label label-success" :
                grade.startsWith("B") ? "label label-info" :
                grade.startsWith("C") ? "label label-warning" :
                                        "label label-danger"
        };
    }

    switchTo(mode){
        return (prevState, props) => {
            const questions = App.generateQuestions(props, mode);
            const questionIndex = App.generateQuestionIndex(questions);

            return {
                mode,
                questions,
                questionIndex,
                history: []
            };
        };
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
        const noQuestions = this.state.questionIndex === null;

        const stats = App.getStats(this.state);

        return (
            <div>
                <Progress history={this.state.history} questions={this.state.questions} />
                <History 
                    question={noQuestions ? null : this.state.questions[this.state.questionIndex] }
                    history={this.state.history}
                    processAnswer={this.processAnswer}
                />
                {!noQuestions &&
                    <Info stats={stats} words={this.props.words}/>
                }
                {noQuestions &&
                     <FinalInfo stats={stats} words={this.props.words}/>
                }
            </div>
        );
    }
}
