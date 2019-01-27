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
            <span><p>{this.props.rank} </p> </span>
            <span> <p>{this.props.name} </p></span>
            <span> <p>{this.props.score}</p></span>
        </div>
        );
    }
}