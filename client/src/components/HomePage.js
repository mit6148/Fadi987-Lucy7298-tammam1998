import React from "react";
import "../css/homepage.css";
import image2 from "../images/Newspaper.jpg"
import GameContainer from "./GameContainer";
import Navbar from "./Navbar"

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
        if (this.props.userInfo === null) {
            return(
                <div>
                    <div className = "welcome">
                        <header>
                            NewsRacer
                        </header>
                        <img src = {image2}/>
                        <h1 className = 'description'>Put Something Here</h1>
                        <ul>
                            <li><a href = 'auth/google'>Login</a></li>
                            <li><a href = "#About">About</a></li>
                        </ul>
                    </div>
                    <div id = "About" className = "about">
                        <header>
                            About...
                        </header>
                        <h1 className = 'description'>Put something here</h1>
                    </div>
                </div>
            );
    }
        else {
            return (
                <div>
                    <Navbar userInfo={this.props.userInfo}
                            logout={this.props.logout}/>
                    <GameContainer/>
                </div>
            )
        }
}
}