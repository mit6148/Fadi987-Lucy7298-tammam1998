import React from "react";

import "../../css/profile.css";
import "../../css/newspaper.css";
import rabbit from "../../public/rabbit.png";
import bird from "../../public/bird.png";
import falcon from "../../public/falcon-bird-shape.png";
import grasshopper from "../../public/grasshopper.png";
import kangaroo from "../../public/kangaroo.png";
import snail from "../../public/snail.png";
import turtle from "../../public/turtle.png";
import unicorn from "../../public/unicorn.png";

export default class Animal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          animal: null, 
      };

      this.getAnimal = this.getAnimal.bind(this); 
      this.getAnimal(); 
    }

    getAnimal = () => {
        if (this.props.best_score<= 30) {
            this.setState({animal: slug})
        }

        else if (this.props.best_score <= 50) {
            this.setState({animal: turtle})
        }

        else if (this.props.best_score <= 80) {
            this.setState({animal: grasshopper})
        }

        else if (this.props.best_score <= 100) {
            this.setState({animal: grasshopper})
        }

        else if (this.props.best_score <= 120) {
            this.setState({animal: rabbit})
        }

        else if (this.props.best_score <= 150) {
            this.setState({animal: kangaroo})
        }

        else if (this.props.best_score <= 180) {
            this.setState({animal: falcon})
        }

        else {
            this.setState({animal: unicorn})
        }
        
    }


  
    render() {
        return(
            <div class = "headerdiv">
            <div class = "animal_left" ><img src = {this.state.animal}/></div>
            <div class = "animal_right">
                <div class = "animal-right-div">
                <h1 class = "header">Hi, Yunxing Liao</h1>
                <h1 class = "header">You're as fast as a {String(this.state.animal)}!</h1>
                </div>
            </div>
            </div>
        );
    }
}
