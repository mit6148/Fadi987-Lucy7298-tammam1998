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
        <div className = "topuserwords">
            <span><h3>{this.props.rank} </h3> </span>
            <span> <h3>{this.props.name} </h3></span>
            <span> <h3>{this.props.score}</h3></span>
        </div>
        );
    }
}