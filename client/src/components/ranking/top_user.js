import React from "react";
import "../../css/ranking.css";


export default class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }


  
    render() {
        return(
        <div>
            <span class = "b"><p>{this.props.rank} </p> </span>
            <span class = "b"> <p>{this.props.name} </p></span>
            <span class = "b"> <p>{this.props.score}</p></span>
        </div>
        );
    }
}