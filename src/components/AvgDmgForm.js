import React, { Component } from 'react';
import Die from './Die';

class AvgDmgForm extends React.Component {

    render() { return (

        <div className="row">
            <div className="col-sm-12">
                <div className="row">
                    <div className="offset-sm-1 col-sm-2">
                        <Die sides={4} addDie={this.props.addDie} addedDice={this.props.addedDice[4]} />
                    </div>
                    <div className="col-sm-2">
                        <Die sides={6} addDie={this.props.addDie} addedDice={this.props.addedDice[6]} />
                    </div>
                    <div className="col-sm-2">
                        <Die sides={8} addDie={this.props.addDie} addedDice={this.props.addedDice[8]} />
                    </div>
                    <div className="col-sm-2">
                        <Die sides={10} addDie={this.props.addDie} addedDice={this.props.addedDice[10]} />
                    </div>
                    <div className="col-sm-2">
                        <Die sides={12} addDie={this.props.addDie} addedDice={this.props.addedDice[12]} />
                    </div>
                </div>

                <form onSubmit={this.props.calculateAvgDmg}>

                    <div className="row">
                        <div className="col-sm-12">
                            <input name="name" type="text" placeholder={"Name"} onChange={(event) => this.props.changeState("name", event.target.value)} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <input name="attackModifier" type={"text"} placeholder={"Attack mod"} onChange={(event) => this.props.changeState("attackModifier", parseInt(event.target.value))} />
                        </div>
                        <div className="col-sm-4">
                            <input name="damageModifier" type={"text"} placeholder={"Damage mod"} onChange={(event) => this.props.changeState("damageModifier", parseInt(event.target.value))} />
                        </div>
                        <div className="col-sm-4">
                            <input name="critRange" type={"text"} placeholder={"Crit Range"} onChange={(event) => this.props.changeState("critRange", parseInt(event.target.value))} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <input name="attacks" type="text" placeholder={"# of attacks"} onChange={(event) => this.props.changeState("attacks", parseInt(event.target.value))} />
                        </div>
                        <div className="col-sm-4">
                            <input name="attackRolls" type={"text"} placeholder={"Advantage"} onChange={(event) => this.props.changeState("attackRolls", parseInt(event.target.value))} />
                        </div>
                        <div className="col-sm-4">
                            <input name="armorClass" type={"text"} placeholder={"Armor Class"} onChange={(event) => this.props.changeState("armorClass", parseInt(event.target.value))} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <button className={'btn btn-danger btn-block'} onClick={this.props.clearState}>Reset dice</button>
                        </div>
                        <div className="col-sm-8">
                            <button type={"submit"} className={'btn btn-success'}>Calculate Average Damage</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>



    )
    };
}

export default AvgDmgForm;