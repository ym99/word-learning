import React, { Component } from 'react';

export class Question extends Component  {
    constructor(props){
        super(props);

        this.state ={
            isError: false            
        };
    }

    componentDidMount(){
        this.inputObj.focus(); 
    }

    keyDown(event) {
        this.setState({
            isError: false
        });

        return true;
    }

    keyPress(event) {
        if (event.keyCode === 13) {
            this.props.processAnswer();
            return false;
        }

        return true;
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineCcolor: 'darkred'
        } : {};

        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.question.question}</td>
                <td>
                    <input 
                        type='text'
                        ref={(x) => { this.inputObj = x; }} 
                        onKeyDown={this.keyDown}
                        onKeyPress={this.keyPress}
                        style={style}
                    >
                    </input>
                </td>
                <td><button type='button'>Check</button></td>
            </tr>
        );
    }
}