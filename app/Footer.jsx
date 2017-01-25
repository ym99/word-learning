import React, { Component } from 'react';

export class Info extends Component  {
    render(){
        return (
            <div
                className="well"
                style={({
                    position: 'fixed',
                    right: '0px',
                    bottom: '0px'
                })}
            >
                <b>{this.props.words.new.length}</b> new and <b>{this.props.words.old.length}</b> known words
            </div>
        );
    }
}
