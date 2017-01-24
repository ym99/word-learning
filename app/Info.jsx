import React, { Component } from 'react';

export class Info extends Component  {
    render(){
        return this.props.stats.grade ? (
                <div
                    className="well"
                    style={({
                        position: 'fixed',
                        right: '0px',
                        top: '0px'
                    })}
                >
                    <span className={this.props.stats.gradeClass} style={({fontSize: "large"})}>{this.props.stats.grade}</span>
                    &nbsp;
                    <span className="badge" style={({fontSize: "larger"})}>{this.props.stats.percentInfo}</span>
                </div>
        ) : null;
    }
}
