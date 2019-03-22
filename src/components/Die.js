import React, { Component } from 'react';

class Die extends React.Component {

    render() {

        return (
            <div>
                <p style={{textAlign: "center"}}>
                    {this.props.addedDice}
                </p>
                <img src={ `/img/dice/d${this.props.sides}.jpg` } alt="" onClick={() => this.props.addDie(this.props.sides)}/>
            </div>

        )
    };
}

export default Die;