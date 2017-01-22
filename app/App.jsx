import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
            percentInfo: percent === null ? "" : (percent * 100).toFixed(0) + "%",
            grade,
            gradeClass: 
                percent === null ? "" :
                grade.startsWith("A") ? "label label-success" :
                grade.startsWith("B") ? "label label-info" :
                grade.startsWith("C") ? "label label-warning" :
                                        "label label-danger"
        };
    }

    processAnswer(answer){
        this.setState((prevState) => {
            var question = prevState.questions[prevState.questionIndex];

            var newQuestions = [...prevState.questions];
            console.info(newQuestions.length);
            newQuestions.splice(prevState.questionIndex, 1);
            console.info(newQuestions.length);

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
        const stats = App.getStats(this.state);

        return (
            <div>
                <Navbar fixedTop inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Word Learning</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem href="#" onclick="runNew(); return false;">New Words Only</NavItem>
                            <NavItem href="#" onclick="runMix(); return false;">Mix of New and Old Words</NavItem>
                            <NavItem href="#" onclick="runTest(); return false;">Test</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Text pullRight>
                        <span className={stats.gradeClass} style={({fontSize: "large"})}>{stats.grade}</span>
                        <span className="badge">{stats.percentInfo}</span>
                        <b>{this.props.words.new.length}</b> new and
                        <b>{this.props.words.old.length}</b> known words
                        &nbsp;
                        &nbsp;                    
                    </Navbar.Text>
                </Navbar>
                <History 
                    question={this.state.questionIndex ? this.state.questions[this.state.questionIndex] : null}
                    history={this.state.history}
                    processAnswer={this.processAnswer}
                />
            </div>
        );
    }
}
