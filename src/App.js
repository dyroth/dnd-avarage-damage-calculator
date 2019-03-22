import React, { Component } from 'react';

import AvgDmg from './components/AvgDmg';

class App extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 offset-lg-4" style={{marginTop: 300}}>
                    <AvgDmg />
                </div>
            </div>

        );
    }
}

export default App;
