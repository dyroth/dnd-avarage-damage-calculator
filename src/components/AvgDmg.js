import React, { Component } from 'react';
import AvgDmgForm from './AvgDmgForm';
import { avgDmg, hitChance, critChance } from '../calculator';

class AvgDmg extends React.Component {

    state = {
        dice: {
            4: 0,
            6: 0,
            8: 0,
            10: 0,
            12: 0,
        },
        avgDmg: 0,
        hitChance: 0,
        critChance: 0,
    };

    addDie = sides => {
        const dice = { ...this.state.dice };
        dice[sides]++;
        this.setState({ dice });
    };

    changeState = (key, value) => {
        this.setState({ [key] : value });
    };

    calculateAvgDmg = (event) => {
        event.preventDefault();

        this.setState({ avgDmg : avgDmg(this.state)});
        this.setState({ hitChance : hitChance(this.state.attackModifier, this.state.armorClass, this.state.attackRolls)});
        this.setState({ critChance : critChance(this.state.attackRolls, this.state.critRange)});
    };

    clearState = () => {
        const dice = {
            4: 0,
            6: 0,
            8: 0,
            10: 0,
            12: 0,
        };

        this.setState({ dice });
    };

    render() { return (

        <div className="row">
            <div className="col-lg-12">
                <p>
                    Avarage Damage: <strong>{this.state.avgDmg || "-"}</strong><br />
                    Hit Chance: <strong>{this.state.hitChance || "-"}</strong><br />
                    Crit Chance: <strong>{this.state.critChance || "-"}</strong>
                </p>
            </div>
            <div className="col-lg-12">
                <AvgDmgForm addDie={this.addDie} addedDice={this.state.dice} changeState={this.changeState} calculateAvgDmg={this.calculateAvgDmg} clearState={this.clearState}/>
            </div>
        </div>

    )
    };
}

export default AvgDmg;