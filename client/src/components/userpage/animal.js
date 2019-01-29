import React from "react";

import "../../css/profile.css";
import "../../css/newspaper.css";
import rabbit from "../../public/rabbit.png";  


export default class Animal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          animal: "rabbit",
          best_score: null, 
      };
      this.getAnimal = this.getAnimal.bind(this); 
      console.log(this.props.best_score); 

      console.log('hello'); 
    }

    getAnimal = () => {
        console.log("hiiiiiiiiii"); 
        console.log(this.props.best_score); 
        if (this.props.best_score <= 30) {
            console.log(this.props.best_score); 
            this.setState({animal: "snail"})
        }

        else if (this.props.best_score <= 50) {
            this.setState({animal: "turtle"})
        }

        else if (this.props.best_score <= 80) {
            this.setState({animal: "grasshopper"})
        }

        else if (this.props.best_score <= 100) {
            this.setState({animal: "grasshopper"})
        }

        else if (this.props.best_score <= 120) {
            this.setState({animal: "rabbit"})
        }

        else if (this.props.best_score <= 150) {
            this.setState({animal: "kangaroo"})
        }

        else if (this.props.best_score <= 180) {
            this.setState({animal: "falcon"})
        }

        else if (this.props.best_score > 180) {
            this.setState({animal: "unicorn"})
            
        }

    }

    componentWillMount () {      
        
        console.log(this.props.best_score); 
        this.getAnimal(); 

    }


  
    render() {
        //const location = "../../public/" + this.state.animal + ".png"; 
        if(this.state.best_score !== this.props.best_score) {
            this.setState({best_score: this.props.best_score}); 
            this.getAnimal()
        }

        return(
            <div className = "headerdiv2">
            <div className = "animal_left" ><img  className = "resize" src = {require("../../public/" + this.state.animal + ".png")}/></div>
            <div className = "animal_right">
                <div className = "animal-right-div">
                <h1 className = "header">Hi, {this.props.name}</h1>
                <h1 className = "header">You're as fast as a {this.state.animal}!</h1>
                </div>
            </div>
            </div>
        );
    }
}
