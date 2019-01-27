import React from "react";

import "../../css/profile.css";
import "../../css/newspaper.css";
import rabbit from "../../public/rabbit.png";  


export default class Animal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          animal: null, 
          path: "../../public/rabbit.png", 
      };

      console.log('hello'); 
      console.log(this.props.userInfo); 

    }

    getAnimal = () => {
        if (this.props.userInfo.best_score<= 30) {
            this.setState({animal: "snail"})
        }

        else if (this.props.userInfo.best_score <= 50) {
            this.setState({animal: "turtle"})
        }

        else if (this.props.userInfo.best_score <= 80) {
            this.setState({animal: "grasshopper"})
        }

        else if (this.props.userInfo.best_score <= 100) {
            this.setState({animal: "grasshopper"})
        }

        else if (this.props.userInfo.best_score <= 120) {
            this.setState({animal: "rabbit"})
        }

        else if (this.props.userInfo.best_score <= 150) {
            this.setState({animal: "kangaroo"})
        }

        else if (this.props.userInfo.best_score <= 180) {
            this.setState({animal: "falcon"})
        }

        else {
            this.setState({animal: "unicorn"})
            
        }

    }

    componentWillMount () {      
        this.getAnimal = this.getAnimal.bind(this); 
        this.getAnimal(); 

    }


  
    render() {
        //const location = "../../public/" + this.state.animal + ".png"; 

        return(
            <div className = "headerdiv2">
            <div className = "animal_left" ><img  className = "resize" src = {require("../../public/" + this.state.animal + ".png")}/></div>
            <div className = "animal_right">
                <div className = "animal-right-div">
                <h1 className = "header">Hi, {this.props.userInfo.name}</h1>
                <h1 className = "header">You're as fast as a {this.state.animal}!</h1>
                </div>
            </div>
            </div>
        );
    }
}
