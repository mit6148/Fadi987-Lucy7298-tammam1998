import React from "react";
import "../../css/game.css";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default class GameProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style = {{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px',fontWeight: 'bold', textAlign:'center' }}>
                <h4>{this.props.name}: </h4> 
                <div style={{ width: '150px'}}>
                    <CircularProgressbar
                        percentage={this.props.percent * 100}
                        text={`speed: ${this.props.speed}`}
                        styles={{
                            background: {
                                fill: '#2f2f2f',
                            },
                            text: {
                                fill: '#2f2f2f',
                                fontSize: 10,
                            },
                            path: {
                                stroke: '#510030',
                            },

                        }}

                    />
                </div>
            </div>
        );
    }
}
