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
            <div className = "text-display-box display-box-font">
                <h4>{this.props.articleToDisplay}</h4>
            </div>
        );
    }
}