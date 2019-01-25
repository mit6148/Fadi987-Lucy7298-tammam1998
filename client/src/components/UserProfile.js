import React from "react";
import "../css/profile.css";
import "../css/newspaper.css";
import Animal from "./userpage/animal"

export default class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };

    console.log(this.props.userInfo);
    console.log('hihihi'); 
    }
  
    render() {
        return(
            <Animal best_score = {this.props.best_score}/>
    
        );
    }
}