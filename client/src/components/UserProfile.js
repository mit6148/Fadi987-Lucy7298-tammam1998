import React from "react";
import "../css/profile.css";
import "../css/newspaper.css";


export default class Ranking extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };

    console.log(this.props.userInfo);
    console.log('hihihi'); 
    }
  
    render() {
        return(
        <div class = "head">
            <div class = "animal_left"><img src="./public/rabbit.png" height = "300" width="300"/></div>
            <div class = "animal_right">
                <div class = "animal-right-div">
                <h1 class = "header">Hi, Yunxing Liao</h1>
                <h1 class = "header">You're as fast as a bird!</h1>
                </div>
            </div>
        </div>
    
        );
    }
}