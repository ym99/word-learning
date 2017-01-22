import React, { Component } from 'react';

export class Answer extends Component  {
    constructor(props){
        super(props);

        this.state = {
            isError: false,
            value: ""
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.inputObj.focus(); 
    }

    handleKeyDown(event) {
        if (event.keyCode === 13) {
            this.props.processAnswer({
                answer: this.state.value,
                isError: this.state.isError
            });
            return false;
        }

        return true;
    }

    handleChange(event){
        const value = event.target.value;

        const isError = !value.match(/^[ A-Za-z]*$/);

        this.setState({
            isError: isError,
            value: event.target.value
        })
    }

    render(){
        const style = this.state.isError ? {
            backgroundColor: 'rgb(242, 222, 222)',
            outlineColor: 'darkred'
        } : {};

        return (
            <input 
                type='text'
                ref={(x) => { this.inputObj = x; }} 
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                style={style}
                value={this.state.value}
            >
            </input>
        );
    }
}