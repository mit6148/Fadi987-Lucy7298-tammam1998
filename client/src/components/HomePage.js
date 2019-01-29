import React from "react";
import "../css/newspaper.css";
import image2 from "../images/Newspaper.jpg"

export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
    render() {
        return(
            <div class="collumns-home">
            <div class="collumn">
                <div class="head">
                    <span class="headline hl5">About us</span>
                    <p><span className="headline hl2">We like typeracer and we like news.</span></p>

                </div>
                <span><p>We are Team Shawarma, and this is the story of how our website came to be.</p></span>

                <div><span><p>At the beginning of our website-building journey, we didn't know each other very well. Originally, we thought that we only had one common interest: 
                eating. </p></span>

                </div>
            </div>

            <div class="collumn">

                <div><span><p> Tammam really loves eating shawarma. Fadi does too. I'm not really sure what 
                shawarma is. I really like Chinese food though. We were convinced that we would design 
                a group food delivery app. We were certain. </p></span>

                <figure className="figure">
								<img className="media" src = {require("../images/food.jpg")} alt=""/>
								<figcaption class="figcaption">Unfortunately, black-and-white food doesn't look very appetizing. </figcaption>
				</figure>

                </div>
            </div>

            <div class="collumn">

                <div><span><p> However, after many hours of wireframing and discussing logistics, we realized that 
                    crowdsourcing delivery food orders required more logistically manuvering than we 
                    had bargained for. </p></span></div>

                <div><span><p> Thus, in the Course 6 lounge at midnight, we came up with the idea of NewRacer, a 
                    innovative new platform for interacting with news stories. Fadi loves TypeRacer. I love reading 
                    the news. Why not combine our interests for competitive typing and news media consumption? </p></span></div>

            </div>


            <div class="collumn" id = "homepage-wider">

                <div><span><p> We created this website after two weeks of web development. We learned a lot about code, 
                    and we hope you enjoy reading the news stories in the game.  </p></span></div>


            </div>

            </div>
        );
    }
}